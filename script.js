// Simulated database of questions
const questions = {
    numeracy: [
        { q: "What is 3 + 4?", options: ["5", "7", "9"], answer: 1, explanation: "3 + 4 equals 7." },
        { q: "What is 10 - 3?", options: ["5", "6", "7"], answer: 2, explanation: "10 - 3 equals 7." },
    ],
    reading: [
        { q: "What is the main idea of the passage?", options: ["Option 1", "Option 2", "Option 3"], answer: 0, explanation: "Option 1 is the main idea." },
    ],
};

let currentQuestionIndex = 0;
let selectedCategory = "all";
let quizQuestions = [];
let score = 0;

// Login functionality
document.getElementById("loginForm").onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simulated login check (can add more logic here)
    if (email && password) {
        document.getElementById("login").style.display = "none";
        document.getElementById("quiz").style.display = "block";
    } else {
        alert("Please enter valid credentials!");
    }
};

// Start quiz
document.getElementById("startQuiz").onclick = () => {
    const category = document.getElementById("category").value;
    const numQuestions = parseInt(document.getElementById("numQuestions").value);

    selectedCategory = category;

    // Filter questions based on category
    quizQuestions = category === "all"
        ? [...questions.numeracy, ...questions.reading]
        : questions[category];

    // Shuffle and limit to selected number
    quizQuestions = quizQuestions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
    currentQuestionIndex = 0;
    score = 0;

    displayQuestion(currentQuestionIndex);
};

// Display question
function displayQuestion(index) {
    if (index >= quizQuestions.length) {
        alert(`Quiz complete! Your score: ${score}/${quizQuestions.length}`);
        document.getElementById("questionSection").style.display = "none";
        return;
    }

    const question = quizQuestions[index];
    document.getElementById("questionText").innerText = question.q;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // Clear previous options
    question.options.forEach((option, i) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(button);
    });

    document.getElementById("questionSection").style.display = "block";
}

// Check answer
function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.getElementById("options").children;

    if (selectedIndex === question.answer) {
        options[selectedIndex].classList.add("correct");
        score++;
    } else {
        options[selectedIndex].classList.add("incorrect");
        alert(`Incorrect! Explanation: ${question.explanation}`);
    }

    // Move to the next question
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }, 1000);
}
