import Post from '../models/Post.js';
import User from '../models/User.js';


// Create
export const createPost = async (req, res) => {
    try {
        const { userId, desc, postImg } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            ...req.body,
            firstName: user.firstName,
            lastName: user.lastName,
            "location": user.location,
            "profileImg": user.profileImg,
            "location": user.location,
            likes: {},
            extraLikesCount: Math.floor(Math.random()*200) + 25,
            "comments": ["comment 1", "comment 2", "comment 3", "comment 4"]
        });
        await newPost.save();
        
        const allPosts = await Post.find();
        res.status(201).json(allPosts);
    } catch (err) {
        res.status(409).json({ msg: err.message });
    }
};


// Read
export const getFeedPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const allPosts = await Post.find({ userId });
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};


// Update
export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
}