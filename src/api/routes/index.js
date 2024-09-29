const express = require('express');
const authRoutes = require('./auth.routes.js');
const friendRoutes = require('./friend.routes.js');
const chatRoutes = require('./chat.routes.js');


const router = express.Router();




router.use('/auth', authRoutes);

router.use('/friend', friendRoutes);

router.use('/chat', chatRoutes);





module.exports = router;