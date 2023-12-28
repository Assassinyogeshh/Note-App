import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const userLoggedInData = localStorage.getItem("userProfile");
  const checkLoggedInUser =
    userLoggedInData && JSON.parse(userLoggedInData).data;

  const HandleLogOut = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userToken");
    navigate("/");
    alert("You Have been Logged out");
  };

  useEffect(() => {
    const userLoginToken = localStorage.getItem("userToken");

    if (!userLoginToken) {
      return;
    }
    const decodedToken = jwtDecode(userLoginToken);

    const currentTime = new Date().getTime();

    if (decodedToken.exp * 1000 < currentTime) {
      HandleLogOut();
    }
  }, []);

  return (
    <>
      <div className="notes_navbar">
        <Link className="remove_link_style" to={`/`}>
          <p style={{ fontSize: "20px", color: "white" }}>Home</p>
        </Link>
        <div className="search_notes">
          <input
            type="text"
            placeholder="search your notes"
            id="search_user_notes"
          />
          <button className="search_btn">Search</button>
        </div>

        <div className="auth">
          {checkLoggedInUser ? (
            <Link className="remove_link_style" to={`/Auth/login`}>
              <button className="logout_btn" onClick={HandleLogOut}>
                Logout
              </button>
            </Link>
          ) : (
            <Link className="remove_link_style" to={`/Auth/login`}>
              <button className="login_btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
