const model = require("../models/index.models")
const globalServices = require('../../services/globalService')
const mongoose = require("mongoose")


const sendMessage = async (req, res, next) => {
    try {
      const { recipientId, message } = req.body;
      const senderId = req.user._id;
  
      const senderFriendDoc = await model.friend.findOne({ userId: senderId });
  
      if (!senderFriendDoc || !senderFriendDoc.friends.includes(recipientId)) {
        return globalServices.returnResponse(
          res,
          201,
          true,
          'create friend to send msg',
          {}
        );
      }
  
      const chat = new model.chat({
        sender: senderId,
        receiver: recipientId,
        sender: senderId,
        message: message,
        readReceipts: 'sent',
      });
  
      await chat.save();
  
      return globalServices.returnResponse(
        res,
        200,
        false,
        'Message sent successfully',
        chat
      );
    } catch (error) {
      console.error(error);
      return globalServices.returnResponse(
        res,
        500,
        true,
        'Internal server error',
        {}
      );
    }
  };

  const getChatWithFriend = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const userId = req.user._id;
  
        // Check if the recipient is a friend of the sender
        const userFriendDoc = await model.friend.findOne({ userId });
  
        if (!userFriendDoc || !userFriendDoc.friends.includes(friendId)) {
            return globalServices.returnResponse(
                res,
                201,
                true,
                'This user is not your friend.',
                {}
            );
        }

        const chats = await model.chat.aggregate([
            {
                $match: {
                    $or: [
                        {
                            sender: new mongoose.Types.ObjectId(userId),
                            receiver: new mongoose.Types.ObjectId(friendId),
                        },
                        {
                            sender: new mongoose.Types.ObjectId(friendId),
                            receiver: new mongoose.Types.ObjectId(userId),
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users', // The collection name for users
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderDetail'
                }
            },
            {
                $lookup: {
                    from: 'users', // The collection name for users
                    localField: 'receiver',
                    foreignField: '_id',
                    as: 'receiverDetails'
                }
            },
            // Unwind the arrays to flatten the documents
            {
                $unwind: {
                    path: '$senderDetail',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$receiverDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    'senderDetail.password': 0,  
                    'receiverDetails.password': 0, 
                    'senderDetail.otp': 0,  
                    'receiverDetails.otp': 0 
                    
                }
            },
            {
                $sort: { createdAt: 1 } // Sort by ascending order
            }
        ]);
    
        return globalServices.returnResponse(
            res,
            200,
            false,
            'Chat history fetched successfully',
            chats
        );
    } catch (error) {
        console.error(error);
        return globalServices.returnResponse(
            res,
            500,
            true,
            'Internal server error',
            {}
        );
    }
};

  
  
  
  module.exports = { 
    sendMessage ,
    getChatWithFriend
};
  