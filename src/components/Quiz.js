import React, { useState } from "react";
import "./Quiz.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const songs = {
  Happy: "/happy.mp3",
  "extremely happy": "/exhappy.mp3",
  sad: "/sad.mp3",
  "extremely sad": "/exsad.mp3",
};

const questionGraph = {
  q1: {
    id: "q1",
    question: "How are you feeling today?",
    options: [
      { text: "Happy", next: "q2", score: 25 },
      { text: "extremely happy", next: "q2", score: 35 },
      { text: "sad", next: "q2", score: -25 },
      { text: "extremely sad", next: "q2", score: -35 },
    ],
  },
  q2: {
    id: "q2",
    question: "Does this song define your mood?",
    options: [
      { text: "Yes", next: "q3", score: 25 },
      { text: "No", next: "q3", score: -25 },
    ],
  },
  q3: {
    id: "q3",
    question: "Let's check your social vibe ..",
    options: [{ text: "ready!", next: "q4" }],
  },
  q4: {
    id: "q4",
    question:
      "Tell me your favourite person .....don't worry it'll not be out 😌",
    options: [{ text: "😅", next: "q5" }],
  },
  q5: {
    id: "q5",
    question: "",
    options: [
      { text: "Instantly say yes ", next: "q6", score: 30 },
      { text: "think before 10 minutes before reply ", next: "q6", score: 20 },
      { text: "give an excuse", next: "q6", score: -20 },
      { text: "Leave them on read ", next: "q6", score: -30 },
    ],
  },
  q6: {
    id: "q6",
    question: "Tell me your favourite food ..",
    options: [{ text: "😅", next: "q7" }],
  },
  q7: {
    id: "q7",
    question: "",
    options: [
      { text: "Will instantly order all & will eat", next: "q8", score: 57 },
      { text: "Store for later", next: "q8", score: 27 },

      { text: "Ignore the offer", next: "q8", score: -57 },
    ],
  },
  q8: {
    id: "q8",
    question: "How will you describe your energy today ?",
    options: [
      { text: "Hyperactive ", next: "q9", score: 45 },
      { text: "Balanced", next: "q9", score: 25 },
      { text: "Tired", next: "q10", score: -25 },
      { text: "Emotionally Drained", next: "q10", score: -45 },
    ],
  },
  q9: {
    id: "q9",
    question: " Superb ! Do you want to watch a movie ?",
    options: [
      { text: "Yes", next: "q11", score: 5 },
      { text: "No", next: "q11", score: -5 },
    ],
  },
  q10: {
    id: "q10",
    question: " What happen .. wanna rest?",
    options: [
      { text: "Yes", next: "q11", score: 5 },
      { text: "No", next: "q11", score: -8 },
    ],
  },
  q11: {
    id: "q11",
    question: "Final question ... choose the color",
    options: [
      { text: "Yellow", next: null, score: 12 },
      { text: "Blue", next: null, score: 6 },
      { text: "Red", next: null, score: -6 },
      { text: "Black", next: null, score: -12 },
      { text: "Restart Quiz", next: "q1", score: 0 },
    ],
  },
};

const Quiz = () => {
  const [currentId, setCurrentId] = useState("q1");
  const [answers, setAnswers] = useState([]);
  const [moodAnswer, setMoodAnswer] = useState(""); // Save q1 answer to choose song
  const [favouritePerson, setFavouritePerson] = useState("");
  const [favouriteFood, setFavouriteFood] = useState("");
  const [score, setScore] = useState(0);
    let movie = "/default.jpg"; // Default movie poster
    const handleExportToPDF = () => {
      const input = document.getElementById("quiz-result");

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("quiz-result.pdf");
      });
    };
      
  const handleAnswer = (option) => {
    const current = questionGraph[currentId];
    const newAnswers = [
      ...answers,
      { question: current.question, answer: option.text },
    ];
    setAnswers(newAnswers);

    // If current question is q1, remember the mood answer
    if (currentId === "q1") {
      setMoodAnswer(option.text);
    }
     if(option.score){
        setScore((prevScore) => prevScore + option.score);
     }
    if (option.next) {
      setCurrentId(option.next);
    } else {
      alert("Quiz completed! You can now download your result.");
      console.log("All Answers:", newAnswers);
    }
  };

  const currentQuestion = questionGraph[currentId];
   if (currentId==='q5' &&favouritePerson){
    currentQuestion.question = `If ${favouritePerson} texts you to hang out ?`;
   }
   if(currentId==='q7' && favouriteFood){
    currentQuestion.question = `If you get an unlimited offer of ${favouriteFood} for free , what will you do  ?`;
   }
   if(currentId==='q9'){
   if(moodAnswer=="Happy"){
    currentQuestion.question +=
      " Since you were already feeling happy . A lively blend of fun, dreams, love, and growth — keeps the good mood going strong.";
    movie = "/yjhd.jpg";
   }
   else if (moodAnswer=="extremely happy"){
    currentQuestion.question +=
      " Wholesome, artistic, and filled with heart. Celebrates life in its purest form — just like extreme happiness.";
    movie = "/barfi.jpg";
   }
   else if (moodAnswer=="sad"){
    currentQuestion.question +=
      " Your saddness will sway away with a soothing journey of emotional healing with relatable moments — a soft, supportive nudge toward hope.";
    movie = "/dzing.jpg";
   }
   else if (moodAnswer=="extremely sad"){
    currentQuestion.question +=
      " Deeply moving and inspiring. Heals with empathy, kindness, and understanding — hits you softly and uplifts.";
    movie = "/tare.jpg";
   }}
  return (
    <div className="quiz-container" id="quiz-result">
      <h2>{currentQuestion.question}</h2>

      {/* Song player only appears during q2 */}
      {currentId === "q2" && songs[moodAnswer] && (
        <div>
          <audio controls autoPlay>
            <source src={songs[moodAnswer]} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {currentId === "q9" && (
        <div>
          <img src={movie} alt="Movie Poster" className="movie-poster" />
        </div>
      )}
      {currentId === "q4" && (
        <div>
          <input
            type="text"
            placeholder="Enter your favourite person"
            value={favouritePerson}
            onChange={(e) => setFavouritePerson(e.target.value)}
          />
        </div>
      )}
      {currentId === "q6" && (
        <div>
          <input
            type="text"
            placeholder="Enter your favourite Food"
            value={favouriteFood}
            onChange={(e) => setFavouriteFood(e.target.value)}
          />
        </div>
      )}

      {currentQuestion.options.map((opt, index) => (
        <button key={index} onClick={() => handleAnswer(opt)}>
          {opt.text}
        </button>
      ))}

      <div className="score-meter-container">
        <div className="score-meter">
          <div
            className="score-pointer"
            style={{
              left: `${((score + 100) / 200) * 100}%`,
              backgroundColor: `hsl(${120 + score * 1.2}, 80%, 50%)`,
            }}
          >
            <span className="score-value">{score}</span>
          </div>
          <div className="meter-labels">
            <span>-100</span>
            <span>0</span>
            <span>+100</span>
          </div>
        </div>
      </div>
      <div
        className="score-comment"
        data-vibe={
          score <= -50
            ? "critical"
            : score < 0
            ? "negative"
            : score < 50
            ? "positive"
            : "extreme"
        }
      >
        {score <= -90
          ? "💀 Vibe Apocalypse (call for help!)"
          : score <= -70
          ? "😱 Critical Vibe Failure (emergency chocolate needed)"
          : score <= -50
          ? "😔 Deep Vibe Recession (Netflix & cry?)"
          : score <= -30
          ? "😕 Heavy Cloud Cover (need a hug?)"
          : score <= -10
          ? "🙁 Needs Mood Boost (puppy videos STAT)"
          : score <= 10
          ? "😐 Neutral Vibes (could go either way)"
          : score <= 30
          ? "🙂 Light Breeze of Positivity (nice!)"
          : score <= 50
          ? "😊 Good Vibes Rolling (you're glowing!)"
          : score <= 70
          ? "😄 Vibe Tsunami Warning (share the energy!)"
          : score <= 90
          ? "🤩 VIBE OVERLOAD (warning: contagious!)"
          : "🌈 EXTRA-DIMENSIONAL VIBRATION (are you human?)"}
      </div>
      {currentId === null && (
        <button onClick={handleExportToPDF}>Download PDF</button>
      )}
      {currentId === "q11" && answers.length >= 10 && (
        <button onClick={handleExportToPDF}>Download PDF</button>
      )}
    </div>
  );
};

export default Quiz;
