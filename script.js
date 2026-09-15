/* =====================================================
   QUIZERO 2.0
   SPIELLOGIK
   ===================================================== */


/* =====================================================
   SUPABASE
   ===================================================== */

const SUPABASE_URL =
    "https://agvkfksnqwdtimrcdkly.supabase.co";

const SUPABASE_KEY =
    "DEIN_PUBLIC_SUPABASE_KEY";


let supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/*
   Falls du bereits deinen Public Key in deiner
   bisherigen script.js hast:

   NUR diese Konstante mit deinem bisherigen Key
   beibehalten.

   Der Public/Publishable Key darf im Browser stehen.
*/


/* =====================================================
   SPIELER
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


        spielerNameSpeichern(
            name
        );

    }

}


function spielerNameAendern() {

    let alterName =
        spielerNameLaden();


    let neuerName =
        prompt(
            "Neuer Spielername:",
            alterName
        );


    if (!neuerName) {

        return;

    }


    neuerName =
        neuerName.trim();


    if (!neuerName) {

        return;

    }


    spielerNameSpeichern(
        neuerName
    );


    startseiteAktualisieren();

    profilAktualisieren();

    spielerBegruessungAktualisieren();

}


function spielerBegruessungAktualisieren() {

    let element =
        document.getElementById(
            "spielerBegruessung"
        );


    if (!element) {

        return;

    }


    let name =
        spielerNameLaden();


    element.textContent =
        "Willkommen zurück, " +
        name +
        "!";

}


/* =====================================================
   SPIELERDATEN
   ===================================================== */

function spielerDatenLaden() {

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
   SHOP / JOKER INVENTAR
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
            "Entfernt eine mögliche falsche Antwort aus deiner Auswahl.",

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


    let coinsElement =
        document.getElementById(
            "shopCoins"
        );


    if (coinsElement) {

        coinsElement.textContent =
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
                SHOP_ITEMS[key];


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


    inventar[jokerTyp]++;


    jokerInventarSpeichern(
        inventar
    );


    shopAktualisieren();

    startseiteAktualisieren();

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
   KATEGORIEN
   ===================================================== */

const KATEGORIEN = [

    {
        wert:
            "allgemein",

        name:
            "🧠 Allgemeinwissen"

    },

    {
        wert:
            "sport",

        name:
            "🏆 Sport"

    },

    {
        wert:
            "geschichte",

        name:
            "📜 Geschichte"

    },

    {
        wert:
            "technik",

        name:
            "⚙️ Technik"

    },

    {
        wert:
            "wissenschaft",

        name:
            "🔬 Wissenschaft"

    },

    {
        wert:
            "geografie",

        name:
            "🌍 Geografie"

    },

    {
        wert:
            "film",

        name:
            "🎬 Film & Serien"

    },

    {
        wert:
            "musik",

        name:
            "🎵 Musik"

    },

    {
        wert:
            "gaming",

        name:
            "🎮 Gaming"

    },

    {
        wert:
            "autos",

        name:
            "🚗 Autos"

    },

    {
        wert:
            "natur",

        name:
            "🌿 Natur & Tiere"

    },

    {
        wert:
            "weltraum",

        name:
            "🚀 Weltraum"

    },

    {
        wert:
            "wirtschaft",

        name:
            "💰 Wirtschaft"

    },

    {
        wert:
            "essen",

        name:
            "🍔 Essen & Trinken"

    },

    {
        wert:
            "literatur",

        name:
            "📚 Literatur"

    },

    {
        wert:
            "deutschland",

        name:
            "🇩🇪 Deutschland"

    },

    {
        wert:
            "fussball",

        name:
            "⚽ Fußball"

    },

    {
        wert:
            "logik",

        name:
            "🧩 Logik"

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

let aktuelleFrageDaten =
    null;


/* =====================================================
   LEVEL
   ===================================================== */

function levelBerechnen(
    xp
) {

    return Math.floor(
        xp / 100
    ) + 1;

}


function xpBisNaechstesLevel(
    xp
) {

    let level =
        levelBerechnen(
            xp
        );


    let startXP =
        (
            level - 1
        ) * 100;


    let aktuell =
        Math.max(
            0,
            xp - startXP
        );


    return {

        aktuell:
            aktuell,

        benoetigt:
            100

    };

}


/* =====================================================
   START
   ===================================================== */

function spielerStarten() {

    spielerNameEinrichten();

    startseiteAktualisieren();

    spielerBegruessungAktualisieren();

}


function startseiteAktualisieren() {

    let spieler =
        spielerDatenLaden();


    let xp =
        xpBisNaechstesLevel(
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
            spieler.level;

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
                spieler.level +
                1
            );

    }

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
   FRAGEN-POOL
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
        nummer <= 5
    ) {

        return "leicht";

    }


    if (
        nummer <= 10
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
   FRAGE AUSWÄHLEN
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
        pool.length === 0
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
        pool.length === 0
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


    let nextButton =
        document.getElementById(
            "naechsteFrage"
        );


    nextButton.disabled =
        true;


    let antwortContainer =
        document.getElementById(
            "antworten"
        );


    antwortContainer.innerHTML =
        "";


    /*
       Antworten kopieren und mischen.
       Dabei wird der richtige Index korrekt
       mitverschoben.
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


    /*
       Auf dem Handy wieder oben beginnen.
    */

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

                if (!rundeAktiv) {

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
                ) * 100
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


    quizUIAktualisieren();


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;


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


        if (bonusSchutz) {

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
                Math.max(
                    1,
                    maximaleZeit
                )
            ) * 100
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
        combo >= 5
    ) {

        coins +=
            3;

    }


    if (
        combo >= 10
    ) {

        coins +=
            5;

    }


    if (
        combo >= 20
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

}


/* =====================================================
   JOKER
   ===================================================== */

function joker50Nutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    jokerNutzen(
        "joker50",
        function() {

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
                    function(
                        button
                    ) {

                        button.disabled =
                            true;

                        button.style.opacity =
                            "0.2";

                    }
                );


            document.getElementById(
                "ergebnis"
            ).textContent =
                "½ Zwei falsche Antworten wurden entfernt.";

        }
    );

}


function jokerZweiteChanceNutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    jokerNutzen(
        "jokerZweiteChance",
        function() {

            bonusSchutz =
                true;


            document.getElementById(
                "ergebnis"
            ).textContent =
                "🛡️ Schutz aktiviert!";

        }
    );

}


function jokerZeitNutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    jokerNutzen(
        "jokerZeit",
        function() {

            aktuelleZeit +=
                10;


            maximaleZeit =
                Math.max(
                    maximaleZeit,
                    aktuelleZeit
                );


            document.getElementById(
                "ergebnis"
            ).textContent =
                "⏱️ +10 Sekunden!";


            timerUIAktualisieren();

        }
    );

}


function jokerHinweisNutzen() {

    if (
        antwortGegeben ||
        !rundeAktiv
    ) {

        return;

    }


    jokerNutzen(
        "jokerHinweis",
        function() {

            let frage =
                aktuelleFrageDaten;


            if (!frage) {

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


            if (
                falsche.length
            ) {

                let button =
                    falsche[
                        Math.floor(
                            Math.random() *
                            falsche.length
                        )
                    ];


                button.disabled =
                    true;

                button.style.opacity =
                    "0.25";


                document.getElementById(
                    "ergebnis"
                ).textContent =
                    "💡 Hinweis: Diese Antwort ist es nicht.";

            }

        }
    );

}


function jokerNutzen(
    jokerTyp,
    aktion
) {

    let inventar =
        jokerInventarLaden();


    if (
        !inventar[jokerTyp] ||
        inventar[jokerTyp] <= 0
    ) {

        alert(
            "Du hast diesen Joker nicht im Inventar. Du kannst ihn im Shop kaufen."
        );

        return;

    }


    inventar[jokerTyp]--;


    jokerInventarSpeichern(
        inventar
    );


    aktion();


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

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


    if (button50) {

        button50.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.joker50 <= 0;

        button50.querySelector(
            "small"
        ).textContent =
            inventar.joker50;

    }


    if (buttonSchutz) {

        buttonSchutz.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.jokerZweiteChance <= 0;

        buttonSchutz.querySelector(
            "small"
        ).textContent =
            inventar.jokerZweiteChance;

    }


    if (buttonZeit) {

        buttonZeit.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.jokerZeit <= 0;

        buttonZeit.querySelector(
            "small"
        ).textContent =
            inventar.jokerZeit;

    }


    if (buttonHinweis) {

        buttonHinweis.disabled =
            !rundeAktiv ||
            antwortGegeben ||
            inventar.jokerHinweis <= 0;

        buttonHinweis.querySelector(
            "small"
        ).textContent =
            inventar.jokerHinweis;

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


    if (
        leben <=
        0
    ) {

        gameOver();

        return;

    }


    aktuelleFrage++;


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


    if (!bestaetigung) {

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
        spieler.level;


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


    hardcoreTracken();


    scoreOnlineSpeichern();


    achievementsAktualisieren();


    besterComboSpeichern();


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
   XP
   ===================================================== */

function xpFuerRunde() {

    let xp =
        richtigBeantwortet *
        5;


    xp +=
        Math.min(
            besteCombo * 2,
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
                xp * 1.5
            );

    }


    if (
        spielmodus ===
        "zeitdruck"
    ) {

        xp =
            Math.round(
                xp * 1.25
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
        .split("T")[0];

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
        .split("T")[0];

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

        id:
            "erste_runde",

        icon:
            "🎮",

        name:
            "Erste Runde",

        text:
            "Spiele deine erste Runde.",

        pruefen:
            function(
                statistik
            ) {

                return (
                    statistik.quizze >=
                    1
                );

            }

    },

    {

        id:
            "zehn_fragen",

        icon:
            "🧠",

        name:
            "Warmgelaufen",

        text:
            "Beantworte 10 Fragen.",

        pruefen:
            function(
                statistik
            ) {

                return (
                    statistik.fragen >=
                    10
                );

            }

    },

    {

        id:
            "hundert_fragen",

        icon:
            "💯",

        name:
            "Quizmaschine",

        text:
            "Beantworte 100 Fragen.",

        pruefen:
            function(
                statistik
            ) {

                return (
                    statistik.fragen >=
                    100
                );

            }

    },

    {

        id:
            "combo5",

        icon:
            "🔥",

        name:
            "Heiß gelaufen",

        text:
            "Erreiche eine 5er Combo.",

        pruefen:
            function(
                statistik
            ) {

                return (
                    statistik.besteCombo >=
                    5
                );

            }

    },

    {

        id:
            "combo10",

        icon:
            "⚡",

        name:
            "Unaufhaltsam",

        text:
            "Erreiche eine 10er Combo.",

        pruefen:
            function(
                statistik
            ) {

                return (
                    statistik.besteCombo >=
                    10
                );

            }

    },

    {

        id:
            "combo20",

        icon:
            "👑",

        name:
            "Quiz Hero",

        text:
            "Erreiche eine 20er Combo.",

        pruefen:
            function(
                statistik
            ) {

                return (
                    statistik.besteCombo >=
                    20
                );

            }

    },

    {

        id:
            "level10",

        icon:
            "🏆",

        name:
            "Veteran",

        text:
            "Erreiche Level 10.",

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

        id:
            "hardcore",

        icon:
            "💀",

        name:
            "Hardcore",

        text:
            "Spiele eine Hardcore-Runde.",

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

        id:
            "shop",

        icon:
            "🛒",

        name:
            "Shopper",

        text:
            "Kaufe deinen ersten Joker.",

        pruefen:
            function() {

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


    let freigeschaltet;


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

    screensAusblenden();


    document.getElementById(
        "profil"
    ).style.display =
        "block";


    profilAktualisieren();

}


function profilAktualisieren() {

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


    document.getElementById(
        "profilName"
    ).textContent =
        spielerNameLaden();


    document.getElementById(
        "profilLevel"
    ).textContent =
        "Level " +
        level;


    document.getElementById(
        "profilXP"
    ).textContent =
        xp.aktuell +
        " / " +
        xp.benoetigt +
        " XP";


    document.getElementById(
        "profilXPBalken"
    ).style.width =
        (
            xp.aktuell /
            xp.benoetigt *
            100
        ) +
        "%";


    document.getElementById(
        "profilNaechstesLevel"
    ).textContent =
        (
            xp.benoetigt -
            xp.aktuell
        ) +
        " XP bis Level " +
        (
            level +
            1
        );


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
   ONLINE SCORE
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
   START
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        spielerStarten();

        kategorienAnzeigen();

    }
);

