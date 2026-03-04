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
        correct: 1,
        funFact: "Nil — 6650 km, choć Amazonka ma więcej wody 💧"
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
        question: "W jakim kraju leży Machu Picchu?",
        answers: ["Kolumbia", "Chile", "Peru", "Boliwia"],
        correct: 2
    },
    {
        category: "Geografia",
        question: "Jak nazywa się najgłębsze jezioro na świecie?",
        answers: ["Bajkał", "Titicaca", "Tanganika", "Kaspijskie"],
        correct: 0,
        funFact: "Bajkał ma 1642 m głębokości! 🌊"
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
        question: "Które miasto jest stolicą Kanady?",
        answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correct: 2
    },
    {
        category: "Geografia",
        question: "Na jakiej wyspie leży Bali?",
        answers: ["Borneo", "Jawa", "Sumatra", "Bali to osobna wyspa"],
        correct: 3,
        funFact: "Bali to kiedyś maybe... 🌺"
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
    {
        category: "Podróże ✈️",
        question: "Który kraj NIE leży w Azji Południowo-Wschodniej?",
        answers: ["Wietnam", "Tajlandia", "Indie", "Kambodża"],
        correct: 2
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
        question: "Jak nazywa się okno okrągłe w architekturze gotyckiej?",
        answers: ["Luneta", "Rozeta", "Okulus", "Bifora"],
        correct: 1
    },
    {
        category: "Architektura 🏛️",
        question: "Który architekt zaprojektował Centrum Pompidou w Paryżu?",
        answers: ["Renzo Piano i Richard Rogers", "Norman Foster", "Frank Gehry", "I.M. Pei"],
        correct: 0,
        funFact: "Instalacje techniczne na zewnątrz budynku — szok w 1977 roku! 🎨"
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
        question: "Kto zaprojektował muzeum Guggenheima w Bilbao?",
        answers: ["Zaha Hadid", "Frank Gehry", "Tadao Ando", "Rem Koolhaas"],
        correct: 1,
        funFact: "Gehry pokrył go tytanem — budynek wygląda jak rzeźba! 🏗️"
    },
    {
        category: "Architektura 🏛️",
        question: "Jak nazywa się poziomy element konstrukcyjny łączący słupy?",
        answers: ["Rygiel", "Krokiew", "Płatew", "Murłata"],
        correct: 0
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
        question: "Z jakiego materiału zbudowana jest opera w Sydney?",
        answers: ["Szkło i stal", "Żelbetowe skorupy z ceramiką", "Marmur", "Drewno i beton"],
        correct: 1
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
        question: "Ile stopni ma kąt prosty?",
        answers: ["45°", "60°", "90°", "180°"],
        correct: 2
    },
    {
        category: "Matematyka 🔢",
        question: "Ile kątów ma trójkąt, w którym jeden kąt to 90°?",
        answers: ["1 prosty, 2 ostre", "2 proste, 1 ostry", "3 ostre", "1 prosty, 1 ostry, 1 rozwarty"],
        correct: 0
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
        question: "Chodzi po polu, nazywa się Kura — co to jest?",
        answers: ["Kura", "Traktor", "Krowa", "Kurka polna"],
        correct: 1,
        funFact: "Ha! Kura to marka traktora! 🚜😂"
    },
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
        question: "Jeśli masz 3 jabłka i zabierzesz 2, ile masz jabłek?",
        answers: ["1", "2", "3", "0"],
        correct: 1,
        funFact: "Zabrałaś 2 — więc masz 2! 🍎🍎"
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Co rośnie w dół?",
        answers: ["Drzewo", "Sopel lodu", "Stalaktyt", "Sopel i stalaktyt"],
        correct: 3
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Przed czym ludzie zamykają oczy?",
        answers: ["Przed ciemnością", "Przed strachem", "Przed przyszłością", "Przed snem"],
        correct: 2,
        funFact: "Filozoficznie! Ale też przed snem 😄"
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Kto jest na banknocie 100 zł?",
        answers: ["Fryderyk Chopin", "Władysław Jagiełło", "Mieszko I", "Jan III Sobieski"],
        correct: 1
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Pasterz miał 17 owiec. Wszystkie oprócz 9 uciekły. Ile zostało?",
        answers: ["8", "9", "17", "0"],
        correct: 1,
        funFact: "\"Wszystkie oprócz 9\" — czyli 9 zostało! 🐑"
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Ile razy można odjąć 5 od 25?",
        answers: ["5 razy", "4 razy", "1 raz", "Nieskończenie"],
        correct: 2,
        funFact: "Za pierwszym razem — potem odejmujesz już od 20! 🤓"
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
        question: "Jaki owoc jest symbolem marki Apple?",
        answers: ["Gruszka", "Jabłko", "Wiśnia", "Brzoskwinia"],
        correct: 1
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
        question: "Jaki kolor powstaje z mieszania niebieskiego i żółtego?",
        answers: ["Fioletowy", "Zielony", "Pomarańczowy", "Brązowy"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Ile to tuzin?",
        answers: ["6", "10", "12", "24"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się samiec pszczoły?",
        answers: ["Szerszeń", "Truteń", "Bąk", "Osa"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Kto wynalazł żarówkę?",
        answers: ["Nikola Tesla", "Thomas Edison", "Albert Einstein", "Graham Bell"],
        correct: 1
    },
    {
        category: "Wiedza ogólna",
        question: "Ile razy w ciągu doby wskazówki zegara tworzą kąt prosty?",
        answers: ["2", "4", "24", "44"],
        correct: 3,
        funFact: "44 razy! To sprytna zagadka zegarowa ⏰"
    },
    {
        category: "Wiedza ogólna",
        question: "Jaką grupę krwi nazywa się \"uniwersalnym dawcą\"?",
        answers: ["A Rh+", "B Rh-", "0 Rh-", "AB Rh+"],
        correct: 2
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
        question: "Ile centymetrów jest w jednym metrze?",
        answers: ["10", "100", "1000", "10000"],
        correct: 1
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
        question: "Ile to jest wiek (jako jednostka czasu)?",
        answers: ["10 lat", "50 lat", "100 lat", "1000 lat"],
        correct: 2
    },
    {
        category: "Wiedza ogólna",
        question: "Jak nazywa się stolica Hiszpanii?",
        answers: ["Barcelona", "Madryt", "Sewilla", "Walencja"],
        correct: 1
    },
    {
        category: "Podchwytliwe 🤔",
        question: "Co ma głowę i ogon, ale nie ma ciała?",
        answers: ["Wąż", "Moneta", "Kometa", "Szpilka"],
        correct: 1,
        funFact: "Orzeł czy reszka? 🪙"
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
