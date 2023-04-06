import Chat from '../models/Chat.js';

// Create a new Chat
export const createChat = async (req, res) => {
    try{
        const newChat = new Chat({
            members: [req.body.senderId, req.body.recieverId]
        });
        const chat = await newChat.save();
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json({msg: err.message})
    }
};

// User Chats
export const userChats = async (req, res) => {
    try{
        const chat = await Chat.find({
            members: {$in: [req.params.userId]}
        });
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json({msg: err.message});
    }
};

// Find user and others chats
export const findChats = async (req, res) => {
    try{
        const chat = await Chat.findOne({
            members: {$all: [req.params.userId, req.params.toId]}
        })
        res.status(200).json(chat);
    }catch (err){
        res.status(500).json({msg: err.message});
    }
};

