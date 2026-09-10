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
};
