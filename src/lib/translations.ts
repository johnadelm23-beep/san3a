export type Language = 'en' | 'ar'

export interface TranslationStructure {
  nav: {
    work: string
    services: string
    paizo: string
    offers: string
    about: string
    contact: string
    startProject: string
    tagline: string
  }
  hero: {
    badge: string
    titlePart1: string
    titlePart2: string
    titlePart3: string
    description: string
    viewWork: string
    startProject: string
    brandSystem: string
    founders: string
    foundersNames: string
    focus: string
    focusAreas: string
    availability: string
    acceptingProjects: string
  }
  statement: {
    tag: string
    heading: string
    subheading: string
    stat1Label: string
    stat1Value: string
    stat2Label: string
    stat2Value: string
    stat3Label: string
    stat3Value: string
    bullet1Title: string
    bullet1Desc: string
    bullet2Title: string
    bullet2Desc: string
    bullet3Title: string
    bullet3Desc: string
  }
  team: {
    tag: string
    title: string
    subtitle: string
    johnName: string
    johnRole: string
    johnBio: string
    georgeName: string
    georgeRole: string
    georgeBio: string
    call: string
    whatsapp: string
    directAccess: string
  }
  projects: {
    tag: string
    title: string
    subtitle: string
    viewAllWork: string
    visitWebsite: string
    liveBuild: string
    liveWebsite: string
    deployedLive: string
    theHammerTitle: string
    theHammerTag: string
    theHammerDesc: string
    egtma3naTitle: string
    egtma3naTag: string
    egtma3naDesc: string
    saintJohnTitle: string
    saintJohnTag: string
    saintJohnDesc: string
    ecommerceTitle: string
    ecommerceTag: string
    ecommerceDesc: string
    medlabTitle: string
    medlabTag: string
    medlabDesc: string
    brandIdentityTitle: string
    brandIdentityTag: string
    brandIdentityDesc: string
    san3aOsTitle: string
    san3aOsTag: string
    san3aOsDesc: string
    featuredApp: string
    webPlatform: string
    digitalCommerce: string
    interactiveScreenshots: string
  }
  paizo: {
    tag: string
    title: string
    subtitle: string
    brandDesc: string
    discoverGame: string
    exploreGames: string
    aboutGame: string
    howToPlay: string
    gameInfo: string
    playersLabel: string
    durationLabel: string
    typeLabel: string
    difficultyLabel: string
    backToGames: string
    previousGame: string
    nextGame: string
    relatedGames: string
    otherGames: string
  }
  services: {
    tag: string
    title: string
    subtitle: string
    viewAllServices: string
    webDevTitle: string
    webDevDesc: string
    mobileDevTitle: string
    mobileDevDesc: string
    uiUxTitle: string
    uiUxDesc: string
    graphicDesignTitle: string
    graphicDesignDesc: string
    videoEditingTitle: string
    videoEditingDesc: string
    presentationTitle: string
    presentationDesc: string
    brandingTitle: string
    brandingDesc: string
    customSoftwareTitle: string
    customSoftwareDesc: string
  }
  cta: {
    tag: string
    heading: string
    subheading: string
    buttonText: string
  }
  footer: {
    tagline: string
    quickLinks: string
    servicesTitle: string
    contactTitle: string
    location: string
    allRightsReserved: string
  }
  contact: {
    tag: string
    title: string
    subtitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    serviceLabel: string
    budgetLabel: string
    messageLabel: string
    messagePlaceholder: string
    submitButton: string
    submittingButton: string
    successMessage: string
    directContacts: string
  }
}

export const translations: Record<Language, TranslationStructure> = {
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      paizo: 'PAIZO',
      offers: 'Offers',
      about: 'About',
      contact: 'Contact',
      startProject: 'Start a Project',
      tagline: '// STUDIO',
    },
    hero: {
      badge: 'SAN3A // CREATIVE TECHNOLOGY STUDIO',
      titlePart1: 'WE BUILD',
      titlePart2: 'DIGITAL WORK',
      titlePart3: 'THAT MATTERS.',
      description: 'Websites, mobile applications, and visual experiences designed and built with intention by SAN3A.',
      viewWork: 'View Our Work',
      startProject: 'Start a Project',
      brandSystem: '[ SAN3A BRAND SYSTEM ]',
      founders: '// FOUNDERS',
      foundersNames: 'JOHN & GEORGE',
      focus: '// FOCUS',
      focusAreas: 'WEB, MOBILE & SOFTWARE',
      availability: '// AVAILABILITY',
      acceptingProjects: 'ACCEPTING PROJECTS',
    },
    statement: {
      tag: '// STUDIO PHILOSOPHY',
      heading: 'DIRECT ENGINEERING. ZERO MIDDLE MANAGEMENT.',
      subheading: 'We partner directly with founders and businesses to engineer products that launch fast and scale reliably.',
      stat1Label: 'ENGINEERING DIRECTORS',
      stat1Value: '2 FOUNDERS',
      stat2Label: 'CORE STACK',
      stat2Value: 'NEXT.JS / FLUTTER',
      stat3Label: 'CLIENT ENGAGEMENT',
      stat3Value: '100% DIRECT',
      bullet1Title: 'Production-Ready Engineering',
      bullet1Desc: 'Clean, maintainable codebase designed for scalable enterprise growth.',
      bullet2Title: 'Swiss Graphic Architecture',
      bullet2Desc: 'Precision interface design focused on clarity, hierarchy, and user engagement.',
      bullet3Title: 'Direct Founders Partnership',
      bullet3Desc: 'You work straight with John & George from blueprint to launch.',
    },
    team: {
      tag: '// THE FOUNDERS',
      title: 'MEET THE TEAM',
      subtitle: 'Real engineers and creators behind every digital solution we build.',
      johnName: 'John Adel',
      johnRole: 'Co-Founder & Software Architect',
      johnBio: 'Leads technical architecture, full-stack web engineering, mobile app development (Flutter/React Native), and cloud backends.',
      georgeName: 'George',
      georgeRole: 'Co-Founder & Creative Director',
      georgeBio: 'Leads interface design systems, UI/UX architecture, visual branding, and digital graphic design.',
      call: 'Call',
      whatsapp: 'WhatsApp',
      directAccess: 'Direct Access — No Agency Middlemen',
    },
    projects: {
      tag: '// SAN3A PORTFOLIO',
      title: 'Selected Projects',
      subtitle: 'Real digital products and software platforms engineered for clients and communities.',
      viewAllWork: 'View All Work',
      visitWebsite: 'Visit Website',
      liveBuild: 'Live Platform ↗',
      liveWebsite: 'Live Website',
      deployedLive: 'Deployed & Live',
      theHammerTitle: 'The Hammer',
      theHammerTag: 'Featured Digital Commerce',
      theHammerDesc: 'The Hammer is a professional digital commerce platform built to showcase industrial motors and related products with a modern, multilingual web experience.',
      egtma3naTitle: 'Egtma3na Platform',
      egtma3naTag: 'Featured Mobile Application',
      egtma3naDesc: 'Egtma3na is a digital platform designed to improve interaction, engagement and management for youth meetings and communities.',
      saintJohnTitle: 'St. John the Beloved Youth Meeting',
      saintJohnTag: 'Featured Web Platform',
      saintJohnDesc: 'Official web platform and portal for St. John the Beloved Youth Meeting, delivering event tracking, media, and community engagement.',
      ecommerceTitle: 'E-Commerce Platform',
      ecommerceTag: 'Web Development',
      ecommerceDesc: 'High-performance digital store with real-time checkout and automated inventory management.',
      medlabTitle: 'MedLab Management System',
      medlabTag: 'Custom Software Solutions',
      medlabDesc: 'Specialized diagnostic laboratory software for managing patient records and test results.',
      brandIdentityTitle: 'Brand Identity System',
      brandIdentityTag: 'Branding & UI System',
      brandIdentityDesc: 'Comprehensive visual architecture, custom typography guidelines, and digital brand design.',
      san3aOsTitle: 'SAN3A Studio Operating System',
      san3aOsTag: 'Internal Tech Stack',
      san3aOsDesc: 'Custom studio workflow management platform built to streamline project lifecycles.',
      featuredApp: 'FEATURED MOBILE SOLUTION',
      webPlatform: 'LIVE WEB PLATFORM',
      digitalCommerce: 'DIGITAL COMMERCE PLATFORM',
      interactiveScreenshots: 'App Screenshot Showcase — Swipe or Auto-Scroll',
    },
    paizo: {
      tag: '// SAN3A BRAND DISCIPLINE',
      title: 'PAIZO Interactive Games',
      subtitle: 'Interactive games, creative activities, group experiences, and engaging youth workshops engineered by SAN3A.',
      brandDesc: 'PAIZO designs and builds original interactive games, collaborative group activities, and experiential workshops crafted for youth communities, retreats, and team gatherings.',
      discoverGame: 'Discover Game',
      exploreGames: 'Explore PAIZO Games',
      aboutGame: 'About the Game',
      howToPlay: 'How To Play',
      gameInfo: 'Game Specifications',
      playersLabel: 'Players',
      durationLabel: 'Duration',
      typeLabel: 'Type',
      difficultyLabel: 'Difficulty',
      backToGames: 'Back to PAIZO Games',
      previousGame: 'Previous Game',
      nextGame: 'Next Game',
      relatedGames: 'Related Games',
      otherGames: 'Explore More PAIZO Games',
    },
    services: {
      tag: '// CORE CAPABILITIES',
      title: 'Our Services',
      subtitle: 'End-to-end software development and visual engineering services built for modern businesses.',
      viewAllServices: 'View All Services',
      webDevTitle: 'Web Development',
      webDevDesc: 'High-performance web platforms and web applications built with Next.js, React, and TypeScript.',
      mobileDevTitle: 'Mobile App Development',
      mobileDevDesc: 'Cross-platform native iOS & Android applications built with Flutter and React Native.',
      uiUxTitle: 'UI / UX Design',
      uiUxDesc: 'Systematic interface architecture, interactive prototypes, and scalable Figma design token systems.',
      graphicDesignTitle: 'Graphic Design',
      graphicDesignDesc: 'Editorial graphics, publication layouts, digital collateral, and visual asset systems.',
      videoEditingTitle: 'Video Editing / Montage',
      videoEditingDesc: 'Post-production video editing, motion graphics, sound sync, and high-impact digital reels.',
      presentationTitle: 'Presentation Design',
      presentationDesc: 'Executive pitch decks, keynote presentations, and investor slides designed to command attention.',
      brandingTitle: 'Branding & Identity',
      brandingDesc: 'Complete brand architecture, typographic systems, logo marks, and visual positioning.',
      customSoftwareTitle: 'Custom Software Solutions',
      customSoftwareDesc: 'Bespoke backend APIs, automated workflows, custom database architectures, and internal tools.',
    },
    cta: {
      tag: '// GET IN TOUCH',
      heading: "Have an idea? Let's build it.",
      subheading: 'Partner directly with John & George to bring your digital vision to life.',
      buttonText: 'Start a Project',
    },
    footer: {
      tagline: 'SAN3A CREATIVE TECHNOLOGY STUDIO',
      quickLinks: 'Quick Links',
      servicesTitle: 'Services',
      contactTitle: 'Direct Contact',
      location: 'Cairo, Egypt // Available Worldwide',
      allRightsReserved: 'All rights reserved.',
    },
    contact: {
      tag: '// INITIATE PROJECT',
      title: "LET'S BUILD TOGETHER",
      subtitle: 'Tell us about your project requirements and schedule a direct consultation with founders.',
      nameLabel: 'Your Name *',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone / WhatsApp *',
      phonePlaceholder: '01226806622',
      serviceLabel: 'Required Service',
      budgetLabel: 'Estimated Budget',
      messageLabel: 'Project Details *',
      messagePlaceholder: 'Describe your application, timeline, and key requirements...',
      submitButton: 'Send Inquiry',
      submittingButton: 'Sending...',
      successMessage: 'Thank you! Your message has been sent directly to John & George. We will respond shortly.',
      directContacts: 'Direct Founder Contacts',
    },
  },
  ar: {
    nav: {
      work: 'أعمالنا',
      services: 'خدماتنا',
      paizo: 'بيزو (PAIZO)',
      offers: 'العروض',
      about: 'من نحن',
      contact: 'تواصل معنا',
      startProject: 'ابدأ مشروعك',
      tagline: '// استوديو برمجيات',
    },
    hero: {
      badge: 'صنعة // استوديو تكنولوجيا وإبداع',
      titlePart1: 'نبني',
      titlePart2: 'حلولاً رقمية',
      titlePart3: 'صُنعت بإتقان.',
      description: 'م مواقع إلكترونية، تطبيقات موبايل، وتجارب بصرية صُممت وبُنيت بعناية واحترافية من استوديو صنعة.',
      viewWork: 'استعرض أعمالنا',
      startProject: 'ابدأ مشروعك',
      brandSystem: '[ نظام صنعة البرمجي ]',
      founders: '// المؤسسون',
      foundersNames: 'جون وجورج',
      focus: '// التخصص',
      focusAreas: 'ويب، موبايل، وبرمجيات خاصة',
      availability: '// الحالة الحالية',
      acceptingProjects: 'متاحون لاستقبال مشاريع جديدة',
    },
    statement: {
      tag: '// فلسفة الاستوديو',
      heading: 'تطوير برمجي مباشر. بدون وسطاء.',
      subheading: 'نشترك مباشرة مع أصحاب الأعمال والشركات لبناء منتجات رقمية سريعة الإطلاق وقابلة للتوسع.',
      stat1Label: 'مدراء التطوير البرمجي',
      stat1Value: '٢ مؤسسان',
      stat2Label: 'التقنيات الأساسية',
      stat2Value: 'Next.js / Flutter',
      stat3Label: 'التواصل مع العميل',
      stat3Value: '١٠٠٪ مباشر',
      bullet1Title: 'هندسة برمجية جاهزة للإنتاج',
      bullet1Desc: 'كود برمتانة عالية وسهولة في الصيانة مصمم للتوسع والمؤسسات.',
      bullet2Title: 'تصميم بصري بسويسري الدقة',
      bullet2Desc: 'واجهات مستخدم دقيقة تركز على الوضوح والهيكلية وتجربة المستخدم.',
      bullet3Title: 'شراكة مباشرة مع المؤسسين',
      bullet3Desc: 'تتعامل مباشرة مع جون وجورج من التخطيط وحتى الإطلاق.',
    },
    team: {
      tag: '// فريق العمل',
      title: 'المؤسسون',
      subtitle: 'فريق عمل حقيقي ومباشر وراء كل حل برمجي نبنيه.',
      johnName: 'جون عادل',
      johnRole: 'شريك مؤسس ومهندس برمجيات',
      johnBio: 'يقود الهندسة البرمجية وتطوير تطبيقات الويب والموبايل (Flutter / React Native) والأنظمة الخلفية.',
      georgeName: 'جورج',
      georgeRole: 'شريك مؤسس ومدير إبداعي',
      georgeBio: 'يقود تصميم واجهات وتجربة المستخدم (UI/UX) والهوية البصرية والتصاميم الجرافيكية.',
      call: 'اتصال',
      whatsapp: 'واتساب',
      directAccess: 'تواصل مباشر — بدون تعقيدات أو شركات وسيطة',
    },
    projects: {
      tag: '// معرض أعمال صنعة',
      title: 'أعمالنا المختارة',
      subtitle: 'منتجات رقمية ومنصات برمجية حقيقية قمنا بتطويرها لعملائنا ومجتمعاتنا.',
      viewAllWork: 'عرض كافة المشاريع',
      visitWebsite: 'زيارة الموقع',
      liveBuild: 'رابط مباشر ↗',
      liveWebsite: 'الموقع المباشر',
      deployedLive: 'منشور ومنطلق حياً',
      theHammerTitle: 'ذا هامر (The Hammer)',
      theHammerTag: 'منصة تجارة رقمية مميزة',
      theHammerDesc: 'ذا هامر منصة تجارة رقمية احترافية لعرض المحركات الصناعية والمنتجات المرتبطة بها من خلال تجربة ويب حديثة ومتعددة اللغات.',
      egtma3naTitle: 'منصة اجتماعنا (Egtma3na)',
      egtma3naTag: 'تطبيق موبايل مميز',
      egtma3naDesc: 'منصة اجتماعنا هي تطبيق رقمي صُمم لتحسين التفاعل، المشاركة، وإدارة اجتماعات الشباب والمجتمعات.',
      saintJohnTitle: 'اجتماع القديس يوحنا الحبيب للشباب',
      saintJohnTag: 'منصة ويب مميزة',
      saintJohnDesc: 'الموقع الرسمي ومنصة التفاعل لاجتماع القديس يوحنا الحبيب للشباب لمتابعة الفعاليات والمحتوى.',
      ecommerceTitle: 'منصة تجارة إلكترونية',
      ecommerceTag: 'تطوير ويب',
      ecommerceDesc: 'متجر إلكتروني عالي الأداء مع نظام دفع فوري وإدارة تلقائية للمخزون.',
      medlabTitle: 'نظام إدارة معامل التحاليل MedLab',
      medlabTag: 'حلول برمجية خاصة',
      medlabDesc: 'برنامج متخصص لمعامل التحاليل الطبية لإدارة سجلات المرضى ونتائج الفحوصات.',
      brandIdentityTitle: 'نظام الهوية البصرية',
      brandIdentityTag: 'تصميم هوية وواجهات',
      brandIdentityDesc: 'هيكلية بصرية متكاملة وتوجيهات خطوط وتصميم علامة تجارية رقمية.',
      san3aOsTitle: 'نظام تشغيل استوديو صنعة',
      san3aOsTag: 'أنظمة داخلية',
      san3aOsDesc: 'منصة إدارة وتتبع المشاريع الخاصة باستوديو صنعة لتنظيم مراحل التطوير.',
      featuredApp: 'تطبيق موبايل مميز',
      webPlatform: 'منصة ويب حية',
      digitalCommerce: 'منصة تجارة رقمية',
      interactiveScreenshots: 'معرض شاشات التطبيق — اسحب أو تصفح تلقائياً',
    },
    paizo: {
      tag: '// تخصص إبداعي من صنعة',
      title: 'ألعاب PAIZO التفاعلية',
      subtitle: 'ألعاب تفاعلية، أنشطة جماعية، وتجارب حية صممتها صنعة للمجتمعات والشباب.',
      brandDesc: 'بيزو (PAIZO) تعتني بتصميم وبناء الألعاب التفاعلية المبتكرة، والأنشطة الجماعية التنافسية، والورش الإبداعية المخصصة للمجتمعات واللقاءات الشبابية.',
      discoverGame: 'اكتشف اللعبة',
      exploreGames: 'اكتشف ألعاب PAIZO',
      aboutGame: 'عن اللعبة',
      howToPlay: 'طريقة اللعب',
      gameInfo: 'بطاقة معلومات اللعبة',
      playersLabel: 'عدد اللاعبين',
      durationLabel: 'المدة',
      typeLabel: 'النوع',
      difficultyLabel: 'مستوى الصعوبة',
      backToGames: 'العودة إلى ألعاب PAIZO',
      previousGame: 'اللعبة السابقة',
      nextGame: 'اللعبة التالية',
      relatedGames: 'ألعاب قد تهمك',
      otherGames: 'استكشف ألعاباً وتجارب أخرى من PAIZO',
    },
    services: {
      tag: '// خدماتنا الأساسية',
      title: 'خدمات الاستوديو',
      subtitle: 'خدمات برمجية وبصرية متكاملة صُممت خصيصاً للشركات والمشاريع الحديثة.',
      viewAllServices: 'عرض جميع الخدمات',
      webDevTitle: 'تطوير المواقع والويب',
      webDevDesc: 'منصات ومواقع ويب عالية الأداء مبرمجة باستخدام Next.js و React و TypeScript.',
      mobileDevTitle: 'تطوير تطبيقات الموبايل',
      mobileDevDesc: 'تطبيقات موبايل احترافية لنظامي iOS و Android باستخدام Flutter و React Native.',
      uiUxTitle: 'تصميم الواجهات وتجربة المستخدم UI/UX',
      uiUxDesc: 'هندسة الواجهات، النماذج التفاعلية، وأنظمة التصميم القابلة للتوسع عبر Figma.',
      graphicDesignTitle: 'التصميم الجرافيكي',
      graphicDesignDesc: 'تصاميم مخصصة للنشر، الهويات الرقمية، والمواد البصرية الاحترافية.',
      videoEditingTitle: 'المونتاج وصناعة الفيديو',
      videoEditingDesc: 'تحرير الفيديو، المؤثرات البصرية، المؤثرات الصوتية، والفيديوهات الترويجية.',
      presentationTitle: 'تصميم العروض التقديمية',
      presentationDesc: 'عروض تقديمية احترافية للمستثمرين واجتماعات الإدارة لجذب الانتباه.',
      brandingTitle: 'بناء العلامة التجارية والهوية',
      brandingDesc: 'بناء الهوية البصرية الكاملة، الشعارات، ونظم الخطوط والألوان.',
      customSoftwareTitle: 'حلول برمجية خاصة',
      customSoftwareDesc: 'واجهات برمجية API، أتمتة خطوط العمل، قواعد البيانات، والأنظمة الداخلية.',
    },
    cta: {
      tag: '// تواصل معنا',
      heading: 'عندك فكرة؟ خلينا نبنيها.',
      subheading: 'تواصل مباشرة مع جون وجورج لتحويل فكرتك إلى منتج رقمي احترافي.',
      buttonText: 'ابدأ مشروعك الان',
    },
    footer: {
      tagline: 'صنعة // استوديو تكنولوجيا وإبداع',
      quickLinks: 'روابط سريعة',
      servicesTitle: 'الخدمات',
      contactTitle: 'التواصل المباشر',
      location: 'القاهرة، مصر // متاحون عالمياً',
      allRightsReserved: 'جميع الحقوق محفوظة.',
    },
    contact: {
      tag: '// بدء المشروع',
      title: 'فلنبنِ مشروعك معاً',
      subtitle: 'أخبرنا بتفاصيل مشروعك واحصل على استشارة برمجية مباشرة مع المؤسسين.',
      nameLabel: 'الاسم *',
      namePlaceholder: 'أحمد محمود',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'name@example.com',
      phoneLabel: 'الهاتف / واتساب *',
      phonePlaceholder: '01226806622',
      serviceLabel: 'الخدمة المطلوبة',
      budgetLabel: 'الميزانية التقديرية',
      messageLabel: 'تفاصيل المشروع *',
      messagePlaceholder: 'اشرح فكرة تطبيقك، الجدول الزمني، والمتطلبات الرئيسية...',
      submitButton: 'إرسال الطلب',
      submittingButton: 'جاري الإرسال...',
      successMessage: 'شكراً لك! تم إرسال رسالتك مباشرة إلى جون وجورج. وسنتواصل معك في أقرب وقت.',
      directContacts: 'تواصل مباشر مع المؤسسين',
    },
  },
}
