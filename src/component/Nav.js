import React, { useState, useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://assets.moviebuff.com/assets/logobeta2-5fd5fe517e3fbe0755edbf87d639c73813d67b2f0b549f20bac1ada74bc6da54.png"
        alt="MovieBuff_logo"
        onClick={() => navigate("/")}
      />
      {userId ? (
        <button className="nav_logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="nav_login" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
      {/* <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="avatar"
      /> */}
    </div>
  );
}

export default Nav;
