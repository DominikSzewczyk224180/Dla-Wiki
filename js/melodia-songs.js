/* =============================================
   JAKA TO MELODIA - PULA PIOSENEK
   
   WAŻNE: Musisz wpisać poprawne YouTube Video ID
   dla każdej piosenki! ID to ciąg znaków z URL:
   https://www.youtube.com/watch?v=TUTAJ_JEST_ID
   
   Np. dla https://www.youtube.com/watch?v=dQw4w9WgXcQ
   youtubeId = "dQw4w9WgXcQ"
   
   Znajdź każdą piosenkę na YouTube i wklej ID.
   ============================================= */

const MELODIA_SONGS = [
    {
        title: "Ordinary",
        artist: "Alex Warren",
        acceptedTitles: ["ordinary"],
        acceptedArtists: ["alex warren", "warren", "alex"],
        youtubeId: "WPISZ_ID_1",  // ← wpisz YouTube ID
        startAt: 30  // od której sekundy zacząć odtwarzanie
    },
    {
        title: "Fever Dream",
        artist: "Alex Warren",
        acceptedTitles: ["fever dream"],
        acceptedArtists: ["alex warren", "warren", "alex"],
        youtubeId: "WPISZ_ID_2",
        startAt: 20
    },
    {
        title: "W kilometrach",
        artist: "Dawid Podsiadło i Kasia Sochacka",
        acceptedTitles: ["w kilometrach", "kilometrach", "kilometry"],
        acceptedArtists: ["dawid podsiadlo", "podsiadlo", "dawid", "kasia sochacka", "sochacka", "dawid podsiadło", "podsiadło"],
        youtubeId: "WPISZ_ID_3",
        startAt: 30
    },
    {
        title: "Kiss Cam",
        artist: "Mata",
        acceptedTitles: ["kiss cam", "kisscam"],
        acceptedArtists: ["mata"],
        youtubeId: "WPISZ_ID_4",
        startAt: 20
    },
    {
        title: "Up Up Up",
        artist: "Mata",
        acceptedTitles: ["up up up", "up up", "up"],
        acceptedArtists: ["mata"],
        youtubeId: "WPISZ_ID_5",
        startAt: 25
    },
    {
        title: "1 na 100",
        artist: "Mata",
        acceptedTitles: ["1 na 100", "jeden na sto", "1na100"],
        acceptedArtists: ["mata"],
        youtubeId: "WPISZ_ID_6",
        startAt: 20
    },
    {
        title: "Azizam",
        artist: "Ed Sheeran",
        acceptedTitles: ["azizam"],
        acceptedArtists: ["ed sheeran", "sheeran", "ed", "edd sheeran", "edd"],
        youtubeId: "WPISZ_ID_7",
        startAt: 25
    },
    {
        title: "Bad Habits",
        artist: "Ed Sheeran",
        acceptedTitles: ["bad habits", "bad habbits"],
        acceptedArtists: ["ed sheeran", "sheeran", "ed", "edd sheeran", "edd"],
        youtubeId: "WPISZ_ID_8",
        startAt: 30
    },
    {
        title: "Chyba że z tobą",
        artist: "Sanah",
        acceptedTitles: ["chyba ze z toba", "chyba że z tobą", "chyba ze z toba", "chyba ze z toба"],
        acceptedArtists: ["sanah"],
        youtubeId: "WPISZ_ID_9",
        startAt: 20
    },
    {
        title: "Santa Cruz",
        artist: "Sanah",
        acceptedTitles: ["santa cruz", "santacruz"],
        acceptedArtists: ["sanah"],
        youtubeId: "WPISZ_ID_10",
        startAt: 25
    },
    {
        title: "Modelki",
        artist: "Sanah",
        acceptedTitles: ["modelki"],
        acceptedArtists: ["sanah"],
        youtubeId: "WPISZ_ID_11",
        startAt: 20
    },
    {
        title: "Przester",
        artist: "Young Leosia i Bambi",
        acceptedTitles: ["przester"],
        acceptedArtists: ["young leosia", "leosia", "bambi", "young leosia bambi", "leosia bambi"],
        youtubeId: "WPISZ_ID_12",
        startAt: 15
    },
    {
        title: "BFF",
        artist: "Young Leosia i Bambi",
        acceptedTitles: ["bff"],
        acceptedArtists: ["young leosia", "leosia", "bambi", "young leosia bambi", "leosia bambi"],
        youtubeId: "WPISZ_ID_13",
        startAt: 20
    },
    {
        title: "Yang",
        artist: "Young Leosia",
        acceptedTitles: ["yang"],
        acceptedArtists: ["young leosia", "leosia"],
        youtubeId: "WPISZ_ID_14",
        startAt: 20
    },
    {
        title: "Nudy",
        artist: "Vito Bambino",
        acceptedTitles: ["nudy"],
        acceptedArtists: ["vito bambino", "vito", "bambino", "etna vito", "etna"],
        youtubeId: "WPISZ_ID_15",
        startAt: 20
    },
    {
        title: "Etna",
        artist: "Vito Bambino",
        acceptedTitles: ["etna"],
        acceptedArtists: ["vito bambino", "vito", "bambino"],
        youtubeId: "WPISZ_ID_16",
        startAt: 20
    },
    {
        title: "Taxi",
        artist: "Kizo",
        acceptedTitles: ["taxi"],
        acceptedArtists: ["kizo"],
        youtubeId: "WPISZ_ID_17",
        startAt: 15
    },
    {
        title: "100 BPM",
        artist: "Kizo",
        acceptedTitles: ["100 bpm", "100bpm", "sto bpm"],
        acceptedArtists: ["kizo"],
        youtubeId: "WPISZ_ID_18",
        startAt: 15
    },
    {
        title: "Bletka",
        artist: "Kizo",
        acceptedTitles: ["bletka", "blętka"],
        acceptedArtists: ["kizo"],
        youtubeId: "WPISZ_ID_19",
        startAt: 20
    },
    {
        title: "12 to 12",
        artist: "Sombr",
        acceptedTitles: ["12 to 12", "twelve to twelve", "12to12"],
        acceptedArtists: ["sombr"],
        youtubeId: "WPISZ_ID_20",
        startAt: 15
    },
    {
        title: "Lovestory",
        artist: "White 2115",
        acceptedTitles: ["lovestory", "love story"],
        acceptedArtists: ["white 2115", "white", "2115"],
        youtubeId: "WPISZ_ID_21",
        startAt: 20
    },
    {
        title: "Renegades",
        artist: "X Ambassadors",
        acceptedTitles: ["renegades"],
        acceptedArtists: ["x ambassadors", "ambassadors", "x ambasadors"],
        youtubeId: "WPISZ_ID_22",
        startAt: 25
    },
];
