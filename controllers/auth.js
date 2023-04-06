import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register User
export const register = async (req, res) => {
    try {
        const {
            firstName,
            email,
            password
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword,
            profileViews: Math.floor(Math.random() * 10000) + 700,
            followersCount: Math.floor(Math.random() * 500) + 300,
            extraFollowingsCount: Math.floor(Math.random() * 600) + 150,
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Logging a User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "No user Found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Invalid Credentials");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user._doc.password;
        res.status(200).json({ token, user })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}