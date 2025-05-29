import React from "react";
import { motion } from "framer-motion";
import "./sidebarProfile.css";
import { useState } from "react";
import Quiz from "./Quiz";
import { useNavigate } from "react-router-dom";
const SidebarProfile = ({ username, age, gender }) => {
  const navigate = useNavigate();  
    let avatar = "";

  if(age<=18){
    if(gender=="Male"){
        avatar="/boy.jpg";
    }
    else avatar="/girl.jpg"
  }
  else if (age<=50){
    if (gender == "Male") {
      avatar = "/man.jpg";
    } else avatar = "/lady.jpg";
  }
  else{
    if (gender == "Male") {
      avatar = "/oldman.jpg";
    } else avatar = "/oldwoman.jpg";
  }
  localStorage.setItem(
    "userData",
    JSON.stringify({
      username,
      age,
      gender,
      avatar, // Add this line
    })
  );
  const handlequizsubmit=(e)=>{
    e.preventDefault();
    
    navigate("/quiz");
    console.log("Quiz started");
    // Here you can add logic to redirect to the quiz page or start the quiz
  }
  return (
    <motion.div
      className="sidebar"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <h3>Your Profile</h3>
      <img src={avatar} alt="Avatar" className="avatar-img" />
      <p>
        <strong>Name:</strong> {username}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
      <button type="submit" onClick={handlequizsubmit} className="quizbutton">
        Start the Quiz
      </button>
      
    </motion.div>
  );
};

export default SidebarProfile;
