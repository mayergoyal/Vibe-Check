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
      { text: "Happy", next: "q2", score: 12 },
      { text: "extremely happy", next: "q2", score: 18 },
      { text: "sad", next: "q2", score: -12 },
      { text: "extremely sad", next: "q2", score: -18 },
    ],
  },
  q2: {
    id: "q2",
    question: "Does this song define your mood?",
    options: [
      { text: "Yes", next: "q3", score: 12 },
      { text: "No", next: "q3", score: -12 },
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
      { text: "Instantly say yes", next: "q6", score: 18 },
      { text: "think before 10 minutes before reply", next: "q6", score: 10 },
      { text: "give an excuse", next: "q6", score: -10 },
      { text: "Leave them on read", next: "q6", score: -18 },
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
      { text: "Will instantly order all & will eat", next: "q8", score: 20 },
      { text: "Store for later", next: "q8", score: 10 },
      { text: "Ignore the offer", next: "q8", score: -20 },
    ],
  },
  q8: {
    id: "q8",
    question: "How will you describe your energy today?",
    options: [
      { text: "Hyperactive", next: "q9", score: 18 },
      { text: "Balanced", next: "q9", score: 10 },
      { text: "Tired", next: "q10", score: -10 },
      { text: "Emotionally Drained", next: "q10", score: -18 },
    ],
  },
  q9: {
    id: "q9",
    question: "",
    options: [
      { text: "Yes", next: "q01", score: 5 },
      { text: "No", next: "q01", score: -5 },
    ],
  },
  q10: {
    id: "q10",
    question: "What happened .. wanna rest?",
    options: [
      { text: "Yes", next: "q01", score: 5 },
      { text: "No", next: "q01", score: -5 },
    ],
  },
  q01: {
    id: "q01",
    question: "You walk into a room with strangers. What do you do first?",
    options: [
      {
        text: "Scan for a friendly face & approach 🔍",
        next: "q102",
        score: 1,
      },
      { text: "Stick to the wall silently 🧱", next: "q103", score: -1 },
      { text: "Own the room with your energy 🔥", next: "q104", score: 1.5 },
      { text: "Head to the snacks corner 🍿", next: "q105", score: 0.5 },
    ],
  },
  q102: {
    id: "q102",
    question: "",
    options: [
      { text: "not always this person", next: "qa", score: -4 },
      {
        text: "absolutely !! if I found we'll own the room together",
        next: "qa",
        score: 4,
      },
      {
        text: "depends on mood ,I mean , after passing a simple smile ",
        next: "qa",
        score: -2,
      },
      {
        text: "I 'll rather approach to some stranger then ",
        next: "qa",
        score: 1,
      },
    ],
  },
  q103: {
    id: "q103",
    question: "Then What will you do in your solitude against wall ?",
    options: [
      {
        text: "Will Stare everyone , wasting their energies ",
        next: "qa",
        score: -17,
      },
      {
        text: "I'll surf my mobile simply",
        next: "qa",
        score: 1,
      },
      {
        text: "Will think how to settle atleast the next hour of the day ",
        next: "qa",
        score: 3,
      },
      {
        text: "Will call someone to come and pick me up",
        next: "qa",
        score: 0,
      },
    ],
  },
  q104: {
    id: "q104",
    question:
      "Superb !! Your energy will surely warm up the room .. with whom do you think your energy will resonate?",
    options: [
      {
        text: "Humming Bird",
        image: "/hummy.jpg",
        next: "qa",
        score: 4,
      },
      {
        text: "Border Collie",
        image: "/bordie.jpg",
        next: "qa",
        score: 3,
      },
      {
        text: "Squirrel",
        image: "/squi.jpg",
        next: "qa",
        score: 2,
      },
      {
        text: "Nope I am the only one with this energy",
        next: "qa",
        score: 5,
      },
    ],
  },
  q105: {
    id: "q105",
    question: "No issue ! You must be hungry ..what u wanna have ?",
    options: [
      {
        text: "Ice Cream 🍦",
        next: "qa",
        score: 2,
      },
      {
        text: "Popcorn 🍿",
        next: "qa",
        score: 1,
      },
      {
        text: "Instant Noodles 🍜",
        next: "qa",
        score: -1,
      },
      {
        text: "Dark Chocolate 🍫",
        next: "qa",
        score: -2,
      },
    ],
  },
  qa: {
    id: "qa",
    question:
      "If your mood right now was a weather forecast, what would it be?",
    options: [
      {
        text: "Sunny with a chance of rainbows 🌈",
        next: "q11", // Directs to final color question
        score: 15,
        image: "/rainbow.jpg",
      },
      {
        text: "Thunderstorm with lightning ⚡",
        next: "q11",
        score: -15,
        image: "/thunderstorm.jpg",
      },
      {
        text: "Foggy... can't see past my coffee cup ☕",
        next: "q11",
        score: -8,
        image: "/foggy.jpg",
      },
      {
        text: "A perfect breeze with dancing leaves 🍃",
        next: "q11",
        score: 10,
        image: "/breeze.jpg",
      },
      {
        text: "Meteor shower of excitement! ☄️",
        next: "q11",
        score: 20,
        image: "/meteor.jpg",
      },
    ],
  },
  q11: {
    id: "q11",
    question: "Final question ... choose the color",
    options: [
      { text: "Yellow", next: null, score: 7 },
      { text: "Blue", next: null, score: 4 },
      { text: "Red", next: null, score: -4 },
      { text: "Black", next: null, score: -7 },
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
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem("userData")) || {};

      // Create a temporary div for PDF content
      const pdfContent = document.createElement("div");
      pdfContent.style.padding = "20px";
      pdfContent.style.background = "white";
      pdfContent.style.color = "black";

      // Add user details
      pdfContent.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            ${
              userData.avatar
                ? `<img src="${userData.avatar}" style="width: 80px; height: 80px; border-radius: 50%; margin-right: 20px;">`
                : ""
            }
            <div>
              <h2>Vibe Check Results</h2>
              <p><strong>Name:</strong> ${userData.username || "Anonymous"}</p>
              <p><strong>Age:</strong> ${userData.age || "Not specified"}</p>
              <p><strong>Gender:</strong> ${
                userData.gender || "Not specified"
              }</p>
            </div>
          </div>
        `;

      // Clone your quiz result content
      const quizResult = document.getElementById("quiz-result").cloneNode(true);

      // Remove buttons from the PDF
      const buttons = quizResult.querySelectorAll("button");
      buttons.forEach((button) => button.remove());

      // Add quiz result to PDF content
      pdfContent.appendChild(quizResult);

      // Add current date
      const dateDiv = document.createElement("div");
      dateDiv.style.marginTop = "20px";
      dateDiv.style.fontSize = "12px";
      dateDiv.style.color = "#666";
      dateDiv.textContent = `Report generated on: ${new Date().toLocaleDateString()}`;
      pdfContent.appendChild(dateDiv);

      document.body.appendChild(pdfContent);

      html2canvas(pdfContent).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("vibe-check-result.pdf");

        // Clean up
        document.body.removeChild(pdfContent);
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
    currentQuestion.question =
      "  Superb! Do you want to watch a movie? Since you were already feeling happy . A lively blend of fun, dreams, love, and growth — keeps the good mood going strong.";
    movie = "/yjhd.jpg";
   }
   else if (moodAnswer=="extremely happy"){
    currentQuestion.question =
      "  Superb! Do you want to watch a movie? Wholesome, artistic, and filled with heart. Celebrates life in its purest form — just like extreme happiness.";
    movie = "/barfi.jpg";
   }
   else if (moodAnswer=="sad"){
    currentQuestion.question =
      " Superb! Do you want to watch a movie? Your saddness will sway away with a soothing journey of emotional healing with relatable moments — a soft, supportive nudge toward hope.";
    movie = "/dzing.jpg";
   }
   else if (moodAnswer=="extremely sad"){
    currentQuestion.question =
      "Superb! Do you want to watch a movie?  Deeply moving and inspiring. Heals with empathy, kindness, and understanding — hits you softly and uplifts.";
    movie = "/tare.jpg";
   }}
   if(currentId=='q102' &&favouritePerson){
    currentQuestion.question=`If you'll found ${favouritePerson} there then will you both stay togethher in that room ?`
   }
  return (
    <div className="quiz-container" id="quiz-result">
      <div className="question-box">
        {currentId === "q9" && (
          <div>
            <img src={movie} alt="Movie Poster" className="movie-poster" />
          </div>
        )}
        <h2>{currentQuestion.question}</h2>
      </div>

      {/* Song player only appears during q2 */}
      {currentId === "q2" && songs[moodAnswer] && (
        <div>
          <audio controls autoPlay>
            <source src={songs[moodAnswer]} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
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
          {opt.image && (
            <img src={opt.image} alt={opt.text} className="option-image" />
          )}
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
