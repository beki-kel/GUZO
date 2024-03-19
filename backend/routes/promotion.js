const express = require("express")
const router = express.Router()
const promotionCtr = require("../controller/promotionsController")

router.post("/promotions", promotionCtr)

module.exports = router
