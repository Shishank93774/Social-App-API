import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    location: String,
    desc: String,
    profileImg: String,
    postImg: String,
    likes: {
        type: Map,
        of: Boolean
    },
    extraLikesCount: Number,
    comments: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;