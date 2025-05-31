import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthBanner } from "./auth-banner";
import './styles.scss'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuthAction, sendOtpAction, verifyOtpAction } from "../entities/auth-reducer";
import swal from "sweetalert";

export const Auth = () => {
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
  const [role, setRole] = useState('')

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
      setEmailError('Please Enter OtP')
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
      console.log('ranjanana', data._id, 'userssss')
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


  return (
    <div className="auth">
      <div className="auth-container">
        <AuthBanner />
        {role !== 'admin' ? <div className="auth-form">
          {verify_otp && <span>Please enter the OTP sent to {email}.</span>}
          {!verify_otp ? <input
            placeholder="Enter Email/Mobile Number"
            value={email}
            className="form-control"
            onChange={(e) => handleChange(e, 'email')}
          /> : <div className="auth-form-otp">
            {otp.map((item, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={item}
                onChange={e => handleChangeOtp(index, e)}
                onPaste={handlePaste}
                className="form-control auth-form-otp-input"
              />
            ))}
          </div>}
          {emailError && <span className="error-msg">{emailError}</span>}
          {!verify_otp && <p>By continuing, you agree to Flipkart's <a>Terms of Use</a> and <a>Privacy Policy</a>.</p>}
          <button
            onClick={() => handleSubmit(email, 'login')}
            className={`${verify_otp ? 'auth-button-otp' : 'auth-button'}`}
          >
            {login ? 'Request OTP' : signup ? 'Continue' : 'Verify Otp'}
          </button>
          {verify_otp ? <span >Not received your code? <b><a onClick={() => handleSubmit(user?.user?.email, 'resend')}>Resend code</a></b></span> : <div className="auth-bottom-section">
            {login ? <h6> New to Flipecart?<Link to='/account?signup=true'> Create an account</Link></h6> : <h6>Existing User?<Link to='/account?login=true'> Login</Link></h6>}

          </div>}
          <button onClick={() => setRole('admin')}>Login As Admin</button>
        </div> :
          <div className="auth-form relative">
            <input
              placeholder="Enter Email"
              value={email}
              className="form-control"
              type='email'
              onChange={(e) => handleChange(e, 'email')}
            />
            <input
              placeholder="Enter Password"
              value={password}
              className="form-control"
              type="password"
              onChange={(e) => handleChange(e, 'password')}
            />
            {signup && <input
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              type="password"
              className="form-control"
              onChange={(e) => handleChange(e, 'confirmPassword')}
            />}
            <button className="auth-button" onClick={handleAdminAuthSubmit}>{signup ? 'Sign Up' : 'Login'}</button>
            {confirmPasswordError && <span className="error-msg">{confirmPasswordError}</span>}
            {!signup ? <span className="absolute bottom-2 right-5">don't have account <Link className="!text-[blue]" to='/account?signup=true'>Create an account</Link></span> : <span className="absolute bottom-2 right-5">Already have account? <Link className="!text-[blue]" to='/account?login=true'>Login an account</Link></span>}
          </div>}
      </div>
    </div>
  );
};
