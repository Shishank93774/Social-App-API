import Message from '../models/Message.js';

// Add Message
export const addMessage = async (req, res) =>{
    try{
        const {chatId, senderId, text} = req.body;
        const newMessage = new Message({
            chatId,
            senderId,
            text
        });
        const message = await newMessage.save();
        res.status(200).json(message);
    }catch(err){
        res.status(500).json({msg: err.message});
    }
};

// Get Messages
export const getMessages = async (req, res) => {
    try{
        const {chatId} = req.params;
        const message = await Message.find({chatId});
        res.status(200).json(message);
    }catch(err){
        res.status(500).json({msg: err.message});
    }
}