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
};
