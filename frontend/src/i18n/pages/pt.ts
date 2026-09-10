import type { PageStrings } from "./en";

export const pt: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "Grátis · Sem cadastro · Salvo no seu aparelho",
    "hero.h1a": "Ferramentas de macros grátis.",
    "hero.h1b": "Números de bases de dados reais.",
    "hero.lead":
      "Calcule suas calorias e a divisão de macros, destrinche uma receita, compare dois alimentos — tudo grátis, tudo no navegador, sem cadastro. Cada número vem do USDA ou do INDB, nunca de um chute.",
    "hero.check1":
      "Seis calculadoras — macros, TDEE, TMB, proteína, déficit e receitas",
    "hero.check2":
      "Páginas de macros de ~500 alimentos, além de comparações lado a lado",
    "hero.check3":
      "Seus dados ficam salvos neste aparelho — sem precisar de conta",
    "hero.ctaCalc": "Abrir a calculadora",
    "hero.ctaTracking": "Ver o registro de refeições ↓",
    "hero.quickLabel": "Calculadora rápida de macros",
    "hero.quickEyebrow": "Teste agora · calculadora rápida",

    "trust.1": "Grátis para sempre",
    "trust.2": "Sem e-mail para começar",
    "trust.3": "Em menos de 60 segundos",
    "trust.4": "Não vendemos suplementos nem consultoria",

    "tools.eyebrow": "Grátis · sem conta",
    "tools.h2": "Todas as ferramentas, sem barreira de cadastro.",
    "tools.lead":
      "Seis calculadoras que rodam no navegador e lembram seus últimos dados, mais ~500 páginas de macros de alimentos e milhares de comparações. Você só cria conta quando quiser acompanhar o dia.",
    "tools.open": "Abrir →",
    "tool.macro":
      "Calorias e divisão de proteína/carboidrato/gordura a partir dos seus dados corporais.",
    "tool.tdee": "Suas calorias de manutenção — o que você gasta por dia.",
    "tool.bmr": "Gasto em repouso, por Mifflin-St Jeor ou Katch-McArdle.",
    "tool.protein": "Uma meta diária de proteína ajustada ao seu peso.",
    "tool.deficit":
      "Escolha um déficit e veja o ritmo semanal e a data da meta.",
    "tool.recipe":
      "Adicione ingredientes e gramas e receba o total do prato inteiro.",
    "tool.compare":
      "Frango ou arroz, roti ou pão — barras, porções por dose e um veredito para o seu objetivo.",
    "tool.az":
      "Calorias e macros por 100 g de ~500 alimentos, do USDA e do INDB.",

    "stats.usda": "Alimentos no USDA",
    "stats.indb": "Receitas regionais do INDB",
    "stats.guessed": "Números chutados pela IA",
    "stats.calcs": "Calculadoras grátis",

    "tracker.eyebrow": "A camada com conta",
    "tracker.h2": "Quer que ele acompanhe o seu dia? Cadastre-se grátis.",
    "tracker.lead":
      "Tudo acima funciona sem conta. Crie uma e o mesmo motor com bases de dados reais registra suas refeições: entra uma foto ou uma frase, saem calorias e macros, comparados com a sua meta.",
    "tracker.imgAlt":
      "Descreva sua refeição, o MacroChat busca em uma base de dados real e você confirma a porção.",

    "step1.label": "Passo 1",
    "step1.title": "Escreva ou fotografe",
    "step1.body":
      "Digite a refeição, anexe uma foto, ou os dois. A IA nomeia cada alimento e identifica o preparo — grelhado, frito, em curry.",
    "step2.label": "Passo 2",
    "step2.title": "Busca em bases de dados reais",
    "step2.body":
      "Cada caloria vem do Indian Nutrient Databank ou do USDA FoodData Central — associada ao seu alimento, nunca tirada da memória da IA.",
    "step3.label": "Passo 3",
    "step3.title": "Você continua no controle",
    "step3.body":
      "Informou a porção? Registrado na hora. Só foto, com estimativa? Você confirma as gramas antes de contar no seu dia.",

    "shot.eyebrow": "Com login",
    "shot.h2": "Entra a refeição, saem os fatos.",
    "shot.lead":
      "Sem menus suspensos, sem caçar código de barras. Fotografe o prato e o MacroChat devolve um painel de informação nutricional com a divisão de macros e a fonte marcada em cada linha — INDB ou USDA.",
    "shot.cta": "Criar uma conta grátis",
    "shot.you": "Você",
    "shot.msg": "1 tigela de biryani de legumes",
    "shot.factsTitle": "Dados da refeição",
    "shot.calories": "Calorias",
    "shot.protein": "Proteína",
    "shot.carbs": "Carboidratos",
    "shot.fat": "Gordura",
    "shot.item": "Biryani de legumes · 1 tigela",
    "shot.donutLabel": "Proteína 22%, Carboidratos 58%, Gordura 20%",

    "feat.eyebrow": "O que o registro acrescenta",
    "feat.h2": "Feito para o jeito que você come de verdade.",
    "feat1.title": "Foto, texto ou os dois",
    "feat1.body":
      "Fotografe o prato, digite a porção, ou faça os dois. Texto com gramas registra na hora.",
    "feat2.title": "Refeições de verdade, não só embalagens",
    "feat2.body":
      "USDA para alimentos do dia a dia no mundo todo, mais de 1.000 receitas do INDB para pratos regionais — dal, biryani, dosa.",
    "feat3.title": "Você confirma as gramas",
    "feat3.body":
      "Porção estimada por foto? Nada conta até você aprovar.",
    "feat4.title": "Busca manual também",
    "feat4.body":
      "Pule a IA — busque na mesma base, defina as gramas e registre direto no seu dia.",
    "feat5.title": "Tendências da semana",
    "feat5.body":
      "Um gráfico de 7 dias contra a sua meta, uma sequência de registros e recados em linguagem simples — sem custo de IA.",
    "feat6.title": "A sua meia-noite, não a nossa",
    "feat6.body":
      "Os totais diários zeram à meia-noite do seu fuso horário — capturado uma vez no cadastro.",

    "vs.eyebrow": "Por que é diferente",
    "vs.h2": "Um app de calorias comum e o MacroChat.",
    "vs.them": "App comum",
    "vs.us": "MacroChat",
    "vs.them1": "Barreira de cadastro antes de usar qualquer coisa",
    "vs.us1": "Calculadoras e dados de alimentos, sem conta",
    "vs.them2": "A IA ou a comunidade chuta os números",
    "vs.us2": "Somente consultas ao INDB e ao USDA",
    "vs.them3": "Listas intermináveis de busca de alimentos",
    "vs.us3": "Uma frase, ou uma foto",
    "vs.them4": "Registra em silêncio o que acha",
    "vs.us4": "Você confirma as porções estimadas",
    "vs.them5": "Código de barras primeiro, comida caseira de fora",
    "vs.us5": "USDA e INDB, com pratos preparados incluídos",

    "receipts.eyebrow": "Registros reais",
    "receipts.h2": "Não são avaliações. São recibos.",
    "receipts.q1":
      "2 rotis e dal — registrados em 6 segundos, 348 kcal, fonte INDB.",
    "receipts.by1": "— Um registro real, não uma avaliação",
    "receipts.q2":
      "Foto de um prato → “peito de frango grelhado, 210 g?” → confirmado → 347 kcal.",
    "receipts.by2": "— O passo de confirmação, funcionando",
    "receipts.q3":
      "“quinoa cozida” resolveu para quinoa do USDA, não pés de galinha. Corrigido e testado.",
    "receipts.by3": "— Uma correspondência ruim a menos",

    "faq.eyebrow": "Perguntas frequentes",
    "faq.h2": "Perguntas justas.",
    "faq.q1": "As calculadoras custam alguma coisa?",
    "faq.a1":
      "Não. Toda calculadora e toda página de alimento é grátis e não precisa de conta — seus dados ficam salvos no navegador. Você só se cadastra se quiser o registro de refeições com histórico e totais diários.",
    "faq.q2": "Qual é a precisão das calorias?",
    "faq.a2":
      "Os números vêm do Indian Nutrient Databank e do USDA FoodData Central — dados medidos em laboratório, nunca chutes da IA. O incerto é o tamanho da porção: informe as gramas no texto e fica tão exato quanto a sua balança; por foto é uma estimativa, e sempre pedimos que você confirme antes de contar.",
    "faq.q3": "Quais fórmulas as calculadoras usam?",
    "faq.a3":
      "Mifflin-St Jeor para a TMB por padrão, e Katch-McArdle se você informar o % de gordura corporal. O TDEE multiplica por um fator de atividade; a divisão de macros usa 1,8 g/kg de proteína, 25% das calorias em gordura e o resto em carboidratos. Tudo explicado na ",
    "faq.a3link": "página da calculadora",
    "faq.q4": "Dá para testar o registro de refeições sem conta?",
    "faq.a4pre": "Sim — o ",
    "faq.a4link": "modo visitante",
    "faq.a4post":
      " analisa até três refeições por sessão. Uma conta salva tudo, acompanha o seu dia e tira o limite.",
    "faq.q5": "Ele conhece comida indiana?",
    "faq.a5":
      "Sim — mais de 1.000 receitas e ingredientes do Indian Nutrient Databank: roti, dal, sabzi, biryani, dosa. Todo o resto recai na base do USDA.",
    "faq.q6": "Por que a primeira análise às vezes leva ~50 segundos?",
    "faq.a6":
      "O backend de IA roda num plano gratuito que hiberna quando fica parado; o primeiro pedido acorda ele. As calculadoras não dependem disso — são instantâneas.",
    "faq.q7": "Ele lê código de barras?",
    "faq.a7":
      "Não, de propósito. Código de barras só cobre comida embalada; a maioria das refeições reais — dal, sabzi, qualquer coisa caseira — não tem. Descreva ou fotografe o prato.",
    "faq.q8": "Existe modo escuro?",
    "faq.a8":
      "Existe — no botão ◐ da barra de navegação. O mesmo sistema de tinta sobre papel, invertido; o verde-azulado se mantém. Sua escolha fica salva e por padrão segue o seu sistema.",
    "faq.q9": "O que acontece com minhas fotos e dados?",
    "faq.a9":
      "As fotos servem só para identificar o alimento. Seu histórico de refeições fica no Supabase com segurança em nível de linha — só a sua conta consegue ler. Veja a ",
    "faq.a9link": "política de privacidade",

    "cta.h2": "Comece por um número.",
    "cta.btn1": "Abrir a calculadora",
    "cta.btn2": "Criar conta para acompanhar",
    "cta.sub": "Sem cartão. Sem código de barras. Sem números inventados pela IA.",

    "meta.title":
      "MacroChat — Calculadoras de macros grátis e registro de refeições com dados reais",
    "meta.description":
      "Calculadoras grátis de macros, TDEE, TMB, proteína, déficit e receitas — sem cadastro, salvas no seu aparelho. Calorias e macros vêm do USDA e do INDB, nunca chutados.",
  },

  calc: {
    units: "Unidades",
    "units.metric": "Métricas (kg, cm)",
    "units.imperial": "Imperiais (lb, ft/in)",
    sex: "Sexo",
    "sex.male": "Homem",
    "sex.female": "Mulher",
    age: "Idade",
    weight: "Peso",
    heightCm: "Altura (cm)",
    height: "Altura",
    "height.feet": "Altura em pés",
    "height.inches": "Altura em polegadas",
    activity: "Atividade",
    "act.sedentary": "Sedentário",
    "act.sedentaryLong": "Sedentário — trabalho de escritório, pouco exercício",
    "act.light": "Leve",
    "act.lightLong": "Leve — 1 a 3 treinos por semana",
    "act.moderate": "Moderada",
    "act.moderateLong": "Moderada — 3 a 5 treinos por semana",
    "act.active": "Ativa",
    "act.activeLong": "Ativa — 6 a 7 treinos por semana",
    "act.veryActive": "Muito ativa",
    "act.veryActiveLong": "Muito ativa — treino pesado ou trabalho físico",
    goal: "Objetivo",
    "goal.lose": "Perder gordura (−500 kcal)",
    "goal.maintain": "Manter",
    "goal.gain": "Ganhar (+300 kcal)",
    advanced: "Opções avançadas",
    bodyfat: "% de gordura corporal (ativa Katch-McArdle)",
    bodyfatShort: "% de gordura corporal (opcional → Katch-McArdle)",
    optional: "opcional",
    experience: "Experiência de treino",
    "exp.beginner": "Iniciante (< 1 ano)",
    "exp.intermediate": "Intermediário (1 a 3 anos)",
    "exp.advanced": "Avançado (3+ anos)",

    "fc.note":
      "Escolha um estilo de dieta ou arraste a divisão abaixo. Salvo neste aparelho, sem conta. Cadastre-se para registrar refeições contra essa meta.",

    result: "Resultado",
    yourTarget: "Sua meta diária",
    calories: "Calorias",
    protein: "Proteína",
    carbs: "Carboidratos",
    fat: "Gordura",
    bmr: "TMB",
    tdeeMaint: "TDEE (manutenção)",
    bmiWater: "IMC · Água",
    fillFields: "Preencha os campos",
    formula: "Fórmula",
    "unit.kcalDay": "kcal/dia",
    "unit.gDay": "g/dia",
    "unit.kgWeek": "kg/semana",
    "unit.weeks": "semanas",

    "mini.activityFactor": "Fator de atividade",
    "mini.proteinTarget": "Meta (1,8 g/kg)",
    "mini.range": "Faixa razoável",
    "mini.dailyCalories": "Calorias diárias",
    "mini.maintenance": "Manutenção",
    "mini.weeklyRate": "Ritmo semanal",
    "mini.timeToGoal": "Tempo até a meta",
    "mini.setLower": "escolha um peso-alvo menor",
    "mini.goalWeight": "Peso-alvo",
    "mini.dailyDeficit": "Déficit diário (kcal)",

    "qc.note":
      "Mifflin-St Jeor · proteína 1,8 g/kg · gordura 25% das calorias. Salvo neste aparelho, sem conta.",
    "qc.full": "Usar a calculadora completa →",
    "qc.fullMini": "Calculadora de macros completa →",
    "qc.save": "Salvar na sua conta →",

    "split.dietStyle": "Estilo de dieta",
    "split.summary": "Resumo da meta diária",
    "split.lock": "Travar",
    "split.unlock": "Destravar",
    "split.note":
      "Trave um macro para fixá-lo enquanto arrasta os outros — a divisão sempre soma 100%. As gramas usam 4/4/9 kcal por grama.",
    "diet.balanced": "Equilibrada",
    "diet.lowCarb": "Baixa em carboidratos",
    "diet.keto": "Keto",
    "diet.highProtein": "Rica em proteína",
    "diet.plantBased": "Vegetal",
    "diet.initialC": "C",
    "diet.initialP": "P",
    "diet.initialF": "G",

    "recipe.ingredient": "Ingrediente (ex.: paneer, aveia, banana)",
    "recipe.grams": "g",
    "recipe.remove": "Remover",
    "recipe.add": "+ Adicionar ingrediente",
    "recipe.calc": "Calcular macros",
    "recipe.calculating": "Calculando…",
    "recipe.waking": "Acordando o servidor…",
    "recipe.total": "Total da receita",
    "recipe.noMatch": "sem correspondência",
    "recipe.empty": "Adicione ingredientes e calcule",
  },

  calcPages: {
    pill: "Ferramentas grátis · Sem cadastro",
    how: "Como funciona",
    seeAlso: "Veja também",

    "macro.lead":
      "Suas calorias diárias e a divisão de proteína / carboidrato / gordura pelo Mifflin-St Jeor (ou Katch-McArdle, se você souber seu % de gordura corporal). Roda inteiramente no navegador e os números batem com os que o MacroChat usa ao registrar uma refeição.",
    "macro.eyebrow": "Transparência",
    "macro.h2": "Como esta calculadora funciona",
    "macro.s1": "1 · Taxa metabólica basal (TMB)",
    "macro.s1a":
      "As calorias que o corpo queima em repouso absoluto. A fórmula padrão é Mifflin-St Jeor:",
    "macro.s1b":
      "Informe o % de gordura corporal nas opções avançadas e o cálculo muda para Katch-McArdle, mais preciso para pessoas muito magras ou muito pesadas porque parte da massa magra:",
    "macro.s2": "2 · Gasto energético diário total (TDEE)",
    "macro.s2a": "A TMB multiplicada por um fator de atividade:",
    "macro.thActivity": "Atividade",
    "macro.thFactor": "Fator",
    "macro.s3": "3 · Ajuste pelo objetivo",
    "macro.thGoal": "Objetivo",
    "macro.thChange": "Mudança diária",
    "macro.goalLose": "Perder gordura",
    "macro.goalLoseVal": "−500 kcal (≈ 0,45 kg por semana)",
    "macro.goalMaintain": "Manter",
    "macro.goalGain": "Ganhar",
    "macro.goalGainVal": "+300 kcal (ganho limpo)",
    "macro.s4": "4 · Divisão de macros",
    "macro.s4a":
      "A proteína fica em 1,8 g por kg de peso (meta de adulto ativo), a gordura em 25% das calorias totais e os carboidratos ficam com as calorias restantes. Energia por grama: proteína 4, carboidrato 4, gordura 9.",
    "macro.s4b":
      "O IMC é peso(kg) / altura(m)²; a meta de água é uma estimativa de 35 ml por kg de peso.",
    "macro.refs": "Referências",
    "macro.tblEyebrow": "Referência",
    "macro.tblH2": "Macros de alimentos comuns",
    "macro.tblLead": "Por porção típica. Toque num alimento para ver a página completa, ou ",
    "macro.tblLeadLink": "compare dois alimentos lado a lado",
    "macro.thFood": "Alimento",
    "macro.thServing": "Porção",

    "tdee.lead":
      "Gasto energético diário total — as calorias que você queima num dia, em repouso mais atividade. É o seu número de manutenção: coma isso para manter o peso, menos para perder, mais para ganhar.",
    "tdee.h2": "TMB × fator de atividade",
    "tdee.p1":
      "Pegamos a sua TMB (Mifflin-St Jeor, ou Katch-McArdle se você informar o % de gordura corporal) e multiplicamos por um fator de atividade: 1,2 sedentário, 1,375 leve, 1,55 moderado, 1,725 ativo, 1,9 muito ativo.",

    "bmr.lead":
      "Taxa metabólica basal — as calorias que o corpo queima em repouso absoluto só para manter você vivo. É a base sobre a qual a meta diária é construída.",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "Informe o % de gordura corporal e o cálculo muda para Katch-McArdle (370 + 21,6 · massa magra), mais preciso para pessoas muito magras ou muito pesadas.",

    "protein.lead":
      "Quanta proteína buscar por dia, com base no seu peso corporal. É a mesma meta que o MacroChat usa ao montar a sua divisão de macros.",
    "protein.h2": "1,8 g por kg de peso corporal",
    "protein.p1":
      "A meta padrão é 1,8 g/kg — um número sólido para adulto ativo. A faixa de 1,6 a 2,2 g/kg cobre quase todos os objetivos: a parte baixa para saúde geral, a alta em dieta rigorosa ou ganho de músculo. Proteína tem 4 kcal por grama.",

    "deficit.lead":
      "Escolha um déficit diário e um peso-alvo — veja sua meta de calorias, o ritmo semanal de perda e mais ou menos quando você chegaria lá.",
    "deficit.h2": "Déficit → ritmo → data",
    "deficit.p1":
      "Calorias diárias = seu TDEE menos o déficit escolhido. Cerca de 7.700 kcal ≈ 1 kg de gordura corporal, então um déficit de 500 kcal/dia dá mais ou menos 0,45 kg por semana. Tempo até a meta = peso a perder ÷ ritmo semanal.",
    "deficit.p2":
      "Um déficit de 300 a 750 kcal/dia é sustentável para a maioria. Déficits muito grandes custam músculo e são difíceis de manter.",

    "recipe.lead":
      "Liste os ingredientes e as gramas — receba o total de calorias, proteína, carboidratos e gordura. Cada número é uma consulta a uma base de dados real (USDA e INDB), não uma estimativa da IA.",
    "recipe.h2": "Buscar, escalar, somar",
    "recipe.p1":
      "Cada nome de ingrediente é ligado a um registro do INDB (pratos e ingredientes indianos) ou do USDA FoodData Central; básicos como arroz e dal usam um valor de referência fixo. Os macros por 100 g são ajustados às suas gramas e somados.",
    "recipe.p2":
      "Nomes simples funcionam melhor: “arroz”, “peito de frango”, “azeite”. Um ingrediente sem correspondência aparece à parte e fica fora do total. A primeira consulta depois de um tempo pode levar ~50 s enquanto o servidor gratuito acorda.",
    "recipe.p3": "Prefere fazer por foto ou por uma frase? ",
    "recipe.p3link": "Experimente o chat de refeições",
  },

  foods: {
    indexEyebrow: "Referência",
    indexH1: "Macros dos alimentos, A–Z",
    indexLead:
      "Calorias e macros por 100 g de {count} alimentos comuns. Valores de bases de dados reais (USDA + INDB), os mesmos que o MacroChat usa para registrar uma refeição.",
    indexTitle: "Macros dos alimentos A–Z — MacroChat",
    indexDesc:
      "Calorias, proteína, carboidratos e gordura por 100 g de alimentos comuns — dados do USDA e do Indian Nutrient Databank, sem estimativas.",
    indexToCompare: "Comparar dois alimentos →",

    crumb: "Alimentos",
    title: "Macros de {name} — calorias, proteína, carboidratos e gordura por 100 g",
    desc: "{name}: {kcal} kcal, {protein} g de proteína, {carb} g de carboidratos, {fat} g de gordura por 100 g. Fonte: {source}.",
    h1: "Macros de {name}",
    lead: "Por 100 gramas, segundo {source}. Dados de laboratório, não uma estimativa.",
    srcUSDA: "o USDA FoodData Central",
    srcINDB: "o Indian Nutrient Databank",
    factsTitle: "{name} · 100 g",
    fiber: "Fibras",
    sugars: "Açúcares",
    satfat: "Gordura saturada",
    sodium: "Sódio",
    note: "O % dos macros é a fatia das {kcal} kcal (proteína e carboidratos 4 kcal/g, gordura 9 kcal/g).",
    cta: "Adicionar ao meu registro →",
    portion:
      "Vai registrar uma porção de verdade? A calculadora de receitas ajusta {name} às suas gramas e soma a refeição inteira, ou é só contar ao chat de refeições o que você comeu.",
    mealChat: "chat de refeições",
    commonQuestions: "Perguntas comuns",
    faqQ1: "Quantas calorias tem {name}?",
    faqA1:
      "{name} tem {kcal} kcal por 100 g, com {protein} g de proteína, {carb} g de carboidratos e {fat} g de gordura.",
    faqQ2: "{name} é rico em proteína?",
    faqA2:
      "Cerca de {pct}% das calorias vêm da proteína ({density} g por 100 kcal). Acima de ~35% já é uma boa fonte de proteína.",
    faqQ3: "De onde vêm esses dados?",
    faqA3:
      "De {source} — valores medidos em laboratório por 100 g. O MacroChat usa a mesma fonte para registrar uma refeição.",
    compareH2: "Comparar {name}",
    vs: "{a} ou {b}",
    relatedH2: "Alimentos relacionados",
    relatedItem: "Macros de {name}",
    relatedKcal: "{kcal} kcal / 100 g",
  },

  compare: {
    indexTitle: "Comparar macros de alimentos — MacroChat",
    indexDesc:
      "Comparações de calorias e macros lado a lado para alimentos comuns, com um veredito direto sobre qual cabe num cutting ou num bulking.",
    indexEyebrow: "Referência",
    indexH1: "Comparar dois alimentos",
    indexLead:
      "{count} comparações de macros lado a lado, por 100 g, cada uma com um veredito baseado em regras para perda de gordura ou ganho de músculo.",
    indexPopular: "Comparações populares",
    indexToFoods: "Todas as páginas de macros →",

    crumb: "Comparar",
    title: "{a} ou {b} — macros comparados por 100 g",
    desc: "{a} ou {b} por 100 g: {kcalA} vs {kcalB} kcal, {proteinA} vs {proteinB} g de proteína, {carbA} vs {carbB} g de carboidratos. Qual encaixa no seu objetivo.",
    lead: "Todos os valores são por 100 gramas, direto de {source} — sem estimativas.",
    srcBoth: "USDA e INDB",
    proteinPer100: "Proteína por 100 kcal — {a} {pdA} g · {b} {pdB} g",
    verdictH2: "Melhor para o seu objetivo",
    quickAnswers: "Respostas rápidas",
    moreH2: "Mais comparações com {name}",
    macrosLink: "Macros de {name}",
    cta: "Registrar qualquer um no MacroChat →",

    faqQ1: "Qual tem mais proteína, {a} ou {b}?",
    faqA1: "Por 100 g, {winner} tem mais proteína — {hi} g contra {lo} g ({gap}).",
    faqQ2: "Qual é melhor para emagrecer?",
    faqA2:
      "{leaner} tem menos calorias por 100 g ({leanerKcal} contra {otherKcal} kcal), então encaixa mais fácil num déficit. {protein} dá mais proteína por caloria, o que ajuda na saciedade.",
    faqQ3: "De onde vêm esses números?",
    faqA3:
      "Do USDA FoodData Central e do Indian Nutrient Databank — valores medidos em laboratório por 100 g, não estimativas. O MacroChat usa os mesmos dados para registrar uma refeição.",

    "gap.allOfIt": "toda a diferença",
    "gap.same": "o mesmo",
    "gap.times": "{n} vezes",
    "gap.pctMore": "{n}% a mais",
    "gap.pctPlain": "{n}%",
    "verdict.leaner":
      "Por 100 g, {leaner} tem {gap} menos calorias ({leanerKcal} contra {otherKcal} kcal) — encaixa mais fácil num déficit calórico.",
    "verdict.closeKcal": "Por 100 g os dois ficam perto em calorias ({kcalA} contra {kcalB} kcal).",
    "verdict.protein":
      "{protein} é mais denso em proteína — {pdHigh} g por 100 kcal contra {pdLow} g — então é a melhor escolha para ganhar músculo ou manter a saciedade no cutting.",
    "verdict.closeProtein": "Os dois entregam proteína num ritmo parecido por caloria.",

    "tool.portionSize": "Tamanho da porção",
    "tool.per100": "Por 100 g",
    "tool.perServing": "Por porção",
    "tool.custom": "Personalizado",
    "tool.sum": "{gA} g de {a} = {kcalA} kcal · {gB} g de {b} = {kcalB} kcal",
    "tool.key": "Barra cheia = valor maior · ",
    "tool.keyWin": "célula destacada",
    "tool.keyEnd": " = melhor para um objetivo magro / rico em proteína",
  },
};
