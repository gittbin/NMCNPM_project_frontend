import React, { useState } from "react";
import "./intro.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FacebookProvider, LoginButton } from 'react-facebook';
import facebook from '../introduce/facebook.png';
import {jwtDecode} from 'jwt-decode';
import  { useNavigate }  from 'react-router-dom';
function LoginModal({ off, isSignup }) {
  var data
  // Sử dụng state để điều khiển hiển thị modal và form
  const [error,setError]=useState('')
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isSignup && { username: "", confirmPassword: "" }), // Thêm confirmPassword nếu là đăng ký
  });


  // const isFormValid = formData.email && formData.password;
  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit_log=(e)=>{
    e.preventDefault()
    if(isSignup) {
      if(formData.password!=formData.confirmPassword){setError("mật khẩu khác với xác nhận mật khẩu")}else{
              const body={
      email:formData.email,
      password:formData.password,
      name:formData.username,
  }
  console.log(body)
  fetch("http://localhost:5000/login/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(response => {
      return response.json();
  })
  .then(data => {
    console.log(data.user);
    if(data.message=="User created successfully")  navigate('/home');else{
      setError(data.message)
    }
  })
  .catch(error => {
      console.error('Lỗi:', error);
  });
      }
}else{
      const body={
        email:formData.email,
        password:formData.password
    }
    console.log(body)
    fetch("http://localhost:5000/login/login_raw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
      console.log(data.user);
      if(data.message=="Login successful")  navigate('/home');else{
        setError("email hoặc mật khẩu của bạn không hợp lệ")
      }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
    }
    
  }
  //google
const responseMessage = (response) => {
    const credential = response.credential;
    const decoded = jwtDecode(credential);
    const body={
      family_name:decoded.family_name,
      given_name:decoded.given_name,
      GoogleID:decoded.sub
      }
      console.log(JSON.stringify(body))
      fetch("http://localhost:5000/login/login_google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        })
        .then(response => response.json()
      )
      .then((a)=>{
        console.log(a);
          if(a.message=="Login successful")  {navigate('/home');return a;}else{
            setError("email hoặc mật khẩu của bạn không hợp lệ");return;
          }
      })
        .catch(error => {
            console.log("lỗi : ",error)
        });
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  //facebook
  const handleResponse = (data) => {
    console.log(data); 
  };

  const handleError = (error) => {
    console.error(error); 
  };
  return (
      <GoogleOAuthProvider clientId="1039484967279-b0uv9c8m0t6v453c7im8f0jiopq82v3j.apps.googleusercontent.com">
        <div className="login">
          <div className="login-modal">
            <div className="login-header">
              <h2>{isSignup ? "Sign up" : "Login"}</h2>
              <span className="close-btn" onClick={()=>{off(0)}}>
                &times;
              </span>
            </div>
            <p>
              By continuing, you agree to our <a href="#">User Agreement</a> and
              acknowledge that you understand the <a href="#">Privacy Policy</a>
              .
            </p>

            <button className="login-option">Continue with phone number</button>

            <div className="forgoogle">
              <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                theme="filled_blue"
                size="large"
                shape="circle"
                color="blue"
                className="custom-google-login"
              />
            </div>
            <FacebookProvider appId="1509733739672960"> 
      <LoginButton
        scope="email" 
        onCompleted={handleResponse}
        onError={handleError}
        className="facebook-login-button"
      >
        <span className="facebook-icon" >
          <img src={facebook} style={{height:"40px"}}></img>
</span> 
        <span>Đăng nhập bằng Facebook</span>
      </LoginButton>
    </FacebookProvider>

            <div className="divider">
              <span>OR</span>
            </div>

            <form className="login-form" onSubmit={submit_log}>
              <div className="form-group">
                <input
                 name="email"
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange} // Cập nhật giá trị email
                  required
                />
              </div>
              <div className="form-group">
                <input
                name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange} // Cập nhật giá trị password
                  required
                />
              </div>
              {isSignup && (
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {isSignup && (
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="user_name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {!isSignup && (
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              )}
              <button id="login-btn" type="submit">
                {isSignup ? "Sign up" : "login"}
              </button>
              <p style={{color:"red"}}>{error}</p>
            </form>

            {!isSignup && (
              <p className="signup-text">
                New to Reddit? <a style={{cursor:"pointer"}} onClick={()=>{off(2)}}>Sign Up</a>
              </p>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    )
}
export default LoginModal;
