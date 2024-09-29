const express = require("express")
const controller = require("../controllers/friend.controller")
const router = express.Router()
const {userValidation} = require("../../middleware/auth")





router.route("/sendRequest").post(  userValidation ,controller.sendRequest);

router.route("/getFriendRequests").get(  userValidation ,controller.getFriendRequests);

router.route("/getSendRequest").get(  userValidation ,controller.getSendRequest);

router.route("/accpetRequest").post(  userValidation ,controller.acceptRequest);

router.route("/allFriends").get(  userValidation ,controller.getAllFriends);










module.exports = router