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
                    notifications: [],
                    role: ""
                });
                const result = await user.save();
                res.status(200).json({ code: 200, message: "We have sent 6 digit otp on your email!", data: user })
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
                    notifications: [],
                    _id: existingUser._id,
                    role: existingUser.role,
                }
                Users.findByIdAndUpdate(existingUser._id, { $set: user })
                    .then(response => {
                        res.status(200).json({ code: 200, message: "We have sent 6 digit otp on your email!", data: user })
                    })
            }

        }
    });
}

const verifyOtp = async (req, res) => {
    const { otp, id } = req.body
    const existingUser = await Users.findOne({ _id: id })
    if (existingUser.otp === parseInt(otp)) {
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
                is_logged_in: true,
                notifications: existingUser.notifications,
                _id: existingUser._id
            }
            Users.findByIdAndUpdate(id, { $set: user, })
                .then(response => {
                    res.status(200).json({ code: 200, message: "OTP has been Verified!", data: user })
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


const getUser = async (req, res) => {
    const { id } = req.params
    const existingUser = await Users.findOne({ _id: id })
    try {
        res.json({
            code: 200,
            data: existingUser
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}




module.exports = { sendOtp, verifyOtp, getUser }

