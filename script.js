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
   SPIELER
   ===================================================== */

function spielerNameLaden() {

    return (
        localStorage.getItem("spieler_name") ||
        ""
    );

}


function spielerNameSpeichern(name) {

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


        if (name.length > 20) {

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


    spielerBegruessungAktualisieren();

}


function spielerNameAendern() {

    let aktuellerName =
        spielerNameLaden();


    let neuerName =
        prompt(
            "Wie soll dein Spielername heißen?",
            aktuellerName
        );


    if (neuerName === null) {

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
   SPIELSTATISTIK
   ===================================================== */

function statistikLaden() {

    let statistik =
        localStorage.getItem(
            "quizero_statistik"
        );


    if (statistik) {

        try {

            return JSON.parse(
                statistik
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
   AKTUELLER SPIELZUSTAND
   ===================================================== */

let fragen =
    [];

let verwendeteFragen =
    [];

let aktuelleFrage =
    0;

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

let joker50 =
    true;

let jokerZweiteChance =
    true;

let jokerZeit =
    true;

let jokerHinweis =
    true;

let bonusSchutz =
    false;

let rundeAktiv =
    false;


/* =====================================================
   LEVEL
   ===================================================== */

function levelBerechnen(
    xp
) {

    let level =
        1;

    let benoetigteXP =
        100;

    let verbleibendeXP =
        xp;


    while (
        verbleibendeXP >=
        benoetigteXP
    ) {

        verbleibendeXP -=
            benoetigteXP;

        level++;

        benoetigteXP =
            100 +
            (
                (level - 1) *
                25
            );

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


    let gesamtXP =
        0;


    for (
        let i = 1;
        i < level;
        i++
    ) {

        gesamtXP +=
            100 +
            (
                (i - 1) *
                25
            );

    }


    let aktuelleXP =
        xp -
        gesamtXP;


    let benoetigteXP =
        100 +
        (
            (level - 1) *
            25
        );


    return {

        aktuell:
            aktuelleXP,

        benoetigt:
            benoetigteXP

    };

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


    document.getElementById(
        "startLevel"
    ).textContent =
        "Level " +
        level;


    document.getElementById(
        "startStreak"
    ).textContent =
        spieler.streak;


    document.getElementById(
        "startCoins"
    ).textContent =
        spieler.coins;


    document.getElementById(
        "startXP"
    ).textContent =
        xp.aktuell +
        " / " +
        xp.benoetigt +
        " XP";


    let prozent =
        (
            xp.aktuell /
            xp.benoetigt
        ) *
        100;


    document.getElementById(
        "startXPBalken"
    ).style.width =
        prozent +
        "%";


    document.getElementById(
        "startNaechstesLevel"
    ).textContent =
        (
            xp.benoetigt -
            xp.aktuell
        ) +
        " XP bis Level " +
        (
            level + 1
        );

}


function spielerStarten() {

    spielerNameEinrichten();

    startseiteAktualisieren();

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


function startAnzeigen() {

    screensAusblenden();

    document.getElementById(
        "startbildschirm"
    ).style.display =
        "block";

    startseiteAktualisieren();

    spielerBegruessungAktualisieren();

}


function zurueckZumStart() {

    timerStoppen();

    rundeAktiv =
        false;

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


function zurueckZumStartDirekt() {

    startAnzeigen();

}


/* =====================================================
   SPIELMODUS
   ===================================================== */

function spielmodusWaehlen(
    modus
) {

    spielmodus =
        modus;


    screensAusblenden();

    document.getElementById(
        "kategorien"
    ).style.display =
        "block";


    kategorienAnzeigen();

}


/* =====================================================
   KATEGORIEN ANZEIGEN
   ===================================================== */

function kategorienAnzeigen() {

    let container =
        document.getElementById(
            "kategorieButtons"
        );


    container.innerHTML =
        "";


    KATEGORIEN.forEach(
        function(kategorie) {

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


/* =====================================================
   KATEGORIE WÄHLEN
   ===================================================== */

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
            function(frage) {

                return (
                    frage.kategorie ===
                    ausgewaehlteKategorie
                );

            }
        );


    passendeFragen =
        passendeFragen.filter(
            function(frage) {

                return !verwendeteFragen.includes(
                    frage.frage
                );

            }
        );


    if (
        passendeFragen.length ===
        0
    ) {

        verwendeteFragen =
            [];

        passendeFragen =
            alleFragen.filter(
                function(frage) {

                    return (
                        frage.kategorie ===
                        ausgewaehlteKategorie
                    );

                }
            );

    }


    passendeFragen.sort(
        function() {

            return Math.random() -
                0.5;

        }
    );


    fragen =
        passendeFragen;

}


/* =====================================================
   RUNDE STARTEN
   ===================================================== */

function rundeStarten() {

    screensAusblenden();


    document.getElementById(
        "quiz"
    ).style.display =
        "block";


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

    joker50 =
        true;

    jokerZweiteChance =
        true;

    jokerZeit =
        true;

    jokerHinweis =
        true;

    bonusSchutz =
        false;

    rundeAktiv =
        true;


    fragePoolErstellen();

    spielerDatenLaden();

    quizUIAktualisieren();

    frageAnzeigen();

}


/* =====================================================
   SCHWIERIGKEIT DYNAMISCH
   ===================================================== */

function schwierigkeitFuerRunde() {

    let nummer =
        aktuelleFrage + 1;


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


    if (
        nummer <= 20
    ) {

        return "schwer";

    }


    return "schwer";

}


function schwierigkeitText() {

    let schwierigkeit =
        schwierigkeitFuerRunde();


    if (
        schwierigkeit ===
        "leicht"
    ) {

        return "🟢 Leicht";

    }


    if (
        schwierigkeit ===
        "mittel"
    ) {

        return "🟡 Mittel";

    }


    return "🔴 Schwer";

}


/* =====================================================
   FRAGE AUSWÄHLEN
   ===================================================== */

function naechsteFrageAusPool() {

    let schwierigkeit =
        schwierigkeitFuerRunde();


    let pool =
        fragen.filter(
            function(frage) {

                return (
                    frage.schwierigkeit ===
                    schwierigkeit
                );

            }
        );


    pool =
        pool.filter(
            function(frage) {

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
                function(frage) {

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


    let zufallsIndex =
        Math.floor(
            Math.random() *
            pool.length
        );


    let frage =
        pool[
            zufallsIndex
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


    timerStoppen();


    let frage =
        naechsteFrageAusPool();


    window.aktuelleQuizFrage =
        frage;


    document.getElementById(
        "rundeInfo"
    ).textContent =
        "Runde " +
        (
            aktuelleFrage + 1
        );


    document.getElementById(
        "schwierigkeitInfo"
    ).textContent =
        schwierigkeitText();


    document.getElementById(
        "frage"
    ).textContent =
        frage.frage;


    let antwortenContainer =
        document.getElementById(
            "antworten"
        );


    antwortenContainer.innerHTML =
        "";


    let antworten =
        frage.antworten.map(
            function(
                antwort,
                index
            ) {

                return {

                    text:
                        antwort,

                    richtig:
                        index ===
                        frage.richtig

                };

            }
        );


    antworten.sort(
        function() {

            return Math.random() -
                0.5;

        }
    );


    antworten.forEach(
        function(antwort) {

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
                        antwort.richtig,
                        button
                    );

                };


            antwortenContainer.appendChild(
                button
            );

        }
    );


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
            aktuelleFrage < 5
        ) {

            return 15;

        }

        if (
            aktuelleFrage < 10
        ) {

            return 12;

        }

        return 10;

    }


    if (
        spielmodus ===
        "hardcore"
    ) {

        return 15;

    }


    if (
        aktuelleFrage < 5
    ) {

        return 20;

    }


    if (
        aktuelleFrage < 10
    ) {

        return 18;

    }


    if (
        aktuelleFrage < 20
    ) {

        return 15;

    }


    return 12;

}


function timerStarten() {

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

    if (timer) {

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


    let prozent =
        (
            aktuelleZeit /
            maximaleZeit
        ) *
        100;


    balken.style.width =
        Math.max(
            0,
            prozent
        ) +
        "%";


    text.textContent =
        Math.ceil(
            aktuelleZeit
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


    document.getElementById(
        "ergebnis"
    ).textContent =
        "⏰ Zeit abgelaufen!";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ff6666";


    lebenVerlieren();


    antwortenSperren();


    if (
        leben <=
        0
    ) {

        setTimeout(
            gameOver,
            900
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


    antwortenSperren();


    if (istRichtig) {

        button.classList.add(
            "richtig"
        );


        richtigBeantwortet++;

        combo++;


        if (
            combo >
            besteCombo
        ) {

            besteCombo =
                combo;

        }


        let bonus =
            punkteFuerAntwort();


        punkte +=
            bonus;


        let coins =
            coinsFuerAntwort();


        coinsGutschreiben(
            coins
        );


        document.getElementById(
            "ergebnis"
        ).textContent =
            "✓ Richtig! +" +
            bonus +
            " Punkte";


        document.getElementById(
            "ergebnis"
        ).style.color =
            "#65e49a";

    }

    else {

        button.classList.add(
            "falsch"
        );


        richtigerButtonMarkieren();


        falschBeantwortet++;

        combo =
            0;


        if (
            bonusSchutz
        ) {

            bonusSchutz =
                false;


            document.getElementById(
                "ergebnis"
            ).textContent =
                "🛡️ Schutz aktiviert! Kein Leben verloren.";

        }

        else {

            lebenVerlieren();


            document.getElementById(
                "ergebnis"
            ).textContent =
                "✕ Falsch!";

        }


        document.getElementById(
            "ergebnis"
        ).style.color =
            "#ff6666";


        if (
            leben <=
            0
        ) {

            setTimeout(
                gameOver,
                900
            );

            return;

        }

    }


    quizUIAktualisieren();


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;

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

}


/* =====================================================
   RICHTIGE ANTWORT MARKIEREN
   ===================================================== */

function richtigerButtonMarkieren() {

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
   LEBEN
   ===================================================== */

function lebenVerlieren() {

    leben--;

    quizUIAktualisieren();

}


function lebenText() {

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
   PUNKTE
   ===================================================== */

function punkteFuerAntwort() {

    let basis =
        100;


    let schwierigkeit =
        schwierigkeitFuerRunde();


    if (
        schwierigkeit ===
        "mittel"
    ) {

        basis =
            150;

    }


    if (
        schwierigkeit ===
        "schwer"
    ) {

        basis =
            225;

    }


    if (
        spielmodus ===
        "zeitdruck"
    ) {

        basis *=
            1.4;

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


    document.getElementById(
        "coins"
    ).textContent =
        spieler.coins;

}


/* =====================================================
   JOKER
   ===================================================== */

function joker50Nutzen() {

    if (
        !joker50 ||
        antwortGegeben
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
            function(button) {

                return (
                    button.dataset.richtig !==
                    "true"
                );

            }
        );


    falsche.sort(
        function() {

            return Math.random() -
                0.5;

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
        !jokerZweiteChance ||
        antwortGegeben
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


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


function jokerZeitNutzen() {

    if (
        !jokerZeit ||
        antwortGegeben
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


    timerUIAktualisieren();

    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


function jokerHinweisNutzen() {

    if (
        !jokerHinweis ||
        antwortGegeben
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
        "💡 Hinweis: Eine mögliche falsche Antwort ist „" +
        zufall +
        "“.";


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ffd21f";


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


function jokerButtonsAktualisieren() {

    let spieler =
        spielerDatenLaden();


    document.getElementById(
        "joker5050"
    ).disabled =
        !joker50 ||
        antwortGegeben ||
        spieler.coins < 25;


    document.getElementById(
        "jokerZweiteChance"
    ).disabled =
        !jokerZweiteChance ||
        antwortGegeben ||
        spieler.coins < 40;


    document.getElementById(
        "jokerZeit"
    ).disabled =
        !jokerZeit ||
        antwortGegeben ||
        spieler.coins < 30;


    document.getElementById(
        "jokerHinweis"
    ).disabled =
        !jokerHinweis ||
        antwortGegeben ||
        spieler.coins < 50;

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
            "<br><br>⬆️ LEVEL " +
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
        datum.getDate() - 1
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
        id: "erste_runde",
        icon: "🎮",
        name: "Erste Runde",
        text: "Spiele deine erste Runde.",
        pruefen: function(statistik) {

            return statistik.quizze >= 1;

        }
    },


    {
        id: "zehn_fragen",
        icon: "🧠",
        name: "Warmgelaufen",
        text: "Beantworte 10 Fragen.",
        pruefen: function(statistik) {

            return statistik.fragen >= 10;

        }
    },


    {
        id: "hundert_fragen",
        icon: "💯",
        name: "Quizmaschine",
        text: "Beantworte 100 Fragen.",
        pruefen: function(statistik) {

            return statistik.fragen >= 100;

        }
    },


    {
        id: "combo5",
        icon: "🔥",
        name: "Heiß gelaufen",
        text: "Erreiche eine 5er Combo.",
        pruefen: function(statistik) {

            return statistik.besteCombo >= 5;

        }
    },


    {
        id: "combo10",
        icon: "⚡",
        name: "Unaufhaltsam",
        text: "Erreiche eine 10er Combo.",
        pruefen: function(statistik) {

            return statistik.besteCombo >= 10;

        }
    },


    {
        id: "combo20",
        icon: "👑",
        name: "Quiz Hero",
        text: "Erreiche eine 20er Combo.",
        pruefen: function(statistik) {

            return statistik.besteCombo >= 20;

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
                ) >= 10
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
                ) === "true"
            );

        }
    }

];


function achievementsAktualisieren() {

    let statistik =
        statistikLaden();


    let freigeschaltet =
        JSON.parse(
            localStorage.getItem(
                "quizero_achievements"
            ) ||
            "[]"
        );


    ACHIEVEMENTS.forEach(
        function(achievement) {

            if (
                achievement.pruefen(
                    statistik
                )
                &&
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


function profilSchliessen() {

    startAnzeigen();

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


    let name =
        spielerNameLaden();


    document.getElementById(
        "profilName"
    ).textContent =
        name;


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
            level + 1
        );


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
        JSON.parse(
            localStorage.getItem(
                "quizero_achievements"
            ) ||
            "[]"
        );


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
                            : eintrag.kategorie
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


function bestenlisteSchliessen() {

    startAnzeigen();

}


/* =====================================================
   ONLINE SCORE SPEICHERN
   ===================================================== */

async function scoreOnlineSpeichern() {

    let name =
        spielerNameLaden();


    if (!name) {

        name =
            "Spieler";

    }


    let prozent =
        (
            (richtigBeantwortet /
            Math.max(
                1,
                aktuelleFrage + 1
            )) *
            100
        );


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
                            aktuelleFrage + 1,

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
   HARDCORE TRACKING
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
   UI
   ===================================================== */

function quizUIAktualisieren() {

    let spieler =
        spielerDatenLaden();


    document.getElementById(
        "leben"
    ).textContent =
        lebenText();


    document.getElementById(
        "combo"
    ).textContent =
        "x" +
        combo;


    document.getElementById(
        "coins"
    ).textContent =
        spieler.coins;


    jokerButtonsAktualisieren();

}


/* =====================================================
   NOCHMAL SPIELEN
   ===================================================== */

function nochmalSpielen() {

    hardcoreTracken();

    screensAusblenden();

    document.getElementById(
        "kategorien"
    ).style.display =
        "block";

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
   START
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        spielerStarten();

        kategorienAnzeigen();

    }
);
