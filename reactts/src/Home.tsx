import React, { useState } from "react";
import './Home.css';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      console.log("Please enter both username and password.");
    }
  };

  return (
    <div className="home">
      <h1>Home Page</h1>
      {isLoggedIn ? (
        <p>Login successfully</p>
      ) : (
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              Username:
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </label>
          </div>
          <button onClick={handleLogin} className="login-button">Login</button>
        </div>
      )}
    </div>
  );
};

export default Home;
