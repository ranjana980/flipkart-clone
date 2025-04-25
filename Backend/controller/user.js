const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Users = require('../models/user');
require('dotenv').config();

const sendOtp = async (req, res) => {
    const { email } = req.body
    const randomBytes = crypto.randomBytes(3);
    const randomNumber = randomBytes.readUIntBE(0, 3);
    const otp = randomNumber % 1000000;
    const getOtp = otp.toString().padStart(6, '0');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ranjana20@navgurukul.org",
            pass: process.env.APP_PASS
        }
    });

    const mailOptions = {
        from: 'ranjana20@navgurukul.org',
        to: email,
        subject: 'Your OTP for verification',
        text: `Your OTP is: ${getOtp}`
    };


    transporter.sendMail(mailOptions, async (error) => {
        if (error) {
            res.status(400).json({ code: 400, message: error })
        } else {
            const existingUser = await Users.findOne({ email: email })
            if (!existingUser) {
                const user = new Users({
                    otp: getOtp,
                    email,
                    phone: "",
                    wisthlist: [],
                    orders: [],
                    first_name: "",
                    last_name: "",
                    gender: "",
                    cart: [],
                    is_verified: false,
                    is_logged_in: false,
                    notifications: []
                });
                const result = await user.save();
                res.status(200).json({ code: 200, message: "We have sent 6 digit otp on your email!" })
            }
            else {
                const user = {
                    otp: getOtp,
                    email,
                    phone: existingUser.phone,
                    wishlist: existingUser.wishlist,
                    orders: existingUser.orders,
                    first_name: existingUser.first_name,
                    last_name: existingUser.last_name,
                    gender: existingUser.gender,
                    cart: existingUser.cart,
                    is_verified: false,
                    is_logged_in: false,
                    notifications: []
                }
                Users.findByIdAndUpdate(existingUser._id, { $set: user })
                    .then(response => {
                        res.status(200).json({ code: 200, message: "We have sent 6 digit otp on your email!" })
                    })
            }

        }
    });
}

const verifyOtp = async (req, res) => {
    const { otp } = req.body
    const { id } = req.query
    const existingUser = await Users.findOne({ _id: id })
    if (existingUser.otp === otp) {
        try {
            const user = {
                otp: otp,
                email: existingUser.email,
                phone: existingUser.phone,
                wishlist: existingUser.wishlist,
                orders: existingUser.orders,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                gender: existingUser.gender,
                cart: existingUser.cart,
                is_verified: true,
                is_logged_in: false,
                notifications: existingUser.notifications
            }
            Users.findByIdAndUpdate(id, { $set: user, })
                .then(response => {
                    res.status(200).json({ code: 200, message: "OTP has been Verified!" })
                })
        }
        catch (err) {
            console.log(err, 'err')
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    }
    else {
        res.json({
            code: 400,
            msg: 'Incorrect Otp'
        })
    }

}

const get_user = async (req, res) => {

    const user = await Users.findOne({ _id: req.params.id })
    if (user) {
        res.json({ code: 200, message: user })
    }

}

const sign_in_user = async (req, res) => {
    const user = await Users.findOne({ email: req.email })
    try {
        const updateUserData = {
            otp: user.otp,
            email: user.email,
            phone: user.phone,
            wishlist: user.wishlist,
            orders: user.orders,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            cart: user.cart,
            is_verified: user.is_verified,
            is_logged_in: true,
            notifications: user.notifications
        }
        Users.findByIdAndUpdate(id, { $set: updateUserData, })
        res.json({ code: 200, message: "Login Successfully" })
    }
    catch (error) {
        res.json({ code: 400, message: "Login Failed" })
    }
}


module.exports = { sendOtp, verifyOtp, get_user, sign_in_user }

