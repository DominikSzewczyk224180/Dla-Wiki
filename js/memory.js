/* =============================================
   MEMORY GAME LOGIC
   
   INSTRUKCJA:
   1. Wrzuć zdjęcia do folderu: images/memory/
   2. Wpisz nazwy plików poniżej (z rozszerzeniem!)
   3. Potrzebujesz minimum:
      - 4 zdjęcia na łatwy
      - 8 zdjęć na średni  
      - 16 zdjęć na trudny
   
   Przykład: jeśli masz pliki "plaza.jpg" i "kotek.png"
   w folderze images/memory/, wpisz:
   "plaza.jpg", "kotek.png"
   ============================================= */

const MEMORY_IMAGES = [
    "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg",
    "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg",
    "15.jpeg", "16.jpeg", "17.jpeg", "18.jpeg", "19.jpeg", "20.jpeg", "21.jpeg",
    "22.jpeg", "23.jpeg", "24.jpeg", "25.jpeg", "26.jpeg", "27.jpeg", "28.jpeg",
    "29.jpeg", "30.jpeg", "31.jpeg", "32.jpeg", "33.jpeg", "34.jpeg", "35.jpeg",
    "36.jpeg", "37.jpeg", "38.jpeg", "39.jpeg", "40.jpeg", "41.jpeg", "42.jpeg",
    "43.jpeg", "44.jpeg", "45.jpeg", "46.jpeg", "47.jpeg", "48.jpeg", "49.jpeg",
    "50.jpeg", "51.jpeg", "52.jpeg", "53.jpeg", "54.jpeg", "55.jpeg", "56.jpeg",
    "57.jpeg", "58.jpeg", "59.jpeg", "60.jpeg", "61.jpeg", "62.jpeg", "63.jpeg",
    "64.jpeg", "65.jpeg", "66.jpeg", "67.jpeg", "68.jpeg", "69.jpeg", "70.jpeg",
    "71.jpeg",
];

let difficulty = 'easy';
let totalPairs = 4;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let canFlip = true;

const DIFF = {
    easy:   { pairs: 4,  gridClass: 'mem-grid--4',   cols: 4 },
    medium: { pairs: 8,  gridClass: 'mem-grid--4-4', cols: 4 },
    hard:   { pairs: 16, gridClass: 'mem-grid--8',   cols: 8 }
};

/* --- Screens --- */
function showScreen(id) {
    document.querySelectorAll('.mem-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* --- Start Game --- */
function startMemory(diff) {
    difficulty = diff;
    totalPairs = DIFF[diff].pairs;
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    flippedCards = [];
    canFlip = true;
    clearInterval(timer);

    if (MEMORY_IMAGES.length < totalPairs) {
        alert(`Potrzebujesz minimum ${totalPairs} zdjęć w tablicy MEMORY_IMAGES! Masz ${MEMORY_IMAGES.length}.`);
        return;
    }

    showScreen('screenGame');
    buildGrid();
    updateHUD();
    startTimer();
}

/* --- Build Grid --- */
function buildGrid() {
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    grid.className = 'mem-grid ' + DIFF[difficulty].gridClass;

    // Pick random images from pool and create pairs
    const picked = shuffle([...MEMORY_IMAGES]).slice(0, totalPairs);
    const imageList = [];
    picked.forEach(filename => {
        imageList.push(filename, filename);
    });
    shuffle(imageList);

    cards = [];
    imageList.forEach((filename, index) => {
        const card = document.createElement('div');
        card.className = 'mem-card';
        card.dataset.imageFile = filename;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="mem-card__inner">
                <div class="mem-card__front" id="front-${index}">
                    <img src="../images/memory/${filename}" alt="Karta"
                         onerror="this.style.display='none'; this.parentElement.classList.add('mem-card__placeholder');">
                </div>
                <div class="mem-card__back">
                    <span class="mem-card__back-pattern">💖</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
        cards.push(card);
    });
}

/* --- Flip Card --- */
function flipCard(card) {
    if (!canFlip) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        updateHUD();
        checkMatch();
    }
}

/* --- Check Match --- */
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.imageFile === card2.dataset.imageFile;

    if (match) {
        // Match found!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        updateHUD();

        if (matchedPairs === totalPairs) {
            clearInterval(timer);
            setTimeout(showResults, 600);
        }
    } else {
        // No match — flip back
        canFlip = false;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 800);
    }
}

/* --- Timer --- */
function startTimer() {
    clearInterval(timer);
    seconds = 0;
    timer = setInterval(() => {
        seconds++;
        updateHUD();
    }, 1000);
}

function formatTime(s) {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

/* --- HUD --- */
function updateHUD() {
    document.getElementById('pairsFound').textContent = `${matchedPairs} / ${totalPairs}`;
    document.getElementById('movesCount').textContent = moves;
    document.getElementById('timerDisplay').textContent = formatTime(seconds);
}

/* --- Results --- */
function showResults() {
    showScreen('screenResults');

    document.getElementById('memResultsSub').textContent =
        `Znalazłaś wszystkie ${totalPairs} par!`;
    document.getElementById('statPairs').textContent = totalPairs;
    document.getElementById('statMoves').textContent = moves;
    document.getElementById('statTime').textContent = formatTime(seconds);

    // Always mark as complete when all pairs found
    saveProgress(4);
}

function saveProgress(n) {
    let p = [];
    try { p = JSON.parse(localStorage.getItem('womensday_progress')) || []; } catch(e) {}
    if (!p.includes(n)) { p.push(n); localStorage.setItem('womensday_progress', JSON.stringify(p)); }
}

function restartMemory() {
    clearInterval(timer);
    showScreen('screenDifficulty');
}

/* --- Shuffle --- */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
