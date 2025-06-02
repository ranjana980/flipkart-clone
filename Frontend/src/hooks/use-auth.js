import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuthAction, sendOtpAction, verifyOtpAction } from "../entities/auth-reducer";
import swal from "sweetalert";
import { useNavigate, useLocation } from 'react-router-dom';

export default function useAuth() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const login = searchParams.get('login');
    const signup = searchParams.get('signup')
    const verify_otp = searchParams.get('verify_otp')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [otp, setOTP] = useState(Array(6).fill(''));
    const [emailError, setEmailError] = useState('')
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleChangeOtp = (index, event) => {
        const newOTP = [...otp];
        newOTP[index] = event.target.value;
        setOTP(newOTP);
        if (event.target.nextSibling) {
            event.target.nextSibling.focus();
        }
        if (event.target.previousSibling) {
            event.target.previousSibling.focus();
        }
    };

    const handleChange = (event, type) => {
        if (type === 'email') {
            setEmail(event.target.value)
            const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
            if ((emailRegex).test(email)) {
                setEmailError("")
            }
            else {
                setEmailError('Invalid Password!')
            }
        }
        else if (type === 'password') {
            setPassword(event.target.value)
            setPasswordError("")
        }
        else {
            setConfirmPassword(event?.target.value)
            if (password !== confirmPassword) {
                setConfirmPasswordError('confirm password is the different to password!')
            }
            else {
                setConfirmPasswordError('')
            }

        }
    };

    const handlePaste = event => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text/plain').trim();
        if (pastedData.length !== 6 || !/^\d+$/.test(pastedData)) {
            return;
        }
        const newOTP = pastedData.split('').slice(0, 6);
        setOTP(newOTP);
    };

    const handleSubmit = (email, type) => {
        if (!otp.join("")) {
            setEmailError('Please Enter OTP')
            if (type !== 'resend') {
                if (email) {
                    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
                    if ((emailRegex).test(email)) {
                        const onSuccess = () => {
                            navigate('/account?verify_otp=true')
                        }
                        dispatch(sendOtpAction({ email }, onSuccess))
                    }
                    else setEmailError('Invalid email')
                }
                else {
                    setEmailError("Email is Required!")
                }
            }
            else {
                swal({
                    title: "Success",
                    text: "Resend OTP SuccessFully!",
                    icon: "success",
                    button: "Okay",
                });
            }
        }
        else {
            const onSuccess = () => {
                localStorage.setItem("userId", JSON.stringify(user?.user?._id))
                swal({
                    title: "Success",
                    text: "Verify OTP SuccessFully!",
                    icon: "success",
                    button: "Okay",
                });
                navigate('/')
            }
            dispatch(verifyOtpAction(otp, user?.user?._id, onSuccess))
        }
    }

    const handleAdminAuthSubmit = () => {
        const onSuccess = (data) => {
            localStorage.setItem("userId", JSON.stringify(data._id))
            swal({
                title: "Success",
                text: 'Login Successfully',
                icon: "success",
                button: "Okay",
            });
            if (signup) {
                searchParams.set('login', true)
            }
            else {
                navigate('/admin/dashboard')
            }
        }

        if (signup) {
            if (!emailError || !passwordError || !confirmPasswordError) {
                dispatch(adminAuthAction({ email, password }, onSuccess))
            }
        } else {
            if (!emailError || !passwordError) {
                dispatch(adminAuthAction({ email, password }, onSuccess))
            }
        }

    }
    return { password, confirmPassword, confirmPasswordError, email, otp, emailError, signup, login, user, login, verify_otp, handleChangeOtp, handleChange, handlePaste, handleSubmit, handleAdminAuthSubmit }
}
