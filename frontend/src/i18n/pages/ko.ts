import type { PageStrings } from "./en";

export const ko: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "무료 · 가입 불필요 · 기기에 저장",
    "hero.h1a": "무료 매크로 도구.",
    "hero.h1b": "실제 데이터베이스의 수치.",
    "hero.lead":
      "칼로리와 탄단지 비율 계산, 레시피 분해, 두 식품 비교까지 모두 무료로 브라우저에서 끝냅니다. 가입도 필요 없습니다. 모든 수치는 USDA 또는 INDB 데이터에서 나오며, 추측하지 않습니다.",
    "hero.check1":
      "계산기 6종 — 매크로, TDEE, 기초대사량, 단백질, 칼로리 적자, 레시피",
    "hero.check2": "약 500개 식품의 매크로 페이지와 나란히 비교하는 페이지",
    "hero.check3": "입력값은 이 기기에 저장 — 계정 필요 없음",
    "hero.ctaCalc": "계산기 열기",
    "hero.ctaTracking": "식사 기록 보기 ↓",
    "hero.quickLabel": "빠른 매크로 계산기",
    "hero.quickEyebrow": "지금 사용해 보기 · 빠른 계산기",

    "trust.1": "평생 무료",
    "trust.2": "이메일 없이 시작",
    "trust.3": "60초 이내",
    "trust.4": "보충제나 코칭을 팔지 않습니다",

    "tools.eyebrow": "무료 · 계정 불필요",
    "tools.h2": "모든 도구, 가입 장벽 없이.",
    "tools.lead":
      "브라우저에서 돌아가고 마지막 입력을 기억하는 계산기 6종, 여기에 약 500개 식품 매크로 페이지와 수천 건의 식품 비교 페이지까지. 하루치를 기록하고 싶을 때만 가입하세요.",
    "tools.open": "열기 →",
    "tool.macro": "체격 정보로 칼로리와 단백질·탄수화물·지방 비율을 계산합니다.",
    "tool.tdee": "유지 칼로리 — 하루에 소비하는 양.",
    "tool.bmr": "휴식 대사량. Mifflin-St Jeor 또는 Katch-McArdle 방식.",
    "tool.protein": "체중에 맞춘 하루 단백질 목표.",
    "tool.deficit": "적자 폭을 정하면 주간 속도와 목표 날짜를 보여줍니다.",
    "tool.recipe": "재료와 그램을 넣으면 요리 전체의 합계가 나옵니다.",
    "tool.compare":
      "닭고기와 밥, 로티와 빵 — 막대 그래프, 1인분 기준, 목표에 맞춘 결론까지.",
    "tool.az": "USDA와 INDB 기준, 약 500개 식품의 100g당 칼로리와 매크로.",

    "stats.usda": "USDA 식품 항목",
    "stats.indb": "INDB 지역 요리 레시피",
    "stats.guessed": "AI가 추측한 수치",
    "stats.calcs": "무료 계산기",

    "tracker.eyebrow": "로그인 후 기능",
    "tracker.h2": "하루를 기록하고 싶다면 무료로 가입하세요.",
    "tracker.lead":
      "위의 기능은 모두 계정 없이 사용할 수 있습니다. 계정을 만들면 같은 실제 데이터베이스 엔진이 식사를 기록합니다. 사진이나 한 문장을 넣으면 칼로리와 매크로가 나오고, 목표와 비교해 줍니다.",
    "tracker.imgAlt":
      "식사를 설명하면 MacroChat이 실제 데이터베이스에서 찾고, 사용자가 양을 확인합니다.",

    "step1.label": "1단계",
    "step1.title": "말하거나 찍거나",
    "step1.body":
      "식사를 입력하거나 사진을 첨부하거나, 둘 다 해도 됩니다. AI가 각 음식을 인식하고 구이·튀김·카레 같은 조리 방식까지 파악합니다.",
    "step2.label": "2단계",
    "step2.title": "실제 데이터베이스 조회",
    "step2.body":
      "모든 칼로리는 Indian Nutrient Databank 또는 USDA FoodData Central에서 가져와 해당 음식에 연결합니다. AI의 기억으로 추측하지 않습니다.",
    "step3.label": "3단계",
    "step3.title": "결정은 사용자가",
    "step3.body":
      "양을 적었다면 바로 기록됩니다. 사진만 있어 추정한 경우에는 하루 합계에 들어가기 전에 그램 수를 확인받습니다.",

    "shot.eyebrow": "로그인 상태",
    "shot.h2": "식사를 넣으면 사실이 나옵니다.",
    "shot.lead":
      "드롭다운도, 바코드 찾기도 없습니다. 접시를 찍으면 MacroChat이 매크로 비율이 담긴 영양성분 패널을 돌려주고, 각 줄에 INDB인지 USDA인지 출처를 표시합니다.",
    "shot.cta": "무료 계정 만들기",
    "shot.you": "나",
    "shot.msg": "야채 비리야니 1그릇",
    "shot.factsTitle": "식사 영양 정보",
    "shot.calories": "칼로리",
    "shot.protein": "단백질",
    "shot.carbs": "탄수화물",
    "shot.fat": "지방",
    "shot.item": "야채 비리야니 · 1그릇",
    "shot.donutLabel": "단백질 22%, 탄수화물 58%, 지방 20%",

    "feat.eyebrow": "기록 기능이 더해 주는 것",
    "feat.h2": "실제로 먹는 방식에 맞춰 만들었습니다.",
    "feat1.title": "사진, 텍스트, 또는 둘 다",
    "feat1.body":
      "접시를 찍거나 양을 입력하거나, 둘 다 하세요. 그램이 적힌 텍스트는 바로 기록됩니다.",
    "feat2.title": "포장 식품만이 아닌 진짜 식사",
    "feat2.body":
      "전 세계 일상 식품은 USDA, 지역 요리는 1,000개가 넘는 INDB 레시피로 — 달, 비리야니, 도사까지.",
    "feat3.title": "그램은 사용자가 확인",
    "feat3.body": "사진으로 양을 추정했다면, 승인하기 전에는 아무것도 집계되지 않습니다.",
    "feat4.title": "수동 검색도 지원",
    "feat4.body":
      "AI를 건너뛰고 같은 데이터베이스를 검색해 그램을 정한 뒤 바로 하루 기록에 넣을 수 있습니다.",
    "feat5.title": "주간 추이",
    "feat5.body":
      "목표와 비교하는 7일 차트, 연속 기록일, 쉬운 말로 된 조언까지 — AI 비용은 들지 않습니다.",
    "feat6.title": "기준은 사용자의 자정",
    "feat6.body":
      "하루 합계는 가입할 때 저장한 사용자의 시간대 자정에 초기화됩니다.",

    "vs.eyebrow": "무엇이 다른가",
    "vs.h2": "흔한 칼로리 앱과 MacroChat.",
    "vs.them": "흔한 앱",
    "vs.us": "MacroChat",
    "vs.them1": "무엇 하나 쓰기 전에 가입부터",
    "vs.us1": "계산기와 식품 데이터는 계정 없이",
    "vs.them2": "AI나 이용자들이 수치를 추측",
    "vs.us2": "INDB와 USDA 조회만 사용",
    "vs.them3": "끝없는 식품 검색 목록",
    "vs.us3": "한 문장, 또는 사진 한 장",
    "vs.them4": "짐작한 값을 조용히 기록",
    "vs.us4": "추정된 양은 사용자가 확인",
    "vs.them5": "바코드 위주라 집밥이 빠짐",
    "vs.us5": "USDA와 INDB로 조리된 요리까지 포함",

    "receipts.eyebrow": "실제 기록",
    "receipts.h2": "후기가 아니라 영수증입니다.",
    "receipts.q1": "로티 2장과 달 — 6초 만에 기록, 348kcal, 출처 INDB.",
    "receipts.by1": "— 후기가 아닌 실제 기록",
    "receipts.q2":
      "접시 사진 → “구운 닭가슴살 210g?” → 확인 → 347kcal.",
    "receipts.by2": "— 확인 단계가 작동한 사례",
    "receipts.q3":
      "“삶은 퀴노아”가 닭발이 아니라 USDA 퀴노아로 연결됨. 수정하고 테스트 완료.",
    "receipts.by3": "— 엉뚱한 매칭 하나 감소",

    "faq.eyebrow": "자주 묻는 질문",
    "faq.h2": "당연한 질문들.",
    "faq.q1": "계산기는 유료인가요?",
    "faq.a1":
      "아닙니다. 모든 계산기와 식품 페이지는 무료이고 계정도 필요 없습니다. 입력값은 브라우저에 저장됩니다. 기록과 하루 합계가 남는 식사 기록을 쓰고 싶을 때만 가입하면 됩니다.",
    "faq.q2": "칼로리는 얼마나 정확한가요?",
    "faq.a2":
      "수치는 Indian Nutrient Databank와 USDA FoodData Central의 실측 데이터이며, AI의 추측이 아닙니다. 불확실한 부분은 양입니다. 텍스트로 그램을 적으면 저울만큼 정확하고, 사진으로는 추정이기 때문에 집계 전에 항상 확인을 요청합니다.",
    "faq.q3": "계산기는 어떤 공식을 쓰나요?",
    "faq.a3":
      "기초대사량은 기본적으로 Mifflin-St Jeor, 체지방률을 입력하면 Katch-McArdle을 씁니다. TDEE는 활동 계수를 곱하고, 매크로 비율은 단백질 1.8g/kg, 지방은 칼로리의 25%, 나머지를 탄수화물로 잡습니다. 자세한 내용은 ",
    "faq.a3link": "계산기 페이지",
    "faq.q4": "계정 없이 식사 기록을 써볼 수 있나요?",
    "faq.a4pre": "네 — ",
    "faq.a4link": "게스트 모드",
    "faq.a4post":
      "에서는 세션당 최대 3끼까지 분석할 수 있습니다. 계정을 만들면 저장되고, 하루가 집계되며, 제한도 사라집니다.",
    "faq.q5": "인도 음식도 아나요?",
    "faq.a5":
      "네 — Indian Nutrient Databank의 레시피와 재료 1,000개 이상을 씁니다. 로티, 달, 사브지, 비리야니, 도사 등이 포함되고, 나머지는 USDA 데이터베이스로 넘어갑니다.",
    "faq.q6": "첫 분석이 가끔 50초쯤 걸리는 이유는요?",
    "faq.a6":
      "AI 백엔드가 무료 요금제에서 돌아가 유휴 상태면 잠들고, 첫 요청이 이를 깨우기 때문입니다. 계산기는 백엔드를 쓰지 않아 즉시 동작합니다.",
    "faq.q7": "바코드를 스캔하나요?",
    "faq.a7":
      "일부러 지원하지 않습니다. 바코드는 포장 식품만 다루는데, 달·사브지·집밥 같은 실제 식사 대부분에는 바코드가 없습니다. 접시를 설명하거나 사진으로 찍어 주세요.",
    "faq.q8": "다크 모드가 있나요?",
    "faq.a8":
      "있습니다 — 상단 내비게이션의 ◐ 버튼입니다. 같은 배색을 반전한 것으로 청록색은 그대로입니다. 선택은 저장되고 기본값은 운영체제 설정을 따릅니다.",
    "faq.q9": "사진과 데이터는 어떻게 되나요?",
    "faq.a9":
      "사진은 음식을 식별하는 데만 씁니다. 식사 기록은 행 수준 보안이 적용된 Supabase에 저장되어 본인 계정만 읽을 수 있습니다. 자세한 내용은 ",
    "faq.a9link": "개인정보 처리방침",

    "cta.h2": "숫자부터 시작하세요.",
    "cta.btn1": "계산기 열기",
    "cta.btn2": "가입하고 기록하기",
    "cta.sub": "카드 없음. 바코드 없음. AI가 지어낸 수치도 없음.",

    "meta.title": "MacroChat — 무료 매크로 계산기와 실제 데이터베이스 기반 식사 기록",
    "meta.description":
      "매크로, TDEE, 기초대사량, 단백질, 칼로리 적자, 레시피 계산기를 무료로. 가입 없이 쓰고 입력값은 기기에 저장됩니다. 칼로리와 매크로 수치는 USDA와 INDB에서 가져오며 추측하지 않습니다.",
  },

  calc: {
    units: "단위",
    "units.metric": "미터법 (kg, cm)",
    "units.imperial": "야드파운드법 (lb, ft/in)",
    sex: "성별",
    "sex.male": "남성",
    "sex.female": "여성",
    age: "나이",
    weight: "체중",
    heightCm: "키 (cm)",
    height: "키",
    "height.feet": "키(피트)",
    "height.inches": "키(인치)",
    activity: "활동량",
    "act.sedentary": "거의 앉아서 생활",
    "act.sedentaryLong": "거의 앉아서 생활 — 사무직, 운동 거의 없음",
    "act.light": "가벼움",
    "act.lightLong": "가벼움 — 주 1~3회 운동",
    "act.moderate": "보통",
    "act.moderateLong": "보통 — 주 3~5회 운동",
    "act.active": "활발",
    "act.activeLong": "활발 — 주 6~7회 운동",
    "act.veryActive": "매우 활발",
    "act.veryActiveLong": "매우 활발 — 고강도 훈련 또는 육체노동",
    goal: "목표",
    "goal.lose": "체지방 감량 (−500kcal)",
    "goal.maintain": "유지",
    "goal.gain": "증량 (+300kcal)",
    advanced: "고급 설정",
    bodyfat: "체지방률 % (Katch-McArdle 사용)",
    bodyfatShort: "체지방률 % (선택 → Katch-McArdle)",
    optional: "선택",
    experience: "운동 경력",
    "exp.beginner": "초보 (1년 미만)",
    "exp.intermediate": "중급 (1~3년)",
    "exp.advanced": "고급 (3년 이상)",

    "fc.note":
      "식단 스타일을 고르거나 아래 비율을 조절하세요. 이 기기에 저장되며 계정은 필요 없습니다. 가입하면 이 목표에 맞춰 식사를 기록할 수 있습니다.",

    result: "결과",
    yourTarget: "하루 목표",
    calories: "칼로리",
    protein: "단백질",
    carbs: "탄수화물",
    fat: "지방",
    bmr: "기초대사량",
    tdeeMaint: "TDEE (유지 칼로리)",
    bmiWater: "BMI · 수분",
    fillFields: "항목을 입력하세요",
    formula: "공식",
    "unit.kcalDay": "kcal/일",
    "unit.gDay": "g/일",
    "unit.kgWeek": "kg/주",
    "unit.weeks": "주",

    "mini.activityFactor": "활동 계수",
    "mini.proteinTarget": "목표 (1.8g/kg)",
    "mini.range": "적정 범위",
    "mini.dailyCalories": "하루 칼로리",
    "mini.maintenance": "유지 칼로리",
    "mini.weeklyRate": "주간 감량 속도",
    "mini.timeToGoal": "목표까지 기간",
    "mini.setLower": "목표 체중을 더 낮게 설정하세요",
    "mini.goalWeight": "목표 체중",
    "mini.dailyDeficit": "하루 적자 (kcal)",

    "qc.note":
      "Mifflin-St Jeor · 단백질 1.8g/kg · 지방은 칼로리의 25%. 이 기기에 저장되며 계정은 필요 없습니다.",
    "qc.full": "전체 계산기 사용하기 →",
    "qc.fullMini": "전체 매크로 계산기 →",
    "qc.save": "계정에 저장하기 →",

    "split.dietStyle": "식단 스타일",
    "split.summary": "하루 목표 요약",
    "split.lock": "고정",
    "split.unlock": "고정 해제",
    "split.note":
      "매크로 하나를 고정한 채 나머지를 조절할 수 있습니다. 비율 합계는 항상 100%입니다. 그램 환산은 1g당 4/4/9kcal 기준입니다.",
    "diet.balanced": "균형형",
    "diet.lowCarb": "저탄수화물",
    "diet.keto": "키토",
    "diet.highProtein": "고단백",
    "diet.plantBased": "식물성 위주",
    "diet.initialC": "탄",
    "diet.initialP": "단",
    "diet.initialF": "지",

    "recipe.ingredient": "재료 (예: 파니르, 오트밀, 바나나)",
    "recipe.grams": "g",
    "recipe.remove": "삭제",
    "recipe.add": "+ 재료 추가",
    "recipe.calc": "매크로 계산",
    "recipe.calculating": "계산 중…",
    "recipe.waking": "서버를 깨우는 중…",
    "recipe.total": "레시피 합계",
    "recipe.noMatch": "일치 항목 없음",
    "recipe.empty": "재료를 추가하고 계산하세요",
  },

  calcPages: {
    pill: "무료 도구 · 가입 불필요",
    how: "작동 방식",
    seeAlso: "함께 보기",

    "macro.lead":
      "Mifflin-St Jeor(체지방률을 알면 Katch-McArdle)로 계산한 하루 칼로리와 단백질·탄수화물·지방 비율입니다. 모두 브라우저에서 계산되며, MacroChat이 식사를 기록할 때 쓰는 수치와 같습니다.",
    "macro.eyebrow": "계산 근거",
    "macro.h2": "이 계산기의 작동 방식",
    "macro.s1": "1 · 기초대사량(BMR)",
    "macro.s1a": "완전한 휴식 상태에서 소모하는 칼로리입니다. 기본 공식은 Mifflin-St Jeor입니다.",
    "macro.s1b":
      "고급 설정에서 체지방률을 입력하면 제지방량을 기준으로 하는 Katch-McArdle로 바뀝니다. 아주 마르거나 아주 무거운 사람에게 더 정확합니다.",
    "macro.s2": "2 · 하루 총 에너지 소비량(TDEE)",
    "macro.s2a": "기초대사량에 활동 계수를 곱한 값입니다.",
    "macro.thActivity": "활동량",
    "macro.thFactor": "계수",
    "macro.s3": "3 · 목표에 따른 조정",
    "macro.thGoal": "목표",
    "macro.thChange": "하루 조정량",
    "macro.goalLose": "체지방 감량",
    "macro.goalLoseVal": "−500kcal (주당 약 0.45kg)",
    "macro.goalMaintain": "유지",
    "macro.goalGain": "증량",
    "macro.goalGainVal": "+300kcal (린 벌크)",
    "macro.s4": "4 · 매크로 비율",
    "macro.s4a":
      "단백질은 체중 1kg당 1.8g(활동적인 성인 기준), 지방은 총 칼로리의 25%로 정하고, 남은 칼로리를 탄수화물에 배정합니다. 1g당 열량은 단백질 4, 탄수화물 4, 지방 9kcal입니다.",
    "macro.s4b":
      "BMI는 체중(kg) ÷ 키(m)²이며, 수분 목표는 체중 1kg당 약 35ml로 대략 계산합니다.",
    "macro.refs": "참고 문헌",
    "macro.tblEyebrow": "참고",
    "macro.tblH2": "자주 먹는 식품의 매크로",
    "macro.tblLead": "1회 제공량 기준입니다. 식품을 누르면 상세 페이지로 이동하고, ",
    "macro.tblLeadLink": "두 식품을 나란히 비교",
    "macro.thFood": "식품",
    "macro.thServing": "제공량",

    "tdee.lead":
      "하루 총 에너지 소비량 — 휴식 대사에 활동량을 더해 하루에 소모하는 칼로리입니다. 이것이 유지 칼로리로, 그대로 먹으면 체중 유지, 덜 먹으면 감량, 더 먹으면 증량입니다.",
    "tdee.h2": "기초대사량 × 활동 계수",
    "tdee.p1":
      "기초대사량(Mifflin-St Jeor, 체지방률을 입력하면 Katch-McArdle)에 활동 계수를 곱합니다. 계수는 거의 앉아서 생활 1.2, 가벼움 1.375, 보통 1.55, 활발 1.725, 매우 활발 1.9입니다.",

    "bmr.lead":
      "기초대사량은 생명을 유지하기 위해 완전한 휴식 상태에서 소모하는 칼로리입니다. 하루 칼로리 목표의 바탕이 됩니다.",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "체지방률을 입력하면 Katch-McArdle(370 + 21.6 × 제지방량)로 바뀝니다. 아주 마르거나 아주 무거운 사람에게 더 정확합니다.",

    "protein.lead":
      "체중을 기준으로 하루에 목표로 삼을 단백질 양입니다. MacroChat이 매크로 비율을 만들 때 쓰는 목표와 같습니다.",
    "protein.h2": "체중 1kg당 1.8g",
    "protein.p1":
      "기본 목표는 1.8g/kg으로, 활동적인 성인에게 적절한 값입니다. 1.6~2.2g/kg 범위가 대부분의 목표를 포괄하며, 건강 유지라면 낮은 쪽, 강한 다이어트나 근육 증가라면 높은 쪽을 씁니다. 단백질은 1g당 4kcal입니다.",

    "deficit.lead":
      "하루 적자와 목표 체중을 고르면 하루 칼로리 목표, 주간 감량 속도, 목표 도달 시점을 대략 알 수 있습니다.",
    "deficit.h2": "적자 → 속도 → 날짜",
    "deficit.p1":
      "하루 칼로리 = TDEE − 선택한 적자. 체지방 1kg은 약 7,700kcal이므로 하루 500kcal 적자는 주당 약 0.45kg에 해당합니다. 목표까지 기간 = 감량할 체중 ÷ 주간 속도입니다.",
    "deficit.p2":
      "하루 300~750kcal 적자가 대부분의 사람에게 지속 가능한 범위입니다. 지나치게 큰 적자는 근육을 잃게 하고 오래 유지하기 어렵습니다.",

    "recipe.lead":
      "재료와 그램을 적으면 총 칼로리, 단백질, 탄수화물, 지방이 나옵니다. 모든 수치는 실제 데이터베이스(USDA, INDB) 조회 결과이며 AI 추정이 아닙니다.",
    "recipe.h2": "조회하고, 환산하고, 합산",
    "recipe.p1":
      "각 재료 이름은 INDB(인도 요리·재료) 또는 USDA FoodData Central 항목과 연결됩니다. 쌀이나 달 같은 기본 식재료는 정해진 표준값을 씁니다. 100g당 매크로를 입력한 그램에 맞춰 환산한 뒤 합산합니다.",
    "recipe.p2":
      "간단한 이름이 가장 잘 맞습니다: “쌀”, “닭가슴살”, “올리브유”. 매칭되지 않은 재료는 따로 표시되고 합계에서 빠집니다. 한동안 사용하지 않았다면 무료 서버가 깨어나는 동안 첫 요청에 50초쯤 걸릴 수 있습니다.",
    "recipe.p3": "사진이나 한 문장으로 하고 싶다면 ",
    "recipe.p3link": "식사 채팅을 써보세요",
  },

  foods: {
    indexEyebrow: "참고 자료",
    indexH1: "식품 매크로, A–Z",
    indexLead:
      "자주 먹는 {count}개 식품의 100g당 칼로리와 매크로입니다. 실제 데이터베이스(USDA + INDB) 값으로, MacroChat이 식사를 기록할 때 쓰는 것과 같습니다.",
    indexTitle: "식품 매크로 A–Z — MacroChat",
    indexDesc:
      "자주 먹는 식품의 100g당 칼로리, 단백질, 탄수화물, 지방. USDA와 Indian Nutrient Databank 데이터이며 추정치가 아닙니다.",
    indexToCompare: "두 식품 비교하기 →",

    crumb: "식품",
    title: "{name} 매크로 — 100g당 칼로리, 단백질, 탄수화물, 지방",
    desc: "{name}: 100g당 {kcal}kcal, 단백질 {protein}g, 탄수화물 {carb}g, 지방 {fat}g. 출처: {source}.",
    h1: "{name} 매크로",
    lead: "100g 기준이며 출처는 {source}입니다. 실험실 측정값이고 추정치가 아닙니다.",
    srcUSDA: "USDA FoodData Central",
    srcINDB: "Indian Nutrient Databank",
    factsTitle: "{name} · 100g",
    fiber: "식이섬유",
    sugars: "당류",
    satfat: "포화지방",
    sodium: "나트륨",
    note: "매크로 %는 {kcal}kcal에서 차지하는 비율입니다(단백질·탄수화물 4kcal/g, 지방 9kcal/g).",
    cta: "내 기록에 추가하기 →",
    portion:
      "실제 먹은 양을 기록하려면? 레시피 계산기가 {name}을(를) 입력한 그램에 맞춰 환산하고 식사 전체를 합산합니다. 또는 식사 채팅에 무엇을 먹었는지 말해도 됩니다.",
    mealChat: "식사 채팅",
    commonQuestions: "자주 묻는 질문",
    faqQ1: "{name}의 칼로리는 얼마인가요?",
    faqA1:
      "{name}은(는) 100g당 {kcal}kcal이며 단백질 {protein}g, 탄수화물 {carb}g, 지방 {fat}g입니다.",
    faqQ2: "{name}은(는) 단백질이 많은 편인가요?",
    faqA2:
      "칼로리의 {pct}%가 단백질에서 나오며, 100kcal당 {density}g에 해당합니다. 35%를 넘으면 좋은 단백질 공급원입니다.",
    faqQ3: "이 데이터의 출처는 어디인가요?",
    faqA3:
      "{source}의 100g당 실측값입니다. MacroChat도 식사를 기록할 때 같은 출처를 사용합니다.",
    compareH2: "{name} 비교하기",
    vs: "{a} vs {b}",
    relatedH2: "관련 식품",
    relatedItem: "{name} 매크로",
    relatedKcal: "100g당 {kcal}kcal",
  },

  compare: {
    indexTitle: "식품 매크로 비교 — MacroChat",
    indexDesc:
      "자주 먹는 식품의 칼로리와 매크로를 나란히 비교하고, 감량과 증량 중 어디에 맞는지 알기 쉽게 알려줍니다.",
    indexEyebrow: "참고 자료",
    indexH1: "두 식품 비교",
    indexLead:
      "100g 기준 1:1 매크로 비교 {count}건. 각각 체지방 감량과 근육 증가 관점의 규칙 기반 결론이 붙어 있습니다.",
    indexPopular: "인기 비교",
    indexToFoods: "모든 식품 매크로 페이지 →",

    crumb: "비교",
    title: "{a} vs {b} — 100g당 매크로 비교",
    desc: "{a}와 {b}의 100g 비교: {kcalA} vs {kcalB} kcal, 단백질 {proteinA} vs {proteinB} g, 탄수화물 {carbA} vs {carbB} g. 어느 쪽이 목표에 맞는지.",
    lead: "모든 값은 100g 기준이며 {source}에서 그대로 가져왔습니다. 추정치가 아닙니다.",
    srcBoth: "USDA와 INDB",
    proteinPer100: "100kcal당 단백질 — {a} {pdA}g · {b} {pdB}g",
    verdictH2: "목표에 더 맞는 쪽",
    quickAnswers: "빠른 답변",
    moreH2: "{name} 비교 더 보기",
    macrosLink: "{name} 매크로",
    cta: "MacroChat에서 둘 다 기록하기 →",

    faqQ1: "{a}와 {b} 중 단백질이 더 많은 쪽은?",
    faqA1: "100g 기준으로 {winner}이(가) 더 많습니다 — {hi}g 대 {lo}g ({gap}).",
    faqQ2: "체중 감량에 더 좋은 쪽은?",
    faqA2:
      "{leaner}이(가) 100g당 칼로리가 낮아({leanerKcal} vs {otherKcal} kcal) 적자 상태에 넣기 쉽습니다. 반면 {protein}은(는) 칼로리당 단백질이 많아 포만감에 유리합니다.",
    faqQ3: "이 수치는 어디서 왔나요?",
    faqA3:
      "USDA FoodData Central과 Indian Nutrient Databank의 100g당 실측값이며 추정치가 아닙니다. MacroChat도 식사를 기록할 때 같은 데이터를 씁니다.",

    "gap.allOfIt": "전부",
    "gap.same": "같음",
    "gap.times": "{n}배",
    "gap.pctMore": "{n}% 더 많음",
    "gap.pctPlain": "{n}%",
    "verdict.leaner":
      "100g 기준으로 {leaner}의 칼로리가 {gap} 더 적습니다({leanerKcal} vs {otherKcal} kcal). 칼로리 적자를 만들기에 더 수월합니다.",
    "verdict.closeKcal": "100g 기준 칼로리는 둘이 비슷합니다({kcalA} vs {kcalB} kcal).",
    "verdict.protein":
      "{protein}이(가) 단백질 밀도가 더 높습니다 — 100kcal당 {pdHigh}g 대 {pdLow}g — 근육 증가나 감량 중 포만감 유지에는 이쪽이 낫습니다.",
    "verdict.closeProtein": "칼로리당 단백질 비율은 둘이 비슷합니다.",

    "tool.portionSize": "1회 섭취량",
    "tool.per100": "100g 기준",
    "tool.perServing": "1인분 기준",
    "tool.custom": "직접 입력",
    "tool.sum": "{a} {gA}g = {kcalA}kcal · {b} {gB}g = {kcalB}kcal",
    "tool.key": "채워진 막대 = 값이 큰 쪽 · ",
    "tool.keyWin": "음영 표시된 칸",
    "tool.keyEnd": " = 저칼로리·고단백 목표에 더 나은 쪽",
  },
};
