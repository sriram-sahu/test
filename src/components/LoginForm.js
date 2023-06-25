import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://stage.api.sloovi.com/login?product=outreach",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const results = data.results;
        console.log(results);
        const token = results.token;
        const userId = results.user_id;
        const companyId = results.company_id;

        Cookies.set("token", token, { expires: 7 });
        Cookies.set("userId", userId, { expires: 7 });
        Cookies.set("companyId", companyId, { expires: 7 });
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="heading">Login</h1>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          
          value={email}
          className="input-field-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="input-field-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
