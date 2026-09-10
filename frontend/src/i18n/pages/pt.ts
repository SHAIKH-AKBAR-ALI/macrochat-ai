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
};
