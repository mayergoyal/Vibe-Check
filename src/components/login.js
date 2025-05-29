import React, { useState } from "react";
import "./login.css";
import InterestModal from "./InterestModal";
import SidebarProfile from "./SidebarProfile";

const Login = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setgender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSidebar(true);
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Enter username</label>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Enter age</label>
        <input
          type="number"
          placeholder="Age"
          className="login-input"
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <label>Enter Gender</label>
        <select
          className="login-input"
          onChange={(e) => setgender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          
        </select>
           
        <button type="submit" className="login-button">
          Enter
        </button>
      </form>

      {showSidebar && <SidebarProfile username={username} age={age} gender={gender} />}
    </div>
  );
};

export default Login;
