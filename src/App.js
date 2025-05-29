import "./App.css";
import { motion } from "framer-motion";
import Login from "./components/login";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="headingbox">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="main-heading"
          >
            Vibe-Check
          </motion.h1>
        </div>
        <div className="routebox">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
