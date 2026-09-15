/* =====================================================
   QUIZERO 2.0
   GAME ENGINE
   ===================================================== */


/* =====================================================
   SUPABASE
   ===================================================== */

const SUPABASE_URL =
    "https://agvkfksnqwdtimrcdkly.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_4A8Ka0gEeqG6WZjpvxIdVw_cit3y-VP";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =====================================================
   SPIELERNAME
   ===================================================== */

function spielerNameLaden() {

    return (
        localStorage.getItem(
            "spieler_name"
        ) ||
        ""
    );

}


function spielerNameSpeichern(
    name
) {

    localStorage.setItem(
        "spieler_name",
        name
    );

}


/* =====================================================
   AVATARE
   ===================================================== */

const AVATARE = [

    {
        emoji: "🦊",
        name: "Fuchs"
    },

    {
        emoji: "🐺",
        name: "Wolf"
    },

    {
        emoji: "🦁",
        name: "Löwe"
    },

    {
        emoji: "🐯",
        name: "Tiger"
    },

    {
        emoji: "🐸",
        name: "Frosch"
    },

    {
        emoji: "🐼",
        name: "Panda"
    },

    {
        emoji: "🦈",
        name: "Hai"
    },

    {
        emoji: "🦅",
        name: "Adler"
    },

    {
        emoji: "🐉",
        name: "Drache"
    },

    {
        emoji: "🤖",
        name: "Roboter"
    },

    {
        emoji: "👽",
        name: "Alien"
    },

    {
        emoji: "🥷",
        name: "Ninja"
    }

];


function avatarLaden() {

    return (
        localStorage.getItem(
            "quizero_avatar"
        ) ||
        "🦊"
    );

}


function avatarSpeichern(
    avatar
) {

    localStorage.setItem(
        "quizero_avatar",
        avatar
    );

}


function avatarEinrichten() {

    let auswahl =
        prompt(

            "Wähle deinen Avatar:\n\n" +

            "1 🦊 Fuchs\n" +
            "2 🐺 Wolf\n" +
            "3 🦁 Löwe\n" +
            "4 🐯 Tiger\n" +
            "5 🐸 Frosch\n" +
            "6 🐼 Panda\n" +
            "7 🦈 Hai\n" +
            "8 🦅 Adler\n" +
            "9 🐉 Drache\n" +
            "10 🤖 Roboter\n" +
            "11 👽 Alien\n" +
            "12 🥷 Ninja\n\n" +

            "Nummer eingeben:"

        );


    if (
        auswahl ===
        null
    ) {

        return false;

    }


    let nummer =
        Number(
            auswahl
        );


    if (
        !Number.isInteger(
            nummer
        ) ||
        nummer < 1 ||
        nummer > AVATARE.length
    ) {

        alert(
            "Ungültige Auswahl."
        );

        return false;

    }


    avatarSpeichern(
        AVATARE[
            nummer - 1
        ].emoji
    );


    spielerUIAktualisieren();

    return true;

}


function avatarAendern() {

    avatarEinrichten();

}


/* =====================================================
   SPIELER EINRICHTEN
   ===================================================== */

function spielerNameEinrichten() {

    let name =
        spielerNameLaden();


    let ersterStart =
        !name;


    if (!name) {

        name =
            prompt(
                "Wie heißt du?"
            );


        if (name) {

            name =
                name.trim();

        }


        if (!name) {

            name =
                "Spieler";

        }


        if (
            name.length >
            20
        ) {

            name =
                name.substring(
                    0,
                    20
                );

        }


        spielerNameSpeichern(
            name
        );

    }


    /*
       Bei einem neuen Spieler
       Avatar auswählen.
    */

    if (
        ersterStart &&
        !localStorage.getItem(
            "quizero_avatar"
        )
    ) {

        avatarEinrichten();

    }


    /*
       Falls ein bestehender Spieler
       noch keinen Avatar besitzt.
    */

    if (
        !localStorage.getItem(
            "quizero_avatar"
        )
    ) {

        avatarSpeichern(
            "🦊"
        );

    }


    spielerBegruessungAktualisieren();

    spielerUIAktualisieren();

}


function spielerNameAendern() {

    let aktuellerName =
        spielerNameLaden();


    let neuerName =
        prompt(
            "Wie soll dein Spielername heißen?",
            aktuellerName
        );


    if (
        neuerName ===
        null
    ) {

        return;

    }


    neuerName =
        neuerName.trim();


    if (!neuerName) {

        return;

    }


    neuerName =
        neuerName.substring(
            0,
            20
        );


    spielerNameSpeichern(
        neuerName
    );


    spielerBegruessungAktualisieren();

    profilAktualisieren();

}


function spielerBegruessungAktualisieren() {

    let name =
        spielerNameLaden();


    let element =
        document.getElementById(
            "spielerBegruessung"
        );


    if (element) {

        element.textContent =
            "Willkommen zurück, " +
            name +
            "!";

    }


    spielerUIAktualisieren();

}


function spielerUIAktualisieren() {

    let avatar =
        avatarLaden();


    let startAvatar =
        document.getElementById(
            "spielerAvatar"
        );


    let profilAvatar =
        document.getElementById(
            "profilAvatar"
        );


    if (startAvatar) {

        startAvatar.textContent =
            avatar;

    }


    if (profilAvatar) {

        profilAvatar.textContent =
            avatar;

    }

}


/* =====================================================
   SPIELERDATEN
   ===================================================== */

function spielerDatenLaden() {

    let daten =
        localStorage.getItem(
            "spieler_daten"
        );


    if (daten) {

        try {

            let spieler =
                JSON.parse(
                    daten
                );


            return {

                xp:
                    Number(
                        spieler.xp
                    ) || 0,

                level:
                    Number(
                        spieler.level
                    ) || 1,

                streak:
                    Number(
                        spieler.streak
                    ) || 0,

                letzterTag:
                    spieler.letzterTag ||
                    "",

                coins:
                    Number(
                        spieler.coins
                    ) || 0

            };

        }

        catch (fehler) {

            console.log(
                "Spielerdaten konnten nicht gelesen werden."
            );

        }

    }


    return {

        xp:
            Number(
                localStorage.getItem(
                    "spieler_xp"
                )
            ) || 0,

        level:
            Number(
                localStorage.getItem(
                    "spieler_level"
                )
            ) || 1,

        streak:
            Number(
                localStorage.getItem(
                    "spieler_streak"
                )
            ) || 0,

        letzterTag:
            localStorage.getItem(
                "spieler_letzterTag"
            ) || "",

        coins:
            Number(
                localStorage.getItem(
                    "spieler_coins"
                )
            ) || 0

    };

}


function spielerDatenSpeichern(
    spieler
) {

    localStorage.setItem(
        "spieler_daten",
        JSON.stringify(
            spieler
        )
    );


    /*
       Zusätzlich alte einzelne Werte
       aktualisieren, damit vorhandene
       QUIZERO-Daten kompatibel bleiben.
    */

    localStorage.setItem(
        "spieler_xp",
        spieler.xp
    );

    localStorage.setItem(
        "spieler_level",
        spieler.level
    );

    localStorage.setItem(
        "spieler_streak",
        spieler.streak
    );

    localStorage.setItem(
        "spieler_letzterTag",
        spieler.letzterTag
    );

    localStorage.setItem(
        "spieler_coins",
        spieler.coins
    );

}


/* =====================================================
   LEVELSYSTEM
   STEIGENDER XP-BEDARF
   ===================================================== */

/*
   Gesamt-XP:

   Level 1 = 0 XP
   Level 2 = 100 XP
   Level 3 = 300 XP
   Level 4 = 600 XP
   Level 5 = 1.000 XP
   Level 6 = 1.500 XP
   ...

   Der benötigte XP-Betrag
   für jedes neue Level steigt.
*/

function xpFuerLevel(
    level
) {

    if (
        level <= 1
    ) {

        return 0;

    }


    return (
        50 *
        (
            level - 1
        ) *
        level
    );

}


function levelBerechnen(
    xp
) {

    xp =
        Math.max(
            0,
            Number(xp) || 0
        );


    let level =
        1;


    while (
        xp >=
        xpFuerLevel(
            level + 1
        )
    ) {

        level++;

    }


    return level;

}


function xpBisNaechstesLevel(
    xp
) {

    xp =
        Math.max(
            0,
            Number(xp) || 0
        );


    let level =
        levelBerechnen(
            xp
        );


    let aktuelleLevelXP =
        xpFuerLevel(
            level
        );


    let naechsteLevelXP =
        xpFuerLevel(
            level + 1
        );


    let xpImLevel =
        xp -
        aktuelleLevelXP;


    let benoetigt =
        naechsteLevelXP -
        aktuelleLevelXP;


    return {

        aktuell:
            xpImLevel,

        benoetigt:
            benoetigt,

        gesamt:
            xp,

        naechstesLevel:
            naechsteLevelXP,

        level:
            level

    };

}


/* =====================================================
   STATISTIK
   ===================================================== */

function statistikLaden() {

    let gespeichert =
        localStorage.getItem(
            "quizero_statistik"
        );


    if (gespeichert) {

        try {

            return JSON.parse(
                gespeichert
            );

        }

        catch (fehler) {}

    }


    return {

        quizze: 0,

        fragen: 0,

        richtig: 0,

        falsch: 0,

        punkte: 0,

        bestePunkte: 0,

        besteCombo: 0,

        gesammelteCoins: 0,

        gesammelteXP: 0

    };

}


function statistikSpeichern(
    statistik
) {

    localStorage.setItem(
        "quizero_statistik",
        JSON.stringify(
            statistik
        )
    );

}


/* =====================================================
   SHOP
   ===================================================== */

const SHOP_ITEMS = {

    joker50: {

        name:
            "50/50",

        icon:
            "½",

        beschreibung:
            "Entfernt zwei falsche Antworten.",

        preis:
            25

    },

    jokerZweiteChance: {

        name:
            "Schutz",

        icon:
            "🛡️",

        beschreibung:
            "Schützt dich einmal vor einem verlorenen Leben.",

        preis:
            40

    },

    jokerZeit: {

        name:
            "+10 Sekunden",

        icon:
            "⏱️",

        beschreibung:
            "Gibt dir 10 Sekunden zusätzliche Zeit.",

        preis:
            30

    },

    jokerHinweis: {

        name:
            "Hinweis",

        icon:
            "💡",

        beschreibung:
            "Hilft dir bei einer schwierigen Frage.",

        preis:
            50

    }

};


function jokerInventarLaden() {

    let gespeichert =
        localStorage.getItem(
            "quizero_joker_inventar"
        );


    if (gespeichert) {

        try {

            let inventar =
                JSON.parse(
                    gespeichert
                );


            return {

                joker50:
                    Number(
                        inventar.joker50
                    ) || 0,

                jokerZweiteChance:
                    Number(
                        inventar.jokerZweiteChance
                    ) || 0,

                jokerZeit:
                    Number(
                        inventar.jokerZeit
                    ) || 0,

                jokerHinweis:
                    Number(
                        inventar.jokerHinweis
                    ) || 0

            };

        }

        catch (fehler) {}

    }


    return {

        joker50: 0,

        jokerZweiteChance: 0,

        jokerZeit: 0,

        jokerHinweis: 0

    };

}


function jokerInventarSpeichern(
    inventar
) {

    localStorage.setItem(
        "quizero_joker_inventar",
        JSON.stringify(
            inventar
        )
    );

}


function shopAnzeigen() {

    timerStoppen();


    screensAusblenden();


    document.getElementById(
        "shop"
    ).style.display =
        "block";


    shopAktualisieren();

}


function shopAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let inventar =
        jokerInventarLaden();


    let coins =
        document.getElementById(
            "shopCoins"
        );


    if (coins) {

        coins.textContent =
            spieler.coins;

    }


    let container =
        document.getElementById(
            "shopInhalt"
        );


    if (!container) {

        return;

    }


    let html =
        "";


    Object.keys(
        SHOP_ITEMS
    ).forEach(
        function(
            key
        ) {

            let item =
                SHOP_ITEMS[
                    key
                ];


            html +=

                "<div class='shop-item'>" +

                    "<div class='shop-item-icon'>" +
                        item.icon +
                    "</div>" +

                    "<h3>" +
                        item.name +
                    "</h3>" +

                    "<p>" +
                        item.beschreibung +
                    "</p>" +

                    "<div class='shop-item-footer'>" +

                        "<div>" +

                            "<div class='shop-price'>" +
                                "🪙 " +
                                item.preis +
                            "</div>" +

                            "<div class='shop-stock'>" +
                                "Besitz: " +
                                inventar[key] +
                            "</div>" +

                        "</div>" +

                        "<button " +
                            "class='shop-buy' " +
                            "onclick=\"shopKaufen('" +
                                key +
                            "')\"" +
                            (
                                spieler.coins <
                                item.preis
                                    ? " disabled"
                                    : ""
                            ) +
                        ">" +
                            "Kaufen" +
                        "</button>" +

                    "</div>" +

                "</div>";

        }
    );


    container.innerHTML =
        html;

}


function shopKaufen(
    jokerTyp
) {

    let item =
        SHOP_ITEMS[
            jokerTyp
        ];


    if (!item) {

        return;

    }


    let spieler =
        spielerDatenLaden();


    if (
        spieler.coins <
        item.preis
    ) {

        alert(
            "Du hast nicht genug Coins."
        );

        return;

    }


    spieler.coins -=
        item.preis;


    spielerDatenSpeichern(
        spieler
    );


    let inventar =
        jokerInventarLaden();


    inventar[
        jokerTyp
    ]++;


    jokerInventarSpeichern(
        inventar
    );


    shopAktualisieren();

    startseiteAktualisieren();

}


/* =====================================================
   KATEGORIEN
   ===================================================== */

const KATEGORIEN = [

    {
        wert: "allgemein",
        name: "🧠 Allgemeinwissen"
    },

    {
        wert: "sport",
        name: "🏆 Sport"
    },

    {
        wert: "geschichte",
        name: "📜 Geschichte"
    },

    {
        wert: "technik",
        name: "⚙️ Technik"
    },

    {
        wert: "wissenschaft",
        name: "🔬 Wissenschaft"
    },

    {
        wert: "geografie",
        name: "🌍 Geografie"
    },

    {
        wert: "film",
        name: "🎬 Film & Serien"
    },

    {
        wert: "musik",
        name: "🎵 Musik"
    },

    {
        wert: "gaming",
        name: "🎮 Gaming"
    },

    {
        wert: "autos",
        name: "🚗 Autos"
    },

    {
        wert: "natur",
        name: "🌿 Natur & Tiere"
    },

    {
        wert: "weltraum",
        name: "🚀 Weltraum"
    },

    {
        wert: "wirtschaft",
        name: "💰 Wirtschaft"
    },

    {
        wert: "essen",
        name: "🍔 Essen & Trinken"
    },

    {
        wert: "literatur",
        name: "📚 Literatur"
    },

    {
        wert: "deutschland",
        name: "🇩🇪 Deutschland"
    },

    {
        wert: "fussball",
        name: "⚽ Fußball"
    },

    {
        wert: "logik",
        name: "🧩 Logik"
    }

];


/* =====================================================
   SPIELMODI
   ===================================================== */

let spielmodus =
    "classic";


let ausgewaehlteKategorie =
    "";


/* =====================================================
   SPIELSTATUS
   ===================================================== */

let fragen = [];

let verwendeteFragen = [];

let aktuelleFrage = 0;

let punkte = 0;

let leben = 3;

let maximaleLeben = 3;

let combo = 0;

let besteCombo = 0;

let richtigBeantwortet = 0;

let falschBeantwortet = 0;

let aktuelleZeit = 20;

let maximaleZeit = 20;

let timer = null;

let antwortGegeben = false;

let rundeAktiv = false;

let bonusSchutz = false;

let aktuelleFrageDaten = null;


/* =====================================================
   STARTSEITE
   ===================================================== */

function startseiteAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let xp =
        xpBisNaechstesLevel(
            spieler.xp
        );


    let level =
        levelBerechnen(
            spieler.xp
        );


    let levelElement =
        document.getElementById(
            "startLevel"
        );


    let streakElement =
        document.getElementById(
            "startStreak"
        );


    let coinsElement =
        document.getElementById(
            "startCoins"
        );


    let xpElement =
        document.getElementById(
            "startXP"
        );


    let xpBalken =
        document.getElementById(
            "startXPBalken"
        );


    let naechstesLevel =
        document.getElementById(
            "startNaechstesLevel"
        );


    if (levelElement) {

        levelElement.textContent =
            "Level " +
            level;

    }


    if (streakElement) {

        streakElement.textContent =
            spieler.streak;

    }


    if (coinsElement) {

        coinsElement.textContent =
            spieler.coins;

    }


    if (xpElement) {

        xpElement.textContent =
            xp.aktuell +
            " / " +
            xp.benoetigt +
            " XP";

    }


    if (xpBalken) {

        xpBalken.style.width =
            (
                xp.aktuell /
                xp.benoetigt *
                100
            ) +
            "%";

    }


    if (naechstesLevel) {

        naechstesLevel.textContent =
            (
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                level +
                1
            );

    }


    spielerUIAktualisieren();

}


/* =====================================================
   NAVIGATION
   ===================================================== */

function screensAusblenden() {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            function(
                screen
            ) {

                screen.style.display =
                    "none";

            }
        );

}


function startAnzeigen() {

    timerStoppen();

    rundeAktiv =
        false;


    screensAusblenden();


    document.getElementById(
        "startbildschirm"
    ).style.display =
        "block";


    startseiteAktualisieren();

    spielerBegruessungAktualisieren();

}


function zurueckZumStart() {

    startAnzeigen();

}


function quizStarten() {

    screensAusblenden();


    document.getElementById(
        "spielmodi"
    ).style.display =
        "block";

}


function zurueckZuModi() {

    screensAusblenden();


    document.getElementById(
        "spielmodi"
    ).style.display =
        "block";

}


function spielmodusWaehlen(
    modus
) {

    spielmodus =
        modus;


    let modusTexte = {

        classic:
            "🎮 Classic · 3 Leben · 20 Sekunden",

        zeitdruck:
            "⚡ Zeitdruck · schneller Timer",

        endlos:
            "♾️ Endlos · spiele so lange du kannst",

        hardcore:
            "💀 Hardcore · 1 Leben · maximaler Bonus"

    };


    document.getElementById(
        "modusAnzeige"
    ).textContent =
        modusTexte[
            modus
        ] ||
        "Wähle dein Thema";


    screensAusblenden();


    document.getElementById(
        "kategorien"
    ).style.display =
        "block";


    kategorienAnzeigen();

}


function nochmalSpielen() {

    screensAusblenden();


    document.getElementById(
        "kategorien"
    ).style.display =
        "block";


    kategorienAnzeigen();

}


/* =====================================================
   KATEGORIEN
   ===================================================== */

function kategorienAnzeigen() {

    let container =
        document.getElementById(
            "kategorieButtons"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    KATEGORIEN.forEach(
        function(
            kategorie
        ) {

            let button =
                document.createElement(
                    "button"
                );


            button.textContent =
                kategorie.name;


            button.onclick =
                function() {

                    kategorieWaehlen(
                        kategorie.wert
                    );

                };


            container.appendChild(
                button
            );

        }
    );

}


function kategorieWaehlen(
    kategorie
) {

    ausgewaehlteKategorie =
        kategorie;


    rundeStarten();

}


/* =====================================================
   FRAGENPOOL
   ===================================================== */

function fragePoolErstellen() {

    let passendeFragen =
        alleFragen.filter(
            function(
                frage
            ) {

                return (
                    frage.kategorie ===
                    ausgewaehlteKategorie
                );

            }
        );


    fragen =
        passendeFragen;

}


function schwierigkeitFuerRunde() {

    let nummer =
        aktuelleFrage +
        1;


    if (
        nummer <=
        5
    ) {

        return "leicht";

    }


    if (
        nummer <=
        10
    ) {

        return "mittel";

    }


    return "schwer";

}


function schwierigkeitText() {

    let schwierig =
        schwierigkeitFuerRunde();


    if (
        schwierig ===
        "leicht"
    ) {

        return "🟢 Leicht";

    }


    if (
        schwierig ===
        "mittel"
    ) {

        return "🟡 Mittel";

    }


    return "🔴 Schwer";

}


/* =====================================================
   RUNDE STARTEN
   ===================================================== */

function rundeStarten() {

    timerStoppen();


    screensAusblenden();


    document.getElementById(
        "quiz"
    ).style.display =
        "block";


    aktuelleFrage =
        0;

    punkte =
        0;

    maximaleLeben =
        spielmodus ===
        "hardcore"
            ? 1
            : 3;

    leben =
        maximaleLeben;

    combo =
        0;

    besteCombo =
        0;

    richtigBeantwortet =
        0;

    falschBeantwortet =
        0;

    verwendeteFragen =
        [];

    bonusSchutz =
        false;

    rundeAktiv =
        true;


    fragePoolErstellen();


    if (
        !fragen.length
    ) {

        alert(
            "Für diese Kategorie wurden keine Fragen gefunden."
        );

        startAnzeigen();

        return;

    }


    quizUIAktualisieren();

    frageAnzeigen();

}


/* =====================================================
   NÄCHSTE FRAGE AUSWÄHLEN
   ===================================================== */

function naechsteFrageAusPool() {

    let schwierig =
        schwierigkeitFuerRunde();


    let pool =
        fragen.filter(
            function(
                frage
            ) {

                return (
                    frage.schwierigkeit ===
                    schwierig
                );

            }
        );


    pool =
        pool.filter(
            function(
                frage
            ) {

                return !verwendeteFragen.includes(
                    frage.frage
                );

            }
        );


    if (
        pool.length ===
        0
    ) {

        pool =
            fragen.filter(
                function(
                    frage
                ) {

                    return !verwendeteFragen.includes(
                        frage.frage
                    );

                }
            );

    }


    if (
        pool.length ===
        0
    ) {

        verwendeteFragen =
            [];

        pool =
            fragen;

    }


    let index =
        Math.floor(
            Math.random() *
            pool.length
        );


    let frage =
        pool[
            index
        ];


    verwendeteFragen.push(
        frage.frage
    );


    return frage;

}


/* =====================================================
   FRAGE ANZEIGEN
   ===================================================== */

function frageAnzeigen() {

    if (!rundeAktiv) {

        return;

    }


    antwortGegeben =
        false;

    bonusSchutz =
        false;


    timerStoppen();


    aktuelleZeit =
        spielmodus ===
        "zeitdruck"
            ? 10
            : 20;


    maximaleZeit =
        aktuelleZeit;


    let frage =
        naechsteFrageAusPool();


    if (!frage) {

        gameOver();

        return;

    }


    aktuelleFrageDaten =
        frage;


    window.aktuelleQuizFrage =
        frage;


    document.getElementById(
        "frage"
    ).textContent =
        frage.frage;


    document.getElementById(
        "rundeInfo"
    ).textContent =
        "Runde " +
        (
            aktuelleFrage +
            1
        );


    document.getElementById(
        "schwierigkeitInfo"
    ).textContent =
        schwierigkeitText();


    document.getElementById(
        "ergebnis"
    ).textContent =
        "";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "";


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        true;


    let antwortContainer =
        document.getElementById(
            "antworten"
        );


    antwortContainer.innerHTML =
        "";


    let antworten =
        frage.antworten.map(
            function(
                text,
                index
            ) {

                return {

                    text:
                        text,

                    richtig:
                        index ===
                        frage.richtig

                };

            }
        );


    antworten.sort(
        function() {

            return (
                Math.random() -
                0.5
            );

        }
    );


    antworten.forEach(
        function(
            antwort
        ) {

            let button =
                document.createElement(
                    "button"
                );


            button.textContent =
                antwort.text;


            button.dataset.richtig =
                antwort.richtig
                    ? "true"
                    : "false";


            button.onclick =
                function() {

                    antwortPruefen(
                        button,
                        antwort.richtig
                    );

                };


            antwortContainer.appendChild(
                button
            );

        }
    );


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

    timerStarten();


    window.scrollTo(
        {
            top: 0,
            behavior: "instant"
        }
    );

}


/* =====================================================
   TIMER
   ===================================================== */

function timerStarten() {

    timerStoppen();


    timer =
        setInterval(
            function() {

                if (
                    !rundeAktiv
                ) {

                    timerStoppen();

                    return;

                }


                aktuelleZeit--;


                timerUIAktualisieren();


                if (
                    aktuelleZeit <=
                    0
                ) {

                    timerStoppen();

                    zeitAbgelaufen();

                }

            },
            1000
        );

}


function timerStoppen() {

    if (timer) {

        clearInterval(
            timer
        );

        timer =
            null;

    }

}


function timerUIAktualisieren() {

    let text =
        document.getElementById(
            "timerText"
        );


    let balken =
        document.getElementById(
            "timerBalken"
        );


    if (text) {

        text.textContent =
            aktuelleZeit;

    }


    if (balken) {

        let prozent =
            Math.max(
                0,
                (
                    aktuelleZeit /
                    maximaleZeit
                ) *
                100
            );


        balken.style.width =
            prozent +
            "%";

    }

}


function zeitAbgelaufen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    antwortGegeben =
        true;


    falschBeantwortet++;

    combo =
        0;


    let buttons =
        document.querySelectorAll(
            "#antworten button"
        );


    buttons.forEach(
        function(
            button
        ) {

            button.disabled =
                true;


            if (
                button.dataset.richtig ===
                "true"
            ) {

                button.classList.add(
                    "richtig"
                );

            }

        }
    );


    leben--;


    document.getElementById(
        "ergebnis"
    ).textContent =
        "⏰ Zeit abgelaufen!";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ff7777";


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;


    quizUIAktualisieren();


    if (
        leben <=
        0
    ) {

        setTimeout(
            function() {

                gameOver();

            },
            650
        );

    }

}


/* =====================================================
   ANTWORT PRÜFEN
   ===================================================== */

function antwortPruefen(
    button,
    richtig
) {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    antwortGegeben =
        true;


    timerStoppen();


    let buttons =
        document.querySelectorAll(
            "#antworten button"
        );


    buttons.forEach(
        function(
            element
        ) {

            element.disabled =
                true;


            if (
                element.dataset.richtig ===
                "true"
            ) {

                element.classList.add(
                    "richtig"
                );

            }

        }
    );


    if (richtig) {

        button.classList.add(
            "richtig"
        );


        richtigBeantwortet++;

        combo++;


        besteCombo =
            Math.max(
                besteCombo,
                combo
            );


        let verdient =
            punkteFuerAntwort();


        punkte +=
            verdient;


        let coins =
            coinsFuerAntwort();


        coinsGutschreiben(
            coins
        );


        document.getElementById(
            "ergebnis"
        ).textContent =
            "✓ Richtig! +" +
            verdient +
            " Punkte · +" +
            coins +
            " Coins";


        document.getElementById(
            "ergebnis"
        ).style.color =
            "#65e49a";

    }

    else {

        button.classList.add(
            "falsch"
        );


        falschBeantwortet++;


        if (
            bonusSchutz
        ) {

            bonusSchutz =
                false;


            document.getElementById(
                "ergebnis"
            ).textContent =
                "🛡️ Falsch – dein Schutz rettet dich!";


            document.getElementById(
                "ergebnis"
            ).style.color =
                "#ffd21f";

        }

        else {

            leben--;

            combo =
                0;


            document.getElementById(
                "ergebnis"
            ).textContent =
                "✕ Falsch!";


            document.getElementById(
                "ergebnis"
            ).style.color =
                "#ff7777";

        }

    }


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;


    quizUIAktualisieren();


    if (
        leben <=
        0
    ) {

        setTimeout(
            function() {

                gameOver();

            },
            700
        );

    }

}


/* =====================================================
   PUNKTE
   ===================================================== */

function punkteFuerAntwort() {

    let basis =
        100;


    let schwierig =
        schwierigkeitFuerRunde();


    if (
        schwierig ===
        "mittel"
    ) {

        basis *=
            1.5;

    }


    if (
        schwierig ===
        "schwer"
    ) {

        basis *=
            2;

    }


    if (
        spielmodus ===
        "zeitdruck"
    ) {

        basis *=
            1.4;

    }


    if (
        spielmodus ===
        "hardcore"
    ) {

        basis *=
            1.5;

    }


    let comboBonus =
        Math.min(
            combo * 10,
            100
        );


    let zeitBonus =
        Math.round(
            (
                aktuelleZeit /
                maximaleZeit
            ) *
            100
        );


    return Math.round(
        basis +
        comboBonus +
        zeitBonus
    );

}


/* =====================================================
   COINS
   ===================================================== */

function coinsFuerAntwort() {

    let coins =
        3;


    if (
        combo >=
        5
    ) {

        coins +=
            3;

    }


    if (
        combo >=
        10
    ) {

        coins +=
            5;

    }


    if (
        combo >=
        20
    ) {

        coins +=
            10;

    }


    return coins;

}


function coinsGutschreiben(
    menge
) {

    let spieler =
        spielerDatenLaden();


    spieler.coins +=
        menge;


    spielerDatenSpeichern(
        spieler
    );


    let element =
        document.getElementById(
            "coins"
        );


    if (element) {

        element.textContent =
            spieler.coins;

    }

}


/* =====================================================
   JOKER
   ===================================================== */

function joker50Nutzen() {

    if (
        !rundeAktiv ||
        antwortGegeben ||
        !joker50
    ) {

        return;

    }


    let spieler =
        spielerDatenLaden();


    if (
        spieler.coins <
        25
    ) {

        alert(
            "Du brauchst 25 Coins für diesen Joker."
        );

        return;

    }


    let buttons =
        Array.from(
            document.querySelectorAll(
                "#antworten button"
            )
        );


    let falsche =
        buttons.filter(
            function(
                button
            ) {

                return (
                    button.dataset.richtig !==
                    "true" &&
                    !button.disabled
                );

            }
        );


    falsche.sort(
        function() {

            return (
                Math.random() -
                0.5
            );

        }
    );


    falsche
        .slice(
            0,
            2
        )
        .forEach(
            function(
                button
            ) {

                button.disabled =
                    true;

                button.style.opacity =
                    "0.2";

            }
        );


    spieler.coins -=
        25;


    spielerDatenSpeichern(
        spieler
    );


    joker50 =
        false;


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


function jokerZweiteChanceNutzen() {

    if (
        !rundeAktiv ||
        antwortGegeben ||
        !jokerZweiteChance
    ) {

        return;

    }


    let spieler =
        spielerDatenLaden();


    if (
        spieler.coins <
        40
    ) {

        alert(
            "Du brauchst 40 Coins für diesen Joker."
        );

        return;

    }


    spieler.coins -=
        40;


    spielerDatenSpeichern(
        spieler
    );


    bonusSchutz =
        true;


    jokerZweiteChance =
        false;


    document.getElementById(
        "ergebnis"
    ).textContent =
        "🛡️ Schutz aktiviert!";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ffd21f";


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


function jokerZeitNutzen() {

    if (
        !rundeAktiv ||
        antwortGegeben ||
        !jokerZeit
    ) {

        return;

    }


    let spieler =
        spielerDatenLaden();


    if (
        spieler.coins <
        30
    ) {

        alert(
            "Du brauchst 30 Coins für diesen Joker."
        );

        return;

    }


    spieler.coins -=
        30;


    spielerDatenSpeichern(
        spieler
    );


    aktuelleZeit +=
        10;


    if (
        aktuelleZeit >
        maximaleZeit
    ) {

        maximaleZeit =
            aktuelleZeit;

    }


    jokerZeit =
        false;


    document.getElementById(
        "ergebnis"
    ).textContent =
        "⏱️ +10 Sekunden!";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ffd21f";


    timerUIAktualisieren();

    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


function jokerHinweisNutzen() {

    if (
        !rundeAktiv ||
        antwortGegeben ||
        !jokerHinweis
    ) {

        return;

    }


    let spieler =
        spielerDatenLaden();


    if (
        spieler.coins <
        50
    ) {

        alert(
            "Du brauchst 50 Coins für diesen Joker."
        );

        return;

    }


    let frage =
        window.aktuelleQuizFrage;


    if (!frage) {

        return;

    }


    let falsche =
        frage.antworten.filter(
            function(
                antwort,
                index
            ) {

                return (
                    index !==
                    frage.richtig
                );

            }
        );


    if (
        !falsche.length
    ) {

        return;

    }


    let zufall =
        falsche[
            Math.floor(
                Math.random() *
                falsche.length
            )
        ];


    spieler.coins -=
        50;


    spielerDatenSpeichern(
        spieler
    );


    jokerHinweis =
        false;


    document.getElementById(
        "ergebnis"
    ).textContent =
        "💡 Hinweis: „" +
        zufall +
        "“ ist eine falsche Antwort.";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ffd21f";


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


/* =====================================================
   JOKER BUTTONS
   ===================================================== */

function jokerButtonsAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let button50 =
        document.getElementById(
            "joker5050"
        );


    let buttonSchutz =
        document.getElementById(
            "jokerZweiteChance"
        );


    let buttonZeit =
        document.getElementById(
            "jokerZeit"
        );


    let buttonHinweis =
        document.getElementById(
            "jokerHinweis"
        );


    if (button50) {

        button50.disabled =
            !joker50 ||
            antwortGegeben ||
            spieler.coins <
            25;

    }


    if (buttonSchutz) {

        buttonSchutz.disabled =
            !jokerZweiteChance ||
            antwortGegeben ||
            spieler.coins <
            40;

    }


    if (buttonZeit) {

        buttonZeit.disabled =
            !jokerZeit ||
            antwortGegeben ||
            spieler.coins <
            30;

    }


    if (buttonHinweis) {

        buttonHinweis.disabled =
            !jokerHinweis ||
            antwortGegeben ||
            spieler.coins <
            50;

    }

}


/* =====================================================
   NÄCHSTE FRAGE
   ===================================================== */

function naechsteFrage() {

    if (
        !antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    aktuelleFrage++;


    document.getElementById(
        "ergebnis"
    ).textContent =
        "";


    if (
        leben <=
        0
    ) {

        gameOver();

        return;

    }


    frageAnzeigen();

}


/* =====================================================
   MANUELL BEENDEN
   ===================================================== */

function quizManuellBeenden() {

    if (!rundeAktiv) {

        return;

    }


    let bestaetigung =
        confirm(
            "Möchtest du die Runde wirklich beenden?"
        );


    if (
        !bestaetigung
    ) {

        return;

    }


    gameOver();

}


/* =====================================================
   GAME OVER
   ===================================================== */

function gameOver() {

    if (!rundeAktiv) {

        return;

    }


    rundeAktiv =
        false;


    timerStoppen();


    let spieler =
        spielerDatenLaden();


    let verdientXP =
        xpFuerRunde();


    let verdientCoins =
        Math.max(
            0,
            Math.floor(
                punkte /
                100
            )
        );


    let altesLevel =
        levelBerechnen(
            spieler.xp
        );


    spieler.xp +=
        verdientXP;


    spieler.coins +=
        verdientCoins;


    spieler.level =
        levelBerechnen(
            spieler.xp
        );


    streakAktualisieren(
        spieler
    );


    spielerDatenSpeichern(
        spieler
    );


    statistikAktualisieren(
        verdientXP,
        verdientCoins
    );


    scoreOnlineSpeichern();


    achievementsAktualisieren();


    besterComboSpeichern();


    hardcoreTracken();


    let levelUp =
        spieler.level >
        altesLevel;


    document.getElementById(
        "gameoverPunkte"
    ).textContent =
        punkte;


    document.getElementById(
        "gameoverFragen"
    ).textContent =
        aktuelleFrage +
        1;


    document.getElementById(
        "gameoverRichtig"
    ).textContent =
        richtigBeantwortet;


    document.getElementById(
        "gameoverCombo"
    ).textContent =
        "x" +
        besteCombo;


    let belohnungText =
        "<div class='gameover-belohnung'>" +

        "⭐ +" +
        verdientXP +
        " XP<br>" +

        "🪙 +" +
        verdientCoins +
        " Coins";


    if (levelUp) {

        belohnungText +=

            "<br><br>" +

            "⬆️ LEVEL " +
            spieler.level +
            "!";

    }


    belohnungText +=
        "</div>";


    document.getElementById(
        "gameoverBelohnungen"
    ).innerHTML =
        belohnungText;


    screensAusblenden();


    document.getElementById(
        "gameover"
    ).style.display =
        "block";


    startseiteAktualisieren();

}


/* =====================================================
   XP RUNDE
   ===================================================== */

function xpFuerRunde() {

    let xp =
        richtigBeantwortet *
        5;


    xp +=
        Math.min(
            besteCombo *
            2,
            50
        );


    xp +=
        Math.floor(
            punkte /
            250
        );


    if (
        spielmodus ===
        "hardcore"
    ) {

        xp =
            Math.round(
                xp *
                1.5
            );

    }


    if (
        spielmodus ===
        "zeitdruck"
    ) {

        xp =
            Math.round(
                xp *
                1.25
            );

    }


    return Math.max(
        xp,
        5
    );

}


/* =====================================================
   STREAK
   ===================================================== */

function datumHeute() {

    let datum =
        new Date();


    return datum
        .toISOString()
        .split(
            "T"
        )[0];

}


function datumGestern() {

    let datum =
        new Date();


    datum.setDate(
        datum.getDate() -
        1
    );


    return datum
        .toISOString()
        .split(
            "T"
        )[0];

}


function streakAktualisieren(
    spieler
) {

    let heute =
        datumHeute();


    let gestern =
        datumGestern();


    if (
        spieler.letzterTag ===
        heute
    ) {

        return;

    }


    if (
        spieler.letzterTag ===
        gestern
    ) {

        spieler.streak++;

    }

    else {

        spieler.streak =
            1;

    }


    spieler.letzterTag =
        heute;

}


/* =====================================================
   STATISTIK
   ===================================================== */

function statistikAktualisieren(
    xp,
    coins
) {

    let statistik =
        statistikLaden();


    statistik.quizze++;


    statistik.fragen +=
        (
            aktuelleFrage +
            1
        );


    statistik.richtig +=
        richtigBeantwortet;


    statistik.falsch +=
        falschBeantwortet;


    statistik.punkte +=
        punkte;


    statistik.gesammelteXP +=
        xp;


    statistik.gesammelteCoins +=
        coins;


    if (
        punkte >
        statistik.bestePunkte
    ) {

        statistik.bestePunkte =
            punkte;

    }


    if (
        besteCombo >
        statistik.besteCombo
    ) {

        statistik.besteCombo =
            besteCombo;

    }


    statistikSpeichern(
        statistik
    );

}


/* =====================================================
   BESTE COMBO
   ===================================================== */

function besterComboSpeichern() {

    let bisher =
        Number(
            localStorage.getItem(
                "quizero_bester_combo"
            )
        ) || 0;


    if (
        besteCombo >
        bisher
    ) {

        localStorage.setItem(
            "quizero_bester_combo",
            besteCombo
        );

    }

}


/* =====================================================
   ACHIEVEMENTS
   ===================================================== */

const ACHIEVEMENTS = [

    {
        id: "erste_runde",
        icon: "🎮",
        name: "Erste Runde",
        text: "Spiele deine erste Runde.",
        pruefen: function(
            statistik
        ) {

            return (
                statistik.quizze >=
                1
            );

        }
    },

    {
        id: "zehn_fragen",
        icon: "🧠",
        name: "Warmgelaufen",
        text: "Beantworte 10 Fragen.",
        pruefen: function(
            statistik
        ) {

            return (
                statistik.fragen >=
                10
            );

        }
    },

    {
        id: "hundert_fragen",
        icon: "💯",
        name: "Quizmaschine",
        text: "Beantworte 100 Fragen.",
        pruefen: function(
            statistik
        ) {

            return (
                statistik.fragen >=
                100
            );

        }
    },

    {
        id: "combo5",
        icon: "🔥",
        name: "Heiß gelaufen",
        text: "Erreiche eine 5er Combo.",
        pruefen: function(
            statistik
        ) {

            return (
                statistik.besteCombo >=
                5
            );

        }
    },

    {
        id: "combo10",
        icon: "⚡",
        name: "Unaufhaltsam",
        text: "Erreiche eine 10er Combo.",
        pruefen: function(
            statistik
        ) {

            return (
                statistik.besteCombo >=
                10
            );

        }
    },

    {
        id: "combo20",
        icon: "👑",
        name: "Quiz Hero",
        text: "Erreiche eine 20er Combo.",
        pruefen: function(
            statistik
        ) {

            return (
                statistik.besteCombo >=
                20
            );

        }
    },

    {
        id: "level10",
        icon: "🏆",
        name: "Veteran",
        text: "Erreiche Level 10.",
        pruefen: function() {

            return (
                levelBerechnen(
                    spielerDatenLaden().xp
                ) >=
                10
            );

        }
    },

    {
        id: "hardcore",
        icon: "💀",
        name: "Hardcore",
        text: "Spiele eine Hardcore-Runde.",
        pruefen: function() {

            return (
                localStorage.getItem(
                    "quizero_hardcore_gespielt"
                ) ===
                "true"
            );

        }
    },

    {
        id: "shop",
        icon: "🛒",
        name: "Shopper",
        text: "Kaufe deinen ersten Joker.",
        pruefen: function() {

            let inventar =
                jokerInventarLaden();


            return (
                inventar.joker50 > 0 ||
                inventar.jokerZweiteChance > 0 ||
                inventar.jokerZeit > 0 ||
                inventar.jokerHinweis > 0
            );

        }
    }

];


function achievementsAktualisieren() {

    let statistik =
        statistikLaden();


    let freigeschaltet =
        [];


    try {

        freigeschaltet =
            JSON.parse(
                localStorage.getItem(
                    "quizero_achievements"
                ) ||
                "[]"
            );

    }

    catch (fehler) {

        freigeschaltet =
            [];

    }


    ACHIEVEMENTS.forEach(
        function(
            achievement
        ) {

            if (
                achievement.pruefen(
                    statistik
                ) &&
                !freigeschaltet.includes(
                    achievement.id
                )
            ) {

                freigeschaltet.push(
                    achievement.id
                );

            }

        }
    );


    localStorage.setItem(
        "quizero_achievements",
        JSON.stringify(
            freigeschaltet
        )
    );

}


/* =====================================================
   PROFIL
   ===================================================== */

function profilAnzeigen() {

    timerStoppen();


    screensAusblenden();


    document.getElementById(
        "profil"
    ).style.display =
        "block";


    profilAktualisieren();

}


function profilAktualisieren() {

    spielerUIAktualisieren();


    let spieler =
        spielerDatenLaden();


    let statistik =
        statistikLaden();


    let level =
        levelBerechnen(
            spieler.xp
        );


    let xp =
        xpBisNaechstesLevel(
            spieler.xp
        );


    let nameElement =
        document.getElementById(
            "profilName"
        );


    if (nameElement) {

        nameElement.textContent =
            spielerNameLaden();

    }


    let levelElement =
        document.getElementById(
            "profilLevel"
        );


    if (levelElement) {

        levelElement.textContent =
            "Level " +
            level;

    }


    let xpElement =
        document.getElementById(
            "profilXP"
        );


    if (xpElement) {

        xpElement.textContent =
            xp.aktuell +
            " / " +
            xp.benoetigt +
            " XP";

    }


    let xpBalken =
        document.getElementById(
            "profilXPBalken"
        );


    if (xpBalken) {

        xpBalken.style.width =
            (
                xp.aktuell /
                xp.benoetigt *
                100
            ) +
            "%";

    }


    let nextElement =
        document.getElementById(
            "profilNaechstesLevel"
        );


    if (nextElement) {

        nextElement.textContent =
            (
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                level +
                1
            );

    }


    let besterCombo =
        Number(
            localStorage.getItem(
                "quizero_bester_combo"
            )
        ) || 0;


    let html =
        "<div class='profil-stat-grid'>";


    html +=
        profilKarte(
            statistik.quizze,
            "Gespielte Runden"
        );


    html +=
        profilKarte(
            statistik.fragen,
            "Fragen beantwortet"
        );


    html +=
        profilKarte(
            statistik.richtig,
            "Richtige Antworten"
        );


    html +=
        profilKarte(
            statistik.falsch,
            "Falsche Antworten"
        );


    html +=
        profilKarte(
            statistik.bestePunkte,
            "Bester Score"
        );


    html +=
        profilKarte(
            besterCombo,
            "Beste Combo"
        );


    html +=
        profilKarte(
            spieler.coins,
            "Coins"
        );


    html +=
        profilKarte(
            spieler.streak,
            "Tage Streak"
        );


    html +=
        "</div>";


    html +=
        "<div class='profil-section-title'>" +
        "🏆 Erfolge" +
        "</div>";


    html +=
        "<div class='achievement-grid'>";


    let freigeschaltet =
        JSON.parse(
            localStorage.getItem(
                "quizero_achievements"
            ) ||
            "[]"
        );


    ACHIEVEMENTS.forEach(
        function(
            achievement
        ) {

            let erreicht =
                freigeschaltet.includes(
                    achievement.id
                );


            html +=

                "<div class='achievement " +
                (
                    erreicht
                        ? "erreicht"
                        : ""
                ) +
                "'>" +

                    "<strong>" +
                        achievement.icon +
                        " " +
                        achievement.name +
                    "</strong>" +

                    "<span>" +
                        achievement.text +
                    "</span>" +

                "</div>";

        }
    );


    html +=
        "</div>";


    document.getElementById(
        "profilInhalt"
    ).innerHTML =
        html;

}


function profilKarte(
    wert,
    text
) {

    return (

        "<div class='profil-stat-card'>" +

            "<strong>" +
                wert +
            "</strong>" +

            "<span>" +
                text +
            "</span>" +

        "</div>"

    );

}


/* =====================================================
   BESTENLISTE
   ===================================================== */

async function bestenlisteAnzeigen() {

    timerStoppen();


    screensAusblenden();


    document.getElementById(
        "bestenliste"
    ).style.display =
        "block";


    await bestenlisteLaden();

}


async function bestenlisteLaden() {

    let container =
        document.getElementById(
            "bestenlisteInhalt"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "<p>Lade Bestenliste...</p>";


    try {

        let {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "bestenliste"
                )
                .select(
                    "*"
                )
                .order(
                    "punkte",
                    {
                        ascending:
                            false
                    }
                )
                .limit(
                    10
                );


        if (error) {

            throw error;

        }


        if (
            !data ||
            data.length ===
            0
        ) {

            container.innerHTML =
                "<p>Noch keine Ergebnisse vorhanden.</p>";

            return;

        }


        let html =
            "<div class='bestenliste-tabelle'>";


        html +=

            "<div class='bestenliste-zeile bestenliste-kopf'>" +

                "<div>#</div>" +

                "<div>Spieler</div>" +

                "<div>Score</div>" +

                "<div>Details</div>" +

            "</div>";


        data.forEach(
            function(
                eintrag,
                index
            ) {

                let kategorie =
                    KATEGORIEN.find(
                        function(
                            kat
                        ) {

                            return (
                                kat.wert ===
                                eintrag.kategorie
                            );

                        }
                    );


                html +=

                    "<div class='bestenliste-zeile'>" +

                        "<div class='bestenliste-platz'>" +
                            (
                                index +
                                1
                            ) +
                        "</div>" +

                        "<div class='bestenliste-kategorie'>" +

                            "<span class='leaderboard-avatar'>" +
                                escapeHTML(
                                    eintrag.avatar ||
                                    "🦊"
                                ) +
                            "</span>" +

                            escapeHTML(
                                eintrag.spielername ||
                                "Spieler"
                            ) +

                        "</div>" +

                        "<div class='bestenliste-score'>" +
                            (
                                eintrag.punkte ||
                                0
                            ) +
                        "</div>" +

                        "<div>" +

                            (
                                kategorie
                                    ? kategorie.name
                                    : (
                                        eintrag.kategorie ||
                                        ""
                                    )
                            ) +

                            "<br>" +

                            (
                                eintrag.prozent ||
                                0
                            ) +

                            "%" +

                        "</div>" +

                    "</div>";

            }
        );


        html +=
            "</div>";


        container.innerHTML =
            html;

    }

    catch (fehler) {

        console.error(
            fehler
        );


        container.innerHTML =
            "<p>Die Bestenliste konnte momentan nicht geladen werden.</p>";

    }

}


/* =====================================================
   SCORE ONLINE
   ===================================================== */

async function scoreOnlineSpeichern() {

    let name =
        spielerNameLaden();


    if (!name) {

        name =
            "Spieler";

    }


    let beantworteteFragen =
        Math.max(
            1,
            aktuelleFrage +
            1
        );


    let prozent =
        (
            richtigBeantwortet /
            beantworteteFragen
        ) *
        100;


    try {

        await supabaseClient
            .from(
                "bestenliste"
            )
            .insert(
                [
                    {

                        spielername:
                            name,

                        avatar:
                            avatarLaden(),

                        kategorie:
                            ausgewaehlteKategorie,

                        schwierigkeit:
                            schwierigkeitFuerRunde(),

                        anzahl_fragen:
                            beantworteteFragen,

                        punkte:
                            punkte,

                        prozent:
                            Math.round(
                                prozent
                            )

                    }
                ]
            );

    }

    catch (fehler) {

        console.error(
            "Score konnte nicht gespeichert werden:",
            fehler
        );

    }

}


/* =====================================================
   HARDCORE
   ===================================================== */

function hardcoreTracken() {

    if (
        spielmodus ===
        "hardcore"
    ) {

        localStorage.setItem(
            "quizero_hardcore_gespielt",
            "true"
        );

    }

}


/* =====================================================
   QUIZ UI
   ===================================================== */

function lebenText() {

    let text =
        "";


    for (
        let i = 0;
        i < maximaleLeben;
        i++
    ) {

        text +=
            i < leben
                ? "❤️ "
                : "🖤 ";

    }


    return text.trim();

}


function quizUIAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let lebenElement =
        document.getElementById(
            "leben"
        );


    let comboElement =
        document.getElementById(
            "combo"
        );


    let coinsElement =
        document.getElementById(
            "coins"
        );


    let punkteElement =
        document.getElementById(
            "quizPunkte"
        );


    if (lebenElement) {

        lebenElement.textContent =
            lebenText();

    }


    if (comboElement) {

        comboElement.textContent =
            "x" +
            combo;

    }


    if (coinsElement) {

        coinsElement.textContent =
            spieler.coins;

    }


    if (punkteElement) {

        punkteElement.textContent =
            punkte;

    }


    jokerButtonsAktualisieren();

}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHTML(
    text
) {

    return String(
        text
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIALISIERUNG
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        spielerNameEinrichten();

        startseiteAktualisieren();

        kategorienAnzeigen();

    }
);

