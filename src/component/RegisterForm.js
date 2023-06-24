import React, { useState } from "react";
import "./LoginForm.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
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
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          alert("Registration Successfull");
          navigate('/login');

          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert("The firebase error is:-", errorMessage);
        });
    } catch (error) {}
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Nav />
      <div className="login-page-container">
      <div className="login-image-container">
          {/* <img src={bannerImage} alt="Banner" className="banner-image" /> */}
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-form-title">Register</h2>
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
              Register
            </button>
            <p className="login-form-footer">
              Already have an account?{" "}
              <Link to="/login" className="login-form-footer-link">
                Login
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
