const express = require("express")
const router = express.Router()
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');
const { addThingsToDo, fetchThingsToDo } = require("../controller/thingsToDoController");

router.post("/things-to-do",verifyAdmin, addThingsToDo)
router.get("/things-to-do",fetchThingsToDo)

module.exports = router
