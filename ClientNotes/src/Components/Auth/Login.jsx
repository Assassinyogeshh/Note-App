import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "./UserSchema";
import { useFormik } from "formik";
import axios from "axios";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const { values, handleSubmit, touched, handleChange, errors } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values, Action) => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.post(`${apiUrl}/Auth/login`, values);

        const userToken = response.data.token;

        if (!response) {
          throw new Error("failed to send the data to the server");
        }

        if (response.status === 200) {
          alert("successfully logged In");
        }
        Action.resetForm();
        localStorage.setItem("userToken", JSON.stringify(userToken));

        const userData = response.data;

        localStorage.setItem("userProfile", JSON.stringify(userData));

        const userId = userData.data._id;

        navigate(`/Notes/getUserNotes/${userId}`);

        return response;
      } catch (error) {
        console.log(`Login Failed ${error}`);

        if (error.response.status === 500) {
          alert("Internal Error Occurred");
        }
        if (error.response.status === 404) {
          alert("Invalid Credentials");
        }
      }
    },
  });

  return (
    <>
      <div className="auth_user">
        <div className="loginBox">
          <form className="Login_Page" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.email && touched.email ? (
              <p className="form_errors">{errors.email}</p>
            ) : null}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.password && touched.password ? (
              <p className="form_errors">{errors.password}</p>
            ) : null}

            <span className="checkBox">
              <span>
                <input type="checkbox" id="check_Box" />
                <label htmlFor="check_Box">Remember me</label>
              </span>
              <p>Forget Password</p>
            </span>

            <button type="submit" className="submitBtn">
              Login
            </button>

            <span className="signUp_page">
              Don't have an account?
              <Link
                style={{ color: "#007ac6", textDecoration: "none" }}
                to={"/Auth/register"}
              >
                <p> Register</p>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
