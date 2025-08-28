import React from "react";
import "../styles/Login.css";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo / App Name */}
        <h1 className="login-logo">Lovync</h1>

        {/* Title */}
        <h2 className="login-title">Login to Continue</h2>

        {/* Form */}
        <form className="login-form">
          <input type="text" placeholder="Email, Username or Phone" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        {/* Or separator */}
        <div className="login-divider">OR</div>

        {/* Google Sign-in */}
        <button className="google-btn">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="google-icon"
          />
          Sign in with Google
        </button>

        {/* Create Account Link */}
        <p className="login-toggle">
          New to Lovync?{" "}
          <span onClick={() => alert("Redirect to Signup page")}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
