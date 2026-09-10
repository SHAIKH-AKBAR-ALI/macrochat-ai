import type { PageStrings } from "./en";

export const it: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "Gratis · Senza registrazione · Salvato sul tuo dispositivo",
    "hero.h1a": "Strumenti per le macro, gratis.",
    "hero.h1b": "Numeri da database veri.",
    "hero.lead":
      "Calcola le tue calorie e la ripartizione delle macro, scomponi una ricetta, confronta due alimenti: tutto gratis, tutto nel browser, senza registrarti. Ogni numero arriva da USDA o INDB, mai da una stima.",
    "hero.check1":
      "Sei calcolatori — macro, TDEE, metabolismo basale, proteine, deficit, ricette",
    "hero.check2":
      "Pagine di macro per ~500 alimenti, più confronti diretti fianco a fianco",
    "hero.check3":
      "I tuoi dati restano su questo dispositivo — nessun account necessario",
    "hero.ctaCalc": "Apri il calcolatore",
    "hero.ctaTracking": "Vedi il diario dei pasti ↓",
    "hero.quickLabel": "Calcolatore rapido di macro",
    "hero.quickEyebrow": "Provalo subito · calcolo rapido",

    "trust.1": "Gratis per sempre",
    "trust.2": "Nessuna email per iniziare",
    "trust.3": "In meno di 60 secondi",
    "trust.4": "Non vendiamo integratori né coaching",

    "tools.eyebrow": "Gratis · senza account",
    "tools.h2": "Tutti gli strumenti, senza muro di registrazione.",
    "tools.lead":
      "Sei calcolatori che girano nel browser e ricordano i tuoi ultimi dati, più ~500 pagine di macro degli alimenti e migliaia di confronti diretti. Ti registri solo quando vuoi che tengano il conto della giornata.",
    "tools.open": "Apri →",
    "tool.macro":
      "Calorie e ripartizione tra proteine, carboidrati e grassi in base ai tuoi dati.",
    "tool.tdee": "Le calorie di mantenimento — quanto consumi in un giorno.",
    "tool.bmr": "Consumo a riposo, con Mifflin-St Jeor o Katch-McArdle.",
    "tool.protein": "Un obiettivo giornaliero di proteine tarato sul tuo peso.",
    "tool.deficit":
      "Scegli un deficit e vedi il ritmo settimanale e la data obiettivo.",
    "tool.recipe":
      "Aggiungi ingredienti e grammi e ottieni il totale dell’intero piatto.",
    "tool.compare":
      "Pollo o riso, roti o pane — barre, porzioni e un verdetto per il tuo obiettivo.",
    "tool.az":
      "Calorie e macro per 100 g di ~500 alimenti, da USDA e INDB.",

    "stats.usda": "Alimenti nel database USDA",
    "stats.indb": "Ricette regionali INDB",
    "stats.guessed": "Numeri indovinati dall’IA",
    "stats.calcs": "Calcolatori gratuiti",

    "tracker.eyebrow": "La parte con account",
    "tracker.h2": "Vuoi che tenga il conto della giornata? Registrati gratis.",
    "tracker.lead":
      "Tutto quello che vedi sopra funziona senza account. Creane uno e lo stesso motore, collegato a database veri, registra i tuoi pasti: entra una foto o una frase, escono calorie e macro, confrontate con il tuo obiettivo.",
    "tracker.imgAlt":
      "Descrivi il pasto, MacroChat lo cerca in un database vero, tu confermi la porzione.",

    "step1.label": "Passo 1",
    "step1.title": "Scrivilo o fotografalo",
    "step1.body":
      "Scrivi il pasto, allega una foto, o entrambe le cose. L’IA riconosce ogni alimento e coglie il tipo di cottura — alla griglia, fritto, al curry.",
    "step2.label": "Passo 2",
    "step2.title": "Ricerca in database veri",
    "step2.body":
      "Ogni caloria arriva dall’Indian Nutrient Databank o da USDA FoodData Central — abbinata al tuo alimento, mai presa dalla memoria dell’IA.",
    "step3.label": "Passo 3",
    "step3.title": "Il controllo resta a te",
    "step3.body":
      "Hai indicato la porzione? Registrata subito. Solo foto e quindi una stima? Confermi i grammi prima che entri nella giornata.",

    "shot.eyebrow": "Con l’accesso",
    "shot.h2": "Entra un pasto, escono i dati.",
    "shot.lead":
      "Niente menu a tendina, niente caccia al codice a barre. Fotografa il piatto e MacroChat restituisce una tabella nutrizionale con la ripartizione delle macro e la fonte indicata su ogni riga — INDB o USDA.",
    "shot.cta": "Crea un account gratuito",
    "shot.you": "Tu",
    "shot.msg": "1 ciotola di biryani di verdure",
    "shot.factsTitle": "Dati del pasto",
    "shot.calories": "Calorie",
    "shot.protein": "Proteine",
    "shot.carbs": "Carboidrati",
    "shot.fat": "Grassi",
    "shot.item": "Biryani di verdure · 1 ciotola",
    "shot.donutLabel": "Proteine 22%, Carboidrati 58%, Grassi 20%",

    "feat.eyebrow": "Cosa aggiunge il diario",
    "feat.h2": "Pensato per come mangi davvero.",
    "feat1.title": "Foto, testo o entrambi",
    "feat1.body":
      "Fotografa il piatto, scrivi la porzione, o fai entrambe le cose. Il testo con i grammi si registra subito.",
    "feat2.title": "Pasti veri, non solo confezioni",
    "feat2.body":
      "USDA per gli alimenti di tutti i giorni nel mondo, più oltre 1.000 ricette INDB per i piatti regionali — dal, biryani, dosa.",
    "feat3.title": "I grammi li confermi tu",
    "feat3.body":
      "Porzione stimata da una foto? Non conta nulla finché non la approvi.",
    "feat4.title": "Anche ricerca manuale",
    "feat4.body":
      "Salta l’IA: cerca nello stesso database, imposta i grammi e registralo direttamente nella giornata.",
    "feat5.title": "Andamento settimanale",
    "feat5.body":
      "Un grafico di 7 giorni rispetto al tuo obiettivo, una serie di giorni registrati e suggerimenti in parole semplici — senza costi di IA.",
    "feat6.title": "La tua mezzanotte, non la nostra",
    "feat6.body":
      "I totali giornalieri si azzerano alla mezzanotte del tuo fuso orario — registrato una volta all’iscrizione.",

    "vs.eyebrow": "Perché è diverso",
    "vs.h2": "Una tipica app di calorie e MacroChat.",
    "vs.them": "App tipica",
    "vs.us": "MacroChat",
    "vs.them1": "Muro di registrazione prima di poter usare qualsiasi cosa",
    "vs.us1": "Calcolatori e dati sugli alimenti, senza account",
    "vs.them2": "L’IA o la community indovinano i numeri",
    "vs.us2": "Solo ricerche su INDB e USDA",
    "vs.them3": "Interminabili elenchi di ricerca degli alimenti",
    "vs.us3": "Una frase, o una foto",
    "vs.them4": "Registra in silenzio quello che presume",
    "vs.us4": "Le porzioni stimate le confermi tu",
    "vs.them5": "Prima il codice a barre, la cucina di casa manca",
    "vs.us5": "USDA e INDB, piatti cucinati inclusi",

    "receipts.eyebrow": "Registrazioni vere",
    "receipts.h2": "Non recensioni. Ricevute.",
    "receipts.q1":
      "2 roti e dal — registrati in 6 secondi, 348 kcal, fonte INDB.",
    "receipts.by1": "— Una registrazione vera, non una recensione",
    "receipts.q2":
      "Foto di un piatto → «petto di pollo alla griglia, 210 g?» → confermato → 347 kcal.",
    "receipts.by2": "— Il passaggio di conferma, all’opera",
    "receipts.q3":
      "«quinoa bollita» è finita sulla quinoa USDA, non sulle zampe di pollo. Corretto e testato.",
    "receipts.by3": "— Una corrispondenza sbagliata in meno",

    "faq.eyebrow": "Domande frequenti",
    "faq.h2": "Domande legittime.",
    "faq.q1": "I calcolatori costano qualcosa?",
    "faq.a1":
      "No. Ogni calcolatore e ogni pagina alimento è gratis e non richiede un account — i tuoi dati restano nel browser. Ti registri solo se vuoi il diario dei pasti con storico e totali giornalieri.",
    "faq.q2": "Quanto sono precise le calorie?",
    "faq.a2":
      "I numeri arrivano dall’Indian Nutrient Databank e da USDA FoodData Central: dati misurati in laboratorio, mai stime dell’IA. La parte incerta è la porzione: se scrivi i grammi è preciso quanto la tua bilancia; da una foto è una stima, e ti chiediamo sempre di confermarla prima che venga conteggiata.",
    "faq.q3": "Quali formule usano i calcolatori?",
    "faq.a3":
      "Mifflin-St Jeor per il metabolismo basale come impostazione predefinita, Katch-McArdle se inserisci la percentuale di massa grassa. Il TDEE moltiplica per un fattore di attività; la ripartizione delle macro usa 1,8 g/kg di proteine, il 25% delle calorie dai grassi e il resto dai carboidrati. È tutto spiegato nella ",
    "faq.a3link": "pagina del calcolatore",
    "faq.q4": "Posso provare il diario dei pasti senza account?",
    "faq.a4pre": "Sì — la ",
    "faq.a4link": "modalità ospite",
    "faq.a4post":
      " analizza fino a tre pasti per sessione. Con un account vengono salvati, la giornata viene tracciata e il limite sparisce.",
    "faq.q5": "Conosce la cucina indiana?",
    "faq.a5":
      "Sì — oltre 1.000 ricette e ingredienti dall’Indian Nutrient Databank: roti, dal, sabzi, biryani, dosa. Tutto il resto passa dal database USDA.",
    "faq.q6": "Perché la prima analisi a volte richiede ~50 secondi?",
    "faq.a6":
      "Il backend con l’IA gira su un piano gratuito che va in pausa quando è inattivo; la prima richiesta lo sveglia. I calcolatori non lo usano — sono istantanei.",
    "faq.q7": "Legge i codici a barre?",
    "faq.a7":
      "No, per scelta. I codici a barre coprono solo i prodotti confezionati; la maggior parte dei pasti veri — dal, sabzi, qualsiasi cosa fatta in casa — non ne ha. Descrivi o fotografa il piatto.",
    "faq.q8": "C’è una modalità scura?",
    "faq.a8":
      "Sì — il pulsante ◐ nella barra di navigazione. Lo stesso sistema inchiostro su carta, invertito; il verde acqua resta. La tua scelta viene ricordata e per impostazione predefinita segue il sistema.",
    "faq.q9": "Che fine fanno le mie foto e i miei dati?",
    "faq.a9":
      "Le foto servono solo a identificare l’alimento. Lo storico dei pasti è su Supabase con sicurezza a livello di riga: solo il tuo account può leggerlo. Vedi l’",
    "faq.a9link": "informativa sulla privacy",

    "cta.h2": "Comincia da un numero.",
    "cta.btn1": "Apri il calcolatore",
    "cta.btn2": "Registrati per tenere il conto",
    "cta.sub": "Nessuna carta. Nessun codice a barre. Nessun numero inventato dall’IA.",

    "meta.title":
      "MacroChat — Calcolatori di macro gratuiti e diario dei pasti con database veri",
    "meta.description":
      "Calcolatori gratuiti di macro, TDEE, metabolismo basale, proteine, deficit e ricette — senza registrazione, salvati sul tuo dispositivo. Calorie e macro arrivano da USDA e INDB, mai indovinate.",
  },

  calc: {
    units: "Unità",
    "units.metric": "Metriche (kg, cm)",
    "units.imperial": "Imperiali (lb, ft/in)",
    sex: "Sesso",
    "sex.male": "Uomo",
    "sex.female": "Donna",
    age: "Età",
    weight: "Peso",
    heightCm: "Altezza (cm)",
    height: "Altezza",
    "height.feet": "Altezza in piedi",
    "height.inches": "Altezza in pollici",
    activity: "Attività",
    "act.sedentary": "Sedentaria",
    "act.sedentaryLong": "Sedentaria — lavoro d’ufficio, poco esercizio",
    "act.light": "Leggera",
    "act.lightLong": "Leggera — 1–3 allenamenti a settimana",
    "act.moderate": "Moderata",
    "act.moderateLong": "Moderata — 3–5 allenamenti a settimana",
    "act.active": "Attiva",
    "act.activeLong": "Attiva — 6–7 allenamenti a settimana",
    "act.veryActive": "Molto attiva",
    "act.veryActiveLong": "Molto attiva — allenamenti intensi o lavoro fisico",
    goal: "Obiettivo",
    "goal.lose": "Perdere grasso (−500 kcal)",
    "goal.maintain": "Mantenere",
    "goal.gain": "Aumentare (+300 kcal)",
    advanced: "Opzioni avanzate",
    bodyfat: "% di massa grassa (attiva Katch-McArdle)",
    bodyfatShort: "% di massa grassa (facoltativo → Katch-McArdle)",
    optional: "facoltativo",
    experience: "Esperienza di allenamento",
    "exp.beginner": "Principiante (< 1 anno)",
    "exp.intermediate": "Intermedio (1–3 anni)",
    "exp.advanced": "Avanzato (3+ anni)",

    "fc.note":
      "Scegli uno stile alimentare o trascina la ripartizione qui sotto. Salvato su questo dispositivo, senza account. Registrati per registrare i pasti rispetto a questo obiettivo.",

    result: "Risultato",
    yourTarget: "Il tuo obiettivo giornaliero",
    calories: "Calorie",
    protein: "Proteine",
    carbs: "Carboidrati",
    fat: "Grassi",
    bmr: "Metabolismo basale",
    tdeeMaint: "TDEE (mantenimento)",
    bmiWater: "IMC · Acqua",
    fillFields: "Compila i campi",
    formula: "Formula",
    "unit.kcalDay": "kcal/giorno",
    "unit.gDay": "g/giorno",
    "unit.kgWeek": "kg/settimana",
    "unit.weeks": "settimane",

    "mini.activityFactor": "Fattore di attività",
    "mini.proteinTarget": "Obiettivo (1,8 g/kg)",
    "mini.range": "Intervallo ragionevole",
    "mini.dailyCalories": "Calorie giornaliere",
    "mini.maintenance": "Mantenimento",
    "mini.weeklyRate": "Ritmo settimanale",
    "mini.timeToGoal": "Tempo all’obiettivo",
    "mini.setLower": "imposta un peso obiettivo più basso",
    "mini.goalWeight": "Peso obiettivo",
    "mini.dailyDeficit": "Deficit giornaliero (kcal)",

    "qc.note":
      "Mifflin-St Jeor · proteine 1,8 g/kg · grassi 25% delle calorie. Salvato su questo dispositivo, senza account.",
    "qc.full": "Usa il calcolatore completo →",
    "qc.fullMini": "Calcolatore di macro completo →",
    "qc.save": "Salva nel tuo account →",

    "split.dietStyle": "Stile alimentare",
    "split.summary": "Riepilogo dell’obiettivo giornaliero",
    "split.lock": "Blocca",
    "split.unlock": "Sblocca",
    "split.note":
      "Blocca un macro per fissarlo mentre sposti gli altri — la ripartizione fa sempre 100%. I grammi usano 4/4/9 kcal per grammo.",
    "diet.balanced": "Equilibrata",
    "diet.lowCarb": "Povera di carboidrati",
    "diet.keto": "Chetogenica",
    "diet.highProtein": "Ricca di proteine",
    "diet.plantBased": "Vegetale",
    "diet.initialC": "C",
    "diet.initialP": "P",
    "diet.initialF": "G",

    "recipe.ingredient": "Ingrediente (es. paneer, avena, banana)",
    "recipe.grams": "g",
    "recipe.remove": "Rimuovi",
    "recipe.add": "+ Aggiungi ingrediente",
    "recipe.calc": "Calcola le macro",
    "recipe.calculating": "Calcolo in corso…",
    "recipe.waking": "Risveglio del server…",
    "recipe.total": "Totale della ricetta",
    "recipe.noMatch": "nessuna corrispondenza",
    "recipe.empty": "Aggiungi gli ingredienti e calcola",
  },
};
