/* =============================================
   JAKA TO MELODIA - GAME LOGIC
   
   Timer only runs while music is playing.
   Pause music = pause timer = think forever.
   1 point for correct title, 1 for correct artist.
   Max 14 points (7 songs × 2).
   Easy: need 10/14, Medium: 12/14, Hard: 13/14
   ============================================= */

let difficulty = 'easy';
let totalTime = 40;
let timeLeft = 40;
let timer = null;
let score = 0;
let guessedCount = 0;
let currentSongIndex = -1;
let gameSongs = [];
let songResults = [];
let isPlaying = false;
let ytPlayer = null;
let ytReady = false;
let passThreshold = 10;
const TOTAL_SONGS = 7;
const MAX_POINTS = 14;

let pendingConfirm = null;

/* --- Difficulty --- */
const DIFF_SETTINGS = {
    easy:   { time: 40, threshold: 10 },
    medium: { time: 30, threshold: 12 },
    hard:   { time: 20, threshold: 13 }
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
    passThreshold = settings.threshold;
    score = 0;
    guessedCount = 0;
    currentSongIndex = -1;
    isPlaying = false;
    songResults = [];

    gameSongs = shuffleArray([...MELODIA_SONGS]).slice(0, TOTAL_SONGS);

    buildSongSlots();
    updateScoreDisplay();
    updateTimerDisplay();

    showMelScreen('screenGame');
    initYTPlayer();

    // DON'T start timer here — it starts only when music plays
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

    // Pause current playback when switching
    stopPlayback();

    currentSongIndex = index;

    document.querySelectorAll('.mel-song-slot').forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });

    document.getElementById('playerArea').style.display = 'block';
    document.getElementById('confirmDialog').style.display = 'none';
    document.getElementById('playerNumber').textContent = `Piosenka ${index + 1}`;
    document.getElementById('playerStatus').textContent = 'Kliknij play żeby posłuchać — czas leci tylko gdy gra muzyka!';
    document.getElementById('playIcon').textContent = '▶️';
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputArtist').value = '';
    document.getElementById('inputTitle').focus();

    if (ytPlayer && ytReady) {
        const song = gameSongs[index];
        try {
            ytPlayer.cueVideoById({
                videoId: song.youtubeId,
                startSeconds: song.startAt || 0
            });
        } catch(e) {}
    }
}

/* --- YouTube Player --- */
function initYTPlayer() {
    if (ytPlayer) {
        try { ytPlayer.destroy(); } catch(e) {}
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
        document.getElementById('playerStatus').textContent = '🔊 Gra... (czas leci!)';
        startTimer();
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        document.getElementById('playIcon').textContent = '▶️';
        document.getElementById('playerStatus').textContent = '⏸️ Pauza — czas zatrzymany, możesz myśleć';
        pauseTimer();
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
    pauseTimer();
}

/* --- Timer (only runs when music plays) --- */
function startTimer() {
    if (timer) return; // already running
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            timeLeft = 0;
            updateTimerDisplay();
            stopPlayback();
            pauseTimer();
            endGame();
        }
    }, 1000);
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function updateTimerDisplay() {
    document.getElementById('timerValue').textContent = timeLeft;

    const percent = (timeLeft / totalTime) * 100;
    const fill = document.getElementById('timerBarFill');
    fill.style.width = `${percent}%`;

    if (percent < 25) {
        fill.classList.add('critical');
        fill.classList.remove('warning');
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

    stopPlayback();

    const titleMatch = matchText(inputTitle, song.acceptedTitles, song.title);
    const artistMatch = matchText(inputArtist, song.acceptedArtists, song.artist);

    // Check if fuzzy matches need confirmation
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

    // Contains match (one word is enough for artist)
    for (const accepted of acceptedList) {
        const normAccepted = normalizeText(accepted);
        if (normalized.length >= 3 && (normalized.includes(normAccepted) || normAccepted.includes(normalized))) {
            return { matched: true, type: 'exact', input: input };
        }
    }

    // Fuzzy match - Levenshtein
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
        .replace(/[\u0300-\u036f]/g, '')
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

/* --- Confirm Dialog --- */
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

    // 1 point for title, 1 point for artist
    let pts = 0;
    if (titleCorrect) pts++;
    if (artistCorrect) pts++;

    if (titleCorrect || artistCorrect) guessedCount++;
    score += pts;
    updateScoreDisplay();

    // Update slot UI
    const slot = document.getElementById(`songSlot${idx}`);
    if (titleCorrect && artistCorrect) {
        slot.classList.add('correct');
        slot.querySelector('.mel-song-slot__status').textContent = '✅';
    } else if (titleCorrect || artistCorrect) {
        slot.classList.add('partial');
        slot.querySelector('.mel-song-slot__status').textContent = '🟡';
    } else {
        slot.classList.add('wrong');
        slot.querySelector('.mel-song-slot__status').textContent = '❌';
    }
    slot.querySelector('.mel-song-slot__info').textContent = `${song.title} — ${song.artist}`;

    // Find next unrevealed
    const nextUnrevealed = songResults.findIndex(r => !r.revealed);
    if (nextUnrevealed === -1) {
        setTimeout(endGame, 500);
    } else {
        selectSong(nextUnrevealed);
    }
}

/* --- Skip Song --- */
function skipSong() {
    if (currentSongIndex < 0 || timeLeft <= 0) return;
    if (songResults[currentSongIndex].revealed) return;

    stopPlayback();

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
    pauseTimer();

    // Mark unrevealed as missed
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

    const icon = document.getElementById('melResultsIcon');
    const title = document.getElementById('melResultsTitle');
    const subtitle = document.getElementById('melResultsSubtitle');

    if (score >= passThreshold) {
        icon.textContent = '🏆';
        title.textContent = 'Brawo, mistrzyni melodii!';
        subtitle.textContent = `Zaliczone! Zdobyłaś ${score} / ${MAX_POINTS} punktów`;
        markGameComplete(3);
    } else {
        icon.textContent = '🎵';
        title.textContent = 'Prawie!';
        subtitle.textContent = `Zdobyłaś ${score} / ${MAX_POINTS} pkt. Potrzebujesz ${passThreshold} pkt żeby zaliczyć. Spróbuj jeszcze raz!`;
    }

    document.getElementById('melFinalScore').textContent = score;

    // Results list
    const list = document.getElementById('resultsSongsList');
    list.innerHTML = '';
    gameSongs.forEach((song, i) => {
        const r = songResults[i];
        const div = document.createElement('div');
        div.className = 'mel-result-row';

        let statusIcon = '❌';
        let statusClass = 'wrong';
        let detail = '';
        if (r.guessedTitle && r.guessedArtist) {
            statusIcon = '✅'; statusClass = 'correct'; detail = '(+2 pkt)';
        } else if (r.guessedTitle) {
            statusIcon = '🟡'; statusClass = 'partial'; detail = '(+1 pkt — tytuł)';
        } else if (r.guessedArtist) {
            statusIcon = '🟡'; statusClass = 'partial'; detail = '(+1 pkt — wykonawca)';
        } else {
            detail = '(0 pkt)';
        }

        div.classList.add(statusClass);
        div.innerHTML = `
            <span class="mel-result-row__icon">${statusIcon}</span>
            <span class="mel-result-row__text"><strong>${song.title}</strong> — ${song.artist} <span style="color:var(--text-light);font-size:0.8em;">${detail}</span></span>
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
    pauseTimer();
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
