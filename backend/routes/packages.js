const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../utils/verifyToken');
const { addPackage, fetchPackage, updatePackage, deletePackage } = require("../controller/packageController");

router.post("/add/packages", verifyAdmin, addPackage);

router.post("/search/packages", fetchPackage);

router.put("/update/packages/:id", verifyAdmin, updatePackage);

router.delete("/delete/packages/:id", verifyAdmin, deletePackage);

module.exports = router;
