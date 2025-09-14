const arTranslations = {
  // App Info
  "appTitle": "مولد أكواد الألعاب بالذكاء الاصطناعي",
  "appDescription": "احصل على أكواد جاهزة لتطوير ألعابك باستخدام الذكاء الاصطناعي.",
  "selectCategory": "اختر فئة",
  "backToCategories": "العودة إلى الفئات",

  // Category Titles
  "movementTitle": "تحريك الشخصية",
  "protectionTitle": "حماية اللعبة",
  "inventoryTitle": "نظام المخزون",
  "uimanagerTitle": "مدير واجهة المستخدم",
  "tipsTitle": "نصائح تطوير الألعاب",

  // Category Descriptions (for cards)
  "movementDescription": "أنشئ أكواد تحكم بالحركة للشخصيات ثنائية وثلاثية الأبعاد.",
  "protectionDescription": "أنشئ سكربتات ضد أنواع غش محددة مثل اختراق السرعة، والتصويب التلقائي، واختراق الجدران.",
  "inventoryDescription": "أنشئ سكربتات لإدارة مخزون اللاعب والعناصر.",
  "uimanagerDescription": "أنشئ كودًا لإدارة عناصر الواجهة مثل شريط الصحة والنقاط.",
  "tipsDescription": "احصل على نصائح وأفضل الممارسات لمشروعك.",
  
  // Generator Headers - Descriptions
  "movementHeaderDescription": "تقوم هذه الوحدة بإنشاء سكربت متكامل للتحكم بالشخصية. يتضمن الحركة الأساسية، والقفز، والتعامل مع الفيزياء المخصص للمحرك والأبعاد التي اخترتها.",
  "protectionHeaderDescription": "تقوم هذه الوحدة بإنشاء سكربتات لمكافحة الغش من جانب العميل. اختر نوعًا معينًا من الغش لإنشاء سكربت مصمم لاكتشافه ومواجهته. تذكر أن الكشف من جانب العميل هو رادع وليس حلاً مضمونًا.",
  "inventoryHeaderDescription": "تقوم هذه الوحدة بإنشاء نظام مخزون أساسي. سيتضمن السكربت فئة بسيطة للعناصر (Item) ووظائف أساسية لإضافة العناصر وإزالتها والتحقق منها في مخزون قائم على القائمة.",
  "uimanagerHeaderDescription": "تقوم هذه الوحدة بإنشاء مدير واجهة مستخدم باستخدام نمط Singleton، وهو أسلوب شائع وفعال للتعامل مع واجهة المستخدم في الألعاب. حدد عناصر الواجهة التي تحتاجها، وسيقوم الذكاء الاصطناعي بإنشاء سكربت مركزي لإدارتها.",
  "tipsHeaderDescription": "تقدم هذه الوحدة نصائح احترافية لمشروع لعبتك. صف فكرة لعبتك، وسيقوم الذكاء الاصطناعي بدور المرشد الخبير، مقدمًا نصائح حول آليات اللعب، وخطوات العمل، والمزالق الشائعة التي يجب تجنبها لنوع لعبتك ومحركك المحدد.",

  // Generator Headers - Examples
  "movementHeaderExample": "مثال: 'أضف قدرة اندفاع (dash) عند الضغط على مفتاح Shift.'",
  "protectionHeaderExample": "مثال: 'زد من هامش تحمل كاشف السرعة قليلاً.'",
  "inventoryHeaderExample": "مثال: 'أضف حقل 'maxStack' لفئة العنصر (Item).'",
  "uimanagerHeaderExample": "مثال: 'تأكد من أن تحديث شريط الصحة يستخدم حركة انتقالية ناعمة (lerp).'",
  "tipsHeaderExample": "مثال: 'لعبة منصات وألغاز ثنائية الأبعاد تتحكم فيها بالوقت.'",
  
  // General Labels
  "selectDimensions": "اختر أبعاد الشخصية",
  "selectEngine": "اختر محرك الألعاب",
  "selectGenre": "اختر نوع اللعبة",
  "selectProtectionType": "اختر نوع الغش لمواجهته",
  "customInstructionsLabel": "أضف تعليمات مخصصة (اختياري)",
  "customInstructionsPlaceholder": "مثال: 'أضف ميزة القفز المزدوج'، 'اجعل المخزون يحفظ في ملف'",
  "gameDescriptionLabel": "صف لعبتك",
  "gameDescriptionPlaceholder": "مثال: 'لعبة منصات وألغاز ثنائية الأبعاد تتحكم فيها بالوقت'",
  "includeCommentsLabel": "تضمين التعليقات",

  // Protection Types
  "protectionTypeSpeedHacking": "اختراق السرعة",
  "protectionTypeAimbotDetection": "كشف التصويب التلقائي (Aimbot)",
  "protectionTypeWallhack/Noclip": "اختراق الجدران / الطيران",
  "protectionTypeTeleportDetection": "كشف الانتقال اللحظي",
  "protectionTypeMemoryValueEditing": "تعديل قيم الذاكرة",
  "protectionTypeTimeScaleManipulation": "التلاعب بمقياس الوقت",

  // UI Manager
  "uiManagerSelectComponents": "حدد مكونات واجهة المستخدم",
  "uiComponentHealthBar": "شريط الصحة",
  "uiComponentScoreText": "نص النقاط",
  "uiComponentAmmoCounter": "عداد الذخيرة",
  "uiComponentMinimap": "خريطة مصغرة",

  // Buttons & Status
  "generateCode": "إنشاء الكود",
  "getAdvice": "احصل على نصيحة",
  "generating": "جاري الإنشاء...",
  "status_generating": "يقوم الذكاء الاصطناعي بإنشاء الكود والنصائح...",
  "status_refining": "يقوم بالتحسين وإضافة التعليقات...",
  "status_generating_tips": "يتم استشارة الخبير AI للحصول على النصيحة...",
  "copyCode": "نسخ الكود",
  "copied": "تم النسخ!",
  "tabCode": "الكود",
  "tabAdvice": "نصيحة الخبير",

  // Errors
  "errorOccurred": "حدث خطأ أثناء إنشاء الكود. يرجى المحاولة مرة أخرى.",
  "errorOccurredTips": "حدث خطأ أثناء الحصول على النصيحة. يرجى المحاولة مرة أخرى.",
  "errorUiManagerComponents": "يرجى اختيار مكون واحد على الأقل لواجهة المستخدم لإنشاء المدير."
};

export default arTranslations;
