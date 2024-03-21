const express = require("express")
const router = express.Router()
const promotionCtr = require("../controller/promotionsController")
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');

router.post("/promotions",verifyAdmin, promotionCtr)

module.exports = router
