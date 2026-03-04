/* =============================================
   QUIZ O NAS - 28 pytań, losuje 10
   ============================================= */

const QUESTIONS_ONAS = [
    {
        question: "Jakie piwo piliśmy na plaży na Cyprze?",
        answers: ["Heineken", "KEO", "Efes", "Corona"],
        correct: 1,
        funFact: "KEO — pyszne było!"
    },
    {
        question: "Gdzie pierwszy raz się całowaliśmy?",
        answers: ["Na Małej Czantorii", "Na Pniowcu", "Na Rynku w Krakowie", "W parku w Rybniku"],
        correct: 0,
        funFact: "Mała Czantoria — najromantyczniejszy szczyt!"
    },
    {
        question: "Co jedliśmy na pierwszej randce?",
        answers: ["Sushi", "Burgera", "Pizzę hawajską", "Kebaba"],
        correct: 2,
        funFact: "Pizza hawajska — kontrowersyjna, ale nasza!"
    },
    {
        question: "W jakim muzeum byliśmy po raz pierwszy razem?",
        answers: ["Muzeum Narodowe w Krakowie", "Muzeum Iluzji w Łodzi", "Muzeum Techniki w Łodzi", "Muzeum Śląskie w Katowicach"],
        correct: 1,
        funFact: "Muzeum Iluzji — pamiętasz te szalone fotki?"
    },
    {
        question: "Gdzie jechaliśmy po raz pierwszy razem hulajnogą?",
        answers: ["We Wrocławiu", "W Łodzi", "W Rybniku", "Na Cyprze"],
        correct: 1,
        funFact: "Łódź na hulajnodze — to było cos XD!"
    },
    {
        question: "Jaką rzeką płynęliśmy pierwszy raz kajakiem?",
        answers: ["Mała Panew", "Odra", "Rzeka Ruda", "Wisła"],
        correct: 2,
        funFact: "Rzeka Ruda — nasza pierwsza kajak-przygoda!"
    },
    {
        question: "Kiedy spaliśmy po raz pierwszy w namiocie?",
        answers: ["Lipiec 2024", "Sierpień 2024", "Kwiecień 2025", "Maj 2025"],
        correct: 1,
        funFact: "Sierpień 2024 — pamiętna noc!"
    },
    {
        question: "Kto wygrał w mini golfa?",
        answers: ["Donio", "Wiki", "Remis", "Nie dokończyliśmy"],
        correct: 1,
        funFact: "Wiki mistrzyni mini golfa!"
    },
    {
        question: "Co piekliśmy jako pierwsze razem?",
        answers: ["Cynamonki", "Babeczki", "Babkę", "Naleśniki"],
        correct: 1,
        funFact: "Babeczki — początek naszej kulinarnej historii!"
    },
    {
        question: "Kiedy piekliśmy cynamonki?",
        answers: ["24 października", "31 października", "15 listopada", "8 września"],
        correct: 0,
        funFact: "24 października — dzień cynamonkowy!"
    },
    {
        question: "Co jedliśmy na jarmarku w Krakowie?",
        answers: ["Kiełbasę z grilla", "Pajdę z ogórkiem i smalcem", "Oscypka z grilla", "Pierogi"],
        correct: 1,
        funFact: "Pajda ze smalcem — klasyk jarmarku!"
    },
    {
        question: "Ile metrów ma szczyt, z którego zjeżdżaliśmy na nartach w Słowacji?",
        answers: ["1024 m (Chopok)", "2024 m (Chopok)", "1624 m (Łomnica)", "1492 m (Kasprowy)"],
        correct: 1,
        funFact: "Chopok — 2024 m, ale smigalismy!"
    },
    {
        question: "Jakie wino piliśmy w 2025 na Walentynki?",
        answers: ["Carlo Rossi", "Hugo", "Nie piliśmy wina", "Prosecco"],
        correct: 1,
        funFact: "Hugo — pyszne bylo!"
    },
    {
        question: "Co Wiki znalazła 16 kwietnia w niespodziance?",
        answers: ["Bilety do kina", "Bilety do Mediolanu", "Zabawkowego konia", "Zdrapkę"],
        correct: 1,
        funFact: "Bilety do Mediolanu! ✈️ Niespodzianka!"
    },
    {
        question: "Co miałem na szyi na balu architekta?",
        answers: ["Sztuczną krew", "Tatuaż rany", "Rysunek kredką do brwi", "Nic"],
        correct: 1,
        funFact: "Tatuaż rany — realistyczny bal!"
    },
    {
        question: "Kto jest największym słodziakiem na świecie?",
        answers: ["Kot Kevin", "Donio", "Pies goldi", "Wiki"],
        correct: 3,
        funFact: "Oczywiście że Wiki!"
    },
    {
        question: "Jakiego smaku lody jedliśmy razem w Mediolanie?",
        answers: ["Wiki pistacjowe, Donio waniliowe", "Oboje Straciatella", "Pistacjowe", "Truskawkowe"],
        correct: 2,
        funFact: "Pistacjowe w Mediolanie — najlepsze na świecie!"
    },
    {
        question: "Jak nazywa się pierwsze jezioro, w jakim się kąpaliśmy?",
        answers: ["Jezioro Lecco", "Jezioro Como", "Pniowiec", "Jezioro Żywieckie"],
        correct: 2,
        funFact: "Pniowiec — nasze jezioro!"
    },
    {
        question: "W co graliśmy 17 lipca 2025?",
        answers: ["W karty", "W Double", "W tenisa", "W prawo dżungli"],
        correct: 2,
        funFact: "Tenis! Kto wygrał...?"
    },
    {
        question: "Jak nazywa się szlak górski w Hiszpanii, na który chodziliśmy?",
        answers: ["Camino de Santiago", "Caminito del Rey", "Ruta del Cares", "Montserrat Trail"],
        correct: 1,
        funFact: "Caminito del Rey — to byłaprzygoda! 🥾"
    },
    {
        question: "Co przestraszyło nas w kajaku w Hiszpanii?",
        answers: ["Fala", "Rekin", "Meduza", "Burza"],
        correct: 2,
        funFact: "Meduza! Panika! Donio Ratuj!🪼😱"
    },
    {
        question: "Gdzie był koncert Eda Sheerana, na który razem \"jechaliśmy\"?",
        answers: ["W Krakowie", "W Warszawie", "We Wrocławiu", "W Gdańsku"],
        correct: 2,
        funFact: "Wrocław! Ed Sheeran dał czadu!(na parkingu tez XD)"
    },
    {
        question: "Co jedliśmy we Wrocławiu przed koncertem Eda?",
        answers: ["Pizzę", "Kebaba", "Nic", "Makaron"],
        correct: 1,
        funFact: "Kebab przed koncertem i to jaki!"
    },
    {
        question: "Gdzie odwiedziliśmy żółte domy o dziwnych kształtach?",
        answers: ["W Amsterdamie", "W Rotterdamie", "W Hadze", "W Brukseli"],
        correct: 1,
        funFact: "Cube Houses w Rotterdamie!"
    },
    {
        question: "Ile razy piekliśmy razem cynamonki?",
        answers: ["1 raz", "2 razy", "3 razy", "4 razy"],
        correct: 1,
        funFact: "2 razy — i za każdym razem pyszne!"
    },
    {
        question: "Gdzie byliśmy pierwszy raz w saunie?",
        answers: ["W Polsce", "Na Słowacji", "W Turcji", "Na Cyprze"],
        correct: 2,
        funFact: "Turcja — na chwile ale tak!"
    },
    {
        question: "Co jedliśmy po powrocie z sylwestra w 2026 roku?",
        answers: ["Kebaba", "Langosza", "Hot doga", "Pizzę"],
        correct: 1,
        funFact: "Langosz — taki wyczekany!"
    },
    {
        question: "Czego NIE było w sushi, jakie razem zrobiliśmy?",
        answers: ["Ogórek", "Awokado", "Papryka", "Tuńczyk"],
        correct: 2,
        funFact: "Papryka?! W sushi? Nigdy!"
    },
];

/* --- Game State --- */
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
const TOTAL = 10;

/* --- Screens --- */
function showScreen(id) {
    document.querySelectorAll('.qon-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* --- Start --- */
function startQuizONas() {
    currentIndex = 0;
    score = 0;
    answered = false;
    currentQuestions = shuffle([...QUESTIONS_ONAS]).slice(0, TOTAL);
    showScreen('screenQuiz');
    loadQuestion();
}

/* --- Load Question --- */
function loadQuestion() {
    answered = false;
    const q = currentQuestions[currentIndex];

    document.getElementById('qCounter').textContent = `${currentIndex + 1} / ${TOTAL}`;
    document.getElementById('qScore').textContent = score;
    document.getElementById('qProgressFill').style.width = `${(currentIndex / TOTAL) * 100}%`;
    document.getElementById('qFeedback').textContent = '';

    // Question
    const qEl = document.getElementById('qText');
    qEl.textContent = q.question;
    qEl.style.animation = 'none';
    qEl.offsetHeight;
    qEl.style.animation = '';

    // Shuffle answers but track correct
    const indices = shuffle([0, 1, 2, 3]);
    const container = document.getElementById('qAnswers');
    container.innerHTML = '';

    indices.forEach(origIdx => {
        const btn = document.createElement('button');
        btn.className = 'qon-answer';
        btn.textContent = q.answers[origIdx];
        btn.dataset.idx = origIdx;
        btn.addEventListener('click', () => handleAnswer(btn, origIdx, q));
        container.appendChild(btn);
    });
}

/* --- Handle Answer --- */
function handleAnswer(btn, idx, q) {
    if (answered) return;
    answered = true;

    const isCorrect = idx === q.correct;
    const buttons = document.querySelectorAll('.qon-answer');

    buttons.forEach(b => {
        b.classList.add('disabled');
        if (parseInt(b.dataset.idx) === q.correct) b.classList.add('correct');
    });

    if (isCorrect) {
        score++;
        btn.classList.add('correct');
        document.getElementById('qScore').textContent = score;
    } else {
        btn.classList.add('wrong');
    }

    // Fun fact
    const fb = document.getElementById('qFeedback');
    fb.textContent = q.funFact || (isCorrect ? 'Dobrze!' : `Poprawna odpowiedź: ${q.answers[q.correct]}`);
    fb.style.animation = 'none';
    fb.offsetHeight;
    fb.style.animation = '';

    setTimeout(nextQuestion, 3000);
}

/* --- Next --- */
function nextQuestion() {
    currentIndex++;
    if (currentIndex >= TOTAL) {
        showResults();
    } else {
        loadQuestion();
    }
}

/* --- Results --- */
function showResults() {
    showScreen('screenResults');

    const pct = score / TOTAL;
    const icon = document.getElementById('rIcon');
    const title = document.getElementById('rTitle');
    const sub = document.getElementById('rSub');

    if (pct >= 0.9) {
        icon.textContent = '★';
        title.textContent = 'Znasz mnie idealnie!';
        sub.textContent = 'Wow, pamiętasz prawie wszystko!';
    } else if (pct >= 0.7) {
        icon.textContent = '♡';
        title.textContent = 'Super!';
        sub.textContent = 'Znasz naszą historię świetnie!';
    } else if (pct >= 0.5) {
        icon.textContent = '~';
        title.textContent = 'Nieźle!';
        sub.textContent = 'Ale kilka rzeczy Ci umknęło...';
    } else {
        icon.textContent = '?';
        title.textContent = 'Hmm...';
        sub.textContent = 'Chyba pora na więcej wspólnych chwil!';
    }

    document.getElementById('rScore').textContent = score;

    // Always pass - it's a fun quiz
    saveProgress(2);
}

function saveProgress(n) {
    let p = [];
    try { p = JSON.parse(localStorage.getItem('womensday_progress')) || []; } catch(e) {}
    if (!p.includes(n)) { p.push(n); localStorage.setItem('womensday_progress', JSON.stringify(p)); }
}

function restartQuizONas() {
    showScreen('screenStart');
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
