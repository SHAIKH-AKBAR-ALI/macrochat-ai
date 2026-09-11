import type { PageStrings } from "./en";

export const ja: { [S in keyof PageStrings]?: Partial<PageStrings[S]> } = {
  landing: {
    "hero.pill": "無料 · 登録不要 · 端末に保存",
    "hero.h1a": "無料のマクロ計算ツール。",
    "hero.h1b": "実データベースの数値。",
    "hero.lead":
      "カロリーとPFCバランスの計算、レシピの分解、食品どうしの比較まで、すべて無料でブラウザ上で完結。登録は不要です。すべての数値はUSDAまたはINDBのデータに基づき、推測は使いません。",
    "hero.check1": "6つの計算ツール — マクロ、TDEE、基礎代謝、たんぱく質、カロリー収支、レシピ",
    "hero.check2": "約500品目のマクロ一覧ページと、食品どうしの比較ページ",
    "hero.check3": "入力内容はこの端末に保存 — アカウント不要",
    "hero.ctaCalc": "計算ツールを開く",
    "hero.ctaTracking": "食事記録を見る ↓",
    "hero.quickLabel": "かんたんマクロ計算",
    "hero.quickEyebrow": "今すぐ試す · かんたん計算",

    "trust.1": "ずっと無料",
    "trust.2": "メール登録なしで開始",
    "trust.3": "60秒以内",
    "trust.4": "サプリや指導の販売はしません",

    "tools.eyebrow": "無料 · アカウント不要",
    "tools.h2": "全ツール、登録の壁なし。",
    "tools.lead":
      "ブラウザ内で動き、前回の入力を覚えている6つの計算ツール。さらに約500品目のマクロページと、数千件の食品比較ページ。1日の記録を残したくなったときだけ登録してください。",
    "tools.open": "開く →",
    "tool.macro": "体格データからカロリーとP/F/Cの配分を算出。",
    "tool.tdee": "維持カロリー — 1日に消費する量。",
    "tool.bmr": "安静時の消費量。Mifflin-St JeorまたはKatch-McArdleで計算。",
    "tool.protein": "体重に合わせた1日のたんぱく質目標。",
    "tool.deficit": "減らす量を選ぶと、週あたりのペースと目標日を表示。",
    "tool.recipe": "材料とグラム数を入れると、料理全体の合計を算出。",
    "tool.compare":
      "鶏肉と米、ロティとパン — バー表示、1食あたりの量、目的別の判定つき。",
    "tool.az": "USDAとINDBによる約500品目の100gあたりカロリーとマクロ。",

    "stats.usda": "USDAの食品データ件数",
    "stats.indb": "INDBの地方料理レシピ",
    "stats.guessed": "AIが推測した数値",
    "stats.calcs": "無料の計算ツール",

    "tracker.eyebrow": "ログイン後の機能",
    "tracker.h2": "1日の記録もしたいなら、無料登録を。",
    "tracker.lead":
      "ここまでの機能はアカウントなしで使えます。登録すると、同じ実データベースのエンジンが食事を記録します。写真か一文を入れると、カロリーとマクロが出て、目標と照らし合わせます。",
    "tracker.imgAlt":
      "食事を説明すると、MacroChatが実データベースで検索し、あなたが分量を確認します。",

    "step1.label": "ステップ1",
    "step1.title": "書くか、撮るか",
    "step1.body":
      "食事を入力するか、写真を添付するか、その両方でもOK。AIが各食品を特定し、焼き・揚げ・カレーなどの調理法も読み取ります。",
    "step2.label": "ステップ2",
    "step2.title": "実データベースで検索",
    "step2.body":
      "カロリーはすべてIndian Nutrient DatabankまたはUSDA FoodData Centralから取得し、あなたの食品に対応づけます。AIの記憶から推測することはありません。",
    "step3.label": "ステップ3",
    "step3.title": "決めるのはあなた",
    "step3.body":
      "分量を書いた場合はそのまま記録。写真だけの推定なら、1日の合計に入る前にグラム数を確認してもらいます。",

    "shot.eyebrow": "ログイン時",
    "shot.h2": "食事を入れると、事実が返る。",
    "shot.lead":
      "プルダウンもバーコード探しも不要。皿を撮るだけで、MacroChatがマクロ配分つきの栄養成分パネルを返します。各行にINDBかUSDAかの出典を表示。",
    "shot.cta": "無料アカウントを作成",
    "shot.you": "あなた",
    "shot.msg": "野菜ビリヤニ 1杯",
    "shot.factsTitle": "食事の栄養成分",
    "shot.calories": "カロリー",
    "shot.protein": "たんぱく質",
    "shot.carbs": "炭水化物",
    "shot.fat": "脂質",
    "shot.item": "野菜ビリヤニ · 1杯",
    "shot.donutLabel": "たんぱく質22%、炭水化物58%、脂質20%",

    "feat.eyebrow": "記録機能でできること",
    "feat.h2": "実際の食べ方に合わせて設計。",
    "feat1.title": "写真、テキスト、その両方",
    "feat1.body":
      "皿を撮る、分量を書く、あるいは両方。グラム数つきのテキストはすぐ記録されます。",
    "feat2.title": "市販品だけでなく、本物の食事",
    "feat2.body":
      "世界中の一般的な食品はUSDA、地方料理は1,000件以上のINDBレシピ（ダル、ビリヤニ、ドーサなど）。",
    "feat3.title": "グラム数はあなたが確認",
    "feat3.body":
      "写真から分量を推定した場合、承認するまで合計には入りません。",
    "feat4.title": "手動検索も可能",
    "feat4.body":
      "AIを使わずに同じデータベースを検索し、グラム数を決めてそのまま記録できます。",
    "feat5.title": "週間の傾向",
    "feat5.body":
      "目標と比べる7日間グラフ、記録の連続日数、わかりやすい一言アドバイス。AIコストはゼロ。",
    "feat6.title": "基準はあなたの深夜0時",
    "feat6.body":
      "1日の合計は、登録時に取得したあなたのタイムゾーンの深夜0時にリセットされます。",

    "vs.eyebrow": "違うところ",
    "vs.h2": "よくあるカロリーアプリとMacroChat。",
    "vs.them": "よくあるアプリ",
    "vs.us": "MacroChat",
    "vs.them1": "使う前にまず登録",
    "vs.us1": "計算ツールと食品データはアカウント不要",
    "vs.them2": "AIやユーザー投稿が数値を推測",
    "vs.us2": "INDBとUSDAの参照のみ",
    "vs.them3": "延々と続く食品検索のリスト",
    "vs.us3": "一文、または写真1枚",
    "vs.them4": "推定値を黙って記録",
    "vs.us4": "推定した分量はあなたが確認",
    "vs.them5": "バーコード前提で、家庭料理が抜ける",
    "vs.us5": "USDAとINDBで、調理済みの料理も対応",

    "receipts.eyebrow": "実際のログ",
    "receipts.h2": "レビューではなく、記録です。",
    "receipts.q1": "ロティ2枚とダル — 6秒で記録、348kcal、出典INDB。",
    "receipts.by1": "— レビューではなく実際のログ",
    "receipts.q2":
      "皿の写真 →「グリルチキンの胸肉、210g？」→ 確認 → 347kcal。",
    "receipts.by2": "— 確認ステップが機能した例",
    "receipts.q3":
      "「ゆでキヌア」が鶏の足ではなくUSDAのキヌアに解決。修正済み・テスト済み。",
    "receipts.by3": "— 誤マッチがひとつ減った",

    "faq.eyebrow": "よくある質問",
    "faq.h2": "もっともな疑問。",
    "faq.q1": "計算ツールは有料ですか？",
    "faq.a1":
      "いいえ。すべての計算ツールと食品ページは無料で、アカウントも不要です。入力内容はブラウザに保存されます。履歴や1日の合計を残す食事記録を使いたい場合だけ登録してください。",
    "faq.q2": "カロリーの精度はどのくらいですか？",
    "faq.a2":
      "数値はIndian Nutrient DatabankとUSDA FoodData Centralの実測データで、AIの推測ではありません。不確かなのは分量です。テキストでグラム数を書けばはかりと同じ精度になり、写真からの場合は推定なので、合計に入れる前に必ず確認をお願いしています。",
    "faq.q3": "計算にはどの式を使っていますか？",
    "faq.a3":
      "基礎代謝は既定でMifflin-St Jeor、体脂肪率を入力した場合はKatch-McArdleを使います。TDEEは活動係数を掛けたもの。マクロ配分はたんぱく質1.8g/kg、脂質はカロリーの25%、残りを炭水化物としています。詳細は",
    "faq.a3link": "計算ツールのページ",
    "faq.q4": "アカウントなしで食事記録を試せますか？",
    "faq.a4pre": "はい。",
    "faq.a4link": "ゲストモード",
    "faq.a4post":
      "では1セッションにつき3食まで解析できます。アカウントを作ると保存され、1日の記録がつき、上限もなくなります。",
    "faq.q5": "インド料理にも対応していますか？",
    "faq.a5":
      "はい。Indian Nutrient Databankの1,000件以上のレシピと食材（ロティ、ダル、サブジ、ビリヤニ、ドーサなど）に対応します。それ以外はUSDAのデータベースを使います。",
    "faq.q6": "最初の解析に50秒ほどかかることがあるのはなぜですか？",
    "faq.a6":
      "AIのバックエンドは無料プランで動いており、使われていないとスリープします。最初のリクエストがそれを起こします。計算ツールはバックエンドを使わないため、すぐ動きます。",
    "faq.q7": "バーコードは読み取れますか？",
    "faq.a7":
      "あえて対応していません。バーコードは市販品しかカバーできず、ダルやサブジ、家庭料理などの多くにはバーコードがありません。皿を説明するか、撮影してください。",
    "faq.q8": "ダークモードはありますか？",
    "faq.a8":
      "あります。ナビの◐ボタンで切り替えます。同じ配色を反転させたもので、ティールはそのまま。選択は記憶され、既定ではOSの設定に従います。",
    "faq.q9": "写真やデータはどう扱われますか？",
    "faq.a9":
      "写真は食品の特定にのみ使います。食事履歴は行レベルセキュリティを設定したSupabaseに保存され、あなたのアカウントだけが読み取れます。詳しくは",
    "faq.a9link": "プライバシーポリシー",

    "cta.h2": "まずは数字から。",
    "cta.btn1": "計算ツールを開く",
    "cta.btn2": "登録して記録する",
    "cta.sub": "カード不要。バーコード不要。AIが作った数値もなし。",

    "meta.title": "MacroChat — 無料のマクロ計算ツールと実データベースの食事記録",
    "meta.description":
      "マクロ、TDEE、基礎代謝、たんぱく質、カロリー収支、レシピの計算ツールが無料。登録不要で、入力は端末に保存されます。カロリーとマクロの数値はUSDAとINDBのデータで、推測は使いません。",
  },

  calc: {
    units: "単位",
    "units.metric": "メートル法（kg・cm）",
    "units.imperial": "ヤード・ポンド法（lb・ft/in）",
    sex: "性別",
    "sex.male": "男性",
    "sex.female": "女性",
    age: "年齢",
    weight: "体重",
    heightCm: "身長（cm）",
    height: "身長",
    "height.feet": "身長（フィート）",
    "height.inches": "身長（インチ）",
    activity: "活動量",
    "act.sedentary": "座位中心",
    "act.sedentaryLong": "座位中心 — デスクワーク、運動はほとんどなし",
    "act.light": "軽い",
    "act.lightLong": "軽い — 週1〜3回の運動",
    "act.moderate": "普通",
    "act.moderateLong": "普通 — 週3〜5回の運動",
    "act.active": "活発",
    "act.activeLong": "活発 — 週6〜7回の運動",
    "act.veryActive": "非常に活発",
    "act.veryActiveLong": "非常に活発 — ハードなトレーニングや肉体労働",
    goal: "目標",
    "goal.lose": "減量（−500kcal）",
    "goal.maintain": "維持",
    "goal.gain": "増量（+300kcal）",
    advanced: "詳細設定",
    bodyfat: "体脂肪率（Katch-McArdleを使用）",
    bodyfatShort: "体脂肪率（任意 → Katch-McArdle）",
    optional: "任意",
    experience: "トレーニング歴",
    "exp.beginner": "初心者（1年未満）",
    "exp.intermediate": "中級者（1〜3年）",
    "exp.advanced": "上級者（3年以上）",

    "fc.note":
      "食事スタイルを選ぶか、下のバーをドラッグしてください。この端末に保存され、アカウントは不要です。登録すると、この目標に対して食事を記録できます。",

    result: "結果",
    yourTarget: "1日の目標",
    calories: "カロリー",
    protein: "たんぱく質",
    carbs: "炭水化物",
    fat: "脂質",
    bmr: "基礎代謝",
    tdeeMaint: "TDEE（維持カロリー）",
    bmiWater: "BMI・水分",
    fillFields: "項目を入力してください",
    formula: "計算式",
    "unit.kcalDay": "kcal/日",
    "unit.gDay": "g/日",
    "unit.kgWeek": "kg/週",
    "unit.weeks": "週",

    "mini.activityFactor": "活動係数",
    "mini.proteinTarget": "目標（1.8g/kg）",
    "mini.range": "妥当な範囲",
    "mini.dailyCalories": "1日のカロリー",
    "mini.maintenance": "維持カロリー",
    "mini.weeklyRate": "1週間のペース",
    "mini.timeToGoal": "目標までの期間",
    "mini.setLower": "目標体重をもう少し低く設定してください",
    "mini.goalWeight": "目標体重",
    "mini.dailyDeficit": "1日の不足カロリー（kcal）",

    "qc.note":
      "Mifflin-St Jeor · たんぱく質1.8g/kg · 脂質はカロリーの25%。この端末に保存され、アカウントは不要です。",
    "qc.full": "詳細な計算ツールを使う →",
    "qc.fullMini": "マクロ計算ツール（詳細版）→",
    "qc.save": "アカウントに保存 →",

    "split.dietStyle": "食事スタイル",
    "split.summary": "1日の目標まとめ",
    "split.lock": "固定する",
    "split.unlock": "固定を解除",
    "split.note":
      "ひとつのマクロを固定したまま、他を動かせます。合計は常に100%です。グラム換算は1gあたり4/4/9kcalで計算します。",
    "diet.balanced": "バランス型",
    "diet.lowCarb": "低炭水化物",
    "diet.keto": "ケトジェニック",
    "diet.highProtein": "高たんぱく",
    "diet.plantBased": "植物性中心",
    "diet.initialC": "炭",
    "diet.initialP": "た",
    "diet.initialF": "脂",

    "recipe.ingredient": "材料（例：パニール、オートミール、バナナ）",
    "recipe.grams": "g",
    "recipe.remove": "削除",
    "recipe.add": "＋ 材料を追加",
    "recipe.calc": "マクロを計算",
    "recipe.calculating": "計算中…",
    "recipe.waking": "サーバーを起動中…",
    "recipe.total": "レシピの合計",
    "recipe.noMatch": "該当なし",
    "recipe.empty": "材料を追加して計算してください",
  },

  calcPages: {
    pill: "無料ツール · 登録不要",
    how: "仕組み",
    seeAlso: "関連ツール",

    "macro.lead":
      "Mifflin-St Jeor（体脂肪率がわかる場合はKatch-McArdle）にもとづく1日のカロリーとP/F/Cの配分です。すべてブラウザ内で計算し、MacroChatが食事を記録するときと同じ数値を使います。",
    "macro.eyebrow": "計算の根拠",
    "macro.h2": "この計算ツールの仕組み",
    "macro.s1": "1 · 基礎代謝量（BMR）",
    "macro.s1a": "安静時に消費するカロリーです。既定の式はMifflin-St Jeorを使います。",
    "macro.s1b":
      "詳細設定で体脂肪率を入力すると、除脂肪体重から計算するKatch-McArdleに切り替わります。とても痩せている人や体重が重い人ではこちらが正確です。",
    "macro.s2": "2 · 1日の総消費カロリー（TDEE）",
    "macro.s2a": "BMRに活動係数を掛けたものです。",
    "macro.thActivity": "活動量",
    "macro.thFactor": "係数",
    "macro.s3": "3 · 目標による調整",
    "macro.thGoal": "目標",
    "macro.thChange": "1日あたりの増減",
    "macro.goalLose": "減量",
    "macro.goalLoseVal": "−500kcal（週あたり約0.45kg）",
    "macro.goalMaintain": "維持",
    "macro.goalGain": "増量",
    "macro.goalGainVal": "+300kcal（緩やかな増量）",
    "macro.s4": "4 · マクロ配分",
    "macro.s4a":
      "たんぱく質は体重1kgあたり1.8g（活動的な成人の目安）、脂質は総カロリーの25%、残りのカロリーを炭水化物に割り当てます。1gあたりのエネルギーは、たんぱく質4、炭水化物4、脂質9kcalです。",
    "macro.s4b":
      "BMIは体重(kg) ÷ 身長(m)²で計算します。水分の目安は体重1kgあたり約35mlです。",
    "macro.refs": "参考文献",
    "macro.tblEyebrow": "参考",
    "macro.tblH2": "よく食べる食品のマクロ",
    "macro.tblLead": "1食あたりの目安です。食品をタップすると詳細ページへ、または",
    "macro.tblLeadLink": "2つの食品を並べて比較",
    "macro.thFood": "食品",
    "macro.thServing": "分量",

    "tdee.lead":
      "TDEE（1日の総消費カロリー）は、安静時の消費に活動分を加えた1日の消費カロリーです。これが維持カロリーで、同じであれば体重は維持、少なければ減量、多ければ増量になります。",
    "tdee.h2": "BMR × 活動係数",
    "tdee.p1":
      "BMR（Mifflin-St Jeor、体脂肪率を入力した場合はKatch-McArdle）に活動係数を掛けます。係数は、座位中心1.2、軽い1.375、普通1.55、活発1.725、非常に活発1.9です。",

    "bmr.lead":
      "基礎代謝量は、生命を維持するためだけに安静時に消費するカロリーです。1日のカロリー目標の土台になります。",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "体脂肪率を入力すると、Katch-McArdle（370 + 21.6 × 除脂肪体重）に切り替わります。とても痩せている人や体重が重い人ではこちらが正確です。",

    "protein.lead":
      "体重をもとにした1日のたんぱく質の目安です。MacroChatがマクロ配分を作るときにも同じ目標値を使います。",
    "protein.h2": "体重1kgあたり1.8g",
    "protein.p1":
      "既定の目標は1.8g/kgで、活動的な成人に適した値です。1.6〜2.2g/kgの範囲がほとんどの目的をカバーし、健康維持なら低めを、厳しい減量や筋肥大なら高めを選びます。たんぱく質は1gあたり4kcalです。",

    "deficit.lead":
      "1日の不足カロリーと目標体重を選ぶと、1日のカロリー目標、週あたりの減量ペース、目標到達のおおよその時期がわかります。",
    "deficit.h2": "不足カロリー → ペース → 到達日",
    "deficit.p1":
      "1日のカロリー = TDEE − 設定した不足カロリー。体脂肪1kgは約7,700kcalなので、1日500kcalの不足で週あたり約0.45kgのペースになります。目標までの期間は、減らす体重 ÷ 週あたりのペースです。",
    "deficit.p2":
      "1日300〜750kcalの不足が、多くの人にとって続けやすい範囲です。大きすぎる不足は筋肉を減らし、長続きしません。",

    "recipe.lead":
      "材料とグラム数を入力すると、合計のカロリー・たんぱく質・炭水化物・脂質がわかります。数値はすべて実データベース（USDAとINDB）の検索結果で、AIの推定値ではありません。",
    "recipe.h2": "検索して、換算して、合計",
    "recipe.p1":
      "各材料はINDB（インドの料理・食材）またはUSDA FoodData Centralのデータと照合します。米やダルのような基本食材は決められた標準値を使います。100gあたりのマクロを入力したグラム数に換算して合計します。",
    "recipe.p2":
      "「米」「鶏むね肉」「オリーブオイル」のようなシンプルな名前がよく一致します。一致しなかった材料は別に表示され、合計には含まれません。しばらく使っていないと、無料プランのサーバーが起動するまで最初の1回に50秒ほどかかることがあります。",
    "recipe.p3": "写真や一文から計算したい場合は、",
    "recipe.p3link": "食事チャットを試す",
  },

  foods: {
    indexEyebrow: "参考データ",
    indexH1: "食品マクロ一覧（A–Z）",
    indexLead:
      "よく食べる{count}品目の100gあたりカロリーとマクロです。実データベース（USDA + INDB）の値で、MacroChatが食事を記録するときと同じものを使っています。",
    indexTitle: "食品マクロ一覧（A–Z）— MacroChat",
    indexDesc:
      "よく食べる食品の100gあたりのカロリー・たんぱく質・炭水化物・脂質。USDAとIndian Nutrient Databankのデータで、推定値は使いません。",
    indexToCompare: "食品を2つ比較する →",

    crumb: "食品",
    title: "{name}のマクロ — 100gあたりのカロリー・たんぱく質・炭水化物・脂質",
    desc: "{name}：100gあたり{kcal}kcal、たんぱく質{protein}g、炭水化物{carb}g、脂質{fat}g。出典：{source}。",
    h1: "{name}のマクロ",
    lead: "100gあたりの値で、出典は{source}です。実測データであり、推定値ではありません。",
    srcUSDA: "USDA FoodData Central",
    srcINDB: "Indian Nutrient Databank",
    factsTitle: "{name} · 100g",
    fiber: "食物繊維",
    sugars: "糖類",
    satfat: "飽和脂肪酸",
    sodium: "ナトリウム",
    note: "マクロの%は{kcal}kcalに占める割合です（たんぱく質・炭水化物は1gあたり4kcal、脂質は9kcal）。",
    cta: "これを記録に追加する →",
    portion:
      "実際の分量を記録しますか？レシピ計算ツールなら{name}を入力したグラム数に換算して食事全体を合計できます。食事チャットに食べたものを伝えるだけでもOKです。",
    mealChat: "食事チャット",
    commonQuestions: "よくある質問",
    faqQ1: "{name}のカロリーはどれくらいですか？",
    faqA1:
      "{name}は100gあたり{kcal}kcalで、たんぱく質{protein}g、炭水化物{carb}g、脂質{fat}gです。",
    faqQ2: "{name}はたんぱく質が多いですか？",
    faqA2:
      "カロリーの{pct}%がたんぱく質で、100kcalあたり{density}gにあたります。35%を超えていれば、たんぱく質源として優秀です。",
    faqQ3: "このデータの出典は？",
    faqA3:
      "{source}の100gあたりの実測値です。MacroChatは食事を記録するときにも同じ出典を使います。",
    compareH2: "{name}を比較する",
    vs: "{a} と {b}",
    relatedH2: "関連する食品",
    relatedItem: "{name}のマクロ",
    relatedKcal: "100gあたり{kcal}kcal",
  },

  compare: {
    indexTitle: "食品のマクロを比較 — MacroChat",
    indexDesc:
      "よく食べる食品のカロリーとマクロを並べて比較し、減量向きか増量向きかをわかりやすく判定します。",
    indexEyebrow: "参考データ",
    indexH1: "食品を2つ比較",
    indexLead:
      "100gあたりで比べたマクロ比較が{count}件。それぞれに、減量と筋肥大の観点からのルールベースの判定が付いています。",
    indexPopular: "人気の比較",
    indexToFoods: "食品マクロのページ一覧 →",

    crumb: "比較",
    title: "{a} と {b} — 100gあたりのマクロ比較",
    desc: "{a}と{b}の100gあたり比較：{kcalA} vs {kcalB} kcal、たんぱく質{proteinA} vs {proteinB} g、炭水化物{carbA} vs {carbB} g。目的に合うのはどちらか。",
    lead: "すべて100gあたりの値で、出典は{source}です。推定値は使っていません。",
    srcBoth: "USDAとINDB",
    proteinPer100: "100kcalあたりのたんぱく質 — {a} {pdA}g · {b} {pdB}g",
    verdictH2: "目的別の判定",
    quickAnswers: "手早い答え",
    moreH2: "{name}の比較をもっと見る",
    macrosLink: "{name}のマクロ",
    cta: "MacroChatでどちらも記録する →",

    faqQ1: "{a}と{b}では、どちらがたんぱく質が多いですか？",
    faqA1: "100gあたりでは{winner}のほうが多く、{hi}g対{lo}gです（{gap}）。",
    faqQ2: "減量に向いているのはどちらですか？",
    faqA2:
      "100gあたりのカロリーは{leaner}のほうが低く（{leanerKcal}kcal対{otherKcal}kcal）、減量中は取り入れやすいです。一方、{protein}はカロリーあたりのたんぱく質が多く、満腹感の面で有利です。",
    faqQ3: "この数値の出典は？",
    faqA3:
      "USDA FoodData CentralとIndian Nutrient Databankの、100gあたりの実測値です。推定値ではありません。MacroChatは食事の記録にも同じデータを使います。",

    "gap.allOfIt": "すべて",
    "gap.same": "同じ",
    "gap.times": "{n}倍",
    "gap.pctMore": "{n}%多い",
    "gap.pctPlain": "{n}%",
    "verdict.leaner":
      "100gあたりでは{leaner}のほうがカロリーが{gap}少なく（{leanerKcal}kcal対{otherKcal}kcal）、カロリー不足を作りやすい選択です。",
    "verdict.closeKcal": "100gあたりのカロリーはほぼ同じです（{kcalA}kcal対{kcalB}kcal）。",
    "verdict.protein":
      "{protein}のほうがたんぱく質密度が高く、100kcalあたり{pdHigh}g対{pdLow}gです。筋肥大や減量中の満腹感にはこちらが向いています。",
    "verdict.closeProtein": "カロリーあたりのたんぱく質量は、どちらも同じくらいです。",

    "tool.portionSize": "分量",
    "tool.per100": "100gあたり",
    "tool.perServing": "1食あたり",
    "tool.custom": "自分で入力",
    "tool.sum": "{a} {gA}g = {kcalA}kcal · {b} {gB}g = {kcalB}kcal",
    "tool.key": "塗りつぶしバー = 数値が大きいほう · ",
    "tool.keyWin": "色付きのセル",
    "tool.keyEnd": " = 低カロリー・高たんぱくの目的に向くほう",
  },
  legal: {
    "about.title": "MacroChat AI について",
    "about.eyebrow": "私たちについて",
    "about.h1a": "正直な数字、",
    "about.h1b": "当て推量はゼロ。",
    "about.s1h": "MacroChat が生まれた理由",
    "about.s1p":
      "ほとんどのカロリーアプリはドロップダウンを延々と検索させ、何でも計量させます。ほとんどの AI トラッカーはモデルに数字をでっち上げさせています。MacroChat はそのどちらでもありません。人に話しかけるように「鶏むね肉のグリル 200g、ロティ 2 枚」と入力するか写真を送るだけ。表示されるカロリーはすべて実在の栄養データベース由来で、AI の想像から出た数字は一つもありません。",
    "about.s2h": "正確さを保つ仕組み",
    "about.s2p":
      "AI の仕事は食品の特定と分量の推論だけです。マクロ栄養素は USDA FoodData Central と Indian Nutrient Databank（INDB）から取得します。1 日の合計は言語モデルではなくバックエンドで計算します。写真から分量を推定した場合はその旨を明示し、記録に反映する前に確認をお願いします。",
    "about.s3h": "インド料理にも対応",
    "about.s3p":
      "USDA が世界の日常的な食品をカバーし、INDB の 1,000 件以上のインド料理レシピと食材がロティ、ダール、サブジ、ビリヤニをカバーします。食生活のどちらの側も、これ一つで記録できます。",

    "privacy.title": "プライバシーポリシー — MacroChat AI",
    "privacy.eyebrow": "プライバシーポリシー",
    "privacy.h1": "あなたのデータについて、率直に。",
    "privacy.updated": "最終更新：2026年7月",
    "privacy.s1h": "収集する情報",
    "privacy.s1p":
      "1 日の目標値を計算するためのアカウント情報（メールアドレス、身長、体重、年齢、性別、活動レベル、目標、タイムゾーン）、記録した食事とメッセージ、そして食品識別のために処理されるアップロード画像です。",
    "privacy.s2h": "利用目的",
    "privacy.s2p":
      "食事のテキストと写真は、食品と分量を特定する目的のみで AI プロバイダー（OpenAI、ゲストセッションでは Google Gemini）に送信されます。栄養数値は公開データベース（USDA、INDB）から取得します。データはサービス運営のためだけに利用し、販売も広告利用も一切ありません。",
    "privacy.s3h": "保存場所",
    "privacy.s3p":
      "アカウントと食事履歴は行レベルセキュリティを有効にした Supabase（Postgres）に保存され、認証されたご本人のアカウントだけが自分の行を読み取れます。ゲストでの解析は一切保存されません。",
    "privacy.s4h": "選べること",
    "privacy.s4pPre": "何も保存せずゲストとして MacroChat を使えます。アカウントと関連データの削除をご希望の場合は",
    "privacy.s4pLink": "お問い合わせください",
    "privacy.s4pPost": "。削除は取り消せません。",

    "terms.title": "利用規約 — MacroChat AI",
    "terms.eyebrow": "利用規約",
    "terms.h1": "細かい条項を、手短に。",
    "terms.updated": "最終更新：2026年7月",
    "terms.s1h": "1. 医学的助言ではありません",
    "terms.s1p":
      "MacroChat は栄養記録ツールであり、医療サービスではありません。カロリーとマクロ栄養素の数値は推定値で、特に分量は概算です。健康に関する判断を行う前に、とくに持病がある場合は、資格を持つ専門家にご相談ください。",
    "terms.s2h": "2. 正確性について",
    "terms.s2p":
      "数値は実在のデータベース（USDA、INDB）から取得し、推定した分量は明示しますが、いかなる値の正確性も保証しません。ご自身で確定したグラム数はご自身の責任となります。",
    "terms.s3h": "3. アカウント",
    "terms.s3p":
      "認証情報は安全に管理してください。アカウント上の行為はご本人の責任です。サービスの濫用（自動スクレイピング、他ユーザーのデータへのアクセス試行、API への過負荷）はお控えください。",
    "terms.s4h": "4. サービスの提供",
    "terms.s4p":
      "本サービスは個人プロジェクトとして現状有姿で提供され、稼働率の保証はありません。機能はいつでも変更または終了する場合があります。",
    "terms.s5h": "5. お問い合わせ",
    "terms.s5pPre": "本規約についてご質問がありますか？ ",
    "terms.s5pLink": "ご連絡ください",
    "terms.s5pPost": "。",

    "contact.title": "お問い合わせ — MacroChat AI",
    "contact.eyebrow": "お問い合わせ",
    "contact.h1": "お気軽にどうぞ。",
    "contact.s1h": "メール",
    "contact.s1p": "不具合の報告、機能のご要望、データ削除のご依頼、その他なんでも：",
    "contact.s2h": "数値がおかしいと感じたら",
    "contact.s2p":
      "食品がデータベースの誤った項目に一致した場合や、カロリーが明らかに不自然な場合は、スクリーンショットを添えてご連絡ください。一致精度の改善を最優先に考えています。",

    "govern": "このページは便宜上の翻訳です。正文は英語版とします。",
  },
};
