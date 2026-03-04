/* =============================================
   JAKA TO MELODIA - GAME LOGIC (v2)
   Uses YouTube IFrame API loaded dynamically.
   Timer runs ONLY when video is playing.
   ============================================= */

let difficulty = 'easy';
let totalTime = 40;
let timeLeft = 40;
let timerInterval = null;
let score = 0;
let guessedCount = 0;
let currentSongIndex = -1;
let gameSongs = [];
let songResults = [];
let passThreshold = 10;
let ytPlayer = null;
let ytApiReady = false;
let musicPlaying = false;
const TOTAL_SONGS = 7;
const MAX_POINTS = 14;
let pendingConfirm = null;

const DIFF = {
    easy:   { time: 21, threshold: 10 },
    medium: { time: 14, threshold: 12 },
    hard:   { time: 7,  threshold: 13 }
};

/* --- Load YouTube IFrame API --- */
(function loadYTApi() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
})();

function onYouTubeIframeAPIReady() {
    ytApiReady = true;
}

/* --- Screens --- */
function showScreen(id) {
    document.querySelectorAll('.mel-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* --- Start --- */
function startMelodia(diff) {
    difficulty = diff;
    totalTime = DIFF[diff].time;
    timeLeft = DIFF[diff].time;
    passThreshold = DIFF[diff].threshold;
    score = 0;
    guessedCount = 0;
    currentSongIndex = -1;
    musicPlaying = false;
    songResults = [];
    clearTimer();

    gameSongs = shuffle([...MELODIA_SONGS]).slice(0, TOTAL_SONGS);
    buildSlots();
    updateUI();
    showScreen('screenGame');
    selectSong(0);
}

/* --- Build song slot buttons --- */
function buildSlots() {
    const c = document.getElementById('songsContainer');
    c.innerHTML = '';
    gameSongs.forEach((_, i) => {
        songResults.push({ title: false, artist: false, done: false });
        const el = document.createElement('div');
        el.className = 'mel-song-slot';
        el.id = 'slot' + i;
        el.innerHTML = `
            <span class="mel-song-slot__number">${i+1}</span>
            <span class="mel-song-slot__status">🎵</span>
            <span class="mel-song-slot__info">Piosenka ${i+1}</span>`;
        el.onclick = () => selectSong(i);
        c.appendChild(el);
    });
}

/* --- Select a song --- */
function selectSong(i) {
    if (songResults[i].done) return;

    destroyPlayer();
    currentSongIndex = i;

    // Highlight
    document.querySelectorAll('.mel-song-slot').forEach((s, j) => s.classList.toggle('active', j === i));

    // Show player
    document.getElementById('playerArea').style.display = 'block';
    document.getElementById('confirmDialog').style.display = 'none';
    document.getElementById('playerLabel').textContent = `Piosenka ${i+1}`;
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputArtist').value = '';

    // Create YouTube player via IFrame API (only if time left)
    if (timeLeft > 0) {
        createPlayer(gameSongs[i]);
    }

    document.getElementById('inputTitle').focus();
}

/* --- YouTube Player (IFrame API) --- */
function createPlayer(song) {
    // Remove old player div if exists, keep cover
    const old = document.getElementById('ytPlayerDiv');
    if (old) old.remove();

    const wrapper = document.getElementById('ytWrapper');
    const div = document.createElement('div');
    div.id = 'ytPlayerDiv';
    wrapper.appendChild(div);

    // Reset cover
    document.getElementById('coverIcon').textContent = '▶️';
    document.getElementById('coverText').textContent = 'Kliknij żeby odtworzyć';

    function init() {
        ytPlayer = new YT.Player('ytPlayerDiv', {
            height: '300',
            width: '100%',
            videoId: song.youtubeId,
            playerVars: {
                start: song.startAt || 0,
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                fs: 0,
                playsinline: 1,
                disablekb: 1,
                showinfo: 0
            },
            events: {
                onStateChange: onYTState
            }
        });
    }

    if (ytApiReady) {
        init();
    } else {
        const check = setInterval(() => {
            if (ytApiReady) { clearInterval(check); init(); }
        }, 200);
    }
}

function onYTState(e) {
    if (e.data === YT.PlayerState.PLAYING) {
        musicPlaying = true;
        startTimer();
        document.getElementById('timerLabel').textContent = '🔊 Czas leci!';
        document.getElementById('coverIcon').textContent = '⏸️';
        document.getElementById('coverText').textContent = 'Kliknij żeby zatrzymać';
    } else {
        musicPlaying = false;
        clearTimer();
        if (timeLeft > 0) {
            document.getElementById('timerLabel').textContent = '⏸️ Czas zatrzymany — myśl!';
        }
        document.getElementById('coverIcon').textContent = '▶️';
        document.getElementById('coverText').textContent = 'Kliknij żeby odtworzyć';
    }
}

function togglePlay() {
    if (!ytPlayer || timeLeft <= 0) return;
    try {
        const state = ytPlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            ytPlayer.pauseVideo();
        } else {
            ytPlayer.playVideo();
        }
    } catch(e) {
        // Player not ready yet, try playing
        try { ytPlayer.playVideo(); } catch(e2) {}
    }
}

function destroyPlayer() {
    musicPlaying = false;
    clearTimer();
    if (ytPlayer) {
        try { ytPlayer.destroy(); } catch(e) {}
        ytPlayer = null;
    }
    document.getElementById('timerLabel').textContent = '⏸️ Czas zatrzymany';
}

/* --- Timer (only when music plays) --- */
function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateUI();
        if (timeLeft <= 0) {
            timeLeft = 0;
            updateUI();
            // Stop music but DON'T end game — let user type remaining answers
            if (ytPlayer) {
                try { ytPlayer.pauseVideo(); } catch(e) {}
            }
            musicPlaying = false;
            clearTimer();
            document.getElementById('timerLabel').textContent = '⏰ Czas minął! Wpisuj odpowiedzi z pamięci';
            document.getElementById('coverIcon').textContent = '🚫';
            document.getElementById('coverText').textContent = 'Czas się skończył';
            // Show end game button
            document.getElementById('endGameBtn').style.display = 'inline-block';
        }
    }, 1000);
}

function clearTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

/* --- UI Updates --- */
function updateUI() {
    document.getElementById('timerValue').textContent = timeLeft + 's';
    document.getElementById('scoreValue').textContent = score;

    const pct = (timeLeft / totalTime) * 100;
    const bar = document.getElementById('timerBarFill');
    bar.style.width = pct + '%';
    bar.classList.toggle('warning', pct < 50 && pct >= 25);
    bar.classList.toggle('critical', pct < 25);
}

/* --- Submit --- */
function submitAnswer() {
    if (currentSongIndex < 0) return;
    if (songResults[currentSongIndex].done) return;

    const song = gameSongs[currentSongIndex];
    const inT = document.getElementById('inputTitle').value.trim();
    const inA = document.getElementById('inputArtist').value.trim();
    if (!inT && !inA) return;

    destroyPlayer();

    const tMatch = matchText(inT, song.acceptedTitles);
    const aMatch = matchText(inA, song.acceptedArtists);

    if (tMatch.type === 'fuzzy' || aMatch.type === 'fuzzy') {
        showConfirm(tMatch, aMatch, song);
        return;
    }
    processAnswer(tMatch.ok, aMatch.ok);
}

/* --- Matching --- */
function matchText(input, accepted) {
    if (!input) return { ok: false, type: 'empty' };
    const n = norm(input);

    for (const a of accepted) {
        if (n === norm(a)) return { ok: true, type: 'exact' };
    }
    for (const a of accepted) {
        const na = norm(a);
        if (n.length >= 3 && (n.includes(na) || na.includes(n))) return { ok: true, type: 'exact' };
    }
    for (const a of accepted) {
        if (sim(n, norm(a)) > 0.6) return { ok: false, type: 'fuzzy', close: a };
    }
    return { ok: false, type: 'wrong' };
}

function norm(t) {
    return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l').replace(/[^a-z0-9\s]/g,'').trim();
}

function sim(a, b) {
    if (!a||!b) return 0;
    const l = a.length > b.length ? a : b;
    const s = a.length > b.length ? b : a;
    if (!l.length) return 1;
    return (l.length - lev(l, s)) / l.length;
}

function lev(a, b) {
    const m = [];
    for (let i = 0; i <= b.length; i++) m[i] = [i];
    for (let j = 0; j <= a.length; j++) m[0][j] = j;
    for (let i = 1; i <= b.length; i++)
        for (let j = 1; j <= a.length; j++)
            m[i][j] = Math.min(m[i-1][j]+1, m[i][j-1]+1, m[i-1][j-1]+(b[i-1]===a[j-1]?0:1));
    return m[b.length][a.length];
}

/* --- Confirm dialog --- */
function showConfirm(tM, aM, song) {
    document.getElementById('playerArea').style.display = 'none';
    let txt = '';
    if (tM.type === 'fuzzy') txt += `Czy chodziło Ci o tytuł: <strong>"${song.title}"</strong>?<br>`;
    if (aM.type === 'fuzzy') txt += `Czy chodziło Ci o wykonawcę: <strong>"${song.artist}"</strong>?`;
    document.getElementById('confirmText').innerHTML = txt;
    document.getElementById('confirmDialog').style.display = 'block';
    pendingConfirm = {
        titleOk: tM.ok || tM.type === 'fuzzy',
        artistOk: aM.ok || aM.type === 'fuzzy',
        titleExact: tM.ok,
        artistExact: aM.ok
    };
}

function confirmYes() {
    if (!pendingConfirm) return;
    document.getElementById('confirmDialog').style.display = 'none';
    processAnswer(pendingConfirm.titleOk, pendingConfirm.artistOk);
    pendingConfirm = null;
}

function confirmNo() {
    document.getElementById('confirmDialog').style.display = 'none';
    const te = pendingConfirm ? pendingConfirm.titleExact : false;
    const ae = pendingConfirm ? pendingConfirm.artistExact : false;
    if (te || ae) processAnswer(te, ae);
    else {
        document.getElementById('playerArea').style.display = 'block';
    }
    pendingConfirm = null;
}

/* --- Process --- */
function processAnswer(titleOk, artistOk) {
    const i = currentSongIndex;
    const song = gameSongs[i];
    const r = songResults[i];
    r.title = titleOk;
    r.artist = artistOk;
    r.done = true;

    let pts = 0;
    if (titleOk) pts++;
    if (artistOk) pts++;
    if (titleOk || artistOk) guessedCount++;
    score += pts;
    updateUI();

    // Update slot
    const slot = document.getElementById('slot' + i);
    if (titleOk && artistOk) {
        slot.classList.add('correct');
        slot.querySelector('.mel-song-slot__status').textContent = '✅';
    } else if (titleOk || artistOk) {
        slot.classList.add('partial');
        slot.querySelector('.mel-song-slot__status').textContent = '🟡';
    } else {
        slot.classList.add('wrong');
        slot.querySelector('.mel-song-slot__status').textContent = '❌';
    }
    slot.querySelector('.mel-song-slot__info').textContent = `${song.title} — ${song.artist}`;

    const next = songResults.findIndex(r => !r.done);
    if (next === -1) setTimeout(endGame, 400);
    else selectSong(next);
}

/* --- Skip --- */
function skipSong() {
    if (currentSongIndex < 0 || songResults[currentSongIndex].done) return;
    if (timeLeft > 0) destroyPlayer();
    const start = currentSongIndex;
    let next = (start + 1) % TOTAL_SONGS;
    while (next !== start && songResults[next].done) next = (next + 1) % TOTAL_SONGS;
    if (next !== start) selectSong(next);
}

/* --- End Game --- */
function endGame() {
    destroyPlayer();

    songResults.forEach((r, i) => {
        if (!r.done) {
            r.done = true;
            const slot = document.getElementById('slot' + i);
            slot.classList.add('wrong');
            slot.querySelector('.mel-song-slot__status').textContent = '⏰';
            slot.querySelector('.mel-song-slot__info').textContent = `${gameSongs[i].title} — ${gameSongs[i].artist}`;
        }
    });

    showScreen('screenResults');

    const icon = document.getElementById('melResultsIcon');
    const title = document.getElementById('melResultsTitle');
    const sub = document.getElementById('melResultsSub');

    if (score >= passThreshold) {
        icon.textContent = '🏆';
        title.textContent = 'Brawo, mistrzyni melodii!';
        sub.textContent = `Zaliczone! ${score} / ${MAX_POINTS} punktów`;
        saveProgress(3);
    } else {
        icon.textContent = '🎵';
        title.textContent = 'Prawie!';
        sub.textContent = `${score} / ${MAX_POINTS} pkt — potrzeba ${passThreshold}. Spróbuj jeszcze raz!`;
    }
    document.getElementById('melFinalScore').textContent = score;

    // List
    const list = document.getElementById('resultsSongsList');
    list.innerHTML = '';
    gameSongs.forEach((song, i) => {
        const r = songResults[i];
        const div = document.createElement('div');
        let ic = '❌', cls = 'wrong', det = '0 pkt';
        if (r.title && r.artist) { ic = '✅'; cls = 'correct'; det = '+2 pkt'; }
        else if (r.title) { ic = '🟡'; cls = 'partial'; det = '+1 (tytuł)'; }
        else if (r.artist) { ic = '🟡'; cls = 'partial'; det = '+1 (wykonawca)'; }
        div.className = 'mel-result-row ' + cls;
        div.innerHTML = `<span class="mel-result-row__icon">${ic}</span>
            <span class="mel-result-row__text"><strong>${song.title}</strong> — ${song.artist}
            <span style="color:var(--text-light);font-size:0.78em;">(${det})</span></span>`;
        list.appendChild(div);
    });
}

function saveProgress(n) {
    let p = [];
    try { p = JSON.parse(localStorage.getItem('womensday_progress')) || []; } catch(e) {}
    if (!p.includes(n)) { p.push(n); localStorage.setItem('womensday_progress', JSON.stringify(p)); }
}

function restartMelodia() {
    destroyPlayer();
    showScreen('screenDifficulty');
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
