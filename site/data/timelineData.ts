export type TimelineEvent = {
  title: string;
  detail: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type TimelineYear = {
  year: number;
  events: TimelineEvent[];
};

export type TimelineYearTheme = {
  accent: string;
  surface: string;
  surfaceStrong: string;
  ink: string;
  wire: string;
};

const officialAboutSource = {
  sourceLabel: "الموقع الرسمي — عن د. عبير عطالله",
  sourceUrl:
    "https://drabeerattalla.com/%d8%b9%d9%86-%d8%af-%d8%b9%d8%a8%d9%8a%d8%b1%d8%b9%d8%b7%d8%a7%d9%84%d9%84%d9%87/",
};

export const timelineData: TimelineYear[] = [
  {
    year: 2017,
    events: [
      {
        title: "ترسيخ مسار ريادة الأعمال",
        detail:
          "استمرار العمل كرائدة أعمال في بناء كيانات تخدم المجتمع وتربط بين الفكرة والتنفيذ.",
        ...officialAboutSource,
      },
      {
        title: "توسيع إدارة المؤسسات",
        detail:
          "العمل على تشغيل وإدارة مؤسسات تعليمية وصحية باستراتيجية تعتمد على الاستدامة والجودة.",
        ...officialAboutSource,
      },
      {
        title: "بداية مسار أثر طويل الأجل",
        detail:
          "تثبيت رؤية أن النجاح الحقيقي هو صناعة فرق ملموس في حياة الناس وليس مجرد نمو تشغيلي.",
        ...officialAboutSource,
      },
    ],
  },
  {
    year: 2018,
    events: [
      {
        title: "توسيع الحضور بين مصر والسعودية",
        detail:
          "تعزيز العمل المؤسسي عبر السوقين المصري والسعودي في التعليم والرعاية الصحية.",
        ...officialAboutSource,
      },
      {
        title: "نموذج من مشروع إلى منظومة",
        detail:
          "تحويل المبادرات التشغيلية إلى منظومات متكاملة ذات أثر اقتصادي واجتماعي ممتد.",
        ...officialAboutSource,
      },
      {
        title: "تعميق الشراكات التنفيذية",
        detail:
          "بناء تعاونات مهنية تدعم التوسع وتزيد قدرة المؤسسات على الاستجابة للتحولات.",
        ...officialAboutSource,
      },
    ],
  },
  {
    year: 2019,
    events: [
      {
        title: "قيادة في التعليم الخاص بجدة",
        detail:
          "ذُكرت كأول مصرية تتولى رئاسة لجنة التعليم العالمي والأجنبي بغرفة جدة.",
        sourceLabel: "القاهرة 24 — معلومات عن النائبة عبير عطا الله",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
      {
        title: "دور تنفيذي في التدريب والتعليم",
        detail:
          "ذُكر توليها منصب نائب رئيس لجنة التدريب والتعليم بمجلس جدة ضمن مسارها المهني.",
        sourceLabel: "القاهرة 24 — معلومات عن النائبة عبير عطا الله",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
      {
        title: "تعزيز ملف الاستثمار في التعليم",
        detail:
          "توسيع خبراتها المتخصصة في الإدارة والأعمال لربط الاستثمار بمخرجات تعليمية عملية.",
        sourceLabel: "القاهرة 24 — معلومات عن النائبة عبير عطا الله",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
    ],
  },
  {
    year: 2020,
    events: [
      {
        title: "استمرار التوسع التشغيلي",
        detail:
          "تعزيز إدارة الكيانات التعليمية والصحية ضمن رؤية تشغيلية طويلة المدى.",
        ...officialAboutSource,
      },
      {
        title: "تركيز على جودة الخدمة",
        detail:
          "ربط الإدارة اليومية للمؤسسات بمؤشرات جودة ونتائج قابلة للقياس.",
        ...officialAboutSource,
      },
      {
        title: "تأسيس أرضية للعمل المجتمعي",
        detail:
          "بناء قاعدة عمل تعطي أولوية لخدمة الناس وتحويل التحديات إلى فرص حقيقية.",
        ...officialAboutSource,
      },
    ],
  },
  {
    year: 2021,
    events: [
      {
        title: "الأمانة العامة للاتحاد العربي لرياضة ذوي الإعاقة",
        detail:
          "ترسيخ دورها في ملف ذوي الإعاقة عربيًا عبر موقعها كأمين عام للاتحاد العربي.",
        sourceLabel: "الموقع الرسمي + وزارة الشباب والرياضة المصرية",
        sourceUrl:
          "https://www.emys.gov.eg/news/19132/%D9%88%D8%B2%D9%8A%D8%B1-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8-%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D9%8A%D9%87%D9%86%D9%8A%D8%A1-%D8%A7%D9%84%D9%86%D8%A7%D8%A6%D8%A8%D8%A9-%D8%B9%D8%A8%D9%8A%D8%B1-%D8%B9%D8%B7%D8%A7-%D8%A8%D8%B9%D8%AF-%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1%D9%87%D8%A7-%D8%B1%D8%A6%D9%8A%D8%B3%D8%A7-%D8%B4%D8%B1%D9%81%D9%8A%D8%A7-%D9%84%D9%84%D8%A7%D8%AA%D8%AD%D8%A7%D8%AF-%D8%A7%D9%84%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A-%D8%A7%D9%84%D8%A8%D8%A7%D8%B1%D8%A7%D9%84%D9%85%D8%A8%D9%8A-%D9%84%D9%84%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B7%D8%A7%D8%A6%D8%B1%D8%A9",
      },
      {
        title: "توسيع برامج الدمج الرياضي",
        detail:
          "دعم مسارات تستهدف تمكين الأشخاص ذوي الإعاقة عبر أنشطة ومبادرات رياضية متخصصة.",
        sourceLabel: "بوابة الأهرام — الاتحاد العربي لذوي الإعاقة",
        sourceUrl: "https://gate.ahram.org.eg/News/4729744.aspx",
      },
      {
        title: "التحرك نحو أدوار إقليمية أوسع",
        detail:
          "تعزيز شبكة التعاون العربي في الرياضة البارالمبية والعمل على تفعيل أثرها المؤسسي.",
        sourceLabel: "البوابة نيوز — الجمعية العمومية للاتحاد العربي",
        sourceUrl: "https://www.albawabhnews.com/4964182",
      },
    ],
  },
  {
    year: 2022,
    events: [
      {
        title: "تعميق الحضور في ملفات التعليم والتمكين",
        detail:
          "استمرار الربط بين الإدارة، التعليم، والعمل المجتمعي كمسار موحد لبناء الإنسان.",
        ...officialAboutSource,
      },
      {
        title: "توسيع الأثر المجتمعي المحلي",
        detail:
          "العمل على مبادرات خدمية لدعم المناطق المحلية وتحسين جودة الحياة بشكل مباشر.",
        sourceLabel: "القاهرة 24 — مبادرة النسيمية الجديدة",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
      {
        title: "تجهيز أرضية العمل العام",
        detail:
          "تراكم الخبرة التنفيذية والسياساتية بما مهد للانتقال لاحقًا إلى تمثيل سياسي أوسع.",
        sourceLabel: "القاهرة 24 + الموقع الرسمي",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
    ],
  },
  {
    year: 2023,
    events: [
      {
        title: "اجتماعات عربية لملف ذوي الإعاقة",
        detail:
          "المشاركة في أعمال الاتحاد العربي لرياضة ذوي الإعاقة ضمن التحضير لاجتماعات الجمعية العمومية.",
        sourceLabel: "بوابة الأهرام — الاتحاد العربي لذوي الإعاقة",
        sourceUrl: "https://gate.ahram.org.eg/News/4729744.aspx",
      },
      {
        title: "تنسيق أوسع بين اللجان الرياضية",
        detail:
          "العمل مع قيادات رياضية عربية لتفعيل برامج أكثر اتساعًا للرياضات البارالمبية.",
        sourceLabel: "البوابة نيوز — الجمعية العمومية للاتحاد العربي",
        sourceUrl: "https://www.albawabhnews.com/4964182",
      },
      {
        title: "تثبيت دورها كحلقة وصل إقليمية",
        detail:
          "دعم الشراكات بين مؤسسات رياضية عربية بهدف خدمة ذوي الإعاقة بصورة أكثر تكاملًا.",
        sourceLabel: "بوابة الأهرام — الاتحاد العربي لذوي الإعاقة",
        sourceUrl: "https://gate.ahram.org.eg/News/4729744.aspx",
      },
    ],
  },
  {
    year: 2024,
    events: [
      {
        title: "طرح خطة لتطوير كرة القدم النسائية",
        detail:
          "إعلان رؤية تستهدف دعم كرة القدم النسائية في مصر ضمن مسار تمكين المرأة رياضيًا.",
        sourceLabel: "الدستور الرياضي — خطة تطوير كرة القدم النسائية",
        sourceUrl: "https://elcaptain.dostor.org/213074",
      },
      {
        title: "حضور في فعاليات الجامعة العربية",
        detail:
          "المشاركة في اجتماع الجمعية العمومية للاتحاد العربي لرياضة ذوي الإعاقة بجامعة الدول العربية.",
        sourceLabel: "بوابة الأهرام — الاتحاد العربي لذوي الإعاقة",
        sourceUrl: "https://gate.ahram.org.eg/News/4729744.aspx",
      },
      {
        title: "توسيع خطاب الدمج والتمكين",
        detail:
          "تعزيز خطاب يدعم الرياضة كأداة تمكين اجتماعي للأشخاص ذوي الإعاقة والمرأة.",
        sourceLabel: "الدستور الرياضي + بوابة الأهرام",
        sourceUrl: "https://elcaptain.dostor.org/213074",
      },
    ],
  },
  {
    year: 2025,
    events: [
      {
        title: "الفوز بمقعد مجلس النواب عن المصريين بالخارج",
        detail:
          "حصد مقعد برلماني بالقائمة الوطنية من أجل مصر ضمن دائرة المصريين بالخارج.",
        sourceLabel: "القاهرة 24 — 19 نوفمبر 2025",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
      {
        title: "تكريم «صروح» في جدة",
        detail:
          "تكريمها ضمن القيادات المتميزة في التعليم الخاص برعاية محافظ جدة (29 يناير 2025).",
        sourceLabel: "LinkedIn — NASA International Schools",
        sourceUrl:
          "https://ae.linkedin.com/posts/nasaintlsch_under-the-esteemed-patronage-of-his-highness-activity-7290739282703450113-ICau",
      },
      {
        title: "مقالات اقتصادية وتعليمية مؤثرة",
        detail:
          "نشر مقالات عامة عن الاقتصاد المصري والتعليم كاستثمار استراتيجي في رأس المال البشري.",
        sourceLabel: "الموقع الرسمي + بوابة الاقتصاد الرقمي",
        sourceUrl:
          "https://drabeerattalla.com/%d8%af-%d8%b9%d8%a8%d9%8a%d8%b1-%d8%b9%d8%b7%d8%a7%d9%84%d9%84%d9%87-%d8%aa%d9%83%d8%aa%d8%a8-%d8%b4%d9%87%d8%a7%d8%af%d8%a9-%d8%ab%d9%82%d8%a9-%d9%81%d9%8a-%d8%a7%d9%84%d8%a7%d9%82%d8%aa%d8%b5/",
      },
    ],
  },
  {
    year: 2026,
    events: [
      {
        title: "رئاسة شرفية للاتحاد الأفريقي البارالمبي",
        detail:
          "اختيارها رئيسًا شرفيًا للاتحاد الأفريقي البارالمبي للكرة الطائرة للفترة 2026-2029.",
        sourceLabel: "وزارة الشباب والرياضة المصرية",
        sourceUrl:
          "https://www.emys.gov.eg/news/19132/%D9%88%D8%B2%D9%8A%D8%B1-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8-%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D9%8A%D9%87%D9%86%D9%8A%D8%A1-%D8%A7%D9%84%D9%86%D8%A7%D8%A6%D8%A8%D8%A9-%D8%B9%D8%A8%D9%8A%D8%B1-%D8%B9%D8%B7%D8%A7-%D8%A8%D8%B9%D8%AF-%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1%D9%87%D8%A7-%D8%B1%D8%A6%D9%8A%D8%B3%D8%A7-%D8%B4%D8%B1%D9%81%D9%8A%D8%A7-%D9%84%D9%84%D8%A7%D8%AA%D8%AD%D8%A7%D8%AF-%D8%A7%D9%84%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A-%D8%A7%D9%84%D8%A8%D8%A7%D8%B1%D8%A7%D9%84%D9%85%D8%A8%D9%8A-%D9%84%D9%84%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B7%D8%A7%D8%A6%D8%B1%D8%A9",
      },
      {
        title: "تفعيل البرنامج التشريعي",
        detail:
          "استمرار طرح محاور تشريعية في التعليم التكنولوجي، ريادة الأعمال، والاستقرار الاقتصادي.",
        sourceLabel: "الموقع الرسمي — البرنامج التشريعي",
        sourceUrl:
          "https://drabeerattalla.com/%d8%a7%d9%84%d8%a8%d8%b1%d9%86%d8%a7%d9%85%d8%ac-%d8%a7%d9%84%d8%aa%d8%b4%d8%b1%d9%8a%d8%b9%d9%8a/",
      },
      {
        title: "تركيز أكبر على المصريين بالخارج",
        detail:
          "تعزيز تمثيل قضايا المصريين بالخارج ضمن أجندة العمل النيابي والخدمي.",
        sourceLabel: "القاهرة 24 — فوز مقعد المصريين بالخارج",
        sourceUrl: "https://www.cairo24.com/2320761",
      },
    ],
  },
];

export const timelineYearThemes: Record<number, TimelineYearTheme> = {
  2017: {
    accent: "#DB7A2F",
    surface: "#ece3da",
    surfaceStrong: "#d9c8b7",
    ink: "#1d1a17",
    wire: "rgba(27, 22, 17, 0.24)",
  },
  2018: {
    accent: "#C05D6C",
    surface: "#f2e2e7",
    surfaceStrong: "#e2bcc8",
    ink: "#26161b",
    wire: "rgba(40, 20, 26, 0.24)",
  },
  2019: {
    accent: "#5D6EC0",
    surface: "#e2e8f8",
    surfaceStrong: "#c4d1f0",
    ink: "#121d31",
    wire: "rgba(18, 29, 49, 0.24)",
  },
  2020: {
    accent: "#1F9D81",
    surface: "#dff3ee",
    surfaceStrong: "#b7e4d9",
    ink: "#102522",
    wire: "rgba(16, 37, 34, 0.24)",
  },
  2021: {
    accent: "#5B43A6",
    surface: "#e8e1f5",
    surfaceStrong: "#cec0eb",
    ink: "#1c1534",
    wire: "rgba(28, 21, 52, 0.24)",
  },
  2022: {
    accent: "#A66C1F",
    surface: "#f2eadf",
    surfaceStrong: "#e1cfb7",
    ink: "#2f2314",
    wire: "rgba(47, 35, 20, 0.24)",
  },
  2023: {
    accent: "#9A3345",
    surface: "#f4e0e5",
    surfaceStrong: "#e5b8c2",
    ink: "#2a1419",
    wire: "rgba(42, 20, 25, 0.24)",
  },
  2024: {
    accent: "#1A7FB8",
    surface: "#deedf7",
    surfaceStrong: "#b7d8eb",
    ink: "#102737",
    wire: "rgba(16, 39, 55, 0.24)",
  },
  2025: {
    accent: "#D94343",
    surface: "#f8e0e0",
    surfaceStrong: "#f0bcbc",
    ink: "#301414",
    wire: "rgba(48, 20, 20, 0.24)",
  },
  2026: {
    accent: "#2458A9",
    surface: "#dfe9f9",
    surfaceStrong: "#bed1f3",
    ink: "#111f38",
    wire: "rgba(17, 31, 56, 0.24)",
  },
};
