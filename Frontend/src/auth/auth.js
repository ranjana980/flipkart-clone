import { Link } from "react-router-dom";
import { AuthBanner } from "./auth-banner";
import './styles.scss'
import useAuth from "../hooks/use-auth";
import { useState } from "react";

export const Auth = () => {
  const [role, setRole] = useState('')
  const { password, confirmPassword, confirmPasswordError, email, otp, emailError, signup, login, user, verify_otp, handleChangeOtp, handleChange, handlePaste, handleSubmit, handleAdminAuthSubmit } = useAuth()

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
