/* =============================================
   JAKA TO MELODIA - GAME LOGIC
   Based on Polish "Jaka to melodia?" finale format
   ============================================= */

let difficulty = 'easy';
let totalTime = 40;
let timeLeft = 40;
let timer = null;
let score = 0;
let guessedCount = 0;
let currentSongIndex = 0;
let gameSongs = [];
let songResults = [];
let isPlaying = false;
let ytPlayer = null;
let ytReady = false;
let pointsPerCorrect = 4;
let passThreshold = 0.6;
const TOTAL_SONGS = 7;

// Confirm dialog state
let pendingConfirm = null;

/* --- Difficulty --- */
const DIFF_SETTINGS = {
    easy:   { time: 40, points: 4, threshold: 0.6, artistPoints: true },
    medium: { time: 30, points: 2, threshold: 0.8, artistPoints: true },
    hard:   { time: 20, points: 1, threshold: 0.9, artistPoints: false }
};

/* --- YouTube API Ready --- */
function onYouTubeIframeAPIReady() {
    ytReady = true;
}

/* --- Screen Management --- */
function showMelScreen(id) {
    document.querySelectorAll('.mel-screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    screen.classList.add('active');
    screen.style.animation = 'none';
    screen.offsetHeight;
    screen.style.animation = '';
}

/* --- Start Game --- */
function startMelodia(diff) {
    difficulty = diff;
    const settings = DIFF_SETTINGS[diff];
    totalTime = settings.time;
    timeLeft = settings.time;
    pointsPerCorrect = settings.points;
    passThreshold = settings.threshold;
    score = 0;
    guessedCount = 0;
    currentSongIndex = -1;
    isPlaying = false;
    songResults = [];

    // Pick 7 random songs
    gameSongs = shuffleArray([...MELODIA_SONGS]).slice(0, TOTAL_SONGS);

    // Build song slots
    buildSongSlots();
    updateScoreDisplay();
    updateTimerDisplay();

    showMelScreen('screenGame');

    // Init YouTube player
    initYTPlayer();

    // Start global timer
    startGlobalTimer();

    // Auto-select first song
    selectSong(0);
}

/* --- Build Song Slots UI --- */
function buildSongSlots() {
    const container = document.getElementById('songsContainer');
    container.innerHTML = '';

    gameSongs.forEach((song, i) => {
        const slot = document.createElement('div');
        slot.className = 'mel-song-slot';
        slot.id = `songSlot${i}`;
        slot.innerHTML = `
            <span class="mel-song-slot__number">${i + 1}</span>
            <span class="mel-song-slot__status">🎵</span>
            <span class="mel-song-slot__info">Piosenka ${i + 1}</span>
        `;
        slot.addEventListener('click', () => selectSong(i));
        container.appendChild(slot);

        songResults.push({ guessedTitle: false, guessedArtist: false, revealed: false });
    });
}

/* --- Select Song --- */
function selectSong(index) {
    if (songResults[index].revealed) return;
    if (timeLeft <= 0) return;

    currentSongIndex = index;

    // Highlight active slot
    document.querySelectorAll('.mel-song-slot').forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });

    // Show player
    document.getElementById('playerArea').style.display = 'block';
    document.getElementById('confirmDialog').style.display = 'none';
    document.getElementById('playerNumber').textContent = `Piosenka ${index + 1}`;
    document.getElementById('playerStatus').textContent = 'Kliknij play żeby posłuchać';
    document.getElementById('playIcon').textContent = '▶️';
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputArtist').value = '';
    document.getElementById('inputTitle').focus();
    isPlaying = false;

    // Load song in YouTube player
    if (ytPlayer && ytReady) {
        const song = gameSongs[index];
        ytPlayer.cueVideoById({
            videoId: song.youtubeId,
            startSeconds: song.startAt || 0
        });
    }
}

/* --- YouTube Player --- */
function initYTPlayer() {
    if (ytPlayer) {
        ytPlayer.destroy();
    }

    const checkReady = setInterval(() => {
        if (ytReady) {
            clearInterval(checkReady);
            ytPlayer = new YT.Player('ytPlayer', {
                height: '1',
                width: '1',
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1
                },
                events: {
                    onStateChange: onPlayerStateChange
                }
            });
        }
    }, 200);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        document.getElementById('playIcon').textContent = '⏸️';
        document.getElementById('playerStatus').textContent = '🔊 Gra...';
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        document.getElementById('playIcon').textContent = '▶️';
        document.getElementById('playerStatus').textContent = '⏸️ Pauza';
    }
}

function togglePlay() {
    if (!ytPlayer) return;
    if (timeLeft <= 0) return;

    if (isPlaying) {
        ytPlayer.pauseVideo();
    } else {
        ytPlayer.playVideo();
    }
}

function stopPlayback() {
    if (ytPlayer && isPlaying) {
        try { ytPlayer.pauseVideo(); } catch(e) {}
    }
    isPlaying = false;
}

/* --- Global Timer --- */
function startGlobalTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeLeft = 0;
            updateTimerDisplay();
            stopPlayback();
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerValue').textContent = timeLeft;

    const percent = (timeLeft / totalTime) * 100;
    const fill = document.getElementById('timerBarFill');
    fill.style.width = `${percent}%`;

    if (percent < 25) {
        fill.classList.add('critical');
    } else if (percent < 50) {
        fill.classList.add('warning');
        fill.classList.remove('critical');
    } else {
        fill.classList.remove('warning', 'critical');
    }
}

function updateScoreDisplay() {
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('guessedCount').textContent = guessedCount;
}

/* --- Submit Answer --- */
function submitAnswer() {
    if (currentSongIndex < 0 || timeLeft <= 0) return;
    if (songResults[currentSongIndex].revealed) return;

    const song = gameSongs[currentSongIndex];
    const inputTitle = document.getElementById('inputTitle').value.trim();
    const inputArtist = document.getElementById('inputArtist').value.trim();

    if (!inputTitle && !inputArtist) return;

    const titleMatch = matchText(inputTitle, song.acceptedTitles, song.title);
    const artistMatch = matchText(inputArtist, song.acceptedArtists, song.artist);

    // Check if we need to confirm fuzzy matches
    if (titleMatch.type === 'fuzzy' || artistMatch.type === 'fuzzy') {
        showConfirmDialog(titleMatch, artistMatch, song);
        return;
    }

    processAnswer(titleMatch.matched, artistMatch.matched);
}

/* --- Text Matching --- */
function matchText(input, acceptedList, original) {
    if (!input) return { matched: false, type: 'empty', input: input };

    const normalized = normalizeText(input);

    // Exact match (after normalization)
    for (const accepted of acceptedList) {
        if (normalized === normalizeText(accepted)) {
            return { matched: true, type: 'exact', input: input };
        }
    }

    // Check if input contains any accepted value or vice versa
    for (const accepted of acceptedList) {
        const normAccepted = normalizeText(accepted);
        if (normalized.includes(normAccepted) || normAccepted.includes(normalized)) {
            if (normalized.length >= 3) {
                return { matched: true, type: 'exact', input: input };
            }
        }
    }

    // Fuzzy match - check similarity
    for (const accepted of acceptedList) {
        const sim = similarity(normalized, normalizeText(accepted));
        if (sim > 0.6) {
            return { matched: false, type: 'fuzzy', input: input, closeTo: accepted };
        }
    }

    return { matched: false, type: 'wrong', input: input };
}

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // remove diacritics
        .replace(/ł/g, 'l')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
}

function similarity(a, b) {
    if (!a || !b) return 0;
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    if (longer.length === 0) return 1;
    const dist = levenshtein(longer, shorter);
    return (longer.length - dist) / longer.length;
}

function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = b[i - 1] === a[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[b.length][a.length];
}

/* --- Confirm Dialog (fuzzy matches) --- */
function showConfirmDialog(titleMatch, artistMatch, song) {
    stopPlayback();
    document.getElementById('playerArea').style.display = 'none';

    let text = '';
    if (titleMatch.type === 'fuzzy') {
        text += `Czy chodziło Ci o tytuł: <strong>"${song.title}"</strong>?<br>`;
    }
    if (artistMatch.type === 'fuzzy') {
        text += `Czy chodziło Ci o wykonawcę: <strong>"${song.artist}"</strong>?`;
    }

    document.getElementById('confirmText').innerHTML = text;
    document.getElementById('confirmDialog').style.display = 'block';

    pendingConfirm = {
        titleMatched: titleMatch.matched || titleMatch.type === 'fuzzy',
        artistMatched: artistMatch.matched || artistMatch.type === 'fuzzy',
        titleExact: titleMatch.matched,
        artistExact: artistMatch.matched
    };
}

function confirmYes() {
    if (!pendingConfirm) return;
    document.getElementById('confirmDialog').style.display = 'none';
    processAnswer(pendingConfirm.titleMatched, pendingConfirm.artistMatched);
    pendingConfirm = null;
}

function confirmNo() {
    document.getElementById('confirmDialog').style.display = 'none';
    document.getElementById('playerArea').style.display = 'block';
    const titleExact = pendingConfirm ? pendingConfirm.titleExact : false;
    const artistExact = pendingConfirm ? pendingConfirm.artistExact : false;
    // Only count the exact matches
    if (titleExact || artistExact) {
        processAnswer(titleExact, artistExact);
    }
    pendingConfirm = null;
}

/* --- Process Answer --- */
function processAnswer(titleCorrect, artistCorrect) {
    stopPlayback();
    const idx = currentSongIndex;
    const song = gameSongs[idx];
    const result = songResults[idx];

    result.guessedTitle = titleCorrect;
    result.guessedArtist = artistCorrect;
    result.revealed = true;

    // Calculate points
    let pts = 0;
    if (titleCorrect) pts += pointsPerCorrect;
    if (artistCorrect && DIFF_SETTINGS[difficulty].artistPoints) pts += pointsPerCorrect;

    if (titleCorrect || artistCorrect) {
        guessedCount++;
    }
    score += pts;
    updateScoreDisplay();

    // Update slot UI
    const slot = document.getElementById(`songSlot${idx}`);
    if (titleCorrect && artistCorrect) {
        slot.classList.add('correct');
        slot.querySelector('.mel-song-slot__status').textContent = '✅';
        slot.querySelector('.mel-song-slot__info').textContent = `${song.title} — ${song.artist}`;
    } else if (titleCorrect || artistCorrect) {
        slot.classList.add('partial');
        slot.querySelector('.mel-song-slot__status').textContent = '🟡';
        slot.querySelector('.mel-song-slot__info').textContent = `${song.title} — ${song.artist}`;
    } else {
        slot.classList.add('wrong');
        slot.querySelector('.mel-song-slot__status').textContent = '❌';
        slot.querySelector('.mel-song-slot__info').textContent = `${song.title} — ${song.artist}`;
    }

    // Check if all done or find next
    const nextUnrevealed = songResults.findIndex(r => !r.revealed);
    if (nextUnrevealed === -1) {
        stopPlayback();
        clearInterval(timer);
        setTimeout(endGame, 500);
    } else {
        selectSong(nextUnrevealed);
    }
}

/* --- Skip Song --- */
function skipSong() {
    if (currentSongIndex < 0 || timeLeft <= 0) return;
    if (songResults[currentSongIndex].revealed) return;

    // Find next unrevealed song (wrap around)
    const start = currentSongIndex;
    let next = (currentSongIndex + 1) % TOTAL_SONGS;
    while (next !== start && songResults[next].revealed) {
        next = (next + 1) % TOTAL_SONGS;
    }
    if (next !== start) {
        selectSong(next);
    }
}

/* --- End Game --- */
function endGame() {
    stopPlayback();
    clearInterval(timer);

    // Mark any unrevealed as wrong
    songResults.forEach((r, i) => {
        if (!r.revealed) {
            r.revealed = true;
            r.guessedTitle = false;
            r.guessedArtist = false;
            const slot = document.getElementById(`songSlot${i}`);
            if (slot) {
                slot.classList.add('wrong');
                slot.querySelector('.mel-song-slot__status').textContent = '⏰';
                slot.querySelector('.mel-song-slot__info').textContent =
                    `${gameSongs[i].title} — ${gameSongs[i].artist}`;
            }
        }
    });

    showMelScreen('screenResults');

    // Calculate max possible points
    const maxPoints = DIFF_SETTINGS[difficulty].artistPoints
        ? TOTAL_SONGS * pointsPerCorrect * 2
        : TOTAL_SONGS * pointsPerCorrect;

    const percent = guessedCount / TOTAL_SONGS;

    // Results UI
    const icon = document.getElementById('melResultsIcon');
    const title = document.getElementById('melResultsTitle');
    const subtitle = document.getElementById('melResultsSubtitle');

    if (percent >= passThreshold) {
        icon.textContent = '🏆';
        title.textContent = 'Brawo, mistrzyni melodii!';
        subtitle.textContent = `Zaliczone! Zdobyłaś ${score} punktów`;
        markGameComplete(3);
    } else {
        icon.textContent = '🎵';
        title.textContent = 'Prawie!';
        const needed = Math.ceil(passThreshold * TOTAL_SONGS);
        subtitle.textContent = `Potrzebujesz ${needed}/${TOTAL_SONGS} zgadniętych piosenek. Spróbuj jeszcze raz!`;
    }

    document.getElementById('melFinalScore').textContent = score;

    // Build results list
    const list = document.getElementById('resultsSongsList');
    list.innerHTML = '';
    gameSongs.forEach((song, i) => {
        const r = songResults[i];
        const div = document.createElement('div');
        div.className = 'mel-result-row';
        
        let statusIcon = '❌';
        let statusClass = 'wrong';
        if (r.guessedTitle && r.guessedArtist) {
            statusIcon = '✅';
            statusClass = 'correct';
        } else if (r.guessedTitle || r.guessedArtist) {
            statusIcon = '🟡';
            statusClass = 'partial';
        }
        
        div.classList.add(statusClass);
        div.innerHTML = `
            <span class="mel-result-row__icon">${statusIcon}</span>
            <span class="mel-result-row__text"><strong>${song.title}</strong> — ${song.artist}</span>
        `;
        list.appendChild(div);
    });
}

/* --- Save Progress --- */
function markGameComplete(gameNumber) {
    let progress = [];
    try { progress = JSON.parse(localStorage.getItem('womensday_progress')) || []; } catch(e) {}
    if (!progress.includes(gameNumber)) {
        progress.push(gameNumber);
        localStorage.setItem('womensday_progress', JSON.stringify(progress));
    }
}

/* --- Restart --- */
function restartMelodia() {
    stopPlayback();
    clearInterval(timer);
    showMelScreen('screenDifficulty');
}

/* --- Helpers --- */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
