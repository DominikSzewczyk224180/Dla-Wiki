/* =============================================
   WOMEN'S DAY - MAIN SCRIPT
   Handles: petals, progress, game unlocking
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initPetals();
    initProgress();
    initScrollAnimations();
});

/* --- Floating Petals --- */
function initPetals() {
    const container = document.getElementById('petalsContainer');
    const petalEmojis = ['🌸', '🩷', '💗', '🪷', '✿', '❀', '🩰'];
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
        const isUnlocked = i === 1 || completed.includes(i - 1);

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
        } else if (isUnlocked) {
            if (statusBadge) {
                statusBadge.className = 'status-badge status-badge--ready';
                statusBadge.textContent = 'Do zagrania';
            }
            if (btn) {
                btn.classList.remove('game-card__btn--locked');
                btn.textContent = 'Graj!';
            }
        } else {
            card.classList.add('game-card--locked');
            if (statusBadge) {
                statusBadge.className = 'status-badge status-badge--locked';
                statusBadge.textContent = '🔒 Zablokowane';
            }
            if (btn) {
                btn.classList.add('game-card__btn--locked');
                btn.textContent = 'Odblokuj';
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

        // Trigger confetti
        createConfetti();
    }
}

/* --- Confetti Effect --- */
function createConfetti() {
    const container = document.getElementById('prizeConfetti');
    if (!container) return;

    const confettiChars = ['🎉', '🎊', '✨', '💖', '🌸', '⭐', '💝', '🎀'];
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
