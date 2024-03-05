const express = require('express')
const router = express.Router()
const {getGoals, updatedGoal, setGoals, deleteGoals} = require('../controller/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoals).put(updatedGoal)


module.exports = router