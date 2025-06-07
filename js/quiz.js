
const quizData = {
  "Year 2": [
    { word: "brave", choices: ["scared", "strong", "timid"], answer: "strong" },
    { word: "happy", choices: ["angry", "joyful", "sad"], answer: "joyful" },
    { word: "fast", choices: ["quick", "slow", "quiet"], answer: "quick" }
  ],
  "Year 6": [
    { word: "elaborate", choices: ["simple", "complex", "fast"], answer: "complex" },
    { word: "vivid", choices: ["dull", "bright", "quiet"], answer: "bright" },
    { word: "reluctant", choices: ["eager", "hesitant", "happy"], answer: "hesitant" }
  ]
};

let level = "";
let questions = [];
let current = 0;
let score = 0;
let missedWords = [];

function startQuiz(selectedLevel) {
  level = selectedLevel;
  questions = quizData[level];
  current = 0;
  score = 0;
  missedWords = [];

  document.getElementById("levelDisplay").innerText = level;
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = `What is a synonym of "${q.word}"?`;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => {
      document.querySelectorAll("#choices button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    choicesDiv.appendChild(btn);
  });
}

function submitAnswer() {
  const selected = document.querySelector("#choices .selected");
  if (!selected) {
    alert("Please choose an answer!");
    return;
  }

  const q = questions[current];
  const userAnswer = selected.innerText;

  if (userAnswer === q.answer) {
    score++;
    document.getElementById("feedback").innerText = "✅ Correct!";
  } else {
    missedWords.push(q.word);
    document.getElementById("feedback").innerText = `❌ Incorrect. The correct answer was "${q.answer}"`;
  }

  setTimeout(() => {
    document.getElementById("feedback").innerText = "";
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("finalScore").innerText = `${score}/${questions.length}`;

  const ul = document.getElementById("missedWordsList");
  ul.innerHTML = "";
  if (missedWords.length === 0) {
    const li = document.createElement("li");
    li.innerText = "None! Perfect score!";
    ul.appendChild(li);
  } else {
    missedWords.forEach(word => {
      const li = document.createElement("li");
      li.innerText = word;
      ul.appendChild(li);
    });
  }

  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    db.collection("users").doc(user.uid).set({
      level,
      score: `${score}/${questions.length}`,
      missedWords
    }, { merge: true });
  }
}
