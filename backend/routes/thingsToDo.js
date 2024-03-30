const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../utils/verifyToken');
const { addThingsToDo, fetchThingsToDo, updateThingsToDo, deleteThingsToDo } = require("../controller/thingsToDoController");

router.post("/add/things-to-do", verifyAdmin, addThingsToDo);

router.get("/search/things-to-do", fetchThingsToDo);

router.put("/update/things-to-do/:id", verifyAdmin, updateThingsToDo);

router.delete("/delete/things-to-do/:id", verifyAdmin, deleteThingsToDo);

module.exports = router;
