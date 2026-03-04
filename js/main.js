/* =============================================
   WOMEN'S DAY - MAIN SCRIPT
   Handles: petals, progress, game unlocking
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initPetals();
    initProgress();
    initScrollAnimations();
    initNameHover();
});

/* --- Name Hover Swap --- */
function initNameHover() {
    const nameEl = document.getElementById('heroName');
    if (!nameEl) return;

    const originalText = 'Wiki';
    const hoverText = 'mojego Dziubaska';

    nameEl.addEventListener('mouseenter', () => {
        nameEl.textContent = hoverText;
    });

    nameEl.addEventListener('mouseleave', () => {
        nameEl.textContent = originalText;
    });

    // Touch support for mobile
    nameEl.addEventListener('touchstart', () => {
        nameEl.textContent = hoverText;
    });

    nameEl.addEventListener('touchend', () => {
        setTimeout(() => { nameEl.textContent = originalText; }, 1500);
    });
}

/* --- Floating Petals --- */
function initPetals() {
    const container = document.getElementById('petalsContainer');
    const petalEmojis = ['❋', '✾', '❁', '✿', '❀', '♡', '·'];
    const PETAL_COUNT = 20;

    for (let i = 0; i < PETAL_COUNT; i++) {
        setTimeout(() => createPetal(container, petalEmojis), i * 800);
    }

    // Keep creating petals
    setInterval(() => createPetal(container, petalEmojis), 2000);
}

function createPetal(container, emojis) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const startX = Math.random() * 100;
    const duration = 8 + Math.random() * 10;
    const size = 0.7 + Math.random() * 1;

    petal.style.left = `${startX}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.fontSize = `${size}rem`;
    petal.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(petal);

    // Remove after animation
    setTimeout(() => petal.remove(), (duration + 3) * 1000);
}

/* --- Progress & Game Unlock System --- */
function initProgress() {
    updateProgressUI();
    // Listen for storage changes (when coming back from a game)
    window.addEventListener('focus', updateProgressUI);
    // Also check on page visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateProgressUI();
    });
}

function getCompletedGames() {
    const data = localStorage.getItem('womensday_progress');
    return data ? JSON.parse(data) : [];
}

function updateProgressUI() {
    const completed = getCompletedGames();
    const totalGames = 4;
    const progressPercent = (completed.length / totalGames) * 100;

    // Update progress bar
    const fill = document.getElementById('progressFill');
    if (fill) {
        fill.style.width = `${progressPercent}%`;
    }

    // Update step dots
    document.querySelectorAll('.progress-step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        if (completed.includes(stepNum)) {
            step.classList.add('completed');
        } else {
            step.classList.remove('completed');
        }
    });

    // Update game cards
    for (let i = 1; i <= totalGames; i++) {
        const card = document.getElementById(`gameCard${i}`);
        if (!card) continue;

        const isCompleted = completed.includes(i);

        // Remove all states first
        card.classList.remove('game-card--locked', 'game-card--completed');

        const statusBadge = card.querySelector('.status-badge');
        const btn = card.querySelector('.game-card__btn');

        if (isCompleted) {
            card.classList.add('game-card--completed');
            if (statusBadge) {
                statusBadge.className = 'status-badge status-badge--completed';
                statusBadge.textContent = '✓ Ukończone';
            }
            if (btn) {
                btn.classList.remove('game-card__btn--locked');
                btn.textContent = 'Zagraj ponownie';
            }
        } else {
            // All games are always available
            if (statusBadge) {
                statusBadge.className = 'status-badge status-badge--ready';
                statusBadge.textContent = 'Do zagrania';
            }
            if (btn) {
                btn.classList.remove('game-card__btn--locked');
                btn.textContent = 'Graj!';
            }
        }
    }

    // Check if all games completed → show prize
    if (completed.length === totalGames) {
        showPrize();
    }
}

function showPrize() {
    const prizeSection = document.getElementById('prizeSection');
    if (prizeSection && !prizeSection.classList.contains('visible')) {
        prizeSection.classList.add('visible');

        // Scroll to prize
        setTimeout(() => {
            prizeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

        // Init scratch cards
        setTimeout(initScratchCards, 600);

        // Trigger confetti
        createConfetti();
    }
}

/* --- Confetti Effect --- */
function createConfetti() {
    const container = document.getElementById('prizeConfetti');
    if (!container) return;

    const confettiChars = ['✧', '★', '❋', '♡', '❀', '·', '✦', '♥'];
    const count = 40;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.textContent = confettiChars[Math.floor(Math.random() * confettiChars.length)];
            confetti.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${Math.random() * 100}%;
                font-size: ${0.8 + Math.random() * 1.2}rem;
                pointer-events: none;
                animation: confettiFall ${2 + Math.random() * 3}s ease-out forwards;
                z-index: 10;
            `;
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 80);
    }

    // Add confetti keyframes if not exists
    if (!document.getElementById('confettiStyles')) {
        const style = document.createElement('style');
        style.id = 'confettiStyles';
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
                100% { transform: translateY(400px) rotate(${360 + Math.random() * 360}deg) scale(0.3); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Stagger animation for game cards
    const cards = document.querySelectorAll('.game-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
}

/* --- Helper: Mark game as complete (called from game pages) --- */
// Games will call: localStorage.setItem('womensday_progress', JSON.stringify([...completed, gameNumber]))
// Then redirect back to index.html

/* --- Reset All Progress --- */
function resetProgress() {
    if (confirm('Na pewno chcesz zresetować cały postęp?')) {
        localStorage.removeItem('womensday_progress');
        const prizeSection = document.getElementById('prizeSection');
        if (prizeSection) prizeSection.classList.remove('visible');
        updateProgressUI();
    }
}

/* --- Scratch Card System --- */
function initScratchCards() {
    [1, 2, 3].forEach(id => {
        const canvas = document.getElementById('canvas' + id);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let isScratching = false;
        let scratchPercent = 0;

        // Size canvas to container
        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            drawCover(ctx, canvas.width, canvas.height);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse events
        canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
        canvas.addEventListener('mousemove', (e) => { if (isScratching) scratch(e); });
        canvas.addEventListener('mouseup', () => { isScratching = false; checkReveal(id, canvas, ctx); });
        canvas.addEventListener('mouseleave', () => { isScratching = false; });

        // Touch events
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isScratching = true; scratchTouch(e); });
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isScratching) scratchTouch(e); });
        canvas.addEventListener('touchend', () => { isScratching = false; checkReveal(id, canvas, ctx); });

        function scratch(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            eraseScratch(ctx, x, y);
        }

        function scratchTouch(e) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            eraseScratch(ctx, x, y);
        }
    });
}

function drawCover(ctx, w, h) {
    // Metallic pink gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ec407a');
    grad.addColorStop(0.3, '#f48fb1');
    grad.addColorStop(0.5, '#f8bbd0');
    grad.addColorStop(0.7, '#f48fb1');
    grad.addColorStop(1, '#d81b60');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal shimmer lines
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
    }

    // Sparkle dots
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // Text
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold ' + Math.min(w * 0.08, 20) + 'px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ZDRAP MNIE!', w / 2, h / 2 - 10);
    ctx.font = Math.min(w * 0.06, 14) + 'px Quicksand, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('przesuń palcem lub myszką', w / 2, h / 2 + 15);
}

function eraseScratch(ctx, x, y) {
    ctx.globalCompositeOperation = 'destination-out';

    // Main circle
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Irregular edges for realism
    for (let i = 0; i < 5; i++) {
        const ox = x + (Math.random() - 0.5) * 30;
        const oy = y + (Math.random() - 0.5) * 30;
        const r = 5 + Math.random() * 12;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
}

function checkReveal(id, canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparent++;
    }

    const percent = transparent / total;

    // If >50% scratched, reveal fully
    if (percent > 0.5) {
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
            canvas.style.display = 'none';
            // Show QR button
            const btn = document.getElementById('qrBtn' + id);
            if (btn) btn.style.display = 'inline-block';
        }, 500);
    }
}

function showQR(id) {
    const popup = document.getElementById('qrPopup' + id);
    const btn = document.getElementById('qrBtn' + id);
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
        btn.textContent = '🔽 Schowaj kod QR';
    } else {
        popup.style.display = 'none';
        btn.textContent = 'Kliknij aby odebrać ›';
    }
}

/* --- Scratch & Reveal Prizes --- */
function revealPrize(num) {
    const area = document.getElementById('scratch' + num);
    const cover = document.getElementById('cover' + num);

    if (area.classList.contains('revealed')) return;

    // Animate scratch off
    cover.classList.add('scratching');

    // After scratch animation, show the prize
    setTimeout(() => {
        area.classList.add('revealed');
        cover.style.display = 'none';

        // Mini confetti burst
        createMiniConfetti(area);
    }, 800);
}

function createMiniConfetti(container) {
    const chars = ['✧', '★', '❋', '♡', '❀', '·', '✦'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const c = document.createElement('span');
            c.textContent = chars[Math.floor(Math.random() * chars.length)];
            c.style.cssText = `
                position: fixed;
                top: ${container.getBoundingClientRect().top + 40}px;
                left: ${container.getBoundingClientRect().left + Math.random() * container.offsetWidth}px;
                font-size: ${0.8 + Math.random() * 1}rem;
                pointer-events: none;
                z-index: 999;
                animation: miniConfetti ${1.5 + Math.random() * 1.5}s ease-out forwards;
            `;
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 3000);
        }, i * 50);
    }

    // Add keyframes if not exists
    if (!document.getElementById('miniConfettiStyles')) {
        const style = document.createElement('style');
        style.id = 'miniConfettiStyles';
        style.textContent = `
            @keyframes miniConfetti {
                0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
                100% { transform: translateY(-120px) translateX(${-40 + Math.random() * 80}px) scale(0.3) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}
