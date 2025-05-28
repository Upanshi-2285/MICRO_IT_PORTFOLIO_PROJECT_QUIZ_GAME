
const quizData = [
    {
      question: "What is the capital city of France?",
      answers: ["Madrid", "Berlin", "Paris", "Rome"],
      correct: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    {
      question: "What is the smallest prime number?",
      answers: ["0", "1", "2", "3"],
      correct: 2,
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answers: ["William Shakespeare", "Mark Twain", "Jane Austen", "Charles Dickens"],
      correct: 0,
    },
    {
      question: "What is the chemical symbol for water?",
      answers: ["H2O", "CO2", "NaCl", "O2"],
      correct: 0,
    },
  ];

  
  const questionEl = document.getElementById('question');
  const answersListEl = document.getElementById('answers-list');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');
  const reloadBtn = document.getElementById('reload-btn');
 
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswerIndex = null;
 
  
  function loadQuestion() {
    nextBtn.disabled = true;
    selectedAnswerIndex = null;
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

  
    // Clear previous answers
    answersListEl.innerHTML = '';
 
  
    currentQuestion.answers.forEach((answer, index) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.classList.add('answer-btn');
      btn.textContent = answer;
      btn.type = 'button';
      btn.addEventListener('click', () => selectAnswer(index, btn));
      li.appendChild(btn);
      answersListEl.appendChild(li);
    });
 
  
    // Show question and answers if hidden
    questionEl.style.display = '';
    answersListEl.style.display = '';
    nextBtn.style.display = '';
    resultEl.style.display = 'none';
    reloadBtn.style.display = 'none';
  }

  
  function selectAnswer(index, button) {
    // Remove previous selection highlight
    const buttons = answersListEl.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

  
    // Mark new selection
    button.classList.add('selected');
    selectedAnswerIndex = index;
    nextBtn.disabled = false;
  }
 
  
  function showResult() {
    questionEl.style.display = 'none';
    answersListEl.style.display = 'none';
    nextBtn.style.display = 'none';
 
  
    resultEl.style.display = 'block';
    reloadBtn.style.display = 'inline-block';
 
  
    resultEl.textContent = `Quiz Complete! Your score: ${score} / ${quizData.length}`;
  }

  
  nextBtn.addEventListener('click', () => {
    const currentQuestion = quizData[currentQuestionIndex];
 
  
    if (selectedAnswerIndex === currentQuestion.correct) {
      score++;
    }

  
    currentQuestionIndex++;

  
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
 
  
  reloadBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
  });
 
  
  // Initialize quiz
  loadQuestion();
 
  