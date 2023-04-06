import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        default: "-",
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profileImg: {
        type: String,
        default: ""
    },
    followings: {
        type: Array,
        default: [],
    },
    extraFollowingsCount: {
        type: Number,
    },
    location: {
        type: String,
        default: "-",
    },
    occupation: {
        type: String,
        default: "-",
    },
    profileViews: {
        type: Number,
        default: 0,
    },
    followersCount: {
        type: Number,
        default: 0,
    }
},
    { timestamps: true }
)

const User = mongoose.model("User", UserSchema);
export default User;