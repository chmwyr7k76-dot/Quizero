// =====================================================
// SUPABASE
// =====================================================

const SUPABASE_URL =
    "https://agvkfksnqwdtimrcdkly.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_4A8Ka0gEeqG6WZjpvxIdVw_cit3y-VP";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

let fragen = [];

let aktuelleFrage = 0;
let punkte = 0;

let ausgewaehlteKategorie = "";
let ausgewaehlteSchwierigkeit = "";
let gewuenschteFragen = 0;

let antwortGegeben = false;

let highscore = 0;
let alterHighscore = 0;

// =====================================================
// SPIELERNAME
// =====================================================

function spielerNameLaden() {

    return localStorage.getItem("spieler_name") || "";

}


function spielerNameSpeichern(name) {

    localStorage.setItem(
        "spieler_name",
        name
    );

}

function spielerNameAendern() {
    let aktuellerName = spielerNameLaden();

    let neuerName = prompt(
        "Wie soll dein neuer Spielername heißen?",
        aktuellerName
    );

    if (neuerName === null) {
        return;
    }

    neuerName = neuerName.trim();

    if (neuerName === "") {
        return;
    }

    spielerNameSpeichern(neuerName);

    let begruessung =
        document.getElementById("spielerBegruessung");

    if (begruessung) {
        begruessung.textContent =
            "Willkommen zurück, " +
            neuerName +
            "!";
    }
}

function spielerNameEinrichten() {

    let name = spielerNameLaden();


    if (!name) {

        name = prompt(
            "Wie heißt du?"
        );


        if (name) {

            name = name.trim();

        }


        if (!name) {

            name = "Spieler";

        }


        spielerNameSpeichern(name);

    }


    let begruessung =
        document.getElementById(
            "spielerBegruessung"
        );


    if (begruessung) {

        begruessung.textContent =
            "Willkommen zurück, " +
            name +
            "!";

    }

}


// =====================================================
// STATISTIKEN
// =====================================================

function statistikLaden() {

    return {
        quizze: Number(localStorage.getItem("stat_quizze")) || 0,
        fragen: Number(localStorage.getItem("stat_fragen")) || 0,
        richtig: Number(localStorage.getItem("stat_richtig")) || 0,
        falsch: Number(localStorage.getItem("stat_falsch")) || 0,
        punkte: Number(localStorage.getItem("stat_punkte")) || 0,
        besterScore: Number(localStorage.getItem("stat_besterScore")) || 0
    };

}


function statistikSpeichern(statistik) {

    localStorage.setItem("stat_quizze", statistik.quizze);
    localStorage.setItem("stat_fragen", statistik.fragen);
    localStorage.setItem("stat_richtig", statistik.richtig);
    localStorage.setItem("stat_falsch", statistik.falsch);
    localStorage.setItem("stat_punkte", statistik.punkte);
    localStorage.setItem("stat_besterScore", statistik.besterScore);

}


// =====================================================
// XP & LEVEL
// =====================================================

function spielerDatenLaden() {

    let gespeicherteDaten =
        localStorage.getItem("spieler_daten");

    if (gespeicherteDaten) {

        try {

            return JSON.parse(gespeicherteDaten);

        }

        catch (fehler) {

            console.log(
                "Gespeicherte Spielerdaten konnten nicht gelesen werden."
            );

        }

    }


    // Alte Speicherung übernehmen,
    // falls bereits XP vorhanden sind

    return {

        xp:
            Number(
                localStorage.getItem("spieler_xp")
            ) || 0,

        level:
            Number(
                localStorage.getItem("spieler_level")
            ) || 1,

        streak:
            Number(
                localStorage.getItem("spieler_streak")
            ) || 0,

        letzterTag:
            localStorage.getItem(
                "spieler_letzterTag"
            ) || ""

    };

}


function spielerDatenSpeichern(spieler) {

    // Hauptspeicherung

    localStorage.setItem(
        "spieler_daten",
        JSON.stringify(spieler)
    );


    // Zusätzlich einzelne Werte speichern.
    // Dadurch bleibt die Speicherung
    // mit älteren Versionen kompatibel.

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

}


// =====================================================
// XP BERECHNEN
// =====================================================

function xpFuerQuiz(punkte, anzahlFragen) {

    let xp = 0;


    // BASIS-XP

    if (ausgewaehlteSchwierigkeit === "leicht") {

        xp = 5;

    }

    else if (ausgewaehlteSchwierigkeit === "mittel") {

        xp = 7;

    }

    else if (ausgewaehlteSchwierigkeit === "schwer") {

        xp = 10;

    }


    // XP FÜR RICHTIGE ANTWORTEN

    if (ausgewaehlteSchwierigkeit === "leicht") {

        xp = xp + (punkte * 3);

    }

    else if (ausgewaehlteSchwierigkeit === "mittel") {

        xp = xp + (punkte * 5);

    }

    else if (ausgewaehlteSchwierigkeit === "schwer") {

        xp = xp + (punkte * 7);

    }


    // PERFEKT-BONUS

    if (punkte === anzahlFragen) {

        if (ausgewaehlteSchwierigkeit === "leicht") {

            xp = xp + 10;

        }

        else if (ausgewaehlteSchwierigkeit === "mittel") {

            xp = xp + 15;

        }

        else if (ausgewaehlteSchwierigkeit === "schwer") {

            xp = xp + 20;

        }

    }


    return xp;

}


// =====================================================
// LEVEL BERECHNEN
// =====================================================

function levelBerechnen(xp) {

    let level = 1;

    let benoetigteXP = 100;

    let gesammelteXP = xp;


    while (gesammelteXP >= benoetigteXP) {

        gesammelteXP =
            gesammelteXP - benoetigteXP;

        level =
            level + 1;

        benoetigteXP =
            100 + ((level - 1) * 25);

    }


    return level;

}


// =====================================================
// STREAK
// =====================================================

function datumHeute() {

    let heute = new Date();

    return heute.toISOString().split("T")[0];

}


function datumGestern() {

    let gestern = new Date();

    gestern.setDate(
        gestern.getDate() - 1
    );

    return gestern.toISOString().split("T")[0];

}


function streakAktualisieren(spieler) {

    let heute = datumHeute();

    let gestern = datumGestern();


    if (spieler.letzterTag === heute) {

        return spieler;

    }


    if (spieler.letzterTag === gestern) {

        spieler.streak =
            spieler.streak + 1;

    }

    else {

        spieler.streak = 1;

    }


    spieler.letzterTag = heute;


    return spieler;

}


// =====================================================
// QUIZ STARTEN
// =====================================================

function quizStarten() {

    document.getElementById(
        "startbildschirm"
    ).style.display = "none";

    document.getElementById(
        "kategorien"
    ).style.display = "block";

}


// =====================================================
// KATEGORIE
// =====================================================

function kategorieWaehlen(kategorie) {

    ausgewaehlteKategorie =
        kategorie;

    document.getElementById(
        "kategorien"
    ).style.display = "none";

    document.getElementById(
        "schwierigkeit"
    ).style.display = "block";

}


// =====================================================
// SCHWIERIGKEIT
// =====================================================

function schwierigkeitWaehlen(schwierigkeit) {

    ausgewaehlteSchwierigkeit =
        schwierigkeit;

    document.getElementById(
        "schwierigkeit"
    ).style.display = "none";

    document.getElementById(
        "anzahlFragen"
    ).style.display = "block";

}


// =====================================================
// HIGHSCORE
// =====================================================

function getHighscoreKey() {

    return (
        "highscore_" +
        ausgewaehlteKategorie +
        "_" +
        ausgewaehlteSchwierigkeit +
        "_" +
        gewuenschteFragen
    );

}


function getHighscore() {

    let key =
        getHighscoreKey();

    return Number(
        localStorage.getItem(key)
    ) || 0;

}


function highscoreSpeichern() {

    let key =
        getHighscoreKey();

    localStorage.setItem(
        key,
        highscore
    );

}


// =====================================================
// ANZAHL FRAGEN
// =====================================================

function anzahlWaehlen(anzahl) {

    gewuenschteFragen =
        anzahl;


    fragen =
        alleFragen.filter(
            function(frage) {

                return (
                    frage.kategorie ===
                    ausgewaehlteKategorie
                    &&
                    frage.schwierigkeit ===
                    ausgewaehlteSchwierigkeit
                );

            }
        );


    if (
        fragen.length <
        gewuenschteFragen
    ) {

        alert(
            "Für diese Auswahl sind momentan nur " +
            fragen.length +
            " Fragen verfügbar."
        );

        return;

    }


    fragen.sort(
        function() {

            return Math.random() - 0.5;

        }
    );


    fragen =
        fragen.slice(
            0,
            gewuenschteFragen
        );


    aktuelleFrage = 0;

    punkte = 0;


    highscore =
        getHighscore();

    alterHighscore =
        highscore;


    document.getElementById(
        "anzahlFragen"
    ).style.display = "none";

    document.getElementById(
        "quiz"
    ).style.display = "block";


    document.getElementById(
        "punkte"
    ).textContent =
        "Punkte: 0";


    document.getElementById(
        "highscore"
    ).textContent =
        "🏆 Bester Score: " +
        highscore +
        " / " +
        gewuenschteFragen;


    document.getElementById(
        "naechsteFrage"
    ).style.display =
        "block";

    document.getElementById(
        "naechsteFrage"
    ).disabled =
        true;


    frageAnzeigen();

}


// =====================================================
// FRAGE ANZEIGEN
// =====================================================

function frageAnzeigen() {

    antwortGegeben = false;

    document.getElementById(
        "naechsteFrage"
    ).disabled =
        true;

    document.getElementById(
        "ergebnis"
    ).textContent =
        "";


    let frage =
        fragen[aktuelleFrage];


    document.getElementById(
        "frage"
    ).textContent =
        frage.frage;


    document.getElementById(
        "frageNummer"
    ).textContent =
        "Frage " +
        (aktuelleFrage + 1) +
        " von " +
        fragen.length;


    let fortschritt =
        (
            (aktuelleFrage + 1) /
            fragen.length
        ) * 100;


    document.getElementById(
        "fortschrittBalken"
    ).style.width =
        fortschritt + "%";


    let antwortenContainer =
        document.getElementById(
            "antworten"
        );


    antwortenContainer.innerHTML =
        "";


    let antworten =
    frage.antworten.map(
        function(antwort, index) {

            return {

                text: antwort,

                richtig:
                    index === frage.richtig

            };

        }
    )
    .filter(function(antwort) {

        return (
            typeof antwort.text === "string" &&
            antwort.text.trim() !== ""
        );

    });


    antworten.sort(
        function() {

            return Math.random() - 0.5;

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


            button.onclick =
                function() {

                    antwortPruefen(
                        antwort.richtig,
                        this
                    );

                };


            antwortenContainer.appendChild(
                button
            );

        }
    );

}


// =====================================================
// ANTWORT PRÜFEN
// =====================================================

function antwortPruefen(
    istRichtig,
    geklickterButton
) {

    antwortGegeben = true;


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        false;


    let buttons =
        document.querySelectorAll(
            "#antworten button"
        );


    buttons.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    if (istRichtig) {

        geklickterButton.classList.add(
            "richtig"
        );


        document.getElementById(
            "ergebnis"
        ).textContent =
            "Richtig!";


        punkte =
            punkte + 1;

    }

    else {

        geklickterButton.classList.add(
            "falsch"
        );


        document.getElementById(
            "ergebnis"
        ).textContent =
            "Falsch!";


        let frage =
            fragen[aktuelleFrage];


        let richtigerText =
            frage.antworten[
                frage.richtig
            ];


        buttons.forEach(
            function(button) {

                if (
                    button.textContent ===
                    richtigerText
                ) {

                    button.classList.add(
                        "richtig"
                    );

                }

            }
        );

    }


    document.getElementById(
        "punkte"
    ).textContent =
        "Punkte: " +
        punkte;


    if (punkte > highscore) {

        highscore =
            punkte;

        highscoreSpeichern();

    }


    document.getElementById(
        "highscore"
    ).textContent =
        "🏆 Bester Score: " +
        highscore +
        " / " +
        gewuenschteFragen;

}


// =====================================================
// NÄCHSTE FRAGE
// =====================================================

function naechsteFrage() {

    aktuelleFrage =
        aktuelleFrage + 1;


    if (
        aktuelleFrage <
        fragen.length
    ) {

        frageAnzeigen();

    }

    else {

        quizBeenden();

    }

}


// =====================================================
// QUIZ BEENDEN
// =====================================================
// =====================================================
// GLOBALE BESTENLISTE - ERGEBNIS SPEICHERN
// =====================================================

async function bestenlisteErgebnisSpeichern(prozent) {

    let spielername =
        spielerNameLaden();

    let ergebnis = {
        spielername: spielername || "Spieler",
        kategorie: ausgewaehlteKategorie,
        schwierigkeit: ausgewaehlteSchwierigkeit,
        anzahl_fragen: fragen.length,
        punkte: punkte,
        prozent: prozent
    };

    let { error } =
        await supabaseClient
            .from("bestenliste")
            .insert(ergebnis);

    if (error) {
        console.log(
            "Fehler beim Speichern der Bestenliste:",
            error
        );
    }
}

function quizBeenden() {

    document.getElementById(
        "frageNummer"
    ).textContent = "";


    document.getElementById(
        "frage"
    ).textContent =
        "Quiz beendet!";


    document.getElementById(
        "antworten"
    ).innerHTML = "";


    let prozent =
        Math.round(
            (punkte / fragen.length) *
            100
        );
    bestenlisteErgebnisSpeichern(prozent);

    let bewertung = "";


    if (prozent === 100) {

        bewertung =
            "Perfekt! 🏆";

    }

    else if (prozent >= 80) {

        bewertung =
            "Sehr stark! 🔥";

    }

    else if (prozent >= 60) {

        bewertung =
            "Gut gemacht! 👍";

    }

    else if (prozent >= 40) {

        bewertung =
            "Nicht schlecht!";

    }

    else {

        bewertung =
            "Da geht noch mehr!";

    }


    // =================================================
    // NEUER REKORD
    // =================================================

    let neuerRekord =
        punkte > alterHighscore;


    let rekordText = "";


    if (neuerRekord) {

        rekordText =
            "<div class='neuer-rekord'>" +
            "🏆 NEUER REKORD!" +
            "</div>";

    }


    // =================================================
    // XP
    // =================================================

    let verdienteXP =
        xpFuerQuiz(
            punkte,
            fragen.length
        );


    let spieler =
        spielerDatenLaden();


    let altesLevel =
        spieler.level;


    // XP hinzufügen

    spieler.xp =
        spieler.xp +
        verdienteXP;


    // Level neu berechnen

    spieler.level =
        levelBerechnen(
            spieler.xp
        );


    // Streak aktualisieren

    spieler =
        streakAktualisieren(
            spieler
        );


    // WICHTIG:
    // Alle Spielerdaten dauerhaft speichern

    spielerDatenSpeichern(
        spieler
    );


    let levelUp =
        spieler.level >
        altesLevel;


    let xpText =

        "<div class='ergebnis-xp'>" +

        "+" +
        verdienteXP +
        " XP" +

        "</div>";


    let levelText = "";


    if (levelUp) {

        levelText =

            "<div class='level-up'>" +

            "⬆ LEVEL " +
            spieler.level +
            "!" +

            "</div>";

    }


    // =================================================
    // ERGEBNIS
    // =================================================

    document.getElementById(
        "ergebnis"
    ).innerHTML =

        rekordText +

        levelText +

        "<div class='ergebnis-punkte'>" +
        punkte +
        " / " +
        fragen.length +
        "</div>" +

        "<div class='ergebnis-prozent'>" +
        prozent +
        "%" +
        "</div>" +

        "<div class='ergebnis-bewertung'>" +
        bewertung +
        "</div>" +

        xpText;


    // =================================================
    // STATISTIKEN
    // =================================================

    let statistik =
        statistikLaden();


    statistik.quizze =
        statistik.quizze + 1;


    statistik.fragen =
        statistik.fragen +
        fragen.length;


    statistik.richtig =
        statistik.richtig +
        punkte;


    statistik.falsch =
        statistik.falsch +
        (
            fragen.length -
            punkte
        );


    statistik.punkte =
        statistik.punkte +
        punkte;


    if (
        punkte >
        statistik.besterScore
    ) {

        statistik.besterScore =
            punkte;

    }


    statistikSpeichern(
        statistik
    );


    document.getElementById(
        "fortschrittBalken"
    ).style.width =
        "100%";


    document.getElementById(
        "naechsteFrage"
    ).style.display =
        "none";


    document.getElementById(
        "neustart"
    ).style.display =
        "block";

}


// =====================================================
// QUIZ NEUSTARTEN
// =====================================================

function quizNeustarten() {

    aktuelleFrage = 0;

    punkte = 0;

    ausgewaehlteKategorie = "";

    ausgewaehlteSchwierigkeit = "";

    gewuenschteFragen = 0;

    highscore = 0;

    alterHighscore = 0;


    document.getElementById(
        "ergebnis"
    ).textContent = "";


    document.getElementById(
        "punkte"
    ).textContent =
        "Punkte: 0";


    document.getElementById(
        "naechsteFrage"
    ).style.display =
        "block";


    document.getElementById(
        "naechsteFrage"
    ).disabled =
        true;


    document.getElementById(
        "neustart"
    ).style.display =
        "none";


    document.getElementById(
        "fortschrittBalken"
    ).style.width =
        "0%";


    document.getElementById(
        "quiz"
    ).style.display =
        "none";


    document.getElementById(
        "startbildschirm"
    ).style.display =
        "block";


    startseiteAktualisieren();

}


// =====================================================
// BESTENLISTE
// =====================================================

function bestenlisteAnzeigen() {

    document.getElementById(
        "startbildschirm"
    ).style.display =
        "none";


    document.getElementById(
        "bestenliste"
    ).style.display =
        "block";


    bestenlisteLaden(10);

}


async function bestenlisteLaden(anzahl) {

    let container =
        document.getElementById(
            "bestenlisteInhalt"
        );

    container.innerHTML =
        "<p>🏆 Bestenliste wird geladen...</p>";


    let { data, error } =
        await supabaseClient
            .from("bestenliste")
            .select("*")
            .eq("anzahl_fragen", anzahl)
            .order("punkte", {
                ascending: false
            })
            .order("erstellt_am", {
                ascending: true
            })
            .limit(10);


    if (error) {

        console.log(
            "Fehler beim Laden der Bestenliste:",
            error
        );

        container.innerHTML =
            "<p>Die Bestenliste konnte momentan nicht geladen werden.</p>";

        return;
    }


    if (!data || data.length === 0) {

        container.innerHTML =
            "<p>Noch keine Ergebnisse vorhanden.</p>";

        return;
    }


    let kategorien = {
        allgemein: "🧠 Allgemeinwissen",
        sport: "⚽ Sport",
        geschichte: "🏛️ Geschichte",
        technik: "⚙️ Technik"
    };


    let schwierigkeiten = {
        leicht: "🟢 Leicht",
        mittel: "🟡 Mittel",
        schwer: "🔴 Schwer"
    };


    let html =
        "<h2>Top 10 für " +
        anzahl +
        " Fragen</h2>";


    html +=
        "<div class='bestenliste-tabelle'>";


    html +=
        "<div class='bestenliste-zeile bestenliste-kopf'>" +
        "<div>#</div>" +
        "<div>Spieler</div>" +
        "<div>Punkte</div>" +
        "<div>Details</div>" +
        "</div>";


    data.forEach(
        function(ergebnis, index) {

            html +=
                "<div class='bestenliste-zeile'>";


            html +=
                "<div class='bestenliste-platz'>" +
                (index + 1) +
                "</div>";


            html +=
                "<div class='bestenliste-kategorie'>" +
                ergebnis.spielername +
                "</div>";


            html +=
                "<div class='bestenliste-score'>" +
                ergebnis.punkte +
                " / " +
                ergebnis.anzahl_fragen +
                "</div>";


            html +=
                "<div>" +
                kategorien[ergebnis.kategorie] +
                "<br>" +
                schwierigkeiten[ergebnis.schwierigkeit] +
                "<br>" +
                ergebnis.prozent +
                "%" +
                "</div>";


            html +=
                "</div>";

        }
    );


    html +=
        "</div>";


    container.innerHTML =
        html;

}
function bestenlisteSchliessen() {

    document.getElementById(
        "bestenliste"
    ).style.display =
        "none";


    document.getElementById(
        "startbildschirm"
    ).style.display =
        "block";

}


// =====================================================
// STATISTIK ANZEIGEN
// =====================================================

function statistikAnzeigen() {

    document.getElementById(
        "startbildschirm"
    ).style.display =
        "none";


    document.getElementById(
        "statistik"
    ).style.display =
        "block";


    statistikLadenUndAnzeigen();

}


function statistikLadenUndAnzeigen() {

    let statistik =
        statistikLaden();


    let trefferquote = 0;


    if (statistik.fragen > 0) {

        trefferquote =
            Math.round(
                (
                    statistik.richtig /
                    statistik.fragen
                ) * 100
            );

    }


    let durchschnitt = 0;


    if (statistik.quizze > 0) {

        durchschnitt =
            (
                statistik.punkte /
                statistik.quizze
            ).toFixed(1);

    }


    let html =

        "<div class='statistik-grid'>" +

        "<div class='statistik-box'>" +

        "<span class='statistik-wert'>" +
        statistik.quizze +
        "</span>" +

        "<span class='statistik-label'>" +
        "Quizze gespielt" +
        "</span>" +

        "</div>" +

        "<div class='statistik-box'>" +

        "<span class='statistik-wert'>" +
        statistik.fragen +
        "</span>" +

        "<span class='statistik-label'>" +
        "Fragen beantwortet" +
        "</span>" +

        "</div>" +

        "<div class='statistik-box'>" +

        "<span class='statistik-wert'>" +
        statistik.richtig +
        "</span>" +

        "<span class='statistik-label'>" +
        "Richtige Antworten" +
        "</span>" +

        "</div>" +

        "<div class='statistik-box'>" +

        "<span class='statistik-wert'>" +
        statistik.falsch +
        "</span>" +

        "<span class='statistik-label'>" +
        "Falsche Antworten" +
        "</span>" +

        "</div>" +

        "<div class='statistik-box'>" +

        "<span class='statistik-wert'>" +
        trefferquote +
        "%" +

        "</span>" +

        "<span class='statistik-label'>" +
        "Trefferquote" +

        "</span>" +

        "</div>" +

        "<div class='statistik-box'>" +

        "<span class='statistik-wert'>" +
        durchschnitt +

        "</span>" +

        "<span class='statistik-label'>" +
        "Ø Punkte pro Quiz" +

        "</span>" +

        "</div>" +

        "</div>" +

        "<div class='statistik-bester-score'>" +

        "<span>🏆 Persönlicher Bestwert</span>" +

        "<strong>" +
        statistik.besterScore +
        " Punkte" +
        "</strong>" +

        "</div>";


    document.getElementById(
        "statistikInhalt"
    ).innerHTML =
        html;

}


function statistikSchliessen() {

    document.getElementById(
        "statistik"
    ).style.display =
        "none";


    document.getElementById(
        "startbildschirm"
    ).style.display =
        "block";

}


// =====================================================
// STARTSEITE SPIELERSTATUS
// =====================================================

function startseiteAktualisieren() {

    let spieler =
        spielerDatenLaden();


    // LEVEL

    document.getElementById(
        "startLevel"
    ).textContent =
        spieler.level;


    // STREAK

    document.getElementById(
        "startStreak"
    ).textContent =
        spieler.streak;


    // XP DES AKTUELLEN LEVELS

    let verbleibendeXP =
        spieler.xp;


    let level =
        1;


    let benoetigteXP =
        100;


    while (
        verbleibendeXP >=
        benoetigteXP
    ) {

        verbleibendeXP =
            verbleibendeXP -
            benoetigteXP;


        level =
            level + 1;


        benoetigteXP =
            100 +
            ((level - 1) * 25);

    }


    // XP ANZEIGE

    document.getElementById(
        "startXP"
    ).textContent =

        verbleibendeXP +
        " / " +
        benoetigteXP +
        " XP";


    // XP BIS NÄCHSTES LEVEL

    let xpBisLevel =
        benoetigteXP -
        verbleibendeXP;


    document.getElementById(
        "startNaechstesLevel"
    ).textContent =

        xpBisLevel +
        " XP bis Level " +
        (spieler.level + 1);


    // XP BALKEN

    let xpProzent =

        (
            verbleibendeXP /
            benoetigteXP
        ) * 100;


    document.getElementById(
        "startXPBalken"
    ).style.width =

        xpProzent +
        "%";

}


// =====================================================
// STARTSEITE BEIM LADEN AKTUALISIEREN
// =====================================================

startseiteAktualisieren();
spielerNameEinrichten();
