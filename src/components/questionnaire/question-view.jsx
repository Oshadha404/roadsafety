// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { DoubleRightOutlined } from '@ant-design/icons';
// import { message } from 'antd';
// import '../../style/firework.css';
// import '../../style/questionView.css';
// import Sad from '../../assets/Anxiety.gif'
// import Happy from '../../assets/Happy.gif'
// import HighFive from '../../assets/High five.gif'

// const Quiz = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [answerSelected, setAnswerSelected] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(20);


// useEffect(() => {
//   const queryParams = new URLSearchParams(location.search);
//   const zone = queryParams.get('zone');
  
//   if (zone) {
//     // Fetch questions from API
//     fetch(`${process.env.REACT_APP_API_URL}/api/zone/${zone}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch questions');
//         }
//         return response.json();
//       })
//       .then(data => {
//           const questionsCopy = [...data];
//           const selected = [];

//           while (selected.length < 10 && questionsCopy.length > 0) {
//             const randomIndex = Math.floor(Math.random() * questionsCopy.length);
//             selected.push(questionsCopy.splice(randomIndex, 1)[0]); 
//             // splice removes the picked question from the array
//           }

//           setQuestions(selected);
//           setLoading(false);
//         })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }
// }, []);

// useEffect(() => {
//   const queryParams = new URLSearchParams(location.search);
//   const zone = queryParams.get('zone');
  
//   if (zone) {
//     // Save current zone in localStorage
//     localStorage.setItem("currentZone", zone);

//     fetch(process.env.REACT_APP_API_URL+`/api/zone/${zone}`)
//       .then(response => {
//         if (!response.ok) throw new Error('Failed to fetch questions');
//         return response.json();
//       })
//       .then(data => {
//         const questionsCopy = [...data];
//         const selected = [];

//         while (selected.length < 10 && questionsCopy.length > 0) {
//           const randomIndex = Math.floor(Math.random() * questionsCopy.length);
//           selected.push(questionsCopy.splice(randomIndex, 1)[0]); 
//         }

//         setQuestions(selected);
//         setLoading(false);
//         setCurrentQuestion(0);   // reset to first question
//         setAnswers([]);          // reset answers
//         setAnswerSelected(false);
//         setQuizCompleted(false);
//         setShowFireworks(false);
//         setTimeLeft(20);         // reset timer
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }
// }, [location.search]);

// // Timer effect
// useEffect(() => {
//   if (quizCompleted || loading) return;

//   setTimeLeft(20); // Reset timer when question changes

//   const timer = setInterval(() => {
//     setTimeLeft((prevTime) => {
//       if (prevTime <= 1) {
//         clearInterval(timer);
        
//         // If no answer selected when time runs out, mark as unanswered (will be counted as 0)
//         if (!answerSelected) {
//           const newAnswers = [...answers];
//           newAnswers[currentQuestion] = null; // Mark as null for timeout
//           setAnswers(newAnswers);
//         }
        
//         // Auto-advance to next question when time runs out
//         if (currentQuestion < questions.length - 1) {
//           setCurrentQuestion(currentQuestion + 1);
//           setAnswerSelected(false);
//         } else {
//           setQuizCompleted(true);
//           setShowFireworks(true);
//         }
//         return 0;
//       }
//       return prevTime - 1;
//     });
//   }, 1000);

//   return () => clearInterval(timer);
// }, [currentQuestion, quizCompleted, loading, questions.length, answerSelected, answers]);


//   const handleAnswerSelect = (answer) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = answer;
//     setAnswers(newAnswers);
//     setAnswerSelected(true);
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setAnswerSelected(false);
//     } else {
//       setQuizCompleted(true);
//       setShowFireworks(true);
//     }
//   };

//   const submitQuiz = async () => {
//   const queryParams = new URLSearchParams(location.search);
//   const currentZone = queryParams.get('zone');

//   const firstName = localStorage.getItem('firstName');
//   const lastName = localStorage.getItem('lastName');
//   const uid = localStorage.getItem('uid');

//   const score = correctAnswers;

//   const resultData = {
//     firstName,
//     lastName,
//     uid,
//     score,
//     zone: currentZone
//   };

//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/result`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(resultData)
//     });

//     if (!response.ok) throw new Error('Failed to submit result');

//     message.success('Result submitted successfully!');

//     // Zones in order
//     const zones = ["zone01", "zone02", "zone03", "zone04"];
//     const currentIndex = zones.indexOf(currentZone);

//     // Unlock next zone
//     if (currentIndex !== -1 && currentIndex < zones.length - 1) {
//       const nextZone = zones[currentIndex + 1];
//       localStorage.setItem("unlockedZone", nextZone);
//     }

//     // Navigate to zone page to display unlocked status
//     navigate('/zone');

//   } catch (error) {
//     console.error('Error submitting result:', error);
//     message.error('Failed to submit result. Please try again.');
//   }
// };


//   // Check if the selected answer matches the correct answer
//   const isCorrectAnswer = (questionIndex, selectedAnswer) => {
//     if (!questions[questionIndex]) return false;
//     if (selectedAnswer === null) return false; // Timeout questions are incorrect
//     const correctOption = questions[questionIndex].correct_answer; // "A", "B", "C", etc.
//     return selectedAnswer === questions[questionIndex].answers[correctOption];
//   };

//   const correctAnswers = answers.filter((answer, index) => 
//     isCorrectAnswer(index, answer)
//   ).length;
  
//   const wrongAnswers = answers.length - correctAnswers;

//   // Render fireworks
//   const renderFireworks = () => {
//     const fireworks = [];
//     const colors = ['#ff1461', '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd166'];
    
//     for (let i = 0; i < 50; i++) {
//       fireworks.push(
//         <div 
//           key={i} 
//           className="firework" 
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             backgroundColor: colors[Math.floor(Math.random() * colors.length)],
//             animationDelay: `${Math.random() * 2}s`
//           }}
//         ></div>
//       );
//     }
//     return fireworks;
//   };

//   if (loading) return <div className="main-frame"><div className="sub-frame">Loading questions...</div></div>;
//   if (error) return <div className="main-frame"><div className="sub-frame">Error: {error}</div></div>;
//   if (questions.length === 0) return <div className="main-frame"><div className="sub-frame">No questions available.</div></div>;

//   // Convert API response format to the format we need for rendering
//   const currentQuestionData = questions[currentQuestion];
//   const options = currentQuestionData ? Object.values(currentQuestionData.answers) : [];

//   // Calculate circle progress
//   const progress = (timeLeft / 20) * 100;
//   const circumference = 2 * Math.PI * 28; // radius = 28
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   return (
//     <div className='main-frame'>
//       {showFireworks && <div className="fireworks-container">{renderFireworks()}</div>}
//       <div className='sub-frame'>
//         {!quizCompleted ? (
//           <>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <span className='question-num'>{String(currentQuestion + 1).padStart(2, '0')}</span>
//                 <span className='question-page-num'>/{String(questions.length).padStart(2, '0')}</span>
//               </div>
//               <div style={{ position: 'relative', width: '60px', height: '60px' }}>
//                 <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
//                   <circle
//                     cx="30"
//                     cy="30"
//                     r="28"
//                     stroke="#e0e0e0"
//                     strokeWidth="4"
//                     fill="none"
//                   />
//                   <circle
//                     cx="30"
//                     cy="30"
//                     r="28"
//                     stroke={timeLeft <= 5 ? '#ff4444' : timeLeft <= 10 ? '#ffa500' : '#4caf50'}
//                     strokeWidth="4"
//                     fill="none"
//                     strokeDasharray={circumference}
//                     strokeDashoffset={strokeDashoffset}
//                     style={{
//                       transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease'
//                     }}
//                   />
//                 </svg>
//                 <div style={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   color: timeLeft <= 5 ? '#ff4444' : timeLeft <= 10 ? '#ffa500' : '#4caf50'
//                 }}>
//                   {timeLeft}s
//                 </div>
//               </div>
//             </div>
//             <label className='question-title'>{currentQuestionData.question}</label>
//             <div className='answers-main'>
//               <div className='answers-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//                 {options.map((option, index) => (
//                   <button
//                     className='answers'
//                     key={index}
//                     onClick={() => handleAnswerSelect(option)}
//                     style={{
//                       backgroundColor: answers[currentQuestion] === option ? '#ffd6ff' : '',
//                       textAlign: 'left',
//                       width: '100%',
//                       border: answers[currentQuestion] === option ? '1px solid #800080' : '',
//                     }}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <button 
//               className='ques-next-btn' 
//               onClick={nextQuestion} 
//               disabled={!answerSelected}
//               style={{ 
//                 cursor: answerSelected ? 'pointer' : 'not-allowed', 
//                 opacity: answerSelected ? 1 : 0.5 
//               }}
//             >
//               Next &nbsp;
//               <motion.span 
//                 animate={{ x: [0, 10, 0] }} 
//                 transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
//                 style={{ display: 'inline-block' }}
//               >
//                 <DoubleRightOutlined />
//               </motion.span>
//             </button>
//           </>
//         ) : (
//           <div>
//             <div className="quiz-summary">
//               <div>
//                 <h2 className='quiz-completed'>Quiz Completed!</h2>
//                 <p>Total Questions: {questions.length}</p>
//                 <p>Correct Answers: {correctAnswers}</p>
//                 <p>Wrong Answers: {wrongAnswers}</p>
//               </div>
//               <div>
//                 {correctAnswers < wrongAnswers ? (
//                   <img className='sad-img' src={Sad} alt="Sad face" />
//                 ) : correctAnswers > wrongAnswers ? (
//                   <img className='sad-img' src={Happy} alt="Happy face" />
//                 ) : (
//                   <img className='sad-img' src={HighFive} alt="High five" />
//                 )}
//               </div>
//             </div>
//            <button className="ques-next-btn" onClick={submitQuiz}>
//               {(() => {
//                 const queryParams = new URLSearchParams(location.search);
//                 const currentZone = queryParams.get('zone');
//                 const zones = ["zone01", "zone02", "zone03", "zone04"];
//                 const currentIndex = zones.indexOf(currentZone);

//                 return currentIndex < zones.length - 1 ? (
//                   <>
//                     Next Challenge &nbsp;
//                     <motion.span 
//                       animate={{ x: [0, 8, 0] }} 
//                       transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
//                       style={{ display: "inline-block" }}
//                     >
//                       <DoubleRightOutlined />
//                     </motion.span>
//                   </>
//                 ) : (
//                   "Submit"
//                 );
//               })()}
//             </button>


//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DoubleRightOutlined } from '@ant-design/icons';
import { message } from 'antd';
// import '../../style/firework.css';
import '../../style/questionView.css';
import Sad from '../../assets/Anxiety.gif'
import Happy from '../../assets/Happy.gif'
import HighFive from '../../assets/High five.gif'
import '../../style/results.css'

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);


useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const zone = queryParams.get('zone');
  
  if (zone) {
    // Fetch questions from API
    fetch(`${process.env.REACT_APP_API_URL}/api/zone/${zone}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(data => {
          const questionsCopy = [...data];
          const selected = [];

          while (selected.length < 10 && questionsCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * questionsCopy.length);
            selected.push(questionsCopy.splice(randomIndex, 1)[0]); 
            // splice removes the picked question from the array
          }

          setQuestions(selected);
          setLoading(false);
        })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }
}, []);

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const zone = queryParams.get('zone');
  
  if (zone) {
    // Save current zone in localStorage
    localStorage.setItem("currentZone", zone);

    fetch(process.env.REACT_APP_API_URL+`/api/zone/${zone}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch questions');
        return response.json();
      })
      .then(data => {
        const questionsCopy = [...data];
        const selected = [];

        while (selected.length < 5 && questionsCopy.length > 0) {
          const randomIndex = Math.floor(Math.random() * questionsCopy.length);
          selected.push(questionsCopy.splice(randomIndex, 1)[0]); 
        }

        setQuestions(selected);
        setLoading(false);
        setCurrentQuestion(0);   // reset to first question
        setAnswers([]);          // reset answers
        setAnswerSelected(false);
        setQuizCompleted(false);
        setShowFireworks(false);
        setTimeLeft(20);         // reset timer
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }
}, [location.search]);

// Timer effect
useEffect(() => {
  if (quizCompleted || loading) return;

  setTimeLeft(20); // Reset timer when question changes

  const timer = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timer);
        
        // If no answer selected when time runs out, mark as unanswered (will be counted as 0)
        setAnswers(prevAnswers => {
          const newAnswers = [...prevAnswers];
          if (!newAnswers[currentQuestion]) {
            newAnswers[currentQuestion] = null; // Mark as null for timeout
          }
          return newAnswers;
        });
        
        // Auto-advance to next question when time runs out
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswerSelected(false);
        } else {
          setQuizCompleted(true);
          setShowFireworks(true);
        }
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [currentQuestion, quizCompleted, loading, questions.length]);


  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setAnswerSelected(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswerSelected(false);
    } else {
      setQuizCompleted(true);
      setShowFireworks(true);
    }
  };

  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA500', '#FF1493'];
    
    for (let i = 0; i < 100; i++) {
      confetti.push(
        <div 
          key={i} 
          className="confetti-piece" 
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        ></div>
      );
    }
    return confetti;
  };


  // Updated submitQuiz function for Quiz.jsx
// Replace your existing submitQuiz function with this:

const submitQuiz = async () => {
  const queryParams = new URLSearchParams(location.search);
  const currentZone = queryParams.get('zone');

  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const uid = localStorage.getItem('uid');

  const score = correctAnswers;

  const resultData = {
    firstName,
    lastName,
    uid,
    score,
    zone: currentZone,
    //drivingCheckAnswers: localStorage.getItem("drivingCheckAnswers")?localStorage.getItem("drivingCheckAnswers"):{} ///mama change kare 
    drivingCheckAnswers: (() => {
      try {
        const raw = localStorage.getItem("drivingCheckAnswers");
        return raw ? JSON.parse(raw) : {};
      } catch (e) { return {}; }
    })()
  };

  try {
    // Submit current zone result
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData)
    });

    if (!response.ok) throw new Error('Failed to submit result');

    message.success('Result submitted successfully!');

    // Zones in order
    const zones = ["zone01", "zone02", "zone03", "zone04"];
    const currentIndex = zones.indexOf(currentZone);

    // Check if user completed zone 4 (last zone)
    if (currentZone === "zone04") {
      // Lock all zones after completion
      localStorage.setItem("unlockedZone", "zone04");
      
      // Navigate to final results page
      navigate('/results');
    } else {
      // Unlock next zone if not the last zone
      if (currentIndex !== -1 && currentIndex < zones.length - 1) {
        const nextZone = zones[currentIndex + 1];
        localStorage.setItem("unlockedZone", nextZone);
      }

      // Navigate to zone page
      navigate('/zone');
    }

  } catch (error) {
    console.error('Error submitting result:', error);
    message.error('Failed to submit result. Please try again.');
  }
};



//   const submitQuiz = async () => {
//   const queryParams = new URLSearchParams(location.search);
//   const currentZone = queryParams.get('zone');

//   const firstName = localStorage.getItem('firstName');
//   const lastName = localStorage.getItem('lastName');
//   const uid = localStorage.getItem('uid');

//   const score = correctAnswers;

//   const resultData = {
//     firstName,
//     lastName,
//     uid,
//     score,
//     zone: currentZone
//   };

//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/result`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(resultData)
//     });

//     if (!response.ok) throw new Error('Failed to submit result');

//     message.success('Result submitted successfully!');

//     // Zones in order
//     const zones = ["zone01", "zone02", "zone03", "zone04"];
//     const currentIndex = zones.indexOf(currentZone);

//     // Unlock next zone
//     if (currentIndex !== -1 && currentIndex < zones.length - 1) {
//       const nextZone = zones[currentIndex + 1];
//       localStorage.setItem("unlockedZone", nextZone);
//     }

//     // Navigate to zone page to display unlocked status
//     navigate('/zone');

//   } catch (error) {
//     console.error('Error submitting result:', error);
//     message.error('Failed to submit result. Please try again.');
//   }
// };


  // Check if the selected answer matches the correct answer
  const isCorrectAnswer = (questionIndex, selectedAnswer) => {
    if (!questions[questionIndex]) return false;
    if (selectedAnswer === null) return false; // Timeout questions are incorrect
    const correctOption = questions[questionIndex].correct_answer; // "A", "B", "C", etc.
    return selectedAnswer === questions[questionIndex].answers[correctOption];
  };

  const correctAnswers = answers.filter((answer, index) => 
    isCorrectAnswer(index, answer)
  ).length;
  
  const wrongAnswers = answers.length - correctAnswers;

  // Render fireworks
  const renderFireworks = () => {
    const fireworks = [];
    const colors = ['#ff1461', '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd166'];
    
    for (let i = 0; i < 50; i++) {
      fireworks.push(
        <div 
          key={i} 
          className="firework" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      );
    }
    return fireworks;
  };

  if (loading) return <div className="main-frame"><div className="sub-frame">Loading questions...</div></div>;
  if (error) return <div className="main-frame"><div className="sub-frame">Error: {error}</div></div>;
  if (questions.length === 0) return <div className="main-frame"><div className="sub-frame">No questions available.</div></div>;

  // Convert API response format to the format we need for rendering
  const currentQuestionData = questions[currentQuestion];
  const options = currentQuestionData ? Object.values(currentQuestionData.answers) : [];

  // Calculate circle progress
  const progress = (timeLeft / 20) * 100;
  const circumference = 2 * Math.PI * 28; // radius = 28
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className='main-frame'>
      {showFireworks && <div className="confetti-container">{renderConfetti()}</div>}
      <div className='sub-frame'>
        {!quizCompleted ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className='question-num'>{String(currentQuestion + 1).padStart(2, '0')}</span>
                <span className='question-page-num'>/{String(questions.length).padStart(2, '0')}</span>
              </div>
              <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="#e0e0e0"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke={timeLeft <= 5 ? '#ff4444' : timeLeft <= 10 ? '#ffa500' : '#4caf50'}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                      transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease'
                    }}
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: timeLeft <= 5 ? '#ff4444' : timeLeft <= 10 ? '#ffa500' : '#4caf50'
                }}>
                  {timeLeft}s
                </div>
              </div>
            </div>
            <label className='question-title'>{currentQuestionData.question}</label>
            <div className='answers-main'>
              <div className='answers-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {options.map((option, index) => (
                  <button
                    className='answers'
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    style={{
                      backgroundColor: answers[currentQuestion] === option ? '#ffd6ff' : '',
                      textAlign: 'left',
                      width: '100%',
                      border: answers[currentQuestion] === option ? '1px solid #800080' : '',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className='ques-next-btn' 
              onClick={nextQuestion} 
              disabled={!answerSelected}
              style={{ 
                cursor: answerSelected ? 'pointer' : 'not-allowed', 
                opacity: answerSelected ? 1 : 0.5 
              }}
            >
              Next &nbsp;
              <motion.span 
                animate={{ x: [0, 10, 0] }} 
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{ display: 'inline-block' }}
              >
                <DoubleRightOutlined />
              </motion.span>
            </button>
          </>
        ) : (
          <div>
            <div className="quiz-summary">
              <div>
                <h2 className='quiz-completed'>Quiz Completed!</h2>
                <p>Total Questions: {questions.length}</p>
                <p>Correct Answers: {correctAnswers}</p>
                <p>Wrong Answers: {wrongAnswers}</p>
              </div>
              <div>
                {correctAnswers < wrongAnswers ? (
                  <img className='sad-img' src={Sad} alt="Sad face" />
                ) : correctAnswers > wrongAnswers ? (
                  <img className='sad-img' src={Happy} alt="Happy face" />
                ) : (
                  <img className='sad-img' src={HighFive} alt="High five" />
                )}
              </div>
            </div>
           <button className="ques-next-btn" onClick={submitQuiz}>
              {(() => {
                const queryParams = new URLSearchParams(location.search);
                const currentZone = queryParams.get('zone');
                const zones = ["zone01", "zone02", "zone03", "zone04"];
                const currentIndex = zones.indexOf(currentZone);

                return currentIndex < zones.length - 1 ? (
                  <>
                    Next Challenge &nbsp;
                    <motion.span 
                      animate={{ x: [0, 8, 0] }} 
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      style={{ display: "inline-block" }}
                    >
                      <DoubleRightOutlined />
                    </motion.span>
                  </>
                ) : (
                  "Submit"
                );
              })()}
            </button>


          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
