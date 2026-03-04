/* =============================================
   QUIZ GAME LOGIC
   ============================================= */

let currentDifficulty = 'easy';
let timePerQuestion = 30;
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let totalTimeUsed = 0;
let answered = false;
const TOTAL_QUESTIONS = 20;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 35; // r=35

/* --- Difficulty Settings --- */
const DIFFICULTY = {
    easy:   { time: 30, label: 'Łatwy' },
    medium: { time: 15, label: 'Średni' },
    hard:   { time: 8,  label: 'Trudny' }
};

/* --- Screen Management --- */
function showScreen(id) {
    document.querySelectorAll('.quiz-screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    screen.classList.add('active');
    // Re-trigger animation
    screen.style.animation = 'none';
    screen.offsetHeight; // reflow
    screen.style.animation = '';
}

/* --- Start Quiz --- */
function startQuiz(difficulty) {
    currentDifficulty = difficulty;
    timePerQuestion = DIFFICULTY[difficulty].time;
    currentIndex = 0;
    score = 0;
    totalTimeUsed = 0;
    answered = false;

    // Pick 20 random questions
    currentQuestions = shuffleArray([...QUESTIONS]).slice(0, TOTAL_QUESTIONS);

    showScreen('screenQuiz');
    loadQuestion();
}

/* --- Load Question --- */
function loadQuestion() {
    answered = false;
    const q = currentQuestions[currentIndex];

    // Update HUD
    document.getElementById('questionCounter').textContent = `${currentIndex + 1} / ${TOTAL_QUESTIONS}`;
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('quizProgressFill').style.width = `${((currentIndex) / TOTAL_QUESTIONS) * 100}%`;

    // Category & Question
    document.getElementById('questionCategory').textContent = q.category;
    document.getElementById('questionText').textContent = q.question;

    // Clear fun fact
    document.getElementById('funFact').textContent = '';

    // Answers
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';

    // Shuffle answer indices
    const indices = shuffleArray([0, 1, 2, 3]);
    // Map correct to shuffled position
    const correctShuffled = indices.indexOf(q.correct);

    indices.forEach((origIdx, displayIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer';
        btn.textContent = q.answers[origIdx];
        btn.dataset.origIndex = origIdx;
        btn.addEventListener('click', () => handleAnswer(btn, origIdx, q));
        container.appendChild(btn);
    });

    // Re-animate question
    const questionEl = document.getElementById('questionText');
    questionEl.style.animation = 'none';
    questionEl.offsetHeight;
    questionEl.style.animation = '';

    // Start timer
    startTimer();
}

/* --- Timer --- */
function startTimer() {
    clearInterval(timer);
    timeLeft = timePerQuestion;
    updateTimerDisplay();

    const circle = document.getElementById('timerCircle');
    circle.classList.remove('warning');
    circle.style.strokeDasharray = TIMER_CIRCUMFERENCE;
    circle.style.strokeDashoffset = 0;

    timer = setInterval(() => {
        timeLeft--;
        totalTimeUsed++;
        updateTimerDisplay();

        // Update circle
        const progress = 1 - (timeLeft / timePerQuestion);
        circle.style.strokeDashoffset = progress * TIMER_CIRCUMFERENCE;

        // Warning at 25% time
        if (timeLeft <= timePerQuestion * 0.25) {
            circle.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerText').textContent = timeLeft;
}

function timeUp() {
    if (answered) return;
    answered = true;

    const q = currentQuestions[currentIndex];
    const buttons = document.querySelectorAll('.quiz-answer');

    buttons.forEach(btn => {
        btn.classList.add('disabled');
        const origIdx = parseInt(btn.dataset.origIndex);
        if (origIdx === q.correct) {
            btn.classList.add('correct');
        }
    });

    // Show fun fact
    showFunFact(q, false);

    setTimeout(nextQuestion, 2000);
}

/* --- Handle Answer --- */
function handleAnswer(btn, origIdx, q) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    const isCorrect = origIdx === q.correct;

    // Disable all buttons
    const buttons = document.querySelectorAll('.quiz-answer');
    buttons.forEach(b => {
        b.classList.add('disabled');
        const bIdx = parseInt(b.dataset.origIndex);
        if (bIdx === q.correct) {
            b.classList.add('correct');
        }
    });

    if (isCorrect) {
        score++;
        btn.classList.add('correct');
        document.getElementById('scoreDisplay').textContent = score;
    } else {
        btn.classList.add('wrong');
    }

    // Show fun fact
    showFunFact(q, isCorrect);

    setTimeout(nextQuestion, 2000);
}

function showFunFact(q, wasCorrect) {
    const el = document.getElementById('funFact');
    if (q.funFact) {
        el.textContent = q.funFact;
    } else if (wasCorrect) {
        const phrases = ["Brawo! 💪", "Dobrze! ✨", "Tak trzymaj! 🌟", "Super! 🎉", "Wow, znasz się! 💖"];
        el.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    } else {
        el.textContent = `Poprawna odpowiedź: ${q.answers[q.correct]}`;
    }
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
}

/* --- Next Question --- */
function nextQuestion() {
    currentIndex++;
    if (currentIndex >= TOTAL_QUESTIONS) {
        showResults();
    } else {
        loadQuestion();
    }
}

/* --- Results --- */
function showResults() {
    clearInterval(timer);
    showScreen('screenResults');

    const percent = score / TOTAL_QUESTIONS;
    const wrong = TOTAL_QUESTIONS - score;

    // Icon & title based on score
    const icon = document.getElementById('resultsIcon');
    const title = document.getElementById('resultsTitle');

    if (percent >= 0.9) {
        icon.textContent = '🏆';
        title.textContent = 'Geniusz!';
    } else if (percent >= 0.7) {
        icon.textContent = '🎉';
        title.textContent = 'Świetnie!';
    } else if (percent >= 0.5) {
        icon.textContent = '😊';
        title.textContent = 'Nieźle!';
    } else {
        icon.textContent = '💪';
        title.textContent = 'Następnym razem lepiej!';
    }

    // Stats
    document.getElementById('statCorrect').textContent = score;
    document.getElementById('statWrong').textContent = wrong;
    document.getElementById('statTime').textContent = formatTime(totalTimeUsed);

    // Animate score number
    const numberEl = document.getElementById('resultsNumber');
    animateNumber(numberEl, 0, score, 1000);

    // Animate ring
    const ringFill = document.getElementById('resultsRingFill');
    const circumference = 2 * Math.PI * 52;
    ringFill.style.strokeDasharray = circumference;
    ringFill.style.strokeDashoffset = circumference;

    setTimeout(() => {
        const offset = circumference * (1 - percent);
        ringFill.style.strokeDashoffset = offset;
    }, 200);

    // Mark game as complete (need at least 50% to pass)
    if (percent >= 0.5) {
        markGameComplete(1);
    }
}

/* --- Save Progress --- */
function markGameComplete(gameNumber) {
    let progress = [];
    try {
        progress = JSON.parse(localStorage.getItem('womensday_progress')) || [];
    } catch(e) {}

    if (!progress.includes(gameNumber)) {
        progress.push(gameNumber);
        localStorage.setItem('womensday_progress', JSON.stringify(progress));
    }
}

/* --- Restart --- */
function restartQuiz() {
    showScreen('screenDifficulty');
}

/* --- Helpers --- */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function animateNumber(el, start, end, duration) {
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (end - start) * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
