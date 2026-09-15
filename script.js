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

            console.error(
                "Spielerdaten konnten nicht gelesen werden:",
                fehler
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
   STATISTIK
   ===================================================== */

function statistikLaden() {

    let daten =
        localStorage.getItem(
            "quizero_statistik"
        );


    if (daten) {

        try {

            return JSON.parse(
                daten
            );

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


/* =====================================================
   JOKER
   WICHTIG: DIESE VARIABLEN MÜSSEN EXISTIEREN
   ===================================================== */

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


/* =====================================================
   RUNDE
   ===================================================== */

let rundeAktiv =
    false;


/* =====================================================
   LEVELSYSTEM
   ===================================================== */

/*
   Level 1 -> 100 XP
   Level 2 -> 125 XP
   Level 3 -> 150 XP
   Level 4 -> 175 XP
   Level 5 -> 200 XP
   usw.

   Die benötigte XP steigt also mit jedem Level.
*/

function xpFuerLevel(
    level
) {

    if (
        level <= 1
    ) {

        return 100;

    }


    return (
        100 +
        (
            (level - 1) *
            25
        )
    );

}


function levelBerechnen(
    xp
) {

    let level =
        1;

    let verbleibendeXP =
        Math.max(
            0,
            Number(xp) || 0
        );


    let benoetigteXP =
        xpFuerLevel(
            level
        );


    while (
        verbleibendeXP >=
        benoetigteXP
    ) {

        verbleibendeXP -=
            benoetigteXP;

        level++;

        benoetigteXP =
            xpFuerLevel(
                level
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


    let gesamtXPVorLevel =
        0;


    for (
        let i = 1;
        i < level;
        i++
    ) {

        gesamtXPVorLevel +=
            xpFuerLevel(
                i
            );

    }


    let aktuell =
        Math.max(
            0,
            xp -
            gesamtXPVorLevel
        );


    let benoetigt =
        xpFuerLevel(
            level
        );


    return {

        level:
            level,

        aktuell:
            aktuell,

        benoetigt:
            benoetigt

    };

}


/* =====================================================
   STARTSEITE
   ===================================================== */

function startAnzeigen() {

    screensAusblenden();


    document.getElementById(
        "startbildschirm"
    ).style.display =
        "block";


    startseiteAktualisieren();

}


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


    let levelElement =
        document.getElementById(
            "startLevel"
        );


    if (levelElement) {

        levelElement.textContent =
            level;

    }


    let streakElement =
        document.getElementById(
            "startStreak"
        );


    if (streakElement) {

        streakElement.textContent =
            spieler.streak;

    }


    let coinsElement =
        document.getElementById(
            "startCoins"
        );


    if (coinsElement) {

        coinsElement.textContent =
            spieler.coins;

    }


    let xpElement =
        document.getElementById(
            "startXP"
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
            "startXPBalken"
        );


    if (xpBalken) {

        let prozent =
            (
                xp.aktuell /
                xp.benoetigt
            ) *
            100;


        xpBalken.style.width =
            Math.min(
                100,
                prozent
            ) +
            "%";

    }


    let naechstesLevel =
        document.getElementById(
            "startNaechstesLevel"
        );


    if (naechstesLevel) {

        naechstesLevel.textContent =
            (
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                level + 1
            );

    }


    spielerBegruessungAktualisieren();

}


/* =====================================================
   NAVIGATION
   ===================================================== */

function screensAusblenden() {

    let screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(
        function(screen) {

            screen.style.display =
                "none";

        }
    );

}


/* =====================================================
   SPIEL STARTEN
   ===================================================== */

function quizStarten() {

    screensAusblenden();


    document.getElementById(
        "spielmodi"
    ).style.display =
        "block";

}


/* =====================================================
   SPIELMODUS WÄHLEN
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


    if (!container) {

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

    if (
        typeof alleFragen ===
        "undefined"
    ) {

        console.error(
            "FEHLER: alleFragen ist nicht definiert."
        );


        alert(
            "Die Fragen konnten nicht geladen werden. Bitte überprüfe fragen.js."
        );


        fragen =
            [];


        return;

    }


    let passendeFragen =
        alleFragen.filter(
            function(frage) {

                return (
                    frage &&
                    frage.kategorie ===
                    ausgewaehlteKategorie
                );

            }
        );


    passendeFragen =
        passendeFragen.filter(
            function(frage) {

                return (
                    !verwendeteFragen.includes(
                        frage.frage
                    )
                );

            }
        );


    /*
       Falls alle Fragen dieser Kategorie
       bereits verwendet wurden:
       wieder von vorne beginnen.
    */

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
                        frage &&
                        frage.kategorie ===
                        ausgewaehlteKategorie
                    );

                }
            );

    }


    passendeFragen.sort(
        function() {

            return (
                Math.random() -
                0.5
            );

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


    /*
       Joker für jede Runde zurücksetzen.
    */

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


    if (
        !fragen ||
        fragen.length ===
        0
    ) {

        console.error(
            "Keine Fragen für Kategorie:",
            ausgewaehlteKategorie
        );


        document.getElementById(
            "frage"
        ).textContent =
            "Keine Fragen gefunden.";


        return;

    }


    spielerDatenLaden();

    quizUIAktualisieren();

    frageAnzeigen();

}


/* =====================================================
   SCHWIERIGKEIT
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
   NÄCHSTE FRAGE AUS POOL
   ===================================================== */

function naechsteFrageAusPool() {

    let schwierigkeit =
        schwierigkeitFuerRunde();


    /*
       Zuerst passende Schwierigkeit.
    */

    let pool =
        fragen.filter(
            function(frage) {

                return (
                    frage.schwierigkeit ===
                    schwierigkeit
                );

            }
        );


    /*
       Bereits verwendete entfernen.
    */

    pool =
        pool.filter(
            function(frage) {

                return (
                    !verwendeteFragen.includes(
                        frage.frage
                    )
                );

            }
        );


    /*
       Falls keine Frage der
       gewünschten Schwierigkeit
       mehr vorhanden ist,
       andere Schwierigkeit verwenden.
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
       Falls wirklich alle Fragen
       benutzt wurden.
    */

    if (
        pool.length ===
        0
    ) {

        verwendeteFragen =
            [];


        pool =
            fragen;

    }


    if (
        pool.length ===
        0
    ) {

        return null;

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

    if (
        !rundeAktiv
    ) {

        return;

    }


    antwortGegeben =
        false;


    timerStoppen();


    let frage =
        naechsteFrageAusPool();


    if (!frage) {

        document.getElementById(
            "frage"
        ).textContent =
            "Keine Frage verfügbar.";


        return;

    }


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


    /*
       Antwortreihenfolge mischen.
    */

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


    if (nextButton) {

        nextButton.disabled =
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


    if (!balken || !text) {

        return;

    }


    let prozent =
        (
            aktuelleZeit /
            maximaleZeit
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


        let gewonnen =
            punkteFuerAntwort();


        punkte +=
            gewonnen;


        let coins =
            coinsFuerAntwort();


        coinsGutschreiben(
            coins
        );


        button.classList.add(
            "richtig"
        );


        document.getElementById(
            "ergebnis"
        ).textContent =
            "✓ Richtig! +" +
            gewonnen +
            " Punkte";


        document.getElementById(
            "ergebnis"
        ).style.color =
            "#69e36d";

    }

    else {

        falschBeantwortet++;


        combo =
            0;


        button.classList.add(
            "falsch"
        );


        /*
           Richtige Antwort markieren.
        */

        let buttons =
            document.querySelectorAll(
                "#antworten button"
            );


        buttons.forEach(
            function(
                antwortButton
            ) {

                if (
                    antwortButton.dataset.richtig ===
                    "true"
                ) {

                    antwortButton.classList.add(
                        "richtig"
                    );

                }

            }
        );


        if (
            bonusSchutz
        ) {

            bonusSchutz =
                false;


            document.getElementById(
                "ergebnis"
            ).textContent =
                "🛡️ Schutz! Kein Leben verloren.";


            document.getElementById(
                "ergebnis"
            ).style.color =
                "#ffd21f";

        }

        else {

            document.getElementById(
                "ergebnis"
            ).textContent =
                "✕ Falsch!";


            document.getElementById(
                "ergebnis"
            ).style.color =
                "#ff6666";


            lebenVerlieren();

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
            200;

    }


    /*
       Zeitbonus.
    */

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


    /*
       Combo-Bonus.
    */

    let comboBonus =
        Math.min(
            combo *
            10,
            100
        );


    /*
       Zeitdruck-Bonus.
    */

    if (
        spielmodus ===
        "zeitdruck"
    ) {

        basis *=
            1.4;

    }


    /*
       Hardcore-Bonus.
    */

    if (
        spielmodus ===
        "hardcore"
    ) {

        basis *=
            1.5;

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


    let element =
        document.getElementById(
            "coins"
        );


    if (element) {

        element.textContent =
            spieler.coins;

    }


    startseiteAktualisieren();

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
                : "💔"
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


function lebenVerlieren() {

    if (
        leben > 0
    ) {

        leben--;

    }


    quizUIAktualisieren();

}


/* =====================================================
   ANTWORTEN SPERREN
   ===================================================== */

function antwortenSperren() {

    let buttons =
        document.querySelectorAll(
            "#antworten button"
        );


    buttons.forEach(
        function(button) {

            button.disabled =
                true;

        }
    );


    jokerButtonsAktualisieren();

}


/* =====================================================
   JOKER 50/50
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


/* =====================================================
   JOKER SCHUTZ
   ===================================================== */

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


    document.getElementById(
        "ergebnis"
    ).style.color =
        "#ffd21f";


    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


/* =====================================================
   JOKER ZEIT
   ===================================================== */

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

        aktuelleZeit =
            maximaleZeit;

    }


    jokerZeit =
        false;


    timerUIAktualisieren();

    jokerButtonsAktualisieren();

    quizUIAktualisieren();

}


/* =====================================================
   JOKER HINWEIS
   ===================================================== */

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


    if (
        falsche.length ===
        0
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


/* =====================================================
   JOKER BUTTONS AKTUALISIEREN
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
            spieler.coins < 25;

    }


    if (buttonSchutz) {

        buttonSchutz.disabled =
            !jokerZweiteChance ||
            antwortGegeben ||
            spieler.coins < 40;

    }


    if (buttonZeit) {

        buttonZeit.disabled =
            !jokerZeit ||
            antwortGegeben ||
            spieler.coins < 30;

    }


    if (buttonHinweis) {

        buttonHinweis.disabled =
            !jokerHinweis ||
            antwortGegeben ||
            spieler.coins < 50;

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


    if (lebenElement) {

        lebenElement.textContent =
            lebenText();

    }


    let comboElement =
        document.getElementById(
            "combo"
        );


    if (comboElement) {

        comboElement.textContent =
            "x" +
            combo;

    }


    let coinsElement =
        document.getElementById(
            "coins"
        );


    if (coinsElement) {

        coinsElement.textContent =
            spieler.coins;

    }


    jokerButtonsAktualisieren();

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
   RUNDE MANUELL BEENDEN
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


    scoreOnlineSpeichern();


    achievementsAktualisieren();


    besterComboSpeichern();


    let neuesLevel =
        spieler.level;


    let levelUp =
        neuesLevel >
        altesLevel;


    let gameoverPunkte =
        document.getElementById(
            "gameoverPunkte"
        );


    if (gameoverPunkte) {

        gameoverPunkte.textContent =
            punkte;

    }


    let gameoverFragen =
        document.getElementById(
            "gameoverFragen"
        );


    if (gameoverFragen) {

        gameoverFragen.textContent =
            aktuelleFrage +
            1;

    }


    let gameoverRichtig =
        document.getElementById(
            "gameoverRichtig"
        );


    if (gameoverRichtig) {

        gameoverRichtig.textContent =
            richtigBeantwortet;

    }


    let gameoverCombo =
        document.getElementById(
            "gameoverCombo"
        );


    if (gameoverCombo) {

        gameoverCombo.textContent =
            "x" +
            besteCombo;

    }


    let belohnungen =
        document.getElementById(
            "gameoverBelohnungen"
        );


    if (belohnungen) {

        let text =
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

            text +=
                "<br><br>⬆️ LEVEL " +
                neuesLevel +
                "!";

        }


        text +=
            "</div>";


        belohnungen.innerHTML =
            text;

    }


    screensAusblenden();


    document.getElementById(
        "gameover"
    ).style.display =
        "block";

}


/* =====================================================
   XP FÜR RUNDE
   ===================================================== */

function xpFuerRunde() {

    let xp =
        richtigBeantwortet *
        5;


    /*
       Combo-Bonus maximal 50 XP.
    */

    xp +=
        Math.min(
            besteCombo *
            2,
            50
        );


    /*
       Kleiner Score-Bonus.
    */

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

        text: "Spiele eine Hardcore-Runde.",

        pruefen:
            function() {

                return (
                    localStorage.getItem(
                        "quizero_hardcore_gespielt"
                    ) ===
                    "true"
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


    let xp =
        xpBisNaechstesLevel(
            spieler.xp
        );


    let profilName =
        document.getElementById(
            "profilName"
        );


    if (profilName) {

        profilName.textContent =
            spielerNameLaden() ||
            "Spieler";

    }


    let profilLevel =
        document.getElementById(
            "profilLevel"
        );


    if (profilLevel) {

        profilLevel.textContent =
            "Level " +
            xp.level;

    }


    let profilXP =
        document.getElementById(
            "profilXP"
        );


    if (profilXP) {

        profilXP.textContent =
            xp.aktuell +
            " / " +
            xp.benoetigt +
            " XP";

    }


    let profilXPBalken =
        document.getElementById(
            "profilXPBalken"
        );


    if (profilXPBalken) {

        profilXPBalken.style.width =
            (
                xp.aktuell /
                xp.benoetigt *
                100
            ) +
            "%";

    }


    let profilNaechstesLevel =
        document.getElementById(
            "profilNaechstesLevel"
        );


    if (profilNaechstesLevel) {

        profilNaechstesLevel.textContent =
            (
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                xp.level + 1
            );

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


    let profilInhalt =
        document.getElementById(
            "profilInhalt"
        );


    if (profilInhalt) {

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
        wert +
        "</strong>" +

        "<span>" +
        text +
        "</span>" +

        "</div>"

    );

}


function profilSchliessen() {

    startAnzeigen();

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
                            : escapeHTML(
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
            "Bestenliste:",
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
            richtigBeantwortet /
            Math.max(
                1,
                aktuelleFrage + 1
            )
        ) *
        100;


    try {

        let ergebnis =
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


        if (
            ergebnis.error
        ) {

            console.error(
                "Score konnte nicht gespeichert werden:",
                ergebnis.error
            );

        }

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
   SPIELER STATUS
   ===================================================== */

function spielerStatusAktualisieren() {

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


    /*
       Startseite
    */

    let startLevel =
        document.getElementById(
            "startLevel"
        );


    if (startLevel) {

        startLevel.textContent =
            level;

    }


    let startStreak =
        document.getElementById(
            "startStreak"
        );


    if (startStreak) {

        startStreak.textContent =
            spieler.streak;

    }


    let startCoins =
        document.getElementById(
            "startCoins"
        );


    if (startCoins) {

        startCoins.textContent =
            spieler.coins;

    }


    let xp =
        xpBisNaechstesLevel(
            spieler.xp
        );


    let startXP =
        document.getElementById(
            "startXP"
        );


    if (startXP) {

        startXP.textContent =
            xp.aktuell +
            " / " +
            xp.benoetigt +
            " XP";

    }


    let startXPBalken =
        document.getElementById(
            "startXPBalken"
        );


    if (startXPBalken) {

        startXPBalken.style.width =
            (
                xp.aktuell /
                xp.benoetigt *
                100
            ) +
            "%";

    }


    let startNaechstesLevel =
        document.getElementById(
            "startNaechstesLevel"
        );


    if (startNaechstesLevel) {

        startNaechstesLevel.textContent =
            (
                xp.benoetigt -
                xp.aktuell
            ) +
            " XP bis Level " +
            (
                level + 1
            );

    }


    spielerBegruessungAktualisieren();

}


/* =====================================================
   START
   ===================================================== */

function spielerStarten() {

    spielerNameEinrichten();

    spielerStatusAktualisieren();

    startseiteAktualisieren();

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        spielerStarten();

        kategorienAnzeigen();

    }
);