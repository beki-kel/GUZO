const express = require("express")
const router = express.Router()
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');
const { addPackage, fetchPackage } = require("../controller/packageController");

router.post("/packages",verifyAdmin, addPackage)
router.get("/packages",fetchPackage)

module.exports = router
