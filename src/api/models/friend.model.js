const mongoose = require("mongoose")



const friendSchema = mongoose.Schema({

    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        index: true
    },
    friendRequest : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user",
        }
    ],
    sendRequest : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user",
        }
    ],
    friends : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user",
        }
    ]

})


module.exports = mongoose.model('friend', friendSchema );