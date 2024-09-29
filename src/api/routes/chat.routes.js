const express = require("express")
const controller = require("../controllers/chat.controller.js")
const router = express.Router()
const {userValidation} = require("../../middleware/auth")



router.route("/sendMessage").post(  userValidation ,controller.sendMessage);

router.route("/getChat/:friendId").get(  userValidation ,controller.getChatWithFriend);




module.exports = router