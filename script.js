/* =====================================================
   QUIZERO 2.0
   COMPLETE GAME ENGINE
   ===================================================== */


/* =====================================================
   SUPABASE
   ===================================================== */

const SUPABASE_URL =
    "https://agvkfksnqwdtimrcdkly.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_4A8Ka0gEeqG6WZjpvxIdVw_cit3y-VP";

const supabaseClient =
    window.supabase
        ? window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        )
        : null;


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
   AVATARE / QUIZERO RÄNGE
   ===================================================== */

const AVATARE = [

    {
        xp: 0,
        emoji: "🦊",
        name: "QUIZ ROOKIE"
    },

    {
        xp: 5000,
        emoji: "🐰",
        name: "QUIZ SCOUT"
    },

    {
        xp: 15000,
        emoji: "🐹",
        name: "QUIZ TALENT"
    },

    {
        xp: 30000,
        emoji: "🐨",
        name: "QUIZ DENKER"
    },

    {
        xp: 50000,
        emoji: "🐼",
        name: "QUIZ PRO"
    },

    {
        xp: 75000,
        emoji: "🐸",
        name: "QUIZ TACTICIAN"
    },

    {
        xp: 105000,
        emoji: "🐺",
        name: "QUIZ MASTER"
    },

    {
        xp: 145000,
        emoji: "🐵",
        name: "QUIZ GENIUS"
    },

    {
        xp: 195000,
        emoji: "🐯",
        name: "QUIZ ELITE"
    },

    {
        xp: 255000,
        emoji: "🐻",
        name: "QUIZ LEGEND"
    },

    {
        xp: 330000,
        emoji: "🦁",
        name: "QUIZ CHAMPION"
    },

    {
        xp: 420000,
        emoji: "🐲",
        name: "QUIZ HERO"
    }

];


function avatarFuerXP(
    xp
) {

    let aktueller =
        AVATARE[0];


    for (
        let i = 0;
        i < AVATARE.length;
        i++
    ) {

        if (
            xp >= AVATARE[i].xp
        ) {

            aktueller =
                AVATARE[i];

        }

        else {

            break;

        }

    }


    return aktueller;

}


/* =====================================================
   JOKER
   ===================================================== */

const JOKER_DEFINITIONEN = {

    joker50: {

        name: "50/50",

        icon: "½",

        preis: 100,

        beschreibung:
            "Entfernt zwei falsche Antworten."

    },

    jokerSchutz: {

        name: "Schutz",

        icon: "🛡️",

        preis: 150,

        beschreibung:
            "Der nächste Fehler kostet kein Leben."

    },

    jokerZeit: {

        name: "+10 Sek.",

        icon: "⏱️",

        preis: 120,

        beschreibung:
            "Gibt dir zehn zusätzliche Sekunden."

    },

    jokerHinweis: {

        name: "Hinweis",

        icon: "💡",

        preis: 180,

        beschreibung:
            "Gibt dir einen Hinweis zur Antwort."

    }

};


const SHOP_JOKER = [

    "joker50",

    "jokerSchutz",

    "jokerZeit",

    "jokerHinweis"

];


/* =====================================================
   SPIELMODI
   ===================================================== */

let spielmodus =
    "classic";


let ausgewaehlteKategorie =
    "";


/* =====================================================
   SPIELZUSTAND
   ===================================================== */

let fragen =
    [];

let verwendeteFragen =
    [];

let aktuelleFrage =
    0;

let aktuelleQuizFrage =
    null;

let punkte =
    0;

let leben =
    3;

let combo =
    0;

let besteCombo =
    0;

let richtigBeantwortet =
    0;

let falschBeantwortet =
    0;

let aktuelleZeit =
    20;

let maximaleZeit =
    20;

let timer =
    null;

let antwortGegeben =
    false;

let rundeAktiv =
    false;

let bonusSchutz =
    false;


/* =====================================================
   JOKER INVENTAR
   ===================================================== */

function jokerInventarLaden() {

    let gespeichert =
        localStorage.getItem(
            "quizero_joker_inventar"
        );


    if (
        gespeichert
    ) {

        try {

            let inventar =
                JSON.parse(
                    gespeichert
                );


            return {

                joker50:
                    Math.max(
                        0,
                        Number(
                            inventar.joker50
                        ) || 0
                    ),

                jokerSchutz:
                    Math.max(
                        0,
                        Number(
                            inventar.jokerSchutz
                        ) || 0
                    ),

                jokerZeit:
                    Math.max(
                        0,
                        Number(
                            inventar.jokerZeit
                        ) || 0
                    ),

                jokerHinweis:
                    Math.max(
                        0,
                        Number(
                            inventar.jokerHinweis
                        ) || 0
                    )

            };

        }

        catch (fehler) {

            console.error(
                fehler
            );

        }

    }


    /*
       Neue Spieler bekommen
       jeweils einen Joker.
    */

    let neuesInventar = {

        joker50: 1,

        jokerSchutz: 1,

        jokerZeit: 1,

        jokerHinweis: 1

    };


    localStorage.setItem(
        "quizero_joker_inventar",
        JSON.stringify(
            neuesInventar
        )
    );


    return neuesInventar;

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


function spielerNameEinrichten() {

    let name =
        spielerNameLaden();


    if (
        !name
    ) {

        name =
            prompt(
                "Wie heißt du?"
            );


        if (
            name
        ) {

            name =
                name.trim();

        }


        if (
            !name
        ) {

            name =
                "Spieler";

        }


        name =
            name.substring(
                0,
                20
            );


        spielerNameSpeichern(
            name
        );

    }


    spielerBegruessungAktualisieren();

}


function spielerNameAendern() {

    let alterName =
        spielerNameLaden();


    let neuerName =
        prompt(
            "Wie soll dein Spielername heißen?",
            alterName
        );


    if (
        neuerName ===
        null
    ) {

        return;

    }


    neuerName =
        neuerName.trim();


    if (
        !neuerName
    ) {

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

    startseiteAktualisieren();

    profilAktualisieren();

}


function spielerBegruessungAktualisieren() {

    let element =
        document.getElementById(
            "spielerBegruessung"
        );


    if (
        !element
    ) {

        return;

    }


    let name =
        spielerNameLaden();


    element.textContent =
        "Willkommen zurück, " +
        (
            name ||
            "Spieler"
        ) +
        "!";

}


/* =====================================================
   SPIELERDATEN
   ===================================================== */

function spielerDatenLaden() {

    let daten =
        localStorage.getItem(
            "spieler_daten"
        );


    if (
        daten
    ) {

        try {

            let spieler =
                JSON.parse(
                    daten
                );


            return {

                xp:
                    Math.max(
                        0,
                        Number(
                            spieler.xp
                        ) || 0
                    ),

                level:
                    Math.max(
                        1,
                        Number(
                            spieler.level
                        ) || 1
                    ),

                streak:
                    Math.max(
                        0,
                        Number(
                            spieler.streak
                        ) || 0
                    ),

                letzterTag:
                    spieler.letzterTag ||
                    "",

                coins:
                    Math.max(
                        0,
                        Number(
                            spieler.coins
                        ) || 0
                    )

            };

        }

        catch (fehler) {

            console.error(
                "Spielerdaten:",
                fehler
            );

        }

    }


    return {

        xp:
            Math.max(
                0,
                Number(
                    localStorage.getItem(
                        "spieler_xp"
                    )
                ) || 0
            ),

        level:
            Math.max(
                1,
                Number(
                    localStorage.getItem(
                        "spieler_level"
                    )
                ) || 1
            ),

        streak:
            Math.max(
                0,
                Number(
                    localStorage.getItem(
                        "spieler_streak"
                    )
                ) || 0
            ),

        letzterTag:
            localStorage.getItem(
                "spieler_letzterTag"
            ) || "",

        coins:
            Math.max(
                0,
                Number(
                    localStorage.getItem(
                        "spieler_coins"
                    )
                ) || 0
            )

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
   ===================================================== */

/*
   Kumulierte XP:

   Level 1 = 0
   Level 2 = 1.000
   Level 3 = 2.500
   Level 4 = 4.500
   Level 5 = 7.000
   Level 6 = 10.000
   usw.

   Die Level werden dadurch
   nicht mehr innerhalb einer
   einzigen normalen Runde
   durchschossen.
*/

function xpStartFuerLevel(
    level
) {

    if (
        level <= 1
    ) {

        return 0;

    }


    let n =
        level - 1;


    return (
        1000 * n +
        250 *
        n *
        (
            n - 1
        )
    );

}


function xpFuerLevel(
    level
) {

    return (
        xpStartFuerLevel(
            level + 1
        ) -
        xpStartFuerLevel(
            level
        )
    );

}


function levelBerechnen(
    xp
) {

    let level =
        1;


    while (
        xp >=
        xpStartFuerLevel(
            level + 1
        )
    ) {

        level++;


        if (
            level >
            10000
        ) {

            break;

        }

    }


    return level;

}


function xpBisNaechstesLevel(
    xp
) {

    let level =
        levelBerechnen(
            xp
        );


    let start =
        xpStartFuerLevel(
            level
        );


    let naechster =
        xpStartFuerLevel(
            level + 1
        );


    let aktuell =
        xp -
        start;


    let benoetigt =
        naechster -
        start;


    return {

        level:
            level,

        aktuell:
            Math.max(
                0,
                aktuell
            ),

        benoetigt:
            benoetigt

    };

}


/* =====================================================
   STATISTIK
   ===================================================== */

function statistikLaden() {

    let daten =
        localStorage.getItem(
            "quizero_statistik"
        );


    if (
        daten
    ) {

        try {

            let statistik =
                JSON.parse(
                    daten
                );


            return {

                quizze:
                    Number(
                        statistik.quizze
                    ) || 0,

                fragen:
                    Number(
                        statistik.fragen
                    ) || 0,

                richtig:
                    Number(
                        statistik.richtig
                    ) || 0,

                falsch:
                    Number(
                        statistik.falsch
                    ) || 0,

                punkte:
                    Number(
                        statistik.punkte
                    ) || 0,

                bestePunkte:
                    Number(
                        statistik.bestePunkte
                    ) || 0,

                besteCombo:
                    Number(
                        statistik.besteCombo
                    ) || 0,

                gesammelteCoins:
                    Number(
                        statistik.gesammelteCoins
                    ) || 0,

                gesammelteXP:
                    Number(
                        statistik.gesammelteXP
                    ) || 0

            };

        }

        catch (fehler) {

            console.error(
                fehler
            );

        }

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
   NAVIGATION
   ===================================================== */

function screensAusblenden() {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            function(screen) {

                screen.style.display =
                    "none";

            }
        );

}


function screenAnzeigen(
    id
) {

    screensAusblenden();


    let screen =
        document.getElementById(
            id
        );


    if (
        screen
    ) {

        screen.style.display =
            "block";

    }

}


/* =====================================================
   START
   ===================================================== */

function startAnzeigen() {

    timerStoppen();

    rundeAktiv =
        false;


    screenAnzeigen(
        "startbildschirm"
    );


    startseiteAktualisieren();

}


function quizStarten() {

    screenAnzeigen(
        "spielmodi"
    );

}


function zurueckZumStart() {

    startAnzeigen();

}


function zurueckZumStartDirekt() {

    startAnzeigen();

}


function zurueckZuModi() {

    screenAnzeigen(
        "spielmodi"
    );

}


/* =====================================================
   SPIELMODUS
   ===================================================== */

function spielmodusWaehlen(
    modus
) {

    spielmodus =
        modus;


    screenAnzeigen(
        "kategorien"
    );


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


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        "";


    KATEGORIEN.forEach(
        function(kategorie) {

            let button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


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
   FRAGEN-DATENBANK PRÜFEN
   ===================================================== */

function fragenDatenbankPruefen() {

    if (
        typeof alleFragen ===
        "undefined"
    ) {

        console.error(
            "QUIZERO: alleFragen wurde nicht gefunden."
        );


        return false;

    }


    if (
        !Array.isArray(
            alleFragen
        )
    ) {

        console.error(
            "QUIZERO: alleFragen ist kein Array."
        );


        return false;

    }


    return (
        alleFragen.length >
        0
    );

}


/* =====================================================
   FRAGEN-POOL
   ===================================================== */

function fragePoolErstellen() {

    if (
        !fragenDatenbankPruefen()
    ) {

        fragen =
            [];


        return;

    }


    let passend =
        alleFragen.filter(
            function(frage) {

                return (
                    frage &&
                    frage.kategorie ===
                    ausgewaehlteKategorie &&
                    Array.isArray(
                        frage.antworten
                    ) &&
                    frage.antworten.length ===
                    4 &&
                    Number.isInteger(
                        frage.richtig
                    ) &&
                    frage.richtig >=
                    0 &&
                    frage.richtig <=
                    3
                );

            }
        );


    /*
       Bereits verwendete Fragen
       dieser Runde entfernen.
    */

    passend =
        passend.filter(
            function(frage) {

                return (
                    !verwendeteFragen.includes(
                        frage.frage
                    )
                );

            }
        );


    /*
       Wenn die Kategorie erschöpft
       ist, wird der verwendete Pool
       zurückgesetzt.
    */

    if (
        passend.length ===
        0
    ) {

        verwendeteFragen =
            [];


        passend =
            alleFragen.filter(
                function(frage) {

                    return (
                        frage &&
                        frage.kategorie ===
                        ausgewaehlteKategorie &&
                        Array.isArray(
                            frage.antworten
                        ) &&
                        frage.antworten.length ===
                        4 &&
                        Number.isInteger(
                            frage.richtig
                        )
                    );

                }
            );

    }


    /*
       Zufällige Reihenfolge.
    */

    passend.sort(
        function() {

            return (
                Math.random() -
                0.5
            );

        }
    );


    fragen =
        passend;

}


/* =====================================================
   FRAGE AUS POOL
   ===================================================== */

function naechsteFrageAusPool() {

    if (
        !fragen ||
        fragen.length ===
        0
    ) {

        fragePoolErstellen();

    }


    let schwierigkeit =
        schwierigkeitFuerRunde();


    let pool =
        fragen.filter(
            function(frage) {

                return (
                    frage.schwierigkeit ===
                    schwierigkeit &&
                    !verwendeteFragen.includes(
                        frage.frage
                    )
                );

            }
        );


    /*
       Fallback: jede Schwierigkeit.
    */

    if (
        pool.length ===
        0
    ) {

        pool =
            fragen.filter(
                function(frage) {

                    return (
                        !verwendeteFragen.includes(
                            frage.frage
                        )
                    );

                }
            );

    }


    /*
       Falls Kategorie erschöpft:
       Pool neu aufbauen.
    */

    if (
        pool.length ===
        0
    ) {

        verwendeteFragen =
            [];


        fragePoolErstellen();


        pool =
            fragen.filter(
                function(frage) {

                    return (
                        frage.schwierigkeit ===
                        schwierigkeit
                    );

                }
            );


        if (
            pool.length ===
            0
        ) {

            pool =
                fragen;

        }

    }


    if (
        !pool ||
        pool.length ===
        0
    ) {

        return null;

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
   RUNDE STARTEN
   ===================================================== */

function rundeStarten() {

    timerStoppen();


    aktuelleFrage =
        0;

    punkte =
        0;

    leben =
        spielmodus ===
        "hardcore"
            ? 1
            : 3;

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

    aktuelleQuizFrage =
        null;

    antwortGegeben =
        false;

    bonusSchutz =
        false;

    rundeAktiv =
        true;


    fragePoolErstellen();


    screenAnzeigen(
        "quiz"
    );


    quizUIAktualisieren();


    frageAnzeigen();

}


/* =====================================================
   SCHWIERIGKEIT
   ===================================================== */

function schwierigkeitFuerRunde() {

    let nummer =
        aktuelleFrage + 1;


    /*
       Erste fünf:
       leicht
    */

    if (
        nummer <=
        5
    ) {

        return "leicht";

    }


    /*
       6 bis 12:
       mittel
    */

    if (
        nummer <=
        12
    ) {

        return "mittel";

    }


    /*
       Danach:
       schwer
    */

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
   FRAGE ANZEIGEN
   ===================================================== */

function frageAnzeigen() {

    if (
        !rundeAktiv
    ) {

        return;

    }


    timerStoppen();


    antwortGegeben =
        false;


    let frage =
        naechsteFrageAusPool();


    if (
        !frage
    ) {

        document.getElementById(
            "frage"
        ).textContent =
            "Keine Frage verfügbar.";


        document.getElementById(
            "antworten"
        ).innerHTML =
            "";


        return;

    }


    aktuelleQuizFrage =
        frage;


    let rundeInfo =
        document.getElementById(
            "rundeInfo"
        );


    if (
        rundeInfo
    ) {

        rundeInfo.textContent =
            "Runde " +
            (
                aktuelleFrage + 1
            );

    }


    let schwierigInfo =
        document.getElementById(
            "schwierigkeitInfo"
        );


    if (
        schwierigInfo
    ) {

        schwierigInfo.textContent =
            schwierigkeitText();

    }


    let frageElement =
        document.getElementById(
            "frage"
        );


    frageElement.textContent =
        frage.frage;


    let antwortenContainer =
        document.getElementById(
            "antworten"
        );


    antwortenContainer.innerHTML =
        "";


    /*
       Die korrekte Antwort wird
       VOR dem Mischen markiert.
    */

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
        function(antwort) {

            let button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                antwort.text;


            button.dataset.richtig =
                antwort.richtig
                    ? "true"
                    : "false";


            button.addEventListener(
                "click",
                function() {

                    antwortPruefen(
                        antwort.richtig,
                        button
                    );

                }
            );


            antwortenContainer.appendChild(
                button
            );

        }
    );


    let ergebnis =
        document.getElementById(
            "ergebnis"
        );


    if (
        ergebnis
    ) {

        ergebnis.textContent =
            "";

        ergebnis.style.color =
            "";

    }


    let next =
        document.getElementById(
            "naechsteFrage"
        );


    if (
        next
    ) {

        next.disabled =
            true;

    }


    jokerButtonsAktualisieren();


    timerStarten();

}


/* =====================================================
   TIMER
   ===================================================== */

function maximaleZeitFuerRunde() {

    if (
        spielmodus ===
        "zeitdruck"
    ) {

        if (
            aktuelleFrage <
            5
        ) {

            return 15;

        }


        if (
            aktuelleFrage <
            12
        ) {

            return 12;

        }


        return 10;

    }


    if (
        spielmodus ===
        "hardcore"
    ) {

        if (
            aktuelleFrage <
            5
        ) {

            return 18;

        }


        return 13;

    }


    if (
        aktuelleFrage <
        5
    ) {

        return 20;

    }


    if (
        aktuelleFrage <
        12
    ) {

        return 17;

    }


    if (
        aktuelleFrage <
        20
    ) {

        return 14;

    }


    return 12;

}


function timerStarten() {

    timerStoppen();


    maximaleZeit =
        maximaleZeitFuerRunde();


    aktuelleZeit =
        maximaleZeit;


    timerUIAktualisieren();


    timer =
        setInterval(
            function() {

                if (
                    !rundeAktiv ||
                    antwortGegeben
                ) {

                    return;

                }


                aktuelleZeit -=
                    0.1;


                if (
                    aktuelleZeit <=
                    0
                ) {

                    aktuelleZeit =
                        0;


                    timerUIAktualisieren();


                    timerStoppen();


                    zeitAbgelaufen();


                    return;

                }


                timerUIAktualisieren();

            },
            100
        );

}


function timerStoppen() {

    if (
        timer
    ) {

        clearInterval(
            timer
        );


        timer =
            null;

    }

}


function timerUIAktualisieren() {

    let balken =
        document.getElementById(
            "timerBalken"
        );


    let text =
        document.getElementById(
            "timerText"
        );


    if (
        !balken ||
        !text
    ) {

        return;

    }


    let prozent =
        (
            aktuelleZeit /
            Math.max(
                1,
                maximaleZeit
            )
        ) *
        100;


    balken.style.width =
        Math.max(
            0,
            Math.min(
                100,
                prozent
            )
        ) +
        "%";


    text.textContent =
        Math.ceil(
            Math.max(
                0,
                aktuelleZeit
            )
        );

}


/* =====================================================
   ZEIT ABGELAUFEN
   ===================================================== */

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


    let ergebnis =
        document.getElementById(
            "ergebnis"
        );


    ergebnis.textContent =
        "⏰ Zeit abgelaufen!";


    ergebnis.style.color =
        "var(--red)";


    if (
        bonusSchutz
    ) {

        bonusSchutz =
            false;


        ergebnis.textContent =
            "🛡️ Schutz! Kein Leben verloren.";


        ergebnis.style.color =
            "var(--yellow)";

    }

    else {

        leben--;

    }


    antwortenSperren();

    quizUIAktualisieren();


    if (
        leben <=
        0
    ) {

        setTimeout(
            gameOver,
            850
        );

        return;

    }


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;

}


/* =====================================================
   ANTWORT PRÜFEN
   ===================================================== */

function antwortPruefen(
    istRichtig,
    button
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


    let ergebnis =
        document.getElementById(
            "ergebnis"
        );


    if (
        istRichtig
    ) {

        richtigBeantwortet++;

        combo++;


        if (
            combo >
            besteCombo
        ) {

            besteCombo =
                combo;

        }


        let verdient =
            punkteFuerAntwort();


        punkte +=
            verdient;


        let coins =
            coinsFuerAntwort();


        coinsGutschreiben(
            coins
        );


        button.classList.add(
            "richtig"
        );


        ergebnis.textContent =
            "✓ Richtig! +" +
            verdient +
            " Punkte";


        ergebnis.style.color =
            "var(--green)";

    }

    else {

        falschBeantwortet++;

        combo =
            0;


        button.classList.add(
            "falsch"
        );


        richtigeAntwortMarkieren();


        if (
            bonusSchutz
        ) {

            bonusSchutz =
                false;


            ergebnis.textContent =
                "🛡️ Schutz! Kein Leben verloren.";


            ergebnis.style.color =
                "var(--yellow)";

        }

        else {

            leben--;


            ergebnis.textContent =
                "✕ Falsch!";


            ergebnis.style.color =
                "var(--red)";

        }

    }


    antwortenSperren();


    quizUIAktualisieren();


    if (
        leben <=
        0
    ) {

        setTimeout(
            gameOver,
            850
        );

        return;

    }


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;

}


/* =====================================================
   RICHTIGE ANTWORT MARKIEREN
   ===================================================== */

function richtigeAntwortMarkieren() {

    document
        .querySelectorAll(
            "#antworten button"
        )
        .forEach(
            function(button) {

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

}


/* =====================================================
   ANTWORTEN SPERREN
   ===================================================== */

function antwortenSperren() {

    document
        .querySelectorAll(
            "#antworten button"
        )
        .forEach(
            function(button) {

                button.disabled =
                    true;

            }
        );


    jokerButtonsAktualisieren();

}


/* =====================================================
   PUNKTE
   ===================================================== */

function punkteFuerAntwort() {

    let schwierig =
        schwierigkeitFuerRunde();


    let basis =
        100;


    if (
        schwierig ===
        "mittel"
    ) {

        basis =
            150;

    }


    if (
        schwierig ===
        "schwer"
    ) {

        basis =
            220;

    }


    let zeitBonus =
        Math.round(
            (
                aktuelleZeit /
                Math.max(
                    1,
                    maximaleZeit
                )
            ) *
            100
        );


    let comboBonus =
        Math.min(
            combo *
            15,
            150
        );


    if (
        spielmodus ===
        "zeitdruck"
    ) {

        basis =
            Math.round(
                basis *
                1.4
            );

    }


    if (
        spielmodus ===
        "hardcore"
    ) {

        basis =
            Math.round(
                basis *
                1.5
            );

    }


    return Math.round(
        basis +
        zeitBonus +
        comboBonus
    );

}


/* =====================================================
   COINS
   ===================================================== */

function coinsFuerAntwort() {

    let coins =
        5;


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


    quizUIAktualisieren();

}


/* =====================================================
   JOKER VERBRAUCHEN
   ===================================================== */

function jokerVerbrauchen(
    typ
) {

    let inventar =
        jokerInventarLaden();


    if (
        !inventar[typ] ||
        inventar[typ] <=
        0
    ) {

        return false;

    }


    inventar[typ]--;


    jokerInventarSpeichern(
        inventar
    );


    return true;

}


/* =====================================================
   JOKER 50/50
   ===================================================== */

function joker50Nutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    let inventar =
        jokerInventarLaden();


    if (
        inventar.joker50 <=
        0
    ) {

        alert(
            "Du hast keinen 50/50-Joker mehr."
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
            function(button) {

                return (
                    button.dataset.richtig !==
                    "true"
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
            function(button) {

                button.disabled =
                    true;

                button.style.opacity =
                    "0.2";

            }
        );


    jokerVerbrauchen(
        "joker50"
    );


    jokerButtonsAktualisieren();

}


/* =====================================================
   JOKER SCHUTZ
   ===================================================== */

function jokerZweiteChanceNutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    let inventar =
        jokerInventarLaden();


    if (
        inventar.jokerSchutz <=
        0
    ) {

        alert(
            "Du hast keinen Schutz-Joker mehr."
        );


        return;

    }


    bonusSchutz =
        true;


    jokerVerbrauchen(
        "jokerSchutz"
    );


    let ergebnis =
        document.getElementById(
            "ergebnis"
        );


    ergebnis.textContent =
        "🛡️ Schutz aktiviert.";


    ergebnis.style.color =
        "var(--yellow)";


    jokerButtonsAktualisieren();

}


/* =====================================================
   JOKER ZEIT
   ===================================================== */

function jokerZeitNutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    let inventar =
        jokerInventarLaden();


    if (
        inventar.jokerZeit <=
        0
    ) {

        alert(
            "Du hast keinen Zeit-Joker mehr."
        );


        return;

    }


    aktuelleZeit +=
        10;


    if (
        aktuelleZeit >
        maximaleZeit +
        10
    ) {

        aktuelleZeit =
            maximaleZeit +
            10;

    }


    jokerVerbrauchen(
        "jokerZeit"
    );


    timerUIAktualisieren();

    jokerButtonsAktualisieren();

}


/* =====================================================
   JOKER HINWEIS
   ===================================================== */

function jokerHinweisNutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv ||
        !aktuelleQuizFrage
    ) {

        return;

    }


    let inventar =
        jokerInventarLaden();


    if (
        inventar.jokerHinweis <=
        0
    ) {

        alert(
            "Du hast keinen Hinweis-Joker mehr."
        );


        return;

    }


    let richtigeAntwort =
        aktuelleQuizFrage
            .antworten[
                aktuelleQuizFrage.richtig
            ];


    jokerVerbrauchen(
        "jokerHinweis"
    );


    let ergebnis =
        document.getElementById(
            "ergebnis"
        );


    ergebnis.textContent =
        "💡 Hinweis: Die richtige Antwort hat " +
        richtigeAntwort.length +
        " Zeichen.";


    ergebnis.style.color =
        "var(--yellow)";


    jokerButtonsAktualisieren();

}


/* =====================================================
   JOKER BUTTONS
   ===================================================== */

function jokerButtonsAktualisieren() {

    let inventar =
        jokerInventarLaden();


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


    if (
        button50
    ) {

        button50.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.joker50 <=
            0;

    }


    if (
        buttonSchutz
    ) {

        buttonSchutz.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.jokerSchutz <=
            0;

    }


    if (
        buttonZeit
    ) {

        buttonZeit.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.jokerZeit <=
            0;

    }


    if (
        buttonHinweis
    ) {

        buttonHinweis.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.jokerHinweis <=
            0;

    }


    let count50 =
        document.getElementById(
            "joker50Count"
        );


    let countSchutz =
        document.getElementById(
            "jokerSchutzCount"
        );


    let countZeit =
        document.getElementById(
            "jokerZeitCount"
        );


    let countHinweis =
        document.getElementById(
            "jokerHinweisCount"
        );


    if (
        count50
    ) {

        count50.textContent =
            inventar.joker50;

    }


    if (
        countSchutz
    ) {

        countSchutz.textContent =
            inventar.jokerSchutz;

    }


    if (
        countZeit
    ) {

        countZeit.textContent =
            inventar.jokerZeit;

    }


    if (
        countHinweis
    ) {

        countHinweis.textContent =
            inventar.jokerHinweis;

    }

}


/* =====================================================
   QUIZ UI
   ===================================================== */

function quizUIAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let lebenElement =
        document.getElementById(
            "leben"
        );


    if (
        lebenElement
    ) {

        lebenElement.textContent =
            lebenText();

    }


    let comboElement =
        document.getElementById(
            "combo"
        );


    if (
        comboElement
    ) {

        comboElement.textContent =
            "x" +
            combo;

    }


    let coinsElement =
        document.getElementById(
            "coins"
        );


    if (
        coinsElement
    ) {

        coinsElement.textContent =
            spieler.coins;

    }


    let punkteElement =
        document.getElementById(
            "punkte"
        );


    if (
        punkteElement
    ) {

        punkteElement.textContent =
            punkte;

    }


    jokerButtonsAktualisieren();

}


/* =====================================================
   LEBEN
   ===================================================== */

function lebenText() {

    if (
        spielmodus ===
        "hardcore"
    ) {

        return (
            leben > 0
                ? "❤️"
                : "🖤"
        );

    }


    let text =
        "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        if (
            i < leben
        ) {

            text +=
                "❤️ ";

        }

        else {

            text +=
                "🖤 ";

        }

    }


    return text.trim();

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


    frageAnzeigen();

}


/* =====================================================
   RUNDE BEENDEN
   ===================================================== */

function quizManuellBeenden() {

    if (
        !rundeAktiv
    ) {

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
   XP FÜR RUNDE
   ===================================================== */

function xpFuerRunde() {

    let xp =
        richtigBeantwortet *
        20;


    xp +=
        Math.min(
            besteCombo *
            5,
            150
        );


    xp +=
        Math.floor(
            punkte /
            500
        ) *
        5;


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


    return Math.max(
        10,
        xp
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
   STATISTIK AKTUALISIEREN
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
            aktuelleFrage + 1
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
   GAME OVER
   ===================================================== */

function gameOver() {

    if (
        !rundeAktiv
    ) {

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


    if (
        spielmodus ===
        "hardcore"
    ) {

        localStorage.setItem(
            "quizero_hardcore_gespielt",
            "true"
        );

    }


    achievementsAktualisieren();


    besterComboSpeichern();


    /*
       Online-Speicherung darf niemals
       das Spiel blockieren.
    */

    scoreOnlineSpeichern();


    let neuesLevel =
        spieler.level;


    let levelUp =
        neuesLevel >
        altesLevel;


    setGameOverWerte(
        verdientXP,
        verdientCoins,
        levelUp
    );


    screenAnzeigen(
        "gameover"
    );

}


function setGameOverWerte(
    verdientXP,
    verdientCoins,
    levelUp
) {

    let element =
        document.getElementById(
            "gameoverPunkte"
        );


    if (
        element
    ) {

        element.textContent =
            punkte;

    }


    element =
        document.getElementById(
            "gameoverFragen"
        );


    if (
        element
    ) {

        element.textContent =
            aktuelleFrage + 1;

    }


    element =
        document.getElementById(
            "gameoverRichtig"
        );


    if (
        element
    ) {

        element.textContent =
            richtigBeantwortet;

    }


    element =
        document.getElementById(
            "gameoverCombo"
        );


    if (
        element
    ) {

        element.textContent =
            "x" +
            besteCombo;

    }


    let belohnungen =
        document.getElementById(
            "gameoverBelohnungen"
        );


    if (
        belohnungen
    ) {

        let html =
            "<div class='gameover-belohnung'>" +
            "⭐ +" +
            verdientXP +
            " XP<br>" +
            "🪙 +" +
            verdientCoins +
            " Coins";


        if (
            levelUp
        ) {

            html +=
                "<br>⬆️ LEVEL " +
                levelBerechnen(
                    spielerDatenLaden().xp
                ) +
                "!";

        }


        html +=
            "</div>";


        belohnungen.innerHTML =
            html;

    }

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
        pruefen:
            function(statistik) {

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
        pruefen:
            function(statistik) {

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
        pruefen:
            function(statistik) {

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
        pruefen:
            function(statistik) {

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
        pruefen:
            function(statistik) {

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
        pruefen:
            function(statistik) {

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
        pruefen:
            function() {

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
        text: "Spiele Hardcore.",
        pruefen:
            function() {

                return (
                    localStorage.getItem(
                        "quizero_hardcore_gespielt"
                    ) ===
                    "true"
                );

            }

    },

    {
        id: "hero",
        icon: "🐲",
        name: "QUIZ HERO",
        text: "Erreiche 420.000 XP.",
        pruefen:
            function() {

                return (
                    spielerDatenLaden().xp >=
                    420000
                );

            }

    }

];


function achievementsAktualisieren() {

    let statistik =
        statistikLaden();


    let freigeschaltet = [];


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
        function(achievement) {

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
   STARTSEITE
   ===================================================== */

function startseiteAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let level =
        levelBerechnen(
            spieler.xp
        );


    spieler.level =
        level;


    spielerDatenSpeichern(
        spieler
    );


    let xp =
        xpBisNaechstesLevel(
            spieler.xp
        );


    let avatar =
        avatarFuerXP(
            spieler.xp
        );


    let element =
        document.getElementById(
            "startLevel"
        );


    if (
        element
    ) {

        element.textContent =
            level;

    }


    element =
        document.getElementById(
            "startStreak"
        );


    if (
        element
    ) {

        element.textContent =
            spieler.streak;

    }


    element =
        document.getElementById(
            "startCoins"
        );


    if (
        element
    ) {

        element.textContent =
            spieler.coins;

    }


    element =
        document.getElementById(
            "startXP"
        );


    if (
        element
    ) {

        element.textContent =
            formatNumber(
                xp.aktuell
            ) +
            " / " +
            formatNumber(
                xp.benoetigt
            ) +
            " XP";

    }


    element =
        document.getElementById(
            "startXPBalken"
        );


    if (
        element
    ) {

        element.style.width =
            Math.min(
                100,
                (
                    xp.aktuell /
                    xp.benoetigt
                ) *
                100
            ) +
            "%";

    }


    element =
        document.getElementById(
            "startNaechstesLevel"
        );


    if (
        element
    ) {

        element.textContent =
            formatNumber(
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                level + 1
            );

    }


    element =
        document.getElementById(
            "startAvatar"
        );


    if (
        element
    ) {

        element.textContent =
            avatar.emoji;

    }


    element =
        document.getElementById(
            "startAvatarName"
        );


    if (
        element
    ) {

        element.textContent =
            avatar.name;

    }


    element =
        document.getElementById(
            "startAvatarXP"
        );


    if (
        element
    ) {

        element.textContent =
            formatNumber(
                spieler.xp
            ) +
            " XP";

    }


    spielerBegruessungAktualisieren();

}


/* =====================================================
   PROFIL
   ===================================================== */

function profilAnzeigen() {

    screenAnzeigen(
        "profil"
    );


    profilAktualisieren();

}


function profilSchliessen() {

    startAnzeigen();

}


function profilAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let statistik =
        statistikLaden();


    let xp =
        xpBisNaechstesLevel(
            spieler.xp
        );


    let avatar =
        avatarFuerXP(
            spieler.xp
        );


    let element =
        document.getElementById(
            "profilName"
        );


    if (
        element
    ) {

        element.textContent =
            spielerNameLaden() ||
            "Spieler";

    }


    element =
        document.getElementById(
            "profilLevel"
        );


    if (
        element
    ) {

        element.textContent =
            "Level " +
            xp.level;

    }


    element =
        document.getElementById(
            "profilXP"
        );


    if (
        element
    ) {

        element.textContent =
            formatNumber(
                xp.aktuell
            ) +
            " / " +
            formatNumber(
                xp.benoetigt
            ) +
            " XP";

    }


    element =
        document.getElementById(
            "profilXPBalken"
        );


    if (
        element
    ) {

        element.style.width =
            (
                xp.aktuell /
                xp.benoetigt *
                100
            ) +
            "%";

    }


    element =
        document.getElementById(
            "profilNaechstesLevel"
        );


    if (
        element
    ) {

        element.textContent =
            formatNumber(
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                xp.level + 1
            );

    }


    element =
        document.getElementById(
            "profilAvatar"
        );


    if (
        element
    ) {

        element.textContent =
            avatar.emoji;

    }


    element =
        document.getElementById(
            "profilAvatarName"
        );


    if (
        element
    ) {

        element.textContent =
            avatar.name;

    }


    element =
        document.getElementById(
            "profilAvatarXP"
        );


    if (
        element
    ) {

        element.textContent =
            formatNumber(
                spieler.xp
            ) +
            " XP";

    }


    let besterCombo =
        Number(
            localStorage.getItem(
                "quizero_bester_combo"
            )
        ) || 0;


    let html =
        "<div class='profil-stat-grid'>" +

        profilKarte(
            statistik.quizze,
            "Gespielte Runden"
        ) +

        profilKarte(
            statistik.fragen,
            "Fragen beantwortet"
        ) +

        profilKarte(
            statistik.richtig,
            "Richtige Antworten"
        ) +

        profilKarte(
            statistik.falsch,
            "Falsche Antworten"
        ) +

        profilKarte(
            statistik.bestePunkte,
            "Bester Score"
        ) +

        profilKarte(
            besterCombo,
            "Beste Combo"
        ) +

        profilKarte(
            spieler.coins,
            "Coins"
        ) +

        profilKarte(
            spieler.streak,
            "Tage Streak"
        ) +

        "</div>";


    html +=
        "<div class='profil-section-title'>" +
        "🏆 Erfolge" +
        "</div>";


    html +=
        "<div class='achievement-grid'>";


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
        function(achievement) {

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


    let profilInhalt =
        document.getElementById(
            "profilInhalt"
        );


    if (
        profilInhalt
    ) {

        profilInhalt.innerHTML =
            html;

    }

}


function profilKarte(
    wert,
    text
) {

    return (

        "<div class='profil-stat-card'>" +

        "<strong>" +
        escapeHTML(
            wert
        ) +
        "</strong>" +

        "<span>" +
        escapeHTML(
            text
        ) +
        "</span>" +

        "</div>"

    );

}


/* =====================================================
   SHOP
   ===================================================== */

function shopAnzeigen() {

    screenAnzeigen(
        "shop"
    );


    shopAktualisieren();

}


function shopSchliessen() {

    startAnzeigen();

}


function shopAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let coinsElement =
        document.getElementById(
            "shopCoins"
        );


    if (
        coinsElement
    ) {

        coinsElement.textContent =
            "🪙 " +
            spieler.coins;

    }


    let container =
        document.getElementById(
            "shopInhalt"
        );


    if (
        !container
    ) {

        return;

    }


    let inventar =
        jokerInventarLaden();


    let html =
        "";


    SHOP_JOKER.forEach(
        function(typ) {

            let item =
                JOKER_DEFINITIONEN[
                    typ
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

                "<div class='shop-item-count'>" +
                "Im Inventar: " +
                inventar[typ] +
                "</div>" +

                "<button " +

                "class='shop-buy' " +

                "onclick=\"shopKaufen('" +
                typ +
                "')\" " +

                (
                    spieler.coins <
                    item.preis
                        ? "disabled"
                        : ""
                ) +

                ">" +

                "🪙 " +
                item.preis +

                "</button>" +

                "</div>";

        }
    );


    container.innerHTML =
        html;

}


function shopKaufen(
    typ
) {

    let item =
        JOKER_DEFINITIONEN[
            typ
        ];


    if (
        !item
    ) {

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


    inventar[typ] =
        (
            Number(
                inventar[typ]
            ) || 0
        ) +
        1;


    jokerInventarSpeichern(
        inventar
    );


    shopAktualisieren();

}


/* =====================================================
   BESTENLISTE
   ===================================================== */

async function bestenlisteAnzeigen() {

    screenAnzeigen(
        "bestenliste"
    );


    await bestenlisteLaden();

}


function bestenlisteSchliessen() {

    startAnzeigen();

}


async function bestenlisteLaden() {

    let container =
        document.getElementById(
            "bestenlisteInhalt"
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        "<p>Lade Bestenliste...</p>";


    if (
        !supabaseClient
    ) {

        container.innerHTML =
            "<p>Bestenliste momentan nicht verfügbar.</p>";


        return;

    }


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
                    50
                );


        if (
            error
        ) {

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

            "<div class='bestenliste-tabelle'>" +

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

                let avatar =
                    eintrag.avatar ||
                    avatarFuerXP(
                        0
                    ).emoji;


                let name =
                    escapeHTML(
                        eintrag.spielername ||
                        "Spieler"
                    );


                let kategorie =
                    KATEGORIEN.find(
                        function(kat) {

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
                        index + 1
                    ) +
                    "</div>" +

                    "<div class='best-player'>" +

                    "<span class='best-avatar'>" +
                    escapeHTML(
                        avatar
                    ) +
                    "</span>" +

                    "<span class='best-name'>" +
                    name +
                    "</span>" +

                    "</div>" +

                    "<div class='bestenliste-score'>" +
                    (
                        Number(
                            eintrag.punkte
                        ) || 0
                    ) +
                    "</div>" +

                    "<div>" +

                    (
                        kategorie
                            ? kategorie.name
                            : escapeHTML(
                                eintrag.kategorie ||
                                ""
                            )
                    ) +

                    "<br>" +

                    (
                        Number(
                            eintrag.prozent
                        ) || 0
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
            "Bestenliste:",
            fehler
        );


        container.innerHTML =
            "<p>Die Bestenliste konnte momentan nicht geladen werden.</p>";

    }

}


/* =====================================================
   ONLINE SCORE
   ===================================================== */

async function scoreOnlineSpeichern() {

    if (
        !supabaseClient
    ) {

        return;

    }


    let name =
        spielerNameLaden() ||
        "Spieler";


    let spieler =
        spielerDatenLaden();


    let avatar =
        avatarFuerXP(
            spieler.xp
        ).emoji;


    let prozent =
        Math.round(
            (
                richtigBeantwortet /
                Math.max(
                    1,
                    aktuelleFrage + 1
                )
            ) *
            100
        );


    let datenMitAvatar = {

        spielername:
            name,

        avatar:
            avatar,

        kategorie:
            ausgewaehlteKategorie,

        schwierigkeit:
            schwierigkeitFuerRunde(),

        anzahl_fragen:
            aktuelleFrage + 1,

        punkte:
            punkte,

        prozent:
            prozent

    };


    try {

        /*
           Erst mit Avatar versuchen.
        */

        let ergebnis =
            await supabaseClient
                .from(
                    "bestenliste"
                )
                .insert(
                    [
                        datenMitAvatar
                    ]
                );


        /*
           Falls die Avatar-Spalte
           noch nicht existiert, wird
           als Fallback ohne Avatar
           gespeichert.
        */

        if (
            ergebnis.error
        ) {

            console.warn(
                "Score mit Avatar konnte nicht gespeichert werden. Fallback ohne Avatar.",
                ergebnis.error
            );


            let ohneAvatar = {

                spielername:
                    name,

                kategorie:
                    ausgewaehlteKategorie,

                schwierigkeit:
                    schwierigkeitFuerRunde(),

                anzahl_fragen:
                    aktuelleFrage + 1,

                punkte:
                    punkte,

                prozent:
                    prozent

            };


            await supabaseClient
                .from(
                    "bestenliste"
                )
                .insert(
                    [
                        ohneAvatar
                    ]
                );

        }

    }

    catch (fehler) {

        console.error(
            "Online Score:",
            fehler
        );

    }

}


/* =====================================================
   NOCHMAL SPIELEN
   ===================================================== */

function nochmalSpielen() {

    screenAnzeigen(
        "kategorien"
    );


    kategorienAnzeigen();

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
   FORMAT
   ===================================================== */

function formatNumber(
    zahl
) {

    return Number(
        zahl
    ).toLocaleString(
        "de-DE"
    );

}


/* =====================================================
   BROWSER ZURÜCK
   ===================================================== */

let navigationInitialisiert =
    false;


function browserNavigationEinrichten() {

    if (
        navigationInitialisiert
    ) {

        return;

    }


    navigationInitialisiert =
        true;


    history.pushState(
        {
            quizero: true
        },
        "",
        window.location.href
    );


    window.addEventListener(
        "popstate",
        function() {

            /*
               Browser-Zurück führt immer
               sicher zum Start.
            */

            timerStoppen();

            rundeAktiv =
                false;


            startAnzeigen();


            history.pushState(
                {
                    quizero: true
                },
                "",
                window.location.href
            );

        }
    );

}


/* =====================================================
   SPIELER STARTEN
   ===================================================== */

function spielerStarten() {

    spielerNameEinrichten();

    jokerInventarLaden();

    startseiteAktualisieren();

}


/* =====================================================
   INITIALISIERUNG
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        browserNavigationEinrichten();

        spielerStarten();

        kategorienAnzeigen();


        /*
           Sicherheitscheck:
           Falls fragen.js nicht geladen
           wurde, wird die Ursache
           sofort in der Konsole angezeigt.
        */

        if (
            !fragenDatenbankPruefen()
        ) {

            console.error(
                "QUIZERO: Die Fragen-Datenbank konnte nicht geladen werden. Prüfe, ob fragen.js vor script.js eingebunden ist."
            );

        }

    }
);

