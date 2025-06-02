const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Users = require('../models/user');
const Admin = require('../models/admin');

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
                res.status(200).json({ code: 200, message: "We have sent 6 digit otp on your email!", data: result })
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
                        res.status(200).json({ code: 200, message: "We have sent 6 digit otp on your email!", data: response })
                    })
            }

        }
    });
}

const logOutUser = async (req, res) => {
    const { id } = req.params
    const user = await Users.find(({ _id: id }))
    if (user) {
        try {
            res.json({
                code: 200,
                msg: 'Logout User SuccessFully',
                data: { ...user, is_logged_in: false }
            })
        }
        catch (err) {
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    }
    else {
        const admin = await Admin.find(({ _id: id }))
        try {
            res.json({
                code: 200,
                msg: 'Logout User SuccessFully',
                data: { ...admin, is_logged_in: false }
            })
        }
        catch (err) {
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    }


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
                    res.status(200).json({ code: 200, message: "OTP has been Verified!", data: response })
                })
        }
        catch (err) {
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    }
    else {
        res.json({
            code: 400,
            msg: 'Incorrect OTP'
        })
    }
}


const getUserById = async (req, res) => {
    const { id } = req.params
    const existingUser = await Users.findOne({ _id: id })
    if (existingUser) {
        try {
            const data = {
                email: existingUser.email,
                phone: existingUser.phone,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                gender: existingUser.gender,
                is_logged_in: true,
                role: existingUser.role,
                password: existingUser.password,
                notifications: existingUser.notifications,
                _id: existingUser._id
            }

            res.json({
                code: 200,
                data
            })
        }
        catch (err) {
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    }
    else {
        try {
            const adminUser = await Admin.findOne({ _id: id })
            const data = {
                email: adminUser.email,
                phone: adminUser.phone,
                first_name: adminUser.first_name,
                last_name: adminUser.last_name,
                gender: adminUser.gender,
                is_logged_in: true,
                role: adminUser.role,
                password: adminUser.password,
                notifications: adminUser.notifications,
                _id: adminUser._id
            }

            res.json({
                code: 200,
                data
            })
        }
        catch (err) {
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    }

}

const getUser = async (req, res) => {
    const user = await Users.find()
    try {
        res.json({
            code: 200,
            data: user
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}

const addUser = async (req, res) => {
    const { first_name, last_name, profile_image, gender, phone, otp, cart, wishlist, orders, is_logged_in, is_verified, role, notifications } = req.body
    try {
        const product = new Users({ first_name, last_name, profile_image, gender, phone, otp, cart, wishlist, orders, is_logged_in, is_verified, role, notifications });

        // Save the new product to the database
        const result = await Users.save();
        res.json({
            code: 200,
            message: 'User added successfully',
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

const updateUser = async (req, res) => {
    const { data } = req.body
    const logged_id_user_id = req.body?.logged_id_user_id
    const users = await Users.findOneAndUpdate({ _id: data?._id }, { $set: data })
    const userDetails = await Users.findOne({ _id: data?._id })
    const updatedList = await Users.find()
    const adminUsers = updatedList?.filter((item) => item?._id !== data?._id)
    try {
        res.json({
            code: 200,
            data: logged_id_user_id === data?._id ? userDetails : adminUsers
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params
    const users = await Users.findOneAndDelete({ _id: id })
    const updatedList = await Users.find()
    try {
        res.json({
            code: 200,
            data: updatedList
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}

const adminAuth = async (req, res) => {
    const { email, password } = req.body.data
    const existingUser = await Admin.findOne({ email: email })
    if (existingUser?.password === password) {
        try {
            const user = {
                email: existingUser.email,
                phone: existingUser.phone,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                gender: existingUser.gender,
                is_logged_in: true,
                password: existingUser.password,
                role: existingUser.role,
                notifications: existingUser.notifications,
                _id: existingUser._id
            }
            Admin.findByIdAndUpdate(existingUser._id, { $set: user, })
                .then(response => {
                    res.status(200).json({ code: 200, message: "Login SuccessFully!", data: user })
                })

        }
        catch (err) {
            console.log(err, 'err')

        }
    }
    else {
        const user = new Admin({
            email,
            phone: "",
            first_name: "",
            last_name: "",
            gender: "",
            password,
            chats: [],
            is_verified: false,
            is_logged_in: false,
            notifications: [],
            role: ""
        });
        const result = await Admin.save();
        res.status(200).json({ code: 200, message: "Signup SuccessFully!", data: result })
    }
}


module.exports = { sendOtp, verifyOtp, getUserById, getUser, adminAuth, deleteUserById, updateUser, addUser, logOutUser }

