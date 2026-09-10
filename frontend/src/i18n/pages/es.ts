import type { PageStrings } from "./en";

export const es: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "Gratis · Sin registro · Guardado en tu dispositivo",
    "hero.h1a": "Herramientas de macros gratis.",
    "hero.h1b": "Números de bases de datos reales.",
    "hero.lead":
      "Calcula tus calorías y tu reparto de macros, desglosa una receta, compara dos alimentos: todo gratis, todo en tu navegador y sin registrarte. Cada número viene de USDA o INDB, nunca de una suposición.",
    "hero.check1": "Seis calculadoras: macros, TDEE, TMB, proteína, déficit y recetas",
    "hero.check2":
      "Páginas de macros de ~500 alimentos y comparaciones lado a lado",
    "hero.check3": "Tus datos se guardan en este dispositivo, sin crear cuenta",
    "hero.ctaCalc": "Abrir la calculadora",
    "hero.ctaTracking": "Ver el registro de comidas ↓",
    "hero.quickLabel": "Calculadora rápida de macros",
    "hero.quickEyebrow": "Pruébalo ya · calculadora rápida",

    "trust.1": "Gratis para siempre",
    "trust.2": "Sin email para empezar",
    "trust.3": "En menos de 60 segundos",
    "trust.4": "No vendemos suplementos ni asesorías",

    "tools.eyebrow": "Gratis · sin cuenta",
    "tools.h2": "Todas las herramientas, sin muro de registro.",
    "tools.lead":
      "Seis calculadoras que funcionan en tu navegador y recuerdan tus últimos datos, más ~500 páginas de macros de alimentos y miles de comparaciones. Solo te registras cuando quieras que lleven la cuenta de tu día.",
    "tools.open": "Abrir →",
    "tool.macro": "Calorías y reparto de proteína/carbohidratos/grasa según tu cuerpo.",
    "tool.tdee": "Tus calorías de mantenimiento: lo que gastas en un día.",
    "tool.bmr": "Gasto en reposo, con Mifflin-St Jeor o Katch-McArdle.",
    "tool.protein": "Un objetivo diario de proteína ajustado a tu peso.",
    "tool.deficit": "Elige un déficit y mira el ritmo semanal y la fecha objetivo.",
    "tool.recipe": "Añade ingredientes y gramos y obtén el total del plato.",
    "tool.compare":
      "Pollo o arroz, roti o pan: barras, porciones por ración y un veredicto para tu objetivo.",
    "tool.az":
      "Calorías y macros por 100 g de ~500 alimentos, de USDA e INDB.",

    "stats.usda": "Alimentos en USDA",
    "stats.indb": "Recetas regionales de INDB",
    "stats.guessed": "Números inventados por la IA",
    "stats.calcs": "Calculadoras gratis",

    "tracker.eyebrow": "La capa con cuenta",
    "tracker.h2": "¿Quieres que lleve la cuenta de tu día? Regístrate gratis.",
    "tracker.lead":
      "Todo lo anterior funciona sin cuenta. Crea una y el mismo motor de bases de datos reales registra tus comidas: entra una foto o una frase, salen calorías y macros, comparadas con tu objetivo.",
    "tracker.imgAlt":
      "Describe tu comida, MacroChat la busca en una base de datos real y tú confirmas la porción.",

    "step1.label": "Paso 1",
    "step1.title": "Dilo o hazle una foto",
    "step1.body":
      "Escribe tu comida, adjunta una foto o ambas cosas. La IA nombra cada alimento y detecta la preparación: a la plancha, frito, en curry.",
    "step2.label": "Paso 2",
    "step2.title": "Búsqueda en bases de datos reales",
    "step2.body":
      "Cada caloría sale del Indian Nutrient Databank o de USDA FoodData Central, emparejada con tu alimento y nunca sacada de la memoria de la IA.",
    "step3.label": "Paso 3",
    "step3.title": "Tú mandas",
    "step3.body":
      "¿Indicaste la porción? Se registra al instante. ¿Solo hay foto? Confirmas los gramos antes de que cuente en tu día.",

    "shot.eyebrow": "Con sesión iniciada",
    "shot.h2": "Entra una comida, salen los datos.",
    "shot.lead":
      "Sin menús desplegables ni búsqueda de códigos de barras. Fotografía el plato y MacroChat te devuelve un panel de información nutricional con el reparto de macros y la fuente etiquetada en cada línea: INDB o USDA.",
    "shot.cta": "Crear una cuenta gratis",
    "shot.you": "Tú",
    "shot.msg": "1 plato de biryani de verduras",
    "shot.factsTitle": "Datos de la comida",
    "shot.calories": "Calorías",
    "shot.protein": "Proteína",
    "shot.carbs": "Carbohidratos",
    "shot.fat": "Grasa",
    "shot.item": "Biryani de verduras · 1 plato",
    "shot.donutLabel": "Proteína 22 %, Carbohidratos 58 %, Grasa 20 %",

    "feat.eyebrow": "Lo que añade el registro",
    "feat.h2": "Pensado para cómo comes de verdad.",
    "feat1.title": "Foto, texto o ambos",
    "feat1.body":
      "Fotografía el plato, escribe la porción o haz las dos cosas. El texto con gramos se registra al instante.",
    "feat2.title": "Comidas reales, no solo envases",
    "feat2.body":
      "USDA para los alimentos de todo el mundo y más de 1.000 recetas de INDB para platos regionales: dal, biryani, dosa.",
    "feat3.title": "Tú confirmas los gramos",
    "feat3.body":
      "¿Se estimó la porción desde una foto? Nada cuenta hasta que lo apruebas.",
    "feat4.title": "También búsqueda manual",
    "feat4.body":
      "Sáltate la IA: busca en la misma base de datos, pon los gramos y regístralo directamente en tu día.",
    "feat5.title": "Tendencias de la semana",
    "feat5.body":
      "Un gráfico de 7 días frente a tu objetivo, una racha de registro y avisos en lenguaje claro, sin coste de IA.",
    "feat6.title": "Tu medianoche, no la nuestra",
    "feat6.body":
      "Los totales diarios se reinician a la medianoche de tu zona horaria, que se guarda al registrarte.",

    "vs.eyebrow": "Por qué es distinto",
    "vs.h2": "Una app de calorías típica frente a MacroChat.",
    "vs.them": "App típica",
    "vs.us": "MacroChat",
    "vs.them1": "Muro de registro antes de poder usar nada",
    "vs.us1": "Calculadoras y datos de alimentos, sin cuenta",
    "vs.them2": "La IA o la comunidad adivinan los números",
    "vs.us2": "Solo consultas a INDB y USDA",
    "vs.them3": "Listas interminables de búsqueda de alimentos",
    "vs.us3": "Una frase o una foto",
    "vs.them4": "Registra en silencio lo que cree",
    "vs.us4": "Tú confirmas las porciones estimadas",
    "vs.them5": "Primero el código de barras; falta la comida casera",
    "vs.us5": "USDA e INDB, con platos cocinados incluidos",

    "receipts.eyebrow": "Registros reales",
    "receipts.h2": "No son reseñas. Son recibos.",
    "receipts.q1":
      "2 rotis y dal: registrados en 6 segundos, 348 kcal, fuente INDB.",
    "receipts.by1": "— Un registro real, no una reseña",
    "receipts.q2":
      "Foto de un plato → «¿pechuga de pollo a la plancha, 210 g?» → confirmado → 347 kcal.",
    "receipts.by2": "— El paso de confirmación, funcionando",
    "receipts.q3":
      "«quinoa hervida» se resolvió como quinoa de USDA, no como patas de pollo. Corregido y probado.",
    "receipts.by3": "— Una coincidencia basura menos",

    "faq.eyebrow": "Preguntas frecuentes",
    "faq.h2": "Preguntas justas.",
    "faq.q1": "¿Las calculadoras cuestan algo?",
    "faq.a1":
      "No. Cada calculadora y cada página de alimentos es gratis y no necesita cuenta: tus datos se guardan en el navegador. Solo te registras si quieres registro de comidas con historial y totales diarios.",
    "faq.q2": "¿Cómo de exactas son las calorías?",
    "faq.a2":
      "Los números vienen del Indian Nutrient Databank y de USDA FoodData Central: datos medidos en laboratorio, nunca suposiciones de la IA. Lo incierto es el tamaño de la porción: si indicas los gramos, es tan exacto como tu báscula; desde una foto es una estimación y siempre te pedimos que la confirmes antes de contarla.",
    "faq.q3": "¿Qué fórmulas usan las calculadoras?",
    "faq.a3":
      "Mifflin-St Jeor para la TMB por defecto, y Katch-McArdle si introduces tu % de grasa corporal. El TDEE multiplica por un factor de actividad; el reparto de macros usa 1,8 g/kg de proteína, el 25 % de las calorías en grasa y el resto en carbohidratos. Todo está explicado en la ",
    "faq.a3link": "página de la calculadora",
    "faq.q4": "¿Puedo probar el registro de comidas sin cuenta?",
    "faq.a4pre": "Sí: el ",
    "faq.a4link": "modo invitado",
    "faq.a4post":
      " analiza hasta tres comidas por sesión. Una cuenta las guarda, lleva la cuenta de tu día y quita el límite.",
    "faq.q5": "¿Conoce la comida india?",
    "faq.a5":
      "Sí: más de 1.000 recetas e ingredientes del Indian Nutrient Databank (roti, dal, sabzi, biryani, dosa). Todo lo demás se busca en la base de datos de USDA.",
    "faq.q6": "¿Por qué el primer análisis tarda a veces unos 50 segundos?",
    "faq.a6":
      "El backend de IA corre en un plan gratuito que se duerme cuando no se usa; la primera petición lo despierta. Las calculadoras no lo tocan: son instantáneas.",
    "faq.q7": "¿Escanea códigos de barras?",
    "faq.a7":
      "No, a propósito. Los códigos de barras solo cubren comida envasada; la mayoría de las comidas reales (dal, sabzi, cualquier plato casero) no tienen código. Describe o fotografía el plato.",
    "faq.q8": "¿Hay modo oscuro?",
    "faq.a8":
      "Sí, con el botón ◐ de la barra de navegación. El mismo sistema de tinta sobre papel, invertido, y el verde azulado se mantiene. Tu elección se recuerda y por defecto sigue a tu sistema.",
    "faq.q9": "¿Qué pasa con mis fotos y mis datos?",
    "faq.a9":
      "Las fotos solo se usan para identificar el alimento. Tu historial de comidas se guarda en Supabase con seguridad a nivel de fila: solo tu cuenta puede leerlo. Consulta la ",
    "faq.a9link": "política de privacidad",

    "cta.h2": "Empieza con un número.",
    "cta.btn1": "Abrir la calculadora",
    "cta.btn2": "Registrarte para hacer seguimiento",
    "cta.sub": "Sin tarjeta. Sin códigos de barras. Sin números inventados por la IA.",

    "meta.title":
      "MacroChat — Calculadoras de macros gratis y registro de comidas con datos reales",
    "meta.description":
      "Calculadoras gratis de macros, TDEE, TMB, proteína, déficit y recetas: sin registro y guardadas en tu dispositivo. Las calorías y los macros vienen de USDA e INDB, nunca de una suposición.",
  },

  calc: {
    units: "Unidades",
    "units.metric": "Métricas (kg, cm)",
    "units.imperial": "Imperiales (lb, ft/in)",
    sex: "Sexo",
    "sex.male": "Hombre",
    "sex.female": "Mujer",
    age: "Edad",
    weight: "Peso",
    heightCm: "Altura (cm)",
    height: "Altura",
    "height.feet": "Altura en pies",
    "height.inches": "Altura en pulgadas",
    activity: "Actividad",
    "act.sedentary": "Sedentario",
    "act.sedentaryLong": "Sedentario — trabajo de oficina, poco ejercicio",
    "act.light": "Ligera",
    "act.lightLong": "Ligera — 1–3 entrenamientos por semana",
    "act.moderate": "Moderada",
    "act.moderateLong": "Moderada — 3–5 entrenamientos por semana",
    "act.active": "Activa",
    "act.activeLong": "Activa — 6–7 entrenamientos por semana",
    "act.veryActive": "Muy activa",
    "act.veryActiveLong": "Muy activa — entrenamiento duro o trabajo físico",
    goal: "Objetivo",
    "goal.lose": "Perder grasa (−500 kcal)",
    "goal.maintain": "Mantener",
    "goal.gain": "Ganar (+300 kcal)",
    advanced: "Opciones avanzadas",
    bodyfat: "% de grasa corporal (activa Katch-McArdle)",
    bodyfatShort: "% de grasa corporal (opcional → Katch-McArdle)",
    optional: "opcional",
    experience: "Experiencia de entrenamiento",
    "exp.beginner": "Principiante (< 1 año)",
    "exp.intermediate": "Intermedio (1–3 años)",
    "exp.advanced": "Avanzado (3+ años)",

    "fc.note":
      "Elige un tipo de dieta o arrastra el reparto de abajo. Guardado en este dispositivo, sin cuenta. Regístrate para registrar comidas frente a este objetivo.",

    result: "Resultado",
    yourTarget: "Tu objetivo diario",
    calories: "Calorías",
    protein: "Proteína",
    carbs: "Carbohidratos",
    fat: "Grasa",
    bmr: "TMB",
    tdeeMaint: "TDEE (mantenimiento)",
    bmiWater: "IMC · Agua",
    fillFields: "Rellena los campos",
    formula: "Fórmula",
    "unit.kcalDay": "kcal/día",
    "unit.gDay": "g/día",
    "unit.kgWeek": "kg/semana",
    "unit.weeks": "semanas",

    "mini.activityFactor": "Factor de actividad",
    "mini.proteinTarget": "Objetivo (1,8 g/kg)",
    "mini.range": "Rango razonable",
    "mini.dailyCalories": "Calorías diarias",
    "mini.maintenance": "Mantenimiento",
    "mini.weeklyRate": "Ritmo semanal",
    "mini.timeToGoal": "Tiempo hasta el objetivo",
    "mini.setLower": "pon un peso objetivo más bajo",
    "mini.goalWeight": "Peso objetivo",
    "mini.dailyDeficit": "Déficit diario (kcal)",

    "qc.note":
      "Mifflin-St Jeor · proteína 1,8 g/kg · grasa 25 % de las calorías. Guardado en este dispositivo, sin cuenta.",
    "qc.full": "Usar la calculadora completa →",
    "qc.fullMini": "Calculadora de macros completa →",
    "qc.save": "Guardar en tu cuenta →",

    "split.dietStyle": "Tipo de dieta",
    "split.summary": "Resumen del objetivo diario",
    "split.lock": "Bloquear",
    "split.unlock": "Desbloquear",
    "split.note":
      "Bloquea un macro para fijarlo mientras mueves los demás: el reparto siempre suma 100 %. Los gramos usan 4/4/9 kcal por gramo.",
    "diet.balanced": "Equilibrada",
    "diet.lowCarb": "Baja en carbohidratos",
    "diet.keto": "Keto",
    "diet.highProtein": "Alta en proteína",
    "diet.plantBased": "Vegetal",
    "diet.initialC": "C",
    "diet.initialP": "P",
    "diet.initialF": "G",

    "recipe.ingredient": "Ingrediente (p. ej. paneer, avena, plátano)",
    "recipe.grams": "g",
    "recipe.remove": "Quitar",
    "recipe.add": "+ Añadir ingrediente",
    "recipe.calc": "Calcular macros",
    "recipe.calculating": "Calculando…",
    "recipe.waking": "Despertando el servidor…",
    "recipe.total": "Total de la receta",
    "recipe.noMatch": "sin coincidencia",
    "recipe.empty": "Añade ingredientes y calcula",
  },

  calcPages: {
    pill: "Herramientas gratis · Sin registro",
    how: "Cómo funciona",
    seeAlso: "Ver también",

    "macro.lead":
      "Tus calorías diarias y el reparto de proteína / carbohidratos / grasa según Mifflin-St Jeor (o Katch-McArdle si conoces tu % de grasa corporal). Funciona por completo en tu navegador y los números coinciden con los que usa MacroChat al registrar una comida.",
    "macro.eyebrow": "Transparencia",
    "macro.h2": "Cómo funciona esta calculadora",
    "macro.s1": "1 · Tasa metabólica basal (TMB)",
    "macro.s1a":
      "Las calorías que tu cuerpo quema en reposo absoluto. La fórmula por defecto es Mifflin-St Jeor:",
    "macro.s1b":
      "Si introduces tu % de grasa corporal en las opciones avanzadas, cambia a Katch-McArdle, más precisa en personas muy delgadas o con mucho peso porque parte de la masa magra:",
    "macro.s2": "2 · Gasto energético diario total (TDEE)",
    "macro.s2a": "La TMB multiplicada por un factor de actividad:",
    "macro.thActivity": "Actividad",
    "macro.thFactor": "Factor",
    "macro.s3": "3 · Ajuste por objetivo",
    "macro.thGoal": "Objetivo",
    "macro.thChange": "Cambio diario",
    "macro.goalLose": "Perder grasa",
    "macro.goalLoseVal": "−500 kcal (≈ 0,45 kg por semana)",
    "macro.goalMaintain": "Mantener",
    "macro.goalGain": "Ganar",
    "macro.goalGainVal": "+300 kcal (ganancia limpia)",
    "macro.s4": "4 · Reparto de macros",
    "macro.s4a":
      "La proteína se fija en 1,8 g por kg de peso (objetivo de adulto activo), la grasa en el 25 % de las calorías totales y los carbohidratos se quedan con las calorías restantes. Energía por gramo: proteína 4, carbohidratos 4, grasa 9.",
    "macro.s4b":
      "El IMC es peso(kg) / altura(m)²; el objetivo de agua es una estimación de 35 ml por kg de peso.",
    "macro.refs": "Referencias",
    "macro.tblEyebrow": "Referencia",
    "macro.tblH2": "Macros de alimentos comunes",
    "macro.tblLead": "Por ración típica. Toca un alimento para ver su página, o ",
    "macro.tblLeadLink": "compara dos alimentos lado a lado",
    "macro.thFood": "Alimento",
    "macro.thServing": "Ración",

    "tdee.lead":
      "Gasto energético diario total: las calorías que quemas en un día, en reposo más actividad. Es tu número de mantenimiento: come eso para mantener el peso, menos para perder y más para ganar.",
    "tdee.h2": "TMB × factor de actividad",
    "tdee.p1":
      "Tomamos tu TMB (Mifflin-St Jeor, o Katch-McArdle si introduces el % de grasa corporal) y la multiplicamos por un factor de actividad: 1,2 sedentario, 1,375 ligero, 1,55 moderado, 1,725 activo y 1,9 muy activo.",

    "bmr.lead":
      "Tasa metabólica basal: las calorías que tu cuerpo quema en reposo absoluto solo para mantenerte con vida. Es la base sobre la que se construye tu objetivo diario.",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "Si introduces tu % de grasa corporal, cambia a Katch-McArdle (370 + 21,6 · masa magra), más precisa en personas muy delgadas o con mucho peso.",

    "protein.lead":
      "Cuánta proteína buscar cada día según tu peso corporal. Es el mismo objetivo que usa MacroChat al construir tu reparto de macros.",
    "protein.h2": "1,8 g por kg de peso corporal",
    "protein.p1":
      "El objetivo por defecto es 1,8 g/kg, una cifra sólida para un adulto activo. El rango 1,6–2,2 g/kg cubre casi todos los objetivos: la parte baja para salud general y la alta cuando haces dieta estricta o buscas ganar músculo. La proteína aporta 4 kcal por gramo.",

    "deficit.lead":
      "Elige un déficit diario y un peso objetivo: verás tu objetivo de calorías, el ritmo semanal de pérdida y aproximadamente cuándo llegarías a la meta.",
    "deficit.h2": "Déficit → ritmo → fecha",
    "deficit.p1":
      "Calorías diarias = tu TDEE menos el déficit que elijas. Unas 7.700 kcal ≈ 1 kg de grasa corporal, así que un déficit de 500 kcal/día equivale a unos 0,45 kg por semana. Tiempo hasta el objetivo = peso a perder ÷ ritmo semanal.",
    "deficit.p2":
      "Un déficit de 300–750 kcal/día es sostenible para la mayoría. Los déficits muy grandes cuestan músculo y son difíciles de mantener.",

    "recipe.lead":
      "Escribe los ingredientes y los gramos y obtén el total de calorías, proteína, carbohidratos y grasa. Cada número es una consulta a una base de datos real (USDA e INDB), no una estimación de la IA.",
    "recipe.h2": "Buscar, escalar, sumar",
    "recipe.p1":
      "Cada nombre de ingrediente se empareja con una entrada de INDB (platos e ingredientes indios) o de USDA FoodData Central; los básicos como el arroz y el dal usan un valor fijo de referencia. Los macros por 100 g se escalan a tus gramos y se suman.",
    "recipe.p2":
      "Los nombres sencillos funcionan mejor: «arroz», «pechuga de pollo», «aceite de oliva». Un ingrediente que no se pueda emparejar se lista aparte y queda fuera del total. La primera consulta tras un rato puede tardar unos 50 s mientras despierta el servidor gratuito.",
    "recipe.p3": "¿Prefieres hacerlo desde una foto o una frase? ",
    "recipe.p3link": "Prueba el chat de comidas",
  },

  foods: {
    indexEyebrow: "Referencia",
    indexH1: "Macros de alimentos, A–Z",
    indexLead:
      "Calorías y macros por 100 g de {count} alimentos comunes. Valores de bases de datos reales (USDA + INDB), los mismos con los que MacroChat registra una comida.",
    indexTitle: "Macros de alimentos A–Z — MacroChat",
    indexDesc:
      "Calorías, proteína, carbohidratos y grasa por 100 g de alimentos comunes: datos de USDA y del Indian Nutrient Databank, sin estimaciones.",
    indexToCompare: "Comparar dos alimentos →",

    crumb: "Alimentos",
    title: "Macros de {name}: calorías, proteína, carbohidratos y grasa por 100 g",
    desc: "{name}: {kcal} kcal, {protein} g de proteína, {carb} g de carbohidratos y {fat} g de grasa por 100 g. Fuente: {source}.",
    h1: "Macros de {name}",
    lead: "Por 100 gramos, según {source}. Datos de laboratorio, no una estimación.",
    srcUSDA: "USDA FoodData Central",
    srcINDB: "el Indian Nutrient Databank",
    factsTitle: "{name} · 100 g",
    fiber: "Fibra",
    sugars: "Azúcares",
    satfat: "Grasa saturada",
    sodium: "Sodio",
    note: "El % de macros es la parte de las {kcal} kcal (proteína y carbohidratos 4 kcal/g, grasa 9 kcal/g).",
    cta: "Añadir esto a tu registro →",
    portion:
      "¿Vas a registrar una ración real? La calculadora de recetas ajusta {name} a tus gramos y suma la comida entera, o simplemente cuéntale al chat de comidas qué comiste.",
    mealChat: "chat de comidas",
    commonQuestions: "Preguntas frecuentes",
    faqQ1: "¿Cuántas calorías tiene {name}?",
    faqA1:
      "{name} tiene {kcal} kcal por 100 g, con {protein} g de proteína, {carb} g de carbohidratos y {fat} g de grasa.",
    faqQ2: "¿{name} es rico en proteína?",
    faqA2:
      "Aporta el {pct} % de sus calorías en forma de proteína ({density} g por 100 kcal). Por encima del 35 % ya es una buena fuente de proteína.",
    faqQ3: "¿De dónde salen estos datos?",
    faqA3:
      "{source}: valores medidos en laboratorio por 100 g. MacroChat usa la misma fuente para registrar una comida.",
    compareH2: "Comparar {name}",
    vs: "{a} frente a {b}",
    relatedH2: "Alimentos relacionados",
    relatedItem: "Macros de {name}",
    relatedKcal: "{kcal} kcal / 100 g",
  },

  compare: {
    indexTitle: "Comparar macros de alimentos — MacroChat",
    indexDesc:
      "Comparaciones de calorías y macros lado a lado para alimentos comunes, con un veredicto claro sobre cuál encaja en una definición o en un volumen.",
    indexEyebrow: "Referencia",
    indexH1: "Comparar dos alimentos",
    indexLead:
      "{count} comparaciones de macros cara a cara, por 100 g, cada una con un veredicto basado en reglas para perder grasa o ganar músculo.",
    indexPopular: "Comparaciones populares",
    indexToFoods: "Todas las páginas de macros →",

    crumb: "Comparar",
    title: "{a} frente a {b}: macros comparados por 100 g",
    desc: "{a} frente a {b} por 100 g: {kcalA} vs {kcalB} kcal, {proteinA} vs {proteinB} g de proteína, {carbA} vs {carbB} g de carbohidratos. Cuál encaja en tu objetivo.",
    lead: "Todos los valores son por 100 gramos, directos de {source}, sin estimaciones.",
    srcBoth: "USDA e INDB",
    proteinPer100: "Proteína por 100 kcal — {a} {pdA} g · {b} {pdB} g",
    verdictH2: "Mejor para tu objetivo",
    quickAnswers: "Respuestas rápidas",
    moreH2: "Más comparaciones de {name}",
    macrosLink: "Macros de {name}",
    cta: "Registrar cualquiera en MacroChat →",

    faqQ1: "¿Qué tiene más proteína, {a} o {b}?",
    faqA1: "Por 100 g, {winner} tiene más proteína: {hi} g frente a {lo} g ({gap}).",
    faqQ2: "¿Cuál es mejor para perder peso?",
    faqA2:
      "{leaner} tiene menos calorías por 100 g ({leanerKcal} frente a {otherKcal} kcal), así que encaja mejor en un déficit. {protein} aporta más proteína por caloría, lo que ayuda a saciarte.",
    faqQ3: "¿De dónde salen estos números?",
    faqA3:
      "De USDA FoodData Central y del Indian Nutrient Databank: valores medidos en laboratorio por 100 g, no estimaciones. MacroChat usa los mismos datos para registrar una comida.",

    "gap.allOfIt": "toda la diferencia",
    "gap.same": "lo mismo",
    "gap.times": "{n} veces",
    "gap.pctMore": "un {n} % más",
    "gap.pctPlain": "un {n} %",
    "verdict.leaner":
      "Por 100 g, {leaner} tiene {gap} menos calorías ({leanerKcal} frente a {otherKcal} kcal), así que encaja mejor en un déficit calórico.",
    "verdict.closeKcal": "Por 100 g los dos están parejos en calorías ({kcalA} frente a {kcalB} kcal).",
    "verdict.protein":
      "{protein} es más denso en proteína: {pdHigh} g por 100 kcal frente a {pdLow} g, así que es mejor opción para ganar músculo o mantenerte saciado en definición.",
    "verdict.closeProtein": "Los dos aportan proteína a un ritmo parecido por caloría.",

    "tool.portionSize": "Tamaño de la ración",
    "tool.per100": "Por 100 g",
    "tool.perServing": "Por ración",
    "tool.custom": "Personalizado",
    "tool.sum": "{gA} g de {a} = {kcalA} kcal · {gB} g de {b} = {kcalB} kcal",
    "tool.key": "Barra llena = valor más alto · ",
    "tool.keyWin": "celda sombreada",
    "tool.keyEnd": " = mejor para un objetivo magro o alto en proteína",
  },
};
