const express = require('express')
const router = express.Router()
const user = require('../controller/user')
router.post('/send_otp', user.sendOtp)
router.post('/verify_otp', user.verifyOtp)
router.get('/get_user/:id', user.getUser)
module.exports = router