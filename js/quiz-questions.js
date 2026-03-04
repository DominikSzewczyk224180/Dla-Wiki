/* =============================================
   QUIZ - 100 PYTAŃ
   Kategorie: Geografia, Podróże, Architektura,
   Matematyka, Podchwytliwe, Wiedza ogólna
   ============================================= */

const QUESTIONS = [
    // ===== GEOGRAFIA =====
    {
        category: "Geografia",
        question: "Jaka jest stolica Malezji?",
        answers: ["Kuala Lumpur", "Singapur", "Bangkok", "Dżakarta"],
        correct: 0,
        funFact: "Za niedługo tam będziemy! 🌴✈️"
    },
    {
        category: "Geografia",
        question: "Jaka jest stolica Tajlandii?",
        answers: ["Hanoi", "Kuala Lumpur", "Bangkok", "Manila"],
        correct: 2,
        funFact: "Bangkok czeka na nas! 🛕✨"
    },
    {
        category: "Geografia",
        question: "Jaka jest stolica Chin?",
        answers: ["Szanghaj", "Pekin", "Hongkong", "Shenzhen"],
        correct: 1,
        funFact: "Pekin — pierwsze wielkie miasto na naszej trasie! 🏯"
    },
    {
        category: "Geografia",
        question: "Ile kilometrów ma Wielki Mur Chiński?",
        answers: ["ok. 2 000 km", "ok. 6 000 km", "ok. 21 000 km", "ok. 15 000 km"],
        correct: 2,
        funFact: "21 196 km — zobaczymy go na własne oczy! 🧱😍"
    },
    {
        category: "Geografia",
        question: "Jaka jest najdłuższa rzeka w Polsce?",
        answers: ["Odra", "Bug", "Wisła", "Warta"],
        correct: 2,
        funFact: "Wisła ma 1047 km długości! 🏞️"
    },
    {
        category: "Geografia",
        question: "Jaka jest najdłuższa rzeka w Europie?",
        answers: ["Dunaj", "Ren", "Wołga", "Wisła"],
        correct: 2,
        funFact: "Wołga ma aż 3531 km! 🌊"
    },
    {
        category: "Geografia",
        question: "Jaka jest najdłuższa rzeka na świecie?",
        answers: ["Amazonka", "Nil", "Jangcy", "Missisipi"],
        correct: 0,
        funFact: "Amazonka ma ok. 7000 km — największa na świecie! 🌊"
    },
    {
        category: "Geografia",
        question: "Jaki jest najwyższy szczyt świata?",
        answers: ["K2", "Kangchenjunga", "Mont Blanc", "Mount Everest"],
        correct: 3,
        funFact: "8848 m n.p.m. — kolos! 🏔️"
    },
    {
        category: "Geografia",
        question: "Jaka jest stolica Australii?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
        funFact: "Nie Sydney — to częsty błąd! 😉"
    },
    {
        category: "Geografia",
        question: "Ile kontynentów jest na świecie?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        category: "Geografia",
        question: "Jaki kraj ma kształt buta na mapie?",
        answers: ["Hiszpania", "Grecja", "Włochy", "Portugalia"],
        correct: 2,
        funFact: "Włoski but — nie da się zapomnieć! 🥾🇮🇹"
    },
    {
        category: "Geografia",
        question: "Na jakiej wyspie leży Bali?",
        answers: ["Borneo", "Jawa", "Sumatra", "Bali to osobna wyspa"],
        correct: 3,
        funFact: "Bali to kiedyś odwiedzimy... 🌺"
    },
    {
        category: "Geografia",
        question: "Jaka jest stolica Turcji?",
        answers: ["Stambuł", "Ankara", "Izmir", "Antalya"],
        correct: 1,
        funFact: "Nie Stambuł! Ankara jest stolicą od 1923 roku 🕌"
    },
    // ===== PODRÓŻE / NASZE PLANY =====
    {
        category: "Podróże ✈️",
        question: "Przez jakie morze przypłynąłbyś do Tajlandii z Malezji?",
        answers: ["Morze Andamańskie", "Morze Południowochińskie", "Morze Jawajskie", "Zatoka Tajlandzka"],
        correct: 3,
        funFact: "Nad Zatoką Tajlandzką będziemy plażować! 🏖️"
    },
    {
        category: "Podróże ✈️",
        question: "Jaką walutą płaci się w Tajlandii?",
        answers: ["Dong", "Ringgit", "Baht", "Rupia"],
        correct: 2,
        funFact: "Thai Baht — przydatna wiedza przed wyjazdem! 💸"
    },
    {
        category: "Podróże ✈️",
        question: "Jaką walutą płaci się w Malezji?",
        answers: ["Rupia", "Ringgit", "Baht", "Dolar singapurski"],
        correct: 1,
        funFact: "Ringgit malezyjski — zapamiętaj! 💰"
    },
    {
        category: "Podróże ✈️",
        question: "Jak nazywają się słynne wieże bliźniacze w Kuala Lumpur?",
        answers: ["Twin Towers", "Petronas Towers", "KL Towers", "Menara Towers"],
        correct: 1,
        funFact: "Zrobimy sobie zdjęcie z Petronasami! 📸🏙️"
    },
    {
        category: "Podróże ✈️",
        question: "Jaka jest tradycyjna tajska zupa?",
        answers: ["Pho", "Ramen", "Tom Yum", "Laksa"],
        correct: 2,
        funFact: "Tom Yum Goong — będziemy jeść na ulicy! 🍜"
    },
    {
        category: "Podróże ✈️",
        question: "Jak nazywa się słynna plaża z filmu 'Plaża' w Tajlandii?",
        answers: ["Pattaya Beach", "Maya Bay", "Railay Beach", "Kata Beach"],
        correct: 1,
        funFact: "Maya Bay na Ko Phi Phi — raj na ziemi 🏝️"
    },
    {
        category: "Podróże ✈️",
        question: "Ile godzin lotu dzieli Polskę od Pekinu (mniej więcej)?",
        answers: ["5-6h", "8-9h", "12-13h", "15-16h"],
        correct: 1,
        funFact: "Około 9h — damy radę! ✈️"
    },
    // ===== ARCHITEKTURA =====
    {
        category: "Architektura 🏛️",
        question: "Ile naw ma Bazylika Świętego Piotra w Watykanie?",
        answers: ["3", "4", "5", "7"],
        correct: 0,
        funFact: "Trzy nawy — główna i dwie boczne! Prawdziwa perła renesansu 🏛️"
    },
    {
        category: "Architektura 🏛️",
        question: "Jakie siły głównie działają na kratownicę?",
        answers: ["Siły ścinające", "Rozciąganie i ściskanie", "Siły zginające", "Siły skrętne"],
        correct: 1,
        funFact: "Pręty kratownicy pracują osiowo — to ich siła! 📐"
    },
    {
        category: "Architektura 🏛️",
        question: "Kto zaprojektował Sagradę Familię w Barcelonie?",
        answers: ["Le Corbusier", "Antoni Gaudí", "Frank Lloyd Wright", "Zaha Hadid"],
        correct: 1,
        funFact: "Gaudí pracował nad nią 43 lata i wciąż jest niedokończona! ⛪"
    },
    {
        category: "Architektura 🏛️",
        question: "Co to jest przypora (szkarpa) w architekturze?",
        answers: ["Rodzaj okna", "Element podpierający ścianę", "Typ dachu", "Ozdoba fasady"],
        correct: 1,
        funFact: "Przypory trzymają katedry gotyckie — przyszła architektka to wie! 😏"
    },
    {
        category: "Architektura 🏛️",
        question: "Z czego zbudowany jest Panteon w Rzymie?",
        answers: ["Marmur", "Cegła i beton", "Granit", "Wapień"],
        correct: 1,
        funFact: "Rzymski beton przetrwał 2000 lat — dzisiejszy by nie dał rady! 🏛️"
    },
    {
        category: "Architektura 🏛️",
        question: "Z jakiego materiału budowano piramidy w Gizie?",
        answers: ["Cegła", "Wapień", "Granit", "Marmur"],
        correct: 1,
        funFact: "Bloki wapienne — każdy waży średnio 2,5 tony! 🏗️"
    },
    {
        category: "Architektura 🏛️",
        question: "Jaki styl architektoniczny charakteryzuje łuki ostrołukowe i żebra?",
        answers: ["Romański", "Gotycki", "Barokowy", "Renesansowy"],
        correct: 1
    },
    {
        category: "Architektura 🏛️",
        question: "Co to jest konsola w architekturze?",
        answers: ["Rodzaj fundamentu", "Wspornik wystający ze ściany", "Typ kolumny", "Ozdoba dachu"],
        correct: 1
    },
    {
        category: "Architektura 🏛️",
        question: "Który porządek grecki ma najbardziej ozdobne kapitele (liście akantu)?",
        answers: ["Dorycki", "Joński", "Koryncki", "Toskański"],
        correct: 2,
        funFact: "Koryncki — najbardziej dekoracyjny z porządków! 🌿"
    },
    {
        category: "Architektura 🏛️",
        question: "Jak nazywa się słynna krzywa wieża we Włoszech?",
        answers: ["Wieża w Bolonii", "Krzywa Wieża w Pizie", "Wieża w Wenecji", "Wieża w Mediolanie"],
        correct: 1,
        funFact: "Przechyla się o prawie 4 stopnie! 🏗️"
    },
    {
        category: "Architektura 🏛️",
        question: "Jak nazywa się górna część kolumny?",
        answers: ["Baza", "Trzon", "Kapitel", "Fryz"],
        correct: 2,
        funFact: "Kapitel — ozdoba na szczycie kolumny! 🏛️"
    },
    {
        category: "Architektura 🏛️",
        question: "Ile metrów ma Wieża Eiffla (do szczytu z anteną)?",
        answers: ["280 m", "330 m", "400 m", "510 m"],
        correct: 1,
        funFact: "Dokładnie 330 m — miała być tymczasowa! 🗼"
    },
    {
        category: "Architektura 🏛️",
        question: "W jakim mieście stoi Opera z charakterystycznymi \"żaglami\"?",
        answers: ["Londyn", "Nowy Jork", "Sydney", "Tokio"],
        correct: 2,
        funFact: "Opera w Sydney — jedna z najsłynniejszych budowli świata! 🎭"
    },
    // ===== MATEMATYKA =====
    {
        category: "Matematyka 🔢",
        question: "Ile jest 6 × 8 + 15?",
        answers: ["57", "63", "59", "61"],
        correct: 1,
        funFact: "48 + 15 = 63 — łatwizna! 😎"
    },
    {
        category: "Matematyka 🔢",
        question: "Ile to jest 144 ÷ 12?",
        answers: ["11", "12", "13", "14"],
        correct: 1
    },
    {
        category: "Matematyka 🔢",
        question: "Jaki jest wynik: 7² − 10?",
        answers: ["29", "39", "41", "49"],
        correct: 1
    },
    {
        category: "Matematyka 🔢",
        question: "Ile jest 25% z 200?",
        answers: ["25", "50", "75", "40"],
        correct: 1
    },
    {
        category: "Matematyka 🔢",
        question: "Ile to: √169?",
        answers: ["11", "12", "13", "14"],
        correct: 2
    },
    // ===== PODCHWYTLIWE =====
    {
        category: "Podchwytliwe 🤔",
        question: "Co jest cięższe — kilogram pierza czy kilogram żelaza?",
        answers: ["Pierze", "Żelazo", "Oba ważą tyle samo", "Zależy od objętości"],
        correct: 2,
        funFact: "Kilogram to kilogram! 😜"
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Ile miesięcy w roku ma 28 dni?",
        answers: ["1", "2", "6", "Wszystkie 12"],
        correct: 3,
        funFact: "Każdy miesiąc ma PRZYNAJMNIEJ 28 dni! 📅😉"
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Jaki kolor ma czarna skrzynka w samolocie?",
        answers: ["Czarny", "Pomarańczowy", "Czerwony", "Żółty"],
        correct: 1,
        funFact: "Jest pomarańczowa, żeby łatwo ją znaleźć! 🟠"
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Co rośnie w dół?",
        answers: ["Drzewo", "Sopel lodu", "Stalaktyt", "Sopel i stalaktyt"],
        correct: 3
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Kto jest na banknocie 100 zł?",
        answers: ["Fryderyk Chopin", "Władysław Jagiełło", "Mieszko I", "Jan III Sobieski"],
        correct: 1
    },
    // ===== WIEDZA OGÓLNA =====
    {
        category: "Wiedza ogólna",
        question: "Jaki jest numer alarmowy Straży Pożarnej w Polsce?",
        answers: ["997", "998", "999", "112"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki jest ogólnoeuropejski numer alarmowy?",
        answers: ["911", "999", "112", "110"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Ile jest planet w Układzie Słonecznym?",
        answers: ["7", "8", "9", "10"],
        correct: 1,
        funFact: "Pluton stracił status planety w 2006 roku 🪐"
    },
    {
        category: "Wiedza ogólna",
        question: "Kto namalował Mona Lisę?",
        answers: ["Michelangelo", "Rafael", "Leonardo da Vinci", "Botticelli"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Z ilu kości składa się dorosły ludzki szkielet?",
        answers: ["186", "206", "256", "306"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki gaz stanowi najwięcej w atmosferze Ziemi?",
        answers: ["Tlen", "Azot", "Dwutlenek węgla", "Argon"],
        correct: 1,
        funFact: "Azot to aż 78%! Tlen to \"tylko\" 21% 🌍"
    },
    {
        category: "Wiedza ogólna",
        question: "Ile serdec ma ośmiornica?",
        answers: ["1", "2", "3", "8"],
        correct: 2,
        funFact: "Trzy serca — jedno główne i dwa skrzelowe! 🐙"
    },
    {
        category: "Wiedza ogólna",
        question: "W którym roku człowiek po raz pierwszy stanął na Księżycu?",
        answers: ["1965", "1967", "1969", "1971"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Jaka jest prędkość światła (w przybliżeniu)?",
        answers: ["100 000 km/s", "200 000 km/s", "300 000 km/s", "400 000 km/s"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Ile nóg ma pająk?",
        answers: ["6", "8", "10", "12"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się największy ocean na Ziemi?",
        answers: ["Atlantycki", "Indyjski", "Spokojny", "Arktyczny"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Kto napisał \"Romeo i Julię\"?",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Oscar Wilde"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Ile klawiszy ma standardowy fortepian?",
        answers: ["76", "82", "88", "92"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Jakim symbolem chemicznym oznacza się złoto?",
        answers: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Ile wynosi liczba Pi (zaokrąglona do dwóch miejsc)?",
        answers: ["3,12", "3,14", "3,16", "3,18"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki jest najszybszy zwierzak lądowy?",
        answers: ["Lew", "Gazela", "Gepard", "Koń"],
        correct: 2,
        funFact: "Gepard rozpędza się do 120 km/h! 🐆"
    },
    {
        category: "Wiedza ogólna",
        question: "Ile dni ma rok przestępny?",
        answers: ["364", "365", "366", "367"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Kto wynalazł żarówkę?",
        answers: ["Nikola Tesla", "Thomas Edison", "Albert Einstein", "Graham Bell"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Ile kości ma ludzka dłoń?",
        answers: ["14", "19", "27", "33"],
        correct: 2,
        funFact: "27 kości — aż ćwierć wszystkich kości ciała! 🖐️"
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się czerwona planeta?",
        answers: ["Wenus", "Mars", "Jowisz", "Saturn"],
        correct: 1,
        funFact: "Mars — może kiedyś tam polecisz! 🔴"
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki pierwiastek ma symbol \"O\"?",
        answers: ["Ołów", "Osmium", "Tlen", "Złoto"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Ile to jest dekada?",
        answers: ["5 lat", "10 lat", "50 lat", "100 lat"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki jest największy narząd ludzkiego ciała?",
        answers: ["Wątroba", "Mózg", "Płuca", "Skóra"],
        correct: 3
    },
    {
        category: "Wiedza ogólna",
        question: "Ile państw jest w Unii Europejskiej (2025)?",
        answers: ["25", "27", "28", "30"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Który metal jest ciekły w temperaturze pokojowej?",
        answers: ["Ołów", "Cyna", "Rtęć", "Srebro"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Ile lat trwa kadencja prezydenta RP?",
        answers: ["4 lata", "5 lat", "6 lat", "7 lat"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki kolor ma flaga Japonii (oprócz białego)?",
        answers: ["Niebieski", "Czerwony", "Złoty", "Czarny"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się proces zamiany wody w parę?",
        answers: ["Kondensacja", "Sublimacja", "Parowanie", "Topnienie"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Ile strun ma standardowa gitara?",
        answers: ["4", "5", "6", "8"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "W jakim mieście znajduje się Koloseum?",
        answers: ["Ateny", "Rzym", "Neapol", "Florencja"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Ile to jest kopa?",
        answers: ["40", "50", "60", "100"],
        correct: 2,
        funFact: "Kopa = 60 sztuk — stare polskie słowo! 🇵🇱"
    },
    {
        category: "Wiedza ogólna",
        question: "Który polski król wygrał bitwę pod Grunwaldem?",
        answers: ["Kazimierz Wielki", "Władysław Jagiełło", "Zygmunt Stary", "Jan III Sobieski"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jak się nazywa fobia przed pająkami?",
        answers: ["Klaustrofobia", "Akrofobia", "Arachnofobia", "Trypanofobia"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się najsłynniejsze dzieło Beethovena?",
        answers: ["Cztery pory roku", "Sonata Księżycowa", "Bolero", "Requiem"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Jaki kolor ma szmaragd?",
        answers: ["Czerwony", "Niebieski", "Zielony", "Fioletowy"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "W którym roku zakończyła się II Wojna Światowa?",
        answers: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się stolica Hiszpanii?",
        answers: ["Barcelona", "Madryt", "Sewilla", "Walencja"],
        correct: 1
    },
    {
        category: "Podróże ✈️",
        question: "Jak nazywa się słynna ulica jedzenia w Pekinie?",
        answers: ["Wangfujing", "Silk Street", "Nanluogu", "Dashilan"],
        correct: 0,
        funFact: "Na Wangfujing spróbujemy wszystkiego! 🦂🍡"
    },
    {
        category: "Architektura 🏛️",
        question: "Jak nazywa się najwyższy budynek na świecie (2025)?",
        answers: ["Shanghai Tower", "Burj Khalifa", "One World Trade", "Taipei 101"],
        correct: 1,
        funFact: "828 metrów w Dubaju! 🏗️"
    },
];
