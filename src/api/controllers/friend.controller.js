const models = require("../models/index.models")
const globalServices = require('../../services/globalService.js');


const sendRequest = async (req,res,next) => {

    try {

        const payload = req.body
        const user = req.user

        let senderFriendDoc = await models.friend.findOne({ userId: user._id });

        
        if (!senderFriendDoc) {
            senderFriendDoc =  models.friend({ userId: user._id });
        }

        let recepitant = await models.authAdmin.findOne({ _id: user._id });
 
        if(!recepitant){
            return globalServices.returnResponse(
                res,
                201,
                true,
                'recepitant not found',
                {}
            );
        }
        

        let recipientFriendDoc = await models.friend.findOne({ userId: payload.recipienTId });
        if (!recipientFriendDoc) {
            recipientFriendDoc = new models.friend({ userId: payload.recipienTId });
        }

        // Check if request already sent
        if (senderFriendDoc.sendRequest.includes(payload.recipienTId)) {
            return globalServices.returnResponse(
                res,
                201,
                true,
                'Friend request already sent.',
                {}
            );
        }

        
        senderFriendDoc.sendRequest.push(payload.recipienTId);

        recipientFriendDoc.friendRequest.push(user._id);

        // Save both documents
        await senderFriendDoc.save();
        await recipientFriendDoc.save();

        return globalServices.returnResponse(
            res,
            200,
            false,
            'Friend Request send successfully',
            {}
        );
        
    } catch (error) {
        return globalServices.returnResponse(
            res,
            500,
            true,
            'Internal server error',
            {}
        );
    }

}

const getFriendRequests = async (req, res, next) => {
    try {
        // Retrieve logged-in user details from req.user
        const user = req.user;

        const userFriendDoc = await models.friend.findOne({ userId: user._id }).populate({
            path: 'friendRequest',
            select: '-password'
        });

        if (!userFriendDoc || userFriendDoc.friendRequest.length === 0) {
            return globalServices.returnResponse(
                res,
                200,
                false,
                'No friend requests found.',
                []
            );
        }

        // Return friend requests
        return globalServices.returnResponse(
            res,
            200,
            false,
            'Friend requests fetched successfully',
            userFriendDoc.friendRequest
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

const getSendRequest = async (req, res, next) => {
    try {
        // Retrieve logged-in user details from req.user
        const user = req.user;

        const userFriendDoc = await models.friend.findOne({ userId: user._id }).populate({
            path: 'sendRequest',
            select: '-password'
        });

        console.log(userFriendDoc)

        if (!userFriendDoc || userFriendDoc.sendRequest.length === 0) {
            return globalServices.returnResponse(
                res,
                200,
                false,
                'No requests found.',
                []
            );
        }

        // Return friend requests
        return globalServices.returnResponse(
            res,
            200,
            false,
            'Friend requests fetched successfully',
            userFriendDoc.sendRequest
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

const acceptRequest = async (req, res, next) => {
    try {
      const user = req.user; 
      const { senderId } = req.body; // sender of the friend request
  
      // Fetch recipient's friend document
      let recipientFriendDoc = await models.friend.findOne({ userId: user._id });
  
      if (!recipientFriendDoc) {
        return globalServices.returnResponse(
          res,
          201,
          true,
          'Recipient friend document not found.',
          {}
        );
      }
  
      // Fetch sender's friend document
      let senderFriendDoc = await models.friend.findOne({ userId: senderId });
  
      if (!senderFriendDoc) {
        return globalServices.returnResponse(
          res,
          201,
          true,
          'Sender friend document not found.',
          {}
        );
      }
  
      // Check if the friend request exists
      if (!recipientFriendDoc.friendRequest.includes(senderId)) {
        return globalServices.returnResponse(
          res,
          201,
          true,
          'No friend request found from this user.',
          {}
        );
      }
  

      recipientFriendDoc.friends.push(senderId);
      senderFriendDoc.friends.push(user._id);
  

      recipientFriendDoc.friendRequest = recipientFriendDoc.friendRequest.filter(
        (id) => id.toString() !== senderId.toString()
      );
      senderFriendDoc.sendRequest = senderFriendDoc.sendRequest.filter(
        (id) => id.toString() !== user._id.toString()
      );
  
      // Save updated documents
      await recipientFriendDoc.save();
      await senderFriendDoc.save();
  
      return globalServices.returnResponse(
        res,
        200,
        false,
        'Friend request accepted successfully.',
        {}
      );
    } catch (error) {
      return globalServices.returnResponse(
        res,
        500,
        true,
        'Internal server error',
        {}
      );
    }
};


const getAllFriends = async (req, res, next) => {
    try {
      const user = req.user;
  
      const userFriendDoc = await models.friend.findOne({ userId: user._id }).populate({
        path: 'friends',
        select: '-password' // Exclude the password field
      });
  
      // Check if user has no friends
      if (!userFriendDoc || userFriendDoc.friends.length === 0) {
        return globalServices.returnResponse(
          res,
          200,
          false,
          'No friends found.',
          []
        );
      }
  
      // Return the list of friends
      return globalServices.returnResponse(
        res,
        200,
        false,
        'Friends fetched successfully.',
        userFriendDoc.friends
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
    sendRequest,
    getFriendRequests,
    getSendRequest,
    acceptRequest,
    getAllFriends
    
}