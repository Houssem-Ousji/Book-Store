import React, { useState } from "react";
import { UilUser } from "@iconscout/react-unicons";
import { UilLock } from "@iconscout/react-unicons";
import { UilEye } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
// import LoginImage from './undraw_authentication_re_svpt.svg'
import "./Login.css";
import axios from "axios";
function Login() {
  const [data,setData] = useState({
    logInfo : "",
    password : ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [isConfimed, setIsConfirmed] = useState(true);
  const [response, setResponse] = useState("");
  const navigate = useNavigate()
  const tooglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const url = "http://localhost:5050/auth/login"
      const res = await axios.post(url,data)
      setIsConfirmed(true)
      setResponse(res.data.message)
      localStorage.setItem('token',res.data.token)
      setTimeout(()=>{
navigate('/main')
      },1000)
    } catch (error) {
      setIsConfirmed(false)
      setResponse(error.response.data.message)
    }
  }
  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <img
          src="./undraw_mobile_login_re_9ntv.svg"
          alt="login"
          className="login-image"
        />
        <h2>Login</h2>
        <p>Lorem ipsum dolor sit.</p>
        <form action="" className="login-form">
          <div className="logInfo">
            <div className="icon">
              <UilUser />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="logInfo"
                onChange={handleChange}
                value={data.logInfo}
                className="inputs"
                placeholder="Email or Uername"
              />
            </div>
          </div>
          <div className="password">
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
          <input type="submit" onClick={handleSubmit} value={"Login"} className="submit-button" />
          {response && (
            <div
              className={isConfimed ? "response success" : "response failed"}
            >
              <p>{response}</p>
            </div>
          )}
          <Link to={"/register"}>Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
