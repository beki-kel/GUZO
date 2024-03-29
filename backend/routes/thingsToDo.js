const express = require("express")
const router = express.Router()
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');
const { addThingsToDo, fetchThingsToDo } = require("../controller/thingsToDoController");

router.post("/add/things-to-do",verifyAdmin, addThingsToDo)
router.get("/search/things-to-do",fetchThingsToDo)

module.exports = router
