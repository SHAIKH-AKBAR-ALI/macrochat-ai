import type { PageStrings } from "./en";

export const de: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "Kostenlos · Ohne Anmeldung · Auf deinem Gerät gespeichert",
    "hero.h1a": "Kostenlose Makro-Tools.",
    "hero.h1b": "Zahlen aus echten Datenbanken.",
    "hero.lead":
      "Berechne deine Kalorien und Makroverteilung, zerlege ein Rezept, vergleiche zwei Lebensmittel — alles kostenlos, alles im Browser, ganz ohne Anmeldung. Jede Zahl stammt aus USDA oder INDB, nie aus einer Schätzung.",
    "hero.check1":
      "Sechs Rechner — Makros, TDEE, Grundumsatz, Protein, Defizit, Rezepte",
    "hero.check2":
      "Makro-Seiten für ~500 Lebensmittel, dazu direkte Vergleiche",
    "hero.check3":
      "Deine Eingaben bleiben auf diesem Gerät — kein Konto nötig",
    "hero.ctaCalc": "Rechner öffnen",
    "hero.ctaTracking": "Mahlzeiten-Tracking ansehen ↓",
    "hero.quickLabel": "Schneller Makrorechner",
    "hero.quickEyebrow": "Jetzt ausprobieren · Schnellrechner",

    "trust.1": "Für immer kostenlos",
    "trust.2": "Ohne E-Mail starten",
    "trust.3": "In unter 60 Sekunden",
    "trust.4": "Wir verkaufen keine Supplements und kein Coaching",

    "tools.eyebrow": "Kostenlos · ohne Konto",
    "tools.h2": "Alle Tools, ohne Anmeldeschranke.",
    "tools.lead":
      "Sechs Rechner, die im Browser laufen und deine letzten Eingaben merken, dazu ~500 Makro-Seiten und tausende direkte Vergleiche. Anmelden musst du dich erst, wenn ein Tag mitgezählt werden soll.",
    "tools.open": "Öffnen →",
    "tool.macro":
      "Kalorien plus Verteilung auf Protein, Kohlenhydrate und Fett — aus deinen Körperdaten.",
    "tool.tdee": "Dein Erhaltungsbedarf — was du an einem Tag verbrauchst.",
    "tool.bmr": "Ruheumsatz, nach Mifflin-St Jeor oder Katch-McArdle.",
    "tool.protein": "Ein tägliches Proteinziel, passend zu deinem Gewicht.",
    "tool.deficit":
      "Defizit wählen und Wochentempo sowie Zieldatum sehen.",
    "tool.recipe":
      "Zutaten und Gramm eintragen, Gesamtwerte für das ganze Gericht bekommen.",
    "tool.compare":
      "Hähnchen oder Reis, Roti oder Brot — Balken, Portionen und ein Urteil für dein Ziel.",
    "tool.az":
      "Kalorien und Makros je 100 g für ~500 Lebensmittel, aus USDA und INDB.",

    "stats.usda": "USDA-Einträge",
    "stats.indb": "Regionale INDB-Rezepte",
    "stats.guessed": "Von der KI geratene Zahlen",
    "stats.calcs": "Kostenlose Rechner",

    "tracker.eyebrow": "Der Bereich mit Konto",
    "tracker.h2": "Soll dein Tag mitgezählt werden? Kostenlos registrieren.",
    "tracker.lead":
      "Alles oben funktioniert ohne Konto. Mit Konto protokolliert dieselbe Engine mit echten Datenbanken deine Mahlzeiten: ein Foto oder ein Satz hinein, Kalorien und Makros heraus, abgeglichen mit deinem Ziel.",
    "tracker.imgAlt":
      "Beschreibe deine Mahlzeit, MacroChat schlägt sie in einer echten Datenbank nach, du bestätigst die Portion.",

    "step1.label": "Schritt 1",
    "step1.title": "Sag es oder fotografiere es",
    "step1.body":
      "Tippe deine Mahlzeit, häng ein Foto an, oder beides. Die KI benennt jedes Lebensmittel und erkennt die Zubereitung — gegrillt, frittiert, als Curry.",
    "step2.label": "Schritt 2",
    "step2.title": "Nachschlagen in echten Datenbanken",
    "step2.body":
      "Jede Kalorie kommt aus dem Indian Nutrient Databank oder USDA FoodData Central — deinem Lebensmittel zugeordnet, nie aus dem Gedächtnis der KI geraten.",
    "step3.label": "Schritt 3",
    "step3.title": "Du behältst die Kontrolle",
    "step3.body":
      "Portion angegeben? Sofort erfasst. Nur ein Foto und damit eine Schätzung? Du bestätigst die Gramm, bevor etwas in deinen Tag zählt.",

    "shot.eyebrow": "Angemeldet",
    "shot.h2": "Mahlzeit rein, Fakten raus.",
    "shot.lead":
      "Keine Dropdowns, keine Barcode-Suche. Fotografiere den Teller, und MacroChat liefert eine Nährwerttabelle mit Makroverteilung und der Quelle in jeder Zeile — INDB oder USDA.",
    "shot.cta": "Kostenloses Konto erstellen",
    "shot.you": "Du",
    "shot.msg": "1 Schale Gemüse-Biryani",
    "shot.factsTitle": "Nährwerte der Mahlzeit",
    "shot.calories": "Kalorien",
    "shot.protein": "Protein",
    "shot.carbs": "Kohlenhydrate",
    "shot.fat": "Fett",
    "shot.item": "Gemüse-Biryani · 1 Schale",
    "shot.donutLabel": "Protein 22 %, Kohlenhydrate 58 %, Fett 20 %",

    "feat.eyebrow": "Was Tracking bringt",
    "feat.h2": "Gebaut für das, was du wirklich isst.",
    "feat1.title": "Foto, Text oder beides",
    "feat1.body":
      "Teller fotografieren, Portion tippen oder beides. Text mit Gramm wird sofort erfasst.",
    "feat2.title": "Echte Mahlzeiten, nicht nur Verpackungen",
    "feat2.body":
      "USDA für Alltagslebensmittel weltweit, dazu über 1.000 INDB-Rezepte für regionale Gerichte — Dal, Biryani, Dosa.",
    "feat3.title": "Du bestätigst die Gramm",
    "feat3.body":
      "Portion aus einem Foto geschätzt? Nichts zählt, bevor du es freigibst.",
    "feat4.title": "Auch manuelle Suche",
    "feat4.body":
      "Ohne KI: dieselbe Datenbank durchsuchen, Gramm setzen und direkt in den Tag eintragen.",
    "feat5.title": "Wochentrends",
    "feat5.body":
      "Ein 7-Tage-Diagramm gegen dein Ziel, eine Tracking-Serie und Hinweise in klarer Sprache — ohne KI-Kosten.",
    "feat6.title": "Deine Mitternacht, nicht unsere",
    "feat6.body":
      "Tagessummen starten um Mitternacht in deiner Zeitzone neu — einmal bei der Anmeldung erfasst.",

    "vs.eyebrow": "Der Unterschied",
    "vs.h2": "Eine typische Kalorien-App gegen MacroChat.",
    "vs.them": "Typische App",
    "vs.us": "MacroChat",
    "vs.them1": "Anmeldeschranke, bevor du irgendetwas nutzen kannst",
    "vs.us1": "Rechner und Lebensmitteldaten, ohne Konto",
    "vs.them2": "KI oder Community rät die Zahlen",
    "vs.us2": "Nur Abfragen aus INDB und USDA",
    "vs.them3": "Endlose Dropdowns bei der Lebensmittelsuche",
    "vs.us3": "Ein Satz oder ein Foto",
    "vs.them4": "Trägt stillschweigend ein, was sie vermutet",
    "vs.us4": "Du bestätigst geschätzte Portionen",
    "vs.them5": "Barcode zuerst, Hausmannskost fehlt",
    "vs.us5": "USDA und INDB, gekochte Gerichte inklusive",

    "receipts.eyebrow": "Echte Einträge",
    "receipts.h2": "Keine Bewertungen. Belege.",
    "receipts.q1":
      "2 Rotis und Dal — in 6 Sekunden erfasst, 348 kcal, Quelle INDB.",
    "receipts.by1": "— Ein echter Eintrag, keine Bewertung",
    "receipts.q2":
      "Foto eines Tellers → „gegrillte Hähnchenbrust, 210 g?“ → bestätigt → 347 kcal.",
    "receipts.by2": "— Der Bestätigungsschritt in Aktion",
    "receipts.q3":
      "„gekochte Quinoa“ landete bei USDA-Quinoa, nicht bei Hühnerfüßen. Behoben, getestet.",
    "receipts.by3": "— Ein Fehltreffer weniger",

    "faq.eyebrow": "FAQ",
    "faq.h2": "Berechtigte Fragen.",
    "faq.q1": "Kosten die Rechner etwas?",
    "faq.a1":
      "Nein. Jeder Rechner und jede Lebensmittelseite ist kostenlos und braucht kein Konto — deine Eingaben bleiben im Browser. Anmelden musst du dich nur für das Mahlzeiten-Tracking mit Verlauf und Tagessummen.",
    "faq.q2": "Wie genau sind die Kalorienangaben?",
    "faq.a2":
      "Die Zahlen kommen aus dem Indian Nutrient Databank und USDA FoodData Central — im Labor gemessene Werte, nie KI-Schätzungen. Unsicher ist die Portionsgröße: Gibst du Gramm an, ist es so genau wie deine Waage; aus einem Foto ist es eine Schätzung, und wir fragen immer nach, bevor sie zählt.",
    "faq.q3": "Welche Formeln nutzen die Rechner?",
    "faq.a3":
      "Standardmäßig Mifflin-St Jeor für den Grundumsatz, Katch-McArdle, wenn du einen Körperfettanteil angibst. Der TDEE multipliziert mit einem Aktivitätsfaktor; die Makroverteilung nutzt 1,8 g/kg Protein, 25 % der Kalorien aus Fett, den Rest als Kohlenhydrate. Alles steht auf der ",
    "faq.a3link": "Rechner-Seite",
    "faq.q4": "Kann ich das Mahlzeiten-Tracking ohne Konto testen?",
    "faq.a4pre": "Ja — der ",
    "faq.a4link": "Gastmodus",
    "faq.a4post":
      " analysiert bis zu drei Mahlzeiten pro Sitzung. Ein Konto speichert sie, zählt deinen Tag mit und hebt das Limit auf.",
    "faq.q5": "Kennt es indisches Essen?",
    "faq.a5":
      "Ja — über 1.000 Rezepte und Zutaten aus dem Indian Nutrient Databank: Roti, Dal, Sabzi, Biryani, Dosa. Alles andere läuft über die USDA-Datenbank.",
    "faq.q6": "Warum dauert die erste Analyse manchmal ~50 Sekunden?",
    "faq.a6":
      "Das KI-Backend läuft auf einem kostenlosen Tarif, der im Leerlauf schläft; die erste Anfrage weckt es. Die Rechner brauchen es nicht — sie sind sofort da.",
    "faq.q7": "Scannt es Barcodes?",
    "faq.a7":
      "Nein, mit Absicht. Barcodes decken nur verpackte Ware ab; die meisten echten Mahlzeiten — Dal, Sabzi, alles Selbstgekochte — haben keinen. Beschreibe oder fotografiere lieber den Teller.",
    "faq.q8": "Gibt es einen Dunkelmodus?",
    "faq.a8":
      "Ja — über den Schalter ◐ in der Navigation. Dasselbe Farbsystem, invertiert; das Petrol bleibt. Deine Wahl wird gemerkt und folgt standardmäßig deinem Betriebssystem.",
    "faq.q9": "Was passiert mit meinen Fotos und Daten?",
    "faq.a9":
      "Fotos dienen nur dazu, das Lebensmittel zu erkennen. Dein Mahlzeitenverlauf liegt in Supabase mit Row-Level Security — nur dein Konto kann ihn lesen. Siehe die ",
    "faq.a9link": "Datenschutzerklärung",

    "cta.h2": "Fang mit einer Zahl an.",
    "cta.btn1": "Rechner öffnen",
    "cta.btn2": "Registrieren und tracken",
    "cta.sub": "Keine Karte. Kein Barcode. Keine von der KI erfundenen Zahlen.",

    "meta.title":
      "MacroChat — Kostenlose Makrorechner und Mahlzeiten-Tracking aus echten Datenbanken",
    "meta.description":
      "Kostenlose Rechner für Makros, TDEE, Grundumsatz, Protein, Defizit und Rezepte — ohne Anmeldung, auf deinem Gerät gespeichert. Kalorien und Makros stammen aus USDA und INDB, nie geraten.",
  },

  calc: {
    units: "Einheiten",
    "units.metric": "Metrisch (kg, cm)",
    "units.imperial": "Imperial (lb, ft/in)",
    sex: "Geschlecht",
    "sex.male": "Männlich",
    "sex.female": "Weiblich",
    age: "Alter",
    weight: "Gewicht",
    heightCm: "Größe (cm)",
    height: "Größe",
    "height.feet": "Größe in Fuß",
    "height.inches": "Größe in Zoll",
    activity: "Aktivität",
    "act.sedentary": "Sitzend",
    "act.sedentaryLong": "Sitzend — Bürojob, kaum Sport",
    "act.light": "Leicht",
    "act.lightLong": "Leicht — 1–3 Einheiten pro Woche",
    "act.moderate": "Mäßig",
    "act.moderateLong": "Mäßig — 3–5 Einheiten pro Woche",
    "act.active": "Aktiv",
    "act.activeLong": "Aktiv — 6–7 Einheiten pro Woche",
    "act.veryActive": "Sehr aktiv",
    "act.veryActiveLong": "Sehr aktiv — hartes Training oder körperliche Arbeit",
    goal: "Ziel",
    "goal.lose": "Fett verlieren (−500 kcal)",
    "goal.maintain": "Halten",
    "goal.gain": "Zunehmen (+300 kcal)",
    advanced: "Erweiterte Optionen",
    bodyfat: "Körperfettanteil % (aktiviert Katch-McArdle)",
    bodyfatShort: "Körperfettanteil % (optional → Katch-McArdle)",
    optional: "optional",
    experience: "Trainingserfahrung",
    "exp.beginner": "Anfänger (< 1 Jahr)",
    "exp.intermediate": "Fortgeschritten (1–3 Jahre)",
    "exp.advanced": "Sehr erfahren (3+ Jahre)",

    "fc.note":
      "Wähle einen Ernährungsstil oder zieh die Verteilung unten. Auf diesem Gerät gespeichert, ohne Konto. Registriere dich, um Mahlzeiten gegen dieses Ziel zu tracken.",

    result: "Ergebnis",
    yourTarget: "Dein Tagesziel",
    calories: "Kalorien",
    protein: "Protein",
    carbs: "Kohlenhydrate",
    fat: "Fett",
    bmr: "Grundumsatz",
    tdeeMaint: "TDEE (Erhaltung)",
    bmiWater: "BMI · Wasser",
    fillFields: "Felder ausfüllen",
    formula: "Formel",
    "unit.kcalDay": "kcal/Tag",
    "unit.gDay": "g/Tag",
    "unit.kgWeek": "kg/Woche",
    "unit.weeks": "Wochen",

    "mini.activityFactor": "Aktivitätsfaktor",
    "mini.proteinTarget": "Ziel (1,8 g/kg)",
    "mini.range": "Sinnvoller Bereich",
    "mini.dailyCalories": "Tageskalorien",
    "mini.maintenance": "Erhaltung",
    "mini.weeklyRate": "Wöchentliches Tempo",
    "mini.timeToGoal": "Zeit bis zum Ziel",
    "mini.setLower": "setze ein niedrigeres Zielgewicht",
    "mini.goalWeight": "Zielgewicht",
    "mini.dailyDeficit": "Tägliches Defizit (kcal)",

    "qc.note":
      "Mifflin-St Jeor · Protein 1,8 g/kg · Fett 25 % der Kalorien. Auf diesem Gerät gespeichert, ohne Konto.",
    "qc.full": "Vollständigen Rechner nutzen →",
    "qc.fullMini": "Vollständiger Makrorechner →",
    "qc.save": "Im Konto speichern →",

    "split.dietStyle": "Ernährungsstil",
    "split.summary": "Zusammenfassung des Tagesziels",
    "split.lock": "Sperren",
    "split.unlock": "Entsperren",
    "split.note":
      "Sperre ein Makro, um es festzuhalten, während du die anderen ziehst — die Verteilung ergibt immer 100 %. Gramm werden mit 4/4/9 kcal pro Gramm berechnet.",
    "diet.balanced": "Ausgewogen",
    "diet.lowCarb": "Low Carb",
    "diet.keto": "Keto",
    "diet.highProtein": "Proteinreich",
    "diet.plantBased": "Pflanzlich",
    "diet.initialC": "K",
    "diet.initialP": "P",
    "diet.initialF": "F",

    "recipe.ingredient": "Zutat (z. B. Paneer, Haferflocken, Banane)",
    "recipe.grams": "g",
    "recipe.remove": "Entfernen",
    "recipe.add": "+ Zutat hinzufügen",
    "recipe.calc": "Makros berechnen",
    "recipe.calculating": "Wird berechnet…",
    "recipe.waking": "Server wird geweckt…",
    "recipe.total": "Rezept gesamt",
    "recipe.noMatch": "kein Treffer",
    "recipe.empty": "Zutaten hinzufügen und berechnen",
  },
};
