import React, { useState } from "react";
import { UilUser } from "@iconscout/react-unicons";
import { UilLock } from "@iconscout/react-unicons";
import { UilEye } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [isConfimed, setIsConfirmed] = useState(true);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const tooglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5050/auth/register";
    try {
      const res = await axios.post(url, data);
      setIsConfirmed(true);
      setResponse(res.data.message);
      setData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setIsConfirmed(false);
      setResponse(
        error.response.data.message.slice(
          error.response.data.message.lastIndexOf(":") + 2
        )
      );
    }
  };
  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <img
          src="./undraw_add_friends_re_3xte.svg"
          alt="login"
          className="login-image"
        />
        <h2>Register</h2>
        <p>Lorem ipsum dolor sit.</p>
        <form action="" className="register-form">
          <div className="name">
            <div className="firstName">
              <div className="icon">
                <UilUser />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  className="inputs"
                  placeholder="first Name"
                />
              </div>
            </div>
            <div className="lastName">
              <div className="icon">
                <UilUser />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  className="inputs"
                  placeholder="last Name"
                />
              </div>
            </div>
          </div>
          <div className="logInfoRegister">
            <div className="userName">
              <div className="icon">
                <UilUser />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={data.userName}
                  className="inputs"
                  placeholder="user Name"
                />
              </div>
            </div>
            <div className="email">
              <div className="icon">
                <UilUser />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  className="inputs"
                  placeholder="email"
                />
              </div>
            </div>
          </div>

          <div className="passwordr">
            <div className="icon">
              <UilLock />
            </div>
            <div className="input-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="inputs"
                onChange={handleChange}
                value={data.password}
                placeholder="Password"
              />
            </div>
            <div className="icon">
              <button
                className={showPassword ? "max_opacity" : "min_opacity"}
                onClick={tooglePassword}
              >
                <UilEye />
              </button>
            </div>
          </div>

          <input
            type={"submit"}
            onClick={handleSubmit}
            value={"Register"}
            className="submit-button register-button"
          />
          {response && (
            <div
              className={isConfimed ? "response success" : "response failed"}
            >
              <p>{response}</p>
            </div>
          )}
          <Link to={"/login"}>Login To your account</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
