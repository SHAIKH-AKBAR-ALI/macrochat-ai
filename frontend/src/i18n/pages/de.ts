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

  calcPages: {
    pill: "Kostenlose Tools · Ohne Anmeldung",
    how: "So funktioniert es",
    seeAlso: "Siehe auch",

    "macro.lead":
      "Deine Tageskalorien und die Verteilung auf Protein, Kohlenhydrate und Fett nach Mifflin-St Jeor (oder Katch-McArdle, wenn du deinen Körperfettanteil kennst). Läuft komplett im Browser — die Zahlen entsprechen denen, die MacroChat beim Tracken einer Mahlzeit nutzt.",
    "macro.eyebrow": "Transparenz",
    "macro.h2": "So rechnet dieser Rechner",
    "macro.s1": "1 · Grundumsatz",
    "macro.s1a":
      "Die Kalorien, die dein Körper in völliger Ruhe verbrennt. Standardformel ist Mifflin-St Jeor:",
    "macro.s1b":
      "Gibst du unter den erweiterten Optionen einen Körperfettanteil an, wechselt die Rechnung zu Katch-McArdle. Die Formel geht von der Magermasse aus und ist bei sehr schlanken oder sehr schweren Menschen genauer:",
    "macro.s2": "2 · Gesamtumsatz (TDEE)",
    "macro.s2a": "Der Grundumsatz multipliziert mit einem Aktivitätsfaktor:",
    "macro.thActivity": "Aktivität",
    "macro.thFactor": "Faktor",
    "macro.s3": "3 · Anpassung ans Ziel",
    "macro.thGoal": "Ziel",
    "macro.thChange": "Tägliche Anpassung",
    "macro.goalLose": "Fett verlieren",
    "macro.goalLoseVal": "−500 kcal (≈ 0,45 kg pro Woche)",
    "macro.goalMaintain": "Halten",
    "macro.goalGain": "Zunehmen",
    "macro.goalGainVal": "+300 kcal (schlanker Aufbau)",
    "macro.s4": "4 · Makroverteilung",
    "macro.s4a":
      "Protein liegt bei 1,8 g pro kg Körpergewicht (Zielwert für aktive Erwachsene), Fett bei 25 % der Gesamtkalorien, und die Kohlenhydrate bekommen den Rest. Energie pro Gramm: Protein 4, Kohlenhydrate 4, Fett 9.",
    "macro.s4b":
      "Der BMI ist Gewicht(kg) / Größe(m)²; das Wasserziel ist eine grobe Schätzung von 35 ml pro kg Körpergewicht.",
    "macro.refs": "Quellen",
    "macro.tblEyebrow": "Referenz",
    "macro.tblH2": "Makros gängiger Lebensmittel",
    "macro.tblLead": "Pro typischer Portion. Tippe ein Lebensmittel für die ganze Seite an, oder ",
    "macro.tblLeadLink": "vergleiche zwei Lebensmittel nebeneinander",
    "macro.thFood": "Lebensmittel",
    "macro.thServing": "Portion",

    "tdee.lead":
      "Gesamtumsatz — die Kalorien, die du an einem Tag verbrauchst, Ruhe plus Aktivität. Das ist dein Erhaltungswert: iss so viel, um das Gewicht zu halten, weniger zum Abnehmen, mehr zum Zunehmen.",
    "tdee.h2": "Grundumsatz × Aktivitätsfaktor",
    "tdee.p1":
      "Wir nehmen deinen Grundumsatz (Mifflin-St Jeor, oder Katch-McArdle bei angegebenem Körperfettanteil) und multiplizieren mit einem Aktivitätsfaktor: 1,2 sitzend, 1,375 leicht, 1,55 mäßig, 1,725 aktiv, 1,9 sehr aktiv.",

    "bmr.lead":
      "Grundumsatz — die Kalorien, die dein Körper in völliger Ruhe allein zum Überleben verbrennt. Er ist das Fundament deines Tagesziels.",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "Gibst du einen Körperfettanteil an, wechselt die Rechnung zu Katch-McArdle (370 + 21,6 · Magermasse) — genauer bei sehr schlanken oder sehr schweren Menschen.",

    "protein.lead":
      "Wie viel Protein du pro Tag anpeilen solltest, ausgehend von deinem Körpergewicht. Denselben Zielwert nutzt MacroChat für deine Makroverteilung.",
    "protein.h2": "1,8 g pro kg Körpergewicht",
    "protein.p1":
      "Der Standardwert ist 1,8 g/kg — solide für aktive Erwachsene. Die Spanne 1,6–2,2 g/kg deckt die meisten Ziele ab: das untere Ende für allgemeine Gesundheit, das obere beim harten Diäten oder Muskelaufbau. Protein liefert 4 kcal pro Gramm.",

    "deficit.lead":
      "Wähle ein tägliches Defizit und ein Zielgewicht — du siehst dein Kalorienziel, das wöchentliche Tempo und ungefähr, wann du am Ziel wärst.",
    "deficit.h2": "Defizit → Tempo → Datum",
    "deficit.p1":
      "Tageskalorien = dein TDEE minus dem gewählten Defizit. Etwa 7.700 kcal ≈ 1 kg Körperfett, ein Defizit von 500 kcal/Tag entspricht also rund 0,45 kg pro Woche. Zeit bis zum Ziel = zu verlierendes Gewicht ÷ Wochentempo.",
    "deficit.p2":
      "Ein Defizit von 300–750 kcal/Tag ist für die meisten gut durchzuhalten. Sehr große Defizite kosten Muskeln und lassen sich kaum halten.",

    "recipe.lead":
      "Trage Zutaten und Gramm ein — und erhalte die Gesamtwerte für Kalorien, Protein, Kohlenhydrate und Fett. Jede Zahl ist eine echte Datenbankabfrage (USDA und INDB), keine KI-Schätzung.",
    "recipe.h2": "Nachschlagen, umrechnen, summieren",
    "recipe.p1":
      "Jeder Zutatenname wird einem Eintrag aus INDB (indische Gerichte und Zutaten) oder USDA FoodData Central zugeordnet; Grundnahrungsmittel wie Reis und Dal nutzen einen festen Standardwert. Die Makros je 100 g werden auf deine Gramm umgerechnet und addiert.",
    "recipe.p2":
      "Einfache Namen treffen am besten: „Reis“, „Hähnchenbrust“, „Olivenöl“. Eine Zutat ohne Treffer wird separat gelistet und bleibt aus der Summe. Die erste Anfrage nach längerer Pause kann ~50 s dauern, während der Gratis-Server aufwacht.",
    "recipe.p3": "Lieber aus einem Foto oder einem Satz? ",
    "recipe.p3link": "Probier den Mahlzeiten-Chat",
  },

  foods: {
    indexEyebrow: "Referenz",
    indexH1: "Lebensmittel-Makros, A–Z",
    indexLead:
      "Kalorien und Makros je 100 g für {count} gängige Lebensmittel. Werte aus echten Datenbanken (USDA + INDB) — dieselben, mit denen MacroChat eine Mahlzeit erfasst.",
    indexTitle: "Lebensmittel-Makros A–Z — MacroChat",
    indexDesc:
      "Kalorien, Protein, Kohlenhydrate und Fett je 100 g für gängige Lebensmittel — Daten aus USDA und Indian Nutrient Databank, ohne Schätzungen.",
    indexToCompare: "Zwei Lebensmittel vergleichen →",

    crumb: "Lebensmittel",
    title: "{name} Makros — Kalorien, Protein, Kohlenhydrate, Fett je 100 g",
    desc: "{name}: {kcal} kcal, {protein} g Protein, {carb} g Kohlenhydrate, {fat} g Fett je 100 g. Quelle: {source}.",
    h1: "{name}: Makros",
    lead: "Je 100 Gramm, aus {source}. Labormessungen, keine Schätzung.",
    srcUSDA: "USDA FoodData Central",
    srcINDB: "dem Indian Nutrient Databank",
    factsTitle: "{name} · 100 g",
    fiber: "Ballaststoffe",
    sugars: "Zucker",
    satfat: "Gesättigte Fettsäuren",
    sodium: "Natrium",
    note: "Der Makro-Anteil bezieht sich auf die {kcal} kcal (Protein und Kohlenhydrate 4 kcal/g, Fett 9 kcal/g).",
    cta: "Zum Tracker hinzufügen →",
    portion:
      "Willst du eine echte Portion erfassen? Der Rezeptrechner skaliert {name} auf deine Gramm und summiert die ganze Mahlzeit — oder sag dem Mahlzeiten-Chat einfach, was du gegessen hast.",
    mealChat: "Mahlzeiten-Chat",
    commonQuestions: "Häufige Fragen",
    faqQ1: "Wie viele Kalorien hat {name}?",
    faqA1:
      "{name} hat {kcal} kcal je 100 g, mit {protein} g Protein, {carb} g Kohlenhydraten und {fat} g Fett.",
    faqQ2: "Ist {name} proteinreich?",
    faqA2:
      "{pct} % der Kalorien stammen aus Protein ({density} g je 100 kcal). Über etwa 35 % ist es eine starke Proteinquelle.",
    faqQ3: "Woher stammen diese Daten?",
    faqA3:
      "Aus {source} — im Labor gemessene Werte je 100 g. MacroChat nutzt dieselbe Quelle, um eine Mahlzeit zu erfassen.",
    compareH2: "{name} vergleichen",
    vs: "{a} oder {b}",
    relatedH2: "Ähnliche Lebensmittel",
    relatedItem: "{name}: Makros",
    relatedKcal: "{kcal} kcal / 100 g",
  },

  compare: {
    indexTitle: "Lebensmittel-Makros vergleichen — MacroChat",
    indexDesc:
      "Kalorien und Makros gängiger Lebensmittel nebeneinander, mit einem klaren Urteil, was in eine Diät oder einen Aufbau passt.",
    indexEyebrow: "Referenz",
    indexH1: "Zwei Lebensmittel vergleichen",
    indexLead:
      "{count} direkte Makro-Vergleiche je 100 g, jeder mit einem regelbasierten Urteil für Fettabbau oder Muskelaufbau.",
    indexPopular: "Beliebte Vergleiche",
    indexToFoods: "Alle Makro-Seiten →",

    crumb: "Vergleich",
    title: "{a} oder {b} — Makros im Vergleich je 100 g",
    desc: "{a} oder {b} je 100 g: {kcalA} vs. {kcalB} kcal, {proteinA} vs. {proteinB} g Protein, {carbA} vs. {carbB} g Kohlenhydrate. Was zu deinem Ziel passt.",
    lead: "Alle Werte gelten je 100 Gramm und kommen direkt aus {source} — ohne Schätzungen.",
    srcBoth: "USDA und INDB",
    proteinPer100: "Protein je 100 kcal — {a} {pdA} g · {b} {pdB} g",
    verdictH2: "Besser für dein Ziel",
    quickAnswers: "Kurze Antworten",
    moreH2: "Weitere Vergleiche mit {name}",
    macrosLink: "{name}: Makros",
    cta: "Beides in MacroChat tracken →",

    faqQ1: "Was hat mehr Protein, {a} oder {b}?",
    faqA1: "Je 100 g hat {winner} mehr Protein — {hi} g gegenüber {lo} g ({gap}).",
    faqQ2: "Was eignet sich besser zum Abnehmen?",
    faqA2:
      "{leaner} hat je 100 g weniger Kalorien ({leanerKcal} statt {otherKcal} kcal) und passt damit leichter in ein Defizit. {protein} liefert mehr Protein pro Kalorie, was beim Sattbleiben hilft.",
    faqQ3: "Woher stammen diese Zahlen?",
    faqA3:
      "Aus USDA FoodData Central und dem Indian Nutrient Databank — im Labor gemessene Werte je 100 g, keine Schätzungen. MacroChat nutzt dieselben Daten, um eine Mahlzeit zu erfassen.",

    "gap.allOfIt": "den ganzen Unterschied",
    "gap.same": "gleich viel",
    "gap.times": "das {n}-fache",
    "gap.pctMore": "{n} % mehr",
    "gap.pctPlain": "{n} %",
    "verdict.leaner":
      "Je 100 g hat {leaner} {gap} weniger Kalorien ({leanerKcal} statt {otherKcal} kcal) — das passt leichter in ein Kaloriendefizit.",
    "verdict.closeKcal": "Je 100 g liegen beide bei den Kalorien nah beieinander ({kcalA} vs. {kcalB} kcal).",
    "verdict.protein":
      "{protein} ist proteindichter — {pdHigh} g Protein je 100 kcal gegenüber {pdLow} g — und damit die bessere Wahl für Muskelaufbau oder Sättigung in der Diät.",
    "verdict.closeProtein": "Beide liefern pro Kalorie etwa gleich viel Protein.",

    "tool.portionSize": "Portionsgröße",
    "tool.per100": "Je 100 g",
    "tool.perServing": "Je Portion",
    "tool.custom": "Eigene Menge",
    "tool.sum": "{gA} g {a} = {kcalA} kcal · {gB} g {b} = {kcalB} kcal",
    "tool.key": "Gefüllter Balken = höherer Wert · ",
    "tool.keyWin": "getönte Zelle",
    "tool.keyEnd": " = besser für ein kalorienarmes / proteinreiches Ziel",
  },
  legal: {
    "about.title": "Über uns — MacroChat AI",
    "about.eyebrow": "Über uns",
    "about.h1a": "Ehrliche Zahlen,",
    "about.h1b": "null Rätselraten.",
    "about.s1h": "Warum es MacroChat gibt",
    "about.s1p":
      "Die meisten Kalorien-Apps zwingen dich, Dropdowns zu durchsuchen und alles abzuwiegen. Die meisten KI-Tracker lassen das Modell die Zahlen einfach erfinden. MacroChat macht weder das eine noch das andere: Du sprichst mit ihm wie mit einem Menschen — „200 g gegrillte Hähnchenbrust, 2 Rotis\" oder ein Foto — und jede angezeigte Kalorie stammt aus einer echten Nährwertdatenbank, nie aus der Fantasie der KI.",
    "about.s2h": "Wie wir ehrlich bleiben",
    "about.s2p":
      "Die KI hat nur eine Aufgabe: Lebensmittel erkennen und Portionen einschätzen. Die Makros kommen aus USDA FoodData Central und der Indian Nutrient Databank (INDB). Tagessummen rechnet das Backend, nicht ein Sprachmodell. Wenn wir eine Portion aus einem Foto schätzen, sagen wir es — und bitten dich um Bestätigung, bevor sie zählt.",
    "about.s3h": "Indische Küche inklusive",
    "about.s3p":
      "USDA deckt die weltweite Alltagsliste ab, und über 1.000 indische Rezepte und Zutaten aus der INDB decken Roti, Dal, Sabzi und Biryani ab. Ein Tracker für beide Hälften deiner Ernährung.",

    "privacy.title": "Datenschutzerklärung — MacroChat AI",
    "privacy.eyebrow": "Datenschutzerklärung",
    "privacy.h1": "Deine Daten, im Klartext.",
    "privacy.updated": "Zuletzt aktualisiert: Juli 2026",
    "privacy.s1h": "Was wir erheben",
    "privacy.s1p":
      "Kontodaten (E-Mail, Größe, Gewicht, Alter, Geschlecht, Aktivitätsniveau, Ziel, Zeitzone), um deine Tagesziele zu berechnen; die Mahlzeiten und Nachrichten, die du erfasst; und hochgeladene Fotos, die zur Lebensmittelerkennung verarbeitet werden.",
    "privacy.s2h": "Wie sie verwendet werden",
    "privacy.s2p":
      "Mahlzeitentexte und Fotos gehen ausschließlich zur Erkennung von Lebensmitteln und Portionen an KI-Anbieter (OpenAI; Google Gemini bei Gast-Sitzungen). Die Nährwerte stammen aus öffentlichen Datenbanken (USDA, INDB). Deine Daten dienen dem Betrieb des Dienstes — nie Verkauf, nie Werbung.",
    "privacy.s3h": "Wo sie liegen",
    "privacy.s3p":
      "Konto und Mahlzeitenverlauf liegen in Supabase (Postgres) mit Row Level Security — nur dein authentifiziertes Konto kann deine Zeilen lesen. Gast-Analysen werden überhaupt nicht gespeichert.",
    "privacy.s4h": "Deine Möglichkeiten",
    "privacy.s4pPre": "Du kannst MacroChat als Gast nutzen, ohne dass etwas gespeichert wird. Um dein Konto und alle zugehörigen Daten zu löschen, ",
    "privacy.s4pLink": "schreib uns",
    "privacy.s4pPost": " — die Löschung ist endgültig.",

    "terms.title": "Allgemeine Geschäftsbedingungen — MacroChat AI",
    "terms.eyebrow": "AGB",
    "terms.h1": "Das Kleingedruckte, kurz.",
    "terms.updated": "Zuletzt aktualisiert: Juli 2026",
    "terms.s1h": "1. Keine medizinische Beratung",
    "terms.s1p":
      "MacroChat ist ein Werkzeug zur Ernährungsprotokollierung, kein medizinischer Dienst. Kalorien- und Makroangaben sind Schätzwerte — Portionsgrößen besonders. Sprich vor Gesundheitsentscheidungen mit einer qualifizierten Fachkraft, vor allem bei Vorerkrankungen.",
    "terms.s2h": "2. Genauigkeit",
    "terms.s2p":
      "Wir ziehen die Zahlen aus echten Datenbanken (USDA, INDB) und kennzeichnen geschätzte Portionen deutlich, garantieren aber für keinen Wert die Richtigkeit. Von dir bestätigte Grammangaben liegen in deiner Verantwortung.",
    "terms.s3h": "3. Dein Konto",
    "terms.s3p":
      "Halte deine Zugangsdaten sicher; für Aktivitäten unter deinem Konto bist du verantwortlich. Missbrauche den Dienst nicht (automatisiertes Scraping, Zugriffsversuche auf fremde Daten oder Überlastung der API).",
    "terms.s4h": "4. Verfügbarkeit",
    "terms.s4p":
      "Dies ist ein privates Projekt, bereitgestellt wie besehen, ohne Verfügbarkeitsgarantie. Funktionen können jederzeit geändert oder eingestellt werden.",
    "terms.s5h": "5. Kontakt",
    "terms.s5pPre": "Fragen zu diesen Bedingungen? ",
    "terms.s5pLink": "Melde dich",
    "terms.s5pPost": ".",

    "contact.title": "Kontakt — MacroChat AI",
    "contact.eyebrow": "Kontakt",
    "contact.h1": "Sag Hallo.",
    "contact.s1h": "E-Mail",
    "contact.s1p": "Fehlerberichte, Funktionsideen, Löschanfragen oder alles andere:",
    "contact.s2h": "Eine Zahl stimmt nicht?",
    "contact.s2p":
      "Wenn ein Lebensmittel dem falschen Datenbankeintrag zugeordnet wurde oder ein Kalorienwert daneben liegt, schick uns einen Screenshot — die Treffergenauigkeit ist uns am wichtigsten.",

    "govern": "Diese Seite ist eine Übersetzung zur Erleichterung. Maßgeblich ist die englische Fassung.",
  },
};
