import type { PageStrings } from "./en";

export const fr: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "Gratuit · Sans inscription · Enregistré sur votre appareil",
    "hero.h1a": "Des outils de macros gratuits.",
    "hero.h1b": "Des chiffres issus de vraies bases de données.",
    "hero.lead":
      "Calculez vos calories et votre répartition de macros, décomposez une recette, comparez deux aliments — le tout gratuitement, dans votre navigateur, sans inscription. Chaque chiffre vient de l’USDA ou de l’INDB, jamais d’une estimation.",
    "hero.check1":
      "Six calculateurs : macros, TDEE, métabolisme de base, protéines, déficit, recettes",
    "hero.check2":
      "Des pages de macros pour ~500 aliments, plus des comparaisons côte à côte",
    "hero.check3":
      "Vos saisies sont enregistrées sur cet appareil — aucun compte nécessaire",
    "hero.ctaCalc": "Ouvrir le calculateur",
    "hero.ctaTracking": "Voir le suivi des repas ↓",
    "hero.quickLabel": "Calculateur rapide de macros",
    "hero.quickEyebrow": "Essayez maintenant · calcul rapide",

    "trust.1": "Gratuit pour toujours",
    "trust.2": "Aucun e-mail pour commencer",
    "trust.3": "En moins de 60 secondes",
    "trust.4": "Nous ne vendons ni compléments ni coaching",

    "tools.eyebrow": "Gratuit · sans compte",
    "tools.h2": "Tous les outils, sans mur d’inscription.",
    "tools.lead":
      "Six calculateurs qui tournent dans votre navigateur et retiennent vos dernières saisies, plus ~500 pages de macros et des milliers de comparaisons. Vous ne créez un compte que pour suivre une journée.",
    "tools.open": "Ouvrir →",
    "tool.macro":
      "Calories et répartition protéines/glucides/lipides selon votre morphologie.",
    "tool.tdee": "Vos calories de maintien — ce que vous dépensez en une journée.",
    "tool.bmr": "Dépense au repos, avec Mifflin-St Jeor ou Katch-McArdle.",
    "tool.protein": "Un objectif quotidien de protéines adapté à votre poids.",
    "tool.deficit":
      "Choisissez un déficit et voyez le rythme hebdomadaire et la date d’objectif.",
    "tool.recipe":
      "Ajoutez les ingrédients et les grammes, obtenez le total du plat.",
    "tool.compare":
      "Poulet ou riz, roti ou pain — barres, portions par part et un verdict selon votre objectif.",
    "tool.az":
      "Calories et macros pour 100 g de ~500 aliments, USDA et INDB.",

    "stats.usda": "Aliments référencés par l’USDA",
    "stats.indb": "Recettes régionales de l’INDB",
    "stats.guessed": "Chiffres devinés par l’IA",
    "stats.calcs": "Calculateurs gratuits",

    "tracker.eyebrow": "La partie avec compte",
    "tracker.h2": "Envie d’un suivi quotidien ? Créez un compte gratuit.",
    "tracker.lead":
      "Tout ce qui précède fonctionne sans compte. Créez-en un et le même moteur, branché sur de vraies bases de données, enregistre vos repas : une photo ou une phrase en entrée, calories et macros en sortie, comparées à votre objectif.",
    "tracker.imgAlt":
      "Décrivez votre repas, MacroChat le cherche dans une vraie base de données, vous confirmez la portion.",

    "step1.label": "Étape 1",
    "step1.title": "Dites-le ou photographiez-le",
    "step1.body":
      "Écrivez votre repas, joignez une photo, ou les deux. L’IA nomme chaque aliment et repère le mode de cuisson — grillé, frit, en curry.",
    "step2.label": "Étape 2",
    "step2.title": "Recherche dans de vraies bases de données",
    "step2.body":
      "Chaque calorie vient de l’Indian Nutrient Databank ou de l’USDA FoodData Central — associée à votre aliment, jamais tirée de la mémoire de l’IA.",
    "step3.label": "Étape 3",
    "step3.title": "Vous gardez la main",
    "step3.body":
      "Portion indiquée ? Enregistrée aussitôt. Estimation d’après une photo ? Vous confirmez les grammes avant que cela compte dans votre journée.",

    "shot.eyebrow": "Connecté",
    "shot.h2": "Un repas en entrée, les faits en sortie.",
    "shot.lead":
      "Pas de menus déroulants, pas de chasse au code-barres. Photographiez l’assiette et MacroChat renvoie un tableau de valeurs nutritionnelles avec la répartition des macros et la source indiquée sur chaque ligne — INDB ou USDA.",
    "shot.cta": "Créer un compte gratuit",
    "shot.you": "Vous",
    "shot.msg": "1 bol de biryani de légumes",
    "shot.factsTitle": "Valeurs du repas",
    "shot.calories": "Calories",
    "shot.protein": "Protéines",
    "shot.carbs": "Glucides",
    "shot.fat": "Lipides",
    "shot.item": "Biryani de légumes · 1 bol",
    "shot.donutLabel": "Protéines 22 %, Glucides 58 %, Lipides 20 %",

    "feat.eyebrow": "Ce qu’apporte le suivi",
    "feat.h2": "Conçu pour votre façon de manger.",
    "feat1.title": "Photo, texte, ou les deux",
    "feat1.body":
      "Photographiez l’assiette, écrivez la portion, ou les deux. Un texte avec les grammes s’enregistre immédiatement.",
    "feat2.title": "De vrais repas, pas seulement des emballages",
    "feat2.body":
      "L’USDA pour les aliments du quotidien partout dans le monde, plus 1 000 recettes INDB pour les plats régionaux — dal, biryani, dosa.",
    "feat3.title": "C’est vous qui confirmez les grammes",
    "feat3.body":
      "Portion estimée d’après une photo ? Rien ne compte tant que vous ne l’avez pas validée.",
    "feat4.title": "Recherche manuelle aussi",
    "feat4.body":
      "Sautez l’IA : cherchez dans la même base, réglez les grammes et enregistrez directement dans votre journée.",
    "feat5.title": "Tendances de la semaine",
    "feat5.body":
      "Un graphique sur 7 jours face à votre objectif, une série de jours enregistrés et des conseils en langage clair — sans coût d’IA.",
    "feat6.title": "Votre minuit, pas le nôtre",
    "feat6.body":
      "Les totaux quotidiens repartent à minuit dans votre fuseau horaire — enregistré une fois à l’inscription.",

    "vs.eyebrow": "Ce qui change",
    "vs.h2": "Une appli de calories classique face à MacroChat.",
    "vs.them": "Appli classique",
    "vs.us": "MacroChat",
    "vs.them1": "Mur d’inscription avant de pouvoir utiliser quoi que ce soit",
    "vs.us1": "Calculateurs et données alimentaires, sans compte",
    "vs.them2": "L’IA ou la communauté devine les chiffres",
    "vs.us2": "Uniquement des recherches INDB et USDA",
    "vs.them3": "Des listes de recherche d’aliments interminables",
    "vs.us3": "Une phrase, ou une photo",
    "vs.them4": "Enregistre en silence ce qu’elle croit",
    "vs.us4": "Vous confirmez les portions estimées",
    "vs.them5": "Code-barres d’abord, cuisine maison absente",
    "vs.us5": "USDA et INDB, plats cuisinés inclus",

    "receipts.eyebrow": "De vrais enregistrements",
    "receipts.h2": "Pas des avis. Des reçus.",
    "receipts.q1":
      "2 rotis et du dal — enregistrés en 6 secondes, 348 kcal, source INDB.",
    "receipts.by1": "— Un vrai enregistrement, pas un avis",
    "receipts.q2":
      "Photo d’une assiette → « blanc de poulet grillé, 210 g ? » → confirmé → 347 kcal.",
    "receipts.by2": "— L’étape de confirmation, en action",
    "receipts.q3":
      "« quinoa bouilli » a bien donné le quinoa USDA, pas des pattes de poulet. Corrigé, testé.",
    "receipts.by3": "— Une correspondance douteuse de moins",

    "faq.eyebrow": "FAQ",
    "faq.h2": "Questions légitimes.",
    "faq.q1": "Les calculateurs sont-ils payants ?",
    "faq.a1":
      "Non. Chaque calculateur et chaque page d’aliment est gratuit et sans compte — vos saisies restent dans votre navigateur. Vous ne vous inscrivez que pour le suivi des repas avec historique et totaux quotidiens.",
    "faq.q2": "Quelle est la précision des calories ?",
    "faq.a2":
      "Les chiffres viennent de l’Indian Nutrient Databank et de l’USDA FoodData Central — des mesures de laboratoire, jamais des estimations de l’IA. L’incertitude porte sur la portion : indiquez les grammes et c’est aussi précis que votre balance ; à partir d’une photo, c’est une estimation, et nous vous demandons toujours de la confirmer avant qu’elle compte.",
    "faq.q3": "Quelles formules utilisent les calculateurs ?",
    "faq.a3":
      "Mifflin-St Jeor pour le métabolisme de base par défaut, Katch-McArdle si vous saisissez un % de masse grasse. Le TDEE applique un facteur d’activité ; la répartition des macros utilise 1,8 g/kg de protéines, 25 % des calories en lipides, le reste en glucides. Tout est détaillé sur la ",
    "faq.a3link": "page du calculateur",
    "faq.q4": "Puis-je essayer le suivi des repas sans compte ?",
    "faq.a4pre": "Oui — le ",
    "faq.a4link": "mode invité",
    "faq.a4post":
      " analyse jusqu’à trois repas par session. Un compte les enregistre, suit votre journée et lève la limite.",
    "faq.q5": "Connaît-il la cuisine indienne ?",
    "faq.a5":
      "Oui — plus de 1 000 recettes et ingrédients de l’Indian Nutrient Databank : roti, dal, sabzi, biryani, dosa. Tout le reste passe par la base de l’USDA.",
    "faq.q6": "Pourquoi la première analyse prend-elle parfois ~50 secondes ?",
    "faq.a6":
      "Le backend IA tourne sur une offre gratuite qui se met en veille ; la première requête le réveille. Les calculateurs n’y touchent pas — ils sont instantanés.",
    "faq.q7": "Scanne-t-il les codes-barres ?",
    "faq.a7":
      "Non, volontairement. Les codes-barres ne couvrent que les produits emballés ; la plupart des vrais repas — dal, sabzi, tout ce qui est fait maison — n’en ont pas. Décrivez ou photographiez l’assiette.",
    "faq.q8": "Y a-t-il un mode sombre ?",
    "faq.a8":
      "Oui — le bouton ◐ dans la barre de navigation. Le même système encre sur papier, inversé ; le vert-bleu reste. Votre choix est mémorisé et suit votre système par défaut.",
    "faq.q9": "Que deviennent mes photos et mes données ?",
    "faq.a9":
      "Les photos servent uniquement à identifier l’aliment. Votre historique de repas est stocké dans Supabase avec une sécurité au niveau des lignes — seul votre compte peut le lire. Voir la ",
    "faq.a9link": "politique de confidentialité",

    "cta.h2": "Commencez par un chiffre.",
    "cta.btn1": "Ouvrir le calculateur",
    "cta.btn2": "S’inscrire pour suivre",
    "cta.sub": "Sans carte. Sans code-barres. Sans chiffres inventés par l’IA.",

    "meta.title":
      "MacroChat — Calculateurs de macros gratuits et suivi des repas sur vraies bases de données",
    "meta.description":
      "Calculateurs gratuits de macros, TDEE, métabolisme de base, protéines, déficit et recettes — sans inscription, enregistrés sur votre appareil. Les calories et les macros viennent de l’USDA et de l’INDB, jamais d’une estimation.",
  },

  calc: {
    units: "Unités",
    "units.metric": "Métriques (kg, cm)",
    "units.imperial": "Impériales (lb, ft/in)",
    sex: "Sexe",
    "sex.male": "Homme",
    "sex.female": "Femme",
    age: "Âge",
    weight: "Poids",
    heightCm: "Taille (cm)",
    height: "Taille",
    "height.feet": "Taille en pieds",
    "height.inches": "Taille en pouces",
    activity: "Activité",
    "act.sedentary": "Sédentaire",
    "act.sedentaryLong": "Sédentaire — travail de bureau, peu d’exercice",
    "act.light": "Légère",
    "act.lightLong": "Légère — 1 à 3 séances par semaine",
    "act.moderate": "Modérée",
    "act.moderateLong": "Modérée — 3 à 5 séances par semaine",
    "act.active": "Active",
    "act.activeLong": "Active — 6 à 7 séances par semaine",
    "act.veryActive": "Très active",
    "act.veryActiveLong": "Très active — entraînement intense ou travail physique",
    goal: "Objectif",
    "goal.lose": "Perdre du gras (−500 kcal)",
    "goal.maintain": "Maintenir",
    "goal.gain": "Prendre (+300 kcal)",
    advanced: "Options avancées",
    bodyfat: "% de masse grasse (active Katch-McArdle)",
    bodyfatShort: "% de masse grasse (facultatif → Katch-McArdle)",
    optional: "facultatif",
    experience: "Expérience à l’entraînement",
    "exp.beginner": "Débutant (< 1 an)",
    "exp.intermediate": "Intermédiaire (1 à 3 ans)",
    "exp.advanced": "Avancé (3 ans et +)",

    "fc.note":
      "Choisissez un type d’alimentation ou déplacez la répartition ci-dessous. Enregistré sur cet appareil, sans compte. Inscrivez-vous pour suivre vos repas face à cet objectif.",

    result: "Résultat",
    yourTarget: "Votre objectif quotidien",
    calories: "Calories",
    protein: "Protéines",
    carbs: "Glucides",
    fat: "Lipides",
    bmr: "Métabolisme de base",
    tdeeMaint: "TDEE (maintien)",
    bmiWater: "IMC · Eau",
    fillFields: "Remplissez les champs",
    formula: "Formule",
    "unit.kcalDay": "kcal/jour",
    "unit.gDay": "g/jour",
    "unit.kgWeek": "kg/semaine",
    "unit.weeks": "semaines",

    "mini.activityFactor": "Facteur d’activité",
    "mini.proteinTarget": "Objectif (1,8 g/kg)",
    "mini.range": "Fourchette raisonnable",
    "mini.dailyCalories": "Calories quotidiennes",
    "mini.maintenance": "Maintien",
    "mini.weeklyRate": "Rythme hebdomadaire",
    "mini.timeToGoal": "Temps jusqu’à l’objectif",
    "mini.setLower": "choisissez un poids cible plus bas",
    "mini.goalWeight": "Poids cible",
    "mini.dailyDeficit": "Déficit quotidien (kcal)",

    "qc.note":
      "Mifflin-St Jeor · protéines 1,8 g/kg · lipides 25 % des calories. Enregistré sur cet appareil, sans compte.",
    "qc.full": "Utiliser le calculateur complet →",
    "qc.fullMini": "Calculateur de macros complet →",
    "qc.save": "Enregistrer dans votre compte →",

    "split.dietStyle": "Type d’alimentation",
    "split.summary": "Résumé de l’objectif quotidien",
    "split.lock": "Verrouiller",
    "split.unlock": "Déverrouiller",
    "split.note":
      "Verrouillez un macro pour le figer pendant que vous déplacez les autres — la répartition fait toujours 100 %. Les grammes utilisent 4/4/9 kcal par gramme.",
    "diet.balanced": "Équilibrée",
    "diet.lowCarb": "Pauvre en glucides",
    "diet.keto": "Cétogène",
    "diet.highProtein": "Riche en protéines",
    "diet.plantBased": "Végétale",
    "diet.initialC": "G",
    "diet.initialP": "P",
    "diet.initialF": "L",

    "recipe.ingredient": "Ingrédient (ex. paneer, flocons d’avoine, banane)",
    "recipe.grams": "g",
    "recipe.remove": "Retirer",
    "recipe.add": "+ Ajouter un ingrédient",
    "recipe.calc": "Calculer les macros",
    "recipe.calculating": "Calcul en cours…",
    "recipe.waking": "Réveil du serveur…",
    "recipe.total": "Total de la recette",
    "recipe.noMatch": "aucune correspondance",
    "recipe.empty": "Ajoutez des ingrédients et lancez le calcul",
  },

  calcPages: {
    pill: "Outils gratuits · Sans inscription",
    how: "Comment ça marche",
    seeAlso: "À voir aussi",

    "macro.lead":
      "Vos calories quotidiennes et votre répartition protéines / glucides / lipides selon Mifflin-St Jeor (ou Katch-McArdle si vous connaissez votre % de masse grasse). Tout tourne dans votre navigateur, et les chiffres correspondent à ceux qu’utilise MacroChat quand vous enregistrez un repas.",
    "macro.eyebrow": "Transparence",
    "macro.h2": "Comment fonctionne ce calculateur",
    "macro.s1": "1 · Métabolisme de base",
    "macro.s1a":
      "Les calories brûlées au repos complet. La formule par défaut est Mifflin-St Jeor :",
    "macro.s1b":
      "Saisissez un % de masse grasse dans les options avancées et le calcul passe à Katch-McArdle, plus précis pour les personnes très sèches ou très lourdes puisqu’il part de la masse maigre :",
    "macro.s2": "2 · Dépense énergétique totale (TDEE)",
    "macro.s2a": "Le métabolisme de base multiplié par un facteur d’activité :",
    "macro.thActivity": "Activité",
    "macro.thFactor": "Facteur",
    "macro.s3": "3 · Ajustement selon l’objectif",
    "macro.thGoal": "Objectif",
    "macro.thChange": "Variation quotidienne",
    "macro.goalLose": "Perdre du gras",
    "macro.goalLoseVal": "−500 kcal (≈ 0,45 kg par semaine)",
    "macro.goalMaintain": "Maintenir",
    "macro.goalGain": "Prendre",
    "macro.goalGainVal": "+300 kcal (prise sèche)",
    "macro.s4": "4 · Répartition des macros",
    "macro.s4a":
      "Les protéines sont fixées à 1,8 g par kg de poids (objectif d’adulte actif), les lipides à 25 % des calories totales, et les glucides prennent les calories restantes. Énergie par gramme : protéines 4, glucides 4, lipides 9.",
    "macro.s4b":
      "L’IMC vaut poids(kg) / taille(m)² ; l’objectif d’eau est une estimation de 35 ml par kg de poids.",
    "macro.refs": "Références",
    "macro.tblEyebrow": "Référence",
    "macro.tblH2": "Macros des aliments courants",
    "macro.tblLead": "Par portion type. Touchez un aliment pour sa page complète, ou ",
    "macro.tblLeadLink": "comparez deux aliments côte à côte",
    "macro.thFood": "Aliment",
    "macro.thServing": "Portion",

    "tdee.lead":
      "Dépense énergétique journalière totale — les calories brûlées en une journée, repos et activité compris. C’est votre niveau de maintien : mangez cela pour stabiliser votre poids, moins pour en perdre, plus pour en prendre.",
    "tdee.h2": "Métabolisme de base × facteur d’activité",
    "tdee.p1":
      "Nous prenons votre métabolisme de base (Mifflin-St Jeor, ou Katch-McArdle si vous saisissez un % de masse grasse) et le multiplions par un facteur d’activité : 1,2 sédentaire, 1,375 léger, 1,55 modéré, 1,725 actif, 1,9 très actif.",

    "bmr.lead":
      "Le métabolisme de base, ce sont les calories que votre corps brûle au repos complet, uniquement pour vous maintenir en vie. C’est le socle de votre objectif calorique quotidien.",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "Saisissez un % de masse grasse et le calcul passe à Katch-McArdle (370 + 21,6 · masse maigre), plus précis pour les personnes très sèches ou très lourdes.",

    "protein.lead":
      "La quantité de protéines à viser chaque jour, selon votre poids. C’est l’objectif qu’utilise MacroChat lorsqu’il construit votre répartition de macros.",
    "protein.h2": "1,8 g par kg de poids",
    "protein.p1":
      "L’objectif par défaut est 1,8 g/kg, une valeur solide pour un adulte actif. La fourchette 1,6–2,2 g/kg couvre la plupart des objectifs : le bas pour la santé générale, le haut en sèche stricte ou en prise de muscle. Les protéines apportent 4 kcal par gramme.",

    "deficit.lead":
      "Choisissez un déficit quotidien et un poids cible : vous verrez votre objectif calorique, le rythme de perte hebdomadaire et à peu près quand vous atteindriez l’objectif.",
    "deficit.h2": "Déficit → rythme → date",
    "deficit.p1":
      "Calories quotidiennes = votre TDEE moins le déficit choisi. Environ 7 700 kcal ≈ 1 kg de masse grasse, donc un déficit de 500 kcal/jour correspond à près de 0,45 kg par semaine. Temps jusqu’à l’objectif = poids à perdre ÷ rythme hebdomadaire.",
    "deficit.p2":
      "Un déficit de 300 à 750 kcal/jour reste tenable pour la plupart des gens. Les déficits très importants coûtent du muscle et sont difficiles à maintenir.",

    "recipe.lead":
      "Listez les ingrédients et les grammes, et obtenez le total en calories, protéines, glucides et lipides. Chaque chiffre vient d’une vraie base de données (USDA et INDB), jamais d’une estimation de l’IA.",
    "recipe.h2": "Chercher, mettre à l’échelle, additionner",
    "recipe.p1":
      "Chaque nom d’ingrédient est associé à une entrée INDB (plats et ingrédients indiens) ou USDA FoodData Central ; les aliments de base comme le riz et le dal utilisent une valeur de référence fixe. Les macros pour 100 g sont ramenées à vos grammes puis additionnées.",
    "recipe.p2":
      "Les noms simples fonctionnent le mieux : « riz », « blanc de poulet », « huile d’olive ». Un ingrédient introuvable est listé à part et exclu du total. La première requête après un moment peut prendre ~50 s, le temps que le serveur gratuit se réveille.",
    "recipe.p3": "Vous préférez partir d’une photo ou d’une phrase ? ",
    "recipe.p3link": "Essayez le chat repas",
  },

  foods: {
    indexEyebrow: "Référence",
    indexH1: "Macros des aliments, A–Z",
    indexLead:
      "Calories et macros pour 100 g de {count} aliments courants. Des valeurs issues de vraies bases de données (USDA + INDB), celles-là mêmes que MacroChat utilise pour enregistrer un repas.",
    indexTitle: "Macros des aliments A–Z — MacroChat",
    indexDesc:
      "Calories, protéines, glucides et lipides pour 100 g d’aliments courants — données USDA et Indian Nutrient Databank, sans estimation.",
    indexToCompare: "Comparer deux aliments →",

    crumb: "Aliments",
    title: "Macros de {name} — calories, protéines, glucides, lipides pour 100 g",
    desc: "{name} : {kcal} kcal, {protein} g de protéines, {carb} g de glucides, {fat} g de lipides pour 100 g. Source : {source}.",
    h1: "Macros de {name}",
    lead: "Pour 100 grammes, d’après {source}. Des données de laboratoire, pas une estimation.",
    srcUSDA: "l’USDA FoodData Central",
    srcINDB: "l’Indian Nutrient Databank",
    factsTitle: "{name} · 100 g",
    fiber: "Fibres",
    sugars: "Sucres",
    satfat: "Acides gras saturés",
    sodium: "Sodium",
    note: "Le % des macros correspond à leur part des {kcal} kcal (protéines et glucides 4 kcal/g, lipides 9 kcal/g).",
    cta: "Ajouter à mon suivi →",
    portion:
      "Vous enregistrez une vraie portion ? Le calculateur de recettes ramène {name} à vos grammes et additionne tout le repas, ou dites simplement au chat repas ce que vous avez mangé.",
    mealChat: "chat repas",
    commonQuestions: "Questions fréquentes",
    faqQ1: "Combien de calories dans {name} ?",
    faqA1:
      "{name} apporte {kcal} kcal pour 100 g, avec {protein} g de protéines, {carb} g de glucides et {fat} g de lipides.",
    faqQ2: "{name} est-il riche en protéines ?",
    faqA2:
      "Les protéines représentent {pct} % de ses calories ({density} g pour 100 kcal). Au-delà de ~35 %, c’est une bonne source de protéines.",
    faqQ3: "D’où viennent ces données ?",
    faqA3:
      "De {source} — des valeurs mesurées en laboratoire pour 100 g. MacroChat s’appuie sur la même source pour enregistrer un repas.",
    compareH2: "Comparer {name}",
    vs: "{a} ou {b}",
    relatedH2: "Aliments proches",
    relatedItem: "Macros de {name}",
    relatedKcal: "{kcal} kcal / 100 g",
  },

  compare: {
    indexTitle: "Comparer les macros des aliments — MacroChat",
    indexDesc:
      "Comparaisons de calories et de macros côte à côte pour des aliments courants, avec un verdict clair sur celui qui convient à une sèche ou à une prise de masse.",
    indexEyebrow: "Référence",
    indexH1: "Comparer deux aliments",
    indexLead:
      "{count} comparaisons de macros en face-à-face, pour 100 g, chacune avec un verdict basé sur des règles pour la perte de gras ou la prise de muscle.",
    indexPopular: "Comparaisons populaires",
    indexToFoods: "Toutes les pages de macros →",

    crumb: "Comparer",
    title: "{a} ou {b} — macros comparées pour 100 g",
    desc: "{a} ou {b} pour 100 g : {kcalA} vs {kcalB} kcal, {proteinA} vs {proteinB} g de protéines, {carbA} vs {carbB} g de glucides. Lequel colle à votre objectif.",
    lead: "Toutes les valeurs sont pour 100 grammes, directement issues de {source} — sans estimation.",
    srcBoth: "l’USDA et l’INDB",
    proteinPer100: "Protéines pour 100 kcal — {a} {pdA} g · {b} {pdB} g",
    verdictH2: "Mieux pour votre objectif",
    quickAnswers: "Réponses rapides",
    moreH2: "Plus de comparaisons avec {name}",
    macrosLink: "Macros de {name}",
    cta: "Suivre l’un ou l’autre dans MacroChat →",

    faqQ1: "Lequel contient le plus de protéines, {a} ou {b} ?",
    faqA1: "Pour 100 g, {winner} en contient davantage — {hi} g contre {lo} g ({gap}).",
    faqQ2: "Lequel convient le mieux pour perdre du poids ?",
    faqA2:
      "{leaner} est moins calorique pour 100 g ({leanerKcal} contre {otherKcal} kcal), il s’intègre donc plus facilement dans un déficit. {protein} apporte plus de protéines par calorie, ce qui aide à la satiété.",
    faqQ3: "D’où viennent ces chiffres ?",
    faqA3:
      "De l’USDA FoodData Central et de l’Indian Nutrient Databank — des valeurs mesurées en laboratoire pour 100 g, pas des estimations. MacroChat utilise les mêmes données pour enregistrer un repas.",

    "gap.allOfIt": "toute la différence",
    "gap.same": "la même chose",
    "gap.times": "{n} fois",
    "gap.pctMore": "{n} % de plus",
    "gap.pctPlain": "{n} %",
    "verdict.leaner":
      "Pour 100 g, {leaner} compte {gap} de calories en moins ({leanerKcal} contre {otherKcal} kcal) — plus facile à caser dans un déficit calorique.",
    "verdict.closeKcal": "Pour 100 g, les deux sont proches côté calories ({kcalA} contre {kcalB} kcal).",
    "verdict.protein":
      "{protein} est plus dense en protéines — {pdHigh} g pour 100 kcal contre {pdLow} g — donc le meilleur choix pour prendre du muscle ou tenir la satiété en sèche.",
    "verdict.closeProtein": "Les deux apportent des protéines à un rythme comparable par calorie.",

    "tool.portionSize": "Taille de portion",
    "tool.per100": "Pour 100 g",
    "tool.perServing": "Par portion",
    "tool.custom": "Personnalisé",
    "tool.sum": "{gA} g de {a} = {kcalA} kcal · {gB} g de {b} = {kcalB} kcal",
    "tool.key": "Barre pleine = valeur la plus élevée · ",
    "tool.keyWin": "case teintée",
    "tool.keyEnd": " = meilleur pour un objectif sec / riche en protéines",
  },
  legal: {
    "about.title": "À propos — MacroChat AI",
    "about.eyebrow": "À propos",
    "about.h1a": "Des chiffres honnêtes,",
    "about.h1b": "zéro approximation.",
    "about.s1h": "Pourquoi MacroChat existe",
    "about.s1p":
      "La plupart des applis de calories vous obligent à fouiller des listes déroulantes et à tout peser. La plupart des trackers dopés à l'IA laissent le modèle inventer les chiffres. MacroChat ne fait ni l'un ni l'autre : vous lui parlez comme à une personne — « 200 g de poulet grillé, 2 rotis » ou une photo — et chaque calorie affichée vient d'une vraie base de données nutritionnelle, jamais de l'imagination de l'IA.",
    "about.s2h": "Comment nous restons honnêtes",
    "about.s2p":
      "Le seul rôle de l'IA est d'identifier les aliments et de raisonner sur les portions. Les macros viennent de l'USDA FoodData Central et de l'Indian Nutrient Databank (INDB). Les totaux journaliers sont calculés côté serveur, pas par un modèle de langage. Quand nous estimons une portion à partir d'une photo, nous le disons — et vous demandons de confirmer avant de la comptabiliser.",
    "about.s3h": "La cuisine indienne aussi",
    "about.s3p":
      "L'USDA couvre la liste mondiale du quotidien, et plus de 1 000 recettes et ingrédients indiens de l'INDB couvrent roti, dal, sabzi et biryani. Un seul tracker pour les deux moitiés de votre alimentation.",

    "privacy.title": "Politique de confidentialité — MacroChat AI",
    "privacy.eyebrow": "Politique de confidentialité",
    "privacy.h1": "Vos données, sans détour.",
    "privacy.updated": "Dernière mise à jour : juillet 2026",
    "privacy.s1h": "Ce que nous collectons",
    "privacy.s1p":
      "Les informations de compte (e-mail, taille, poids, âge, sexe, niveau d'activité, objectif, fuseau horaire) pour calculer vos objectifs journaliers ; les repas et messages que vous enregistrez ; et les photos que vous envoyez, traitées pour identifier les aliments.",
    "privacy.s2h": "Comment elles sont utilisées",
    "privacy.s2p":
      "Le texte et les photos des repas sont transmis à des fournisseurs d'IA (OpenAI ; Google Gemini pour les sessions invité) dans le seul but d'identifier les aliments et les portions. Les valeurs nutritionnelles proviennent de bases publiques (USDA, INDB). Vos données servent à faire fonctionner le service — jamais vendues, jamais utilisées à des fins publicitaires.",
    "privacy.s3h": "Où elles sont stockées",
    "privacy.s3p":
      "Votre compte et votre historique de repas sont stockés dans Supabase (Postgres) avec sécurité au niveau des lignes — seul votre compte authentifié peut lire vos enregistrements. Les analyses en mode invité ne sont pas conservées du tout.",
    "privacy.s4h": "Vos choix",
    "privacy.s4pPre": "Vous pouvez utiliser MacroChat en invité, sans rien enregistrer. Pour supprimer votre compte et toutes les données associées, ",
    "privacy.s4pLink": "contactez-nous",
    "privacy.s4pPost": " — la suppression est définitive.",

    "terms.title": "Conditions générales — MacroChat AI",
    "terms.eyebrow": "Conditions générales",
    "terms.h1": "Les petites lignes, en bref.",
    "terms.updated": "Dernière mise à jour : juillet 2026",
    "terms.s1h": "1. Pas un avis médical",
    "terms.s1p":
      "MacroChat est un outil de suivi nutritionnel, pas un service médical. Les valeurs de calories et de macros sont des estimations — les tailles de portion tout particulièrement. Consultez un professionnel qualifié avant toute décision de santé, surtout en cas de pathologie.",
    "terms.s2h": "2. Exactitude",
    "terms.s2p":
      "Nous tirons les chiffres de vraies bases de données (USDA, INDB) et signalons clairement les portions estimées, mais nous ne garantissons l'exactitude d'aucune valeur. Les grammages que vous confirmez relèvent de votre responsabilité.",
    "terms.s3h": "3. Votre compte",
    "terms.s3p":
      "Protégez vos identifiants ; vous êtes responsable de l'activité sur votre compte. N'abusez pas du service (scraping automatisé, tentatives d'accès aux données d'autres utilisateurs, surcharge de l'API).",
    "terms.s4h": "4. Disponibilité du service",
    "terms.s4p":
      "Ceci est un projet personnel fourni en l'état, sans garantie de disponibilité. Nous pouvons modifier ou retirer des fonctionnalités à tout moment.",
    "terms.s5h": "5. Contact",
    "terms.s5pPre": "Des questions sur ces conditions ? ",
    "terms.s5pLink": "Écrivez-nous",
    "terms.s5pPost": ".",

    "contact.title": "Contact — MacroChat AI",
    "contact.eyebrow": "Contact",
    "contact.h1": "Dites bonjour.",
    "contact.s1h": "E-mail",
    "contact.s1p": "Bugs, idées de fonctionnalités, demandes de suppression de données, ou autre :",
    "contact.s2h": "Un chiffre qui cloche ?",
    "contact.s2p":
      "Si un aliment a été associé à la mauvaise entrée de la base ou qu'un total de calories semble faux, envoyez-nous une capture d'écran — la justesse des correspondances est ce que nous tenons le plus à corriger.",

    "govern": "Cette page est une traduction fournie à titre indicatif. La version anglaise fait foi.",
  },
};
