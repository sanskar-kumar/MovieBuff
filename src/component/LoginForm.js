import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Nav from "./Nav";
import Footer from "./Footer";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userId=localStorage.getItem("userId");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem("userId", user.uid);
          console.log(user.uid);
          navigate("/");
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // alert("The firebase error is:-",errorMessage);
        });
    } catch (error) {}
    // Reset form fields
    setEmail("");
    setPassword("");
  };
  useEffect(()=>{
    if(userId){
      navigate('/');
    }
  })

  return (
    <>
      <Nav />
      <div className="login-page-container">
      <div className="login-image-container">
          {/* <img src={bannerImage} alt="Banner" className="banner-image" /> */}
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-form-title">Login</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button className="login-form-button" type="submit">
              Login
            </button>
            <p className="login-form-footer">
              Don't have an account?{" "}
              <Link to="/register" className="login-form-footer-link">
                Register
              </Link>
            </p>
          </form>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default LoginForm;
