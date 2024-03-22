const express = require("express")
const router = express.Router()
const {promotionCtr,promotionfetchCtr} = require("../controller/promotionsController")
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');

router.post("/promotions",verifyAdmin, promotionCtr)
router.get("/promotions",promotionfetchCtr)

module.exports = router
