const express = require('express');
const {getUser,getUsers,updateUser,deleteUser}=require('../controller/userController')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')
const router = express.Router();

router.get('/all/user',verifyAdmin, getUsers);
router.get('/user/:id', verifyUser, getUser);
router.put('update/user/:id', verifyUser, updateUser);
router.delete('delete/user/:id',verifyUser, deleteUser);

module.exports = router;