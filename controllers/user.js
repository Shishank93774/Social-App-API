import User from '../models/User.js';

// Read
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        delete user._doc.password;
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

export const getUserFollowings = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const followings = await Promise.all(
            user.followings.map(id => User.findById(id))
        );
        const formattedFollowings = followings.map(
            ({ _id, firstName, lastName, occupation, location, profileImg }) => {
                return { _id, firstName, lastName, occupation, location, profileImg };
            }
        );
        res.status(200).json(formattedFollowings);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
}

// Update 
export const followToggle = async (req, res) => {
    try {
        const { id, personId } = req.params;
        const user = await User.findById(id);
        // const person = await User.findById(personId);

        if (user.followings.includes(personId)) {
            user.followings = user.followings.filter(id => id !== personId);
        } else {
            user.followings.push(personId);
        }
        await user.save();
        // await person.save();

        const followings = await Promise.all(
            user.followings.map(id => User.findById(id))
        );
        const formattedFollowings = followings.map(
            ({ _id, firstName, lastName, occupation, location, profileImg }) => {
                return { _id, firstName, lastName, occupation, location, profileImg };
            }
        );
        res.status(200).json(formattedFollowings);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}