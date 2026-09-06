export type PaizoGameCategory = 'general' | 'study-games'

export interface HowToPlayStep {
  step: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
}

export interface PaizoGame {
  id: string
  slug: string
  category?: PaizoGameCategory
  name: string
  nameAr: string
  image: string
  galleryImages?: string[]
  shortDescription: string
  shortDescriptionAr: string
  about: string
  aboutAr: string
  players: string
  playersAr: string
  duration: string
  durationAr: string
  type: string
  typeAr: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  difficultyAr: string
  badge: string
  badgeAr: string
  howToPlay: HowToPlayStep[]
}

export const PAIZO_LOGO_URL = 'https://res.cloudinary.com/no25n6db/image/upload/v1788726034/paizo_logo_ghffgl.png'

export const paizoGames: PaizoGame[] = [
  {
    id: 'st-mime',
    slug: 'st-mime',
    category: 'general',
    name: 'ST / S.T MIME',
    nameAr: 'إس تي ميم (ST / S.T MIME)',
    image: 'https://res.cloudinary.com/no25n6db/image/upload/v1788725850/st_mime_w8covz.png',
    shortDescription: 'Fast-paced theatrical charades & mime challenge testing acting, speed, and teamwork.',
    shortDescriptionAr: 'تحدي ميم مسرحي سريع يختبر التمثيل والسرعة والعمل الجماعي.',
    about: 'ST / S.T MIME is a dynamic physical charades game created by PAIZO. Players act out saintly figures, historical events, or thematic clues without uttering a single word. It requires rapid lateral thinking, expressive body language, and strategic team communication under timer pressure.',
    aboutAr: 'لعبة إس تي ميم هي لعبة تمثيل صامت ديناميكية قمنا بتطويرها في بيزو. يقوم اللاعبون بتمثيل شخصيات تاريخية أو أحداث أو رموز بدون استخدام أي كلمات وسط أجواء من الحماس والتركيز والتواصل السريع بين أعضاء الفريق.',
    players: '4 – 20 Players (2 Teams)',
    playersAr: '٤ - ٢٠ لاعب (فريقين)',
    duration: '20 – 30 Mins',
    durationAr: '٢٠ - ٣٠ دقيقة',
    type: 'Mime / Charades / Team Challenge',
    typeAr: 'لعبة ميم / تمثيل / تحدي فرقي',
    difficulty: 'Medium',
    difficultyAr: 'متوسط',
    badge: 'Charades Challenge',
    badgeAr: 'تحدي التمثيل الصامت',
    howToPlay: [
      {
        step: '01',
        title: 'Team Formation',
        titleAr: 'تشكيل الفرق',
        description: 'Split all participants into two competing teams (Red vs Blue) and shuffle the master prompt deck.',
        descriptionAr: 'قسّم المشاركين إلى فريقين متنافسين (الأحمر والأزرق) وقم بخلط كروت التحديات.',
      },
      {
        step: '02',
        title: 'Actor Rotation',
        titleAr: 'اختيار الممثل',
        description: 'Each round, one player steps forward as the designated actor for their team.',
        descriptionAr: 'في كل جولة، يتقدم لاعب واحد لتمثيل الفريق وإيصال الفكرة بدون كلام.',
      },
      {
        step: '03',
        title: 'Strict Silent Rules',
        titleAr: 'قواعد الصمت التام',
        description: 'Strictly no speaking, mouth movements, sound effects, or pointing at physical items in the room.',
        descriptionAr: 'يُمنع التحدث أو إخراج أصوات أو الإشارة إلى عناصر موجودة الغرفة.',
      },
      {
        step: '04',
        title: '60-Second Blitz',
        titleAr: 'جولة الـ ٦٠ ثانية',
        description: 'The timer starts! The actor mimes as many prompt cards as possible before time expires. Correct guesses earn 1 point each.',
        descriptionAr: 'يبدأ الميقاتي! يمثل اللاعب أكبر عدد من الكروت قبل انتهاء الوقت. كل إجابة صحيحة تمنح نقطة.',
      },
      {
        step: '05',
        title: 'Victory Match',
        titleAr: 'إعلان الفائز',
        description: 'The team with the highest accumulated score after 5 complete rounds wins the ST Mime trophy.',
        descriptionAr: 'الفريق الذي يجمع أعلى عدد من النقاط بعد ٥ جولات يفوز بكأس اللعبة.',
      },
    ],
  },
  {
    id: 'tako',
    slug: 'tako',
    category: 'general',
    name: 'TAKO',
    nameAr: 'تاكو (TAKO)',
    image: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726020/tako_mkejzg.jpg',
    shortDescription: 'High-energy speed matching & rapid reaction challenge requiring instant focus and lightning reflexes.',
    shortDescriptionAr: 'تحدي سرعة وردود أفعال سريعة يتطلب تركيزاً استثنائياً واستجابة برقية.',
    about: 'TAKO is an addictive, fast-paced group game developed by PAIZO centered around speech-action matching. As cards are flipped in sequence, players chant the matching key terms. When spoken words match flipped cards, everyone must slap the central deck immediately!',
    aboutAr: 'تاكو هي لعبة حماسية وسريعة جداً قمنا بتطويرها في بيزو تعتمد على المطابقة السريعة بين الكلام والبطاقات. مع تقليب البطاقات بالتوالي ينطق اللاعبون الألفاظ، وعند حدوث مطابقة يجب على الجميع الاندفاع والضرب على الورق فوراً!',
    players: '3 – 10 Players',
    playersAr: '٣ - ١٠ لاعبين',
    duration: '15 – 25 Mins',
    durationAr: '١٥ - ٢٥ دقيقة',
    type: 'Reaction / Speed / Action',
    typeAr: 'لعبة سرعة / ردود أفعال / تفاعلية',
    difficulty: 'Easy',
    difficultyAr: 'سهل',
    badge: 'Speed Reaction',
    badgeAr: 'تحدي السرعة',
    howToPlay: [
      {
        step: '01',
        title: 'Deal the Deck',
        titleAr: 'توزيع الورق',
        description: 'Deal the complete TAKO card deck evenly to all players face-down into individual draw piles.',
        descriptionAr: 'وزع كامل كروت اللعبة بالتساوي على جميع اللاعبين وجههم لأسفل.',
      },
      {
        step: '02',
        title: 'Chant & Flip',
        titleAr: 'النطق والتقليب',
        description: 'Players take turns flipping their top card face-up into a central pile while chanting the TAKO word sequence in order.',
        descriptionAr: 'يتبادل اللاعبون الأدوار لتقليب الكرت الأعلى مع نطق الكلمة التالية في التسلسل.',
      },
      {
        step: '03',
        title: 'Match & Slap',
        titleAr: 'المطابقة والصفع',
        description: 'The instant the flipped card matches the chanted word, every player must slap the center pile as fast as possible!',
        descriptionAr: 'في اللحظة التي تتطابق فيها الكلمة مع الكرت، يجب على الجميع الضرب على الكروت فوراً!',
      },
      {
        step: '04',
        title: 'Penalty Collection',
        titleAr: 'عقوبة الأبطأ',
        description: 'The last player whose hand touches the pile receives all cards from the center stack and adds them to their personal deck.',
        descriptionAr: 'اللاعب الأبطأ في الضرب يأخذ كل الكروت المطروحة ويضعها أسفل كروته.',
      },
      {
        step: '05',
        title: 'Deck Elimination',
        titleAr: 'إنهاء الكروت',
        description: 'The first player to empty their deck AND successfully execute a final slap wins the game!',
        descriptionAr: 'أول لاعب ينهي جميع كروته وينفذ ضربة أخيرة بنجاح يكون هو الفائز!',
      },
    ],
  },
  {
    id: 'bible-mime',
    slug: 'bible-mime',
    category: 'general',
    name: 'Bible Mime',
    nameAr: 'ميم الكتاب المقدس (Bible Mime)',
    image: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726029/bible_mime_v6aom7.png',
    shortDescription: 'Expressive biblical charades & acting game bringing scripture stories and parables to life.',
    shortDescriptionAr: 'لعبة تمثيل صامت قصصية تجسد أحداث وشخصيات الكتاب المقدس بطريقة ممتعة.',
    about: 'Bible Mime combines theatrical creativity with spiritual knowledge. Designed for youth meetings and community gatherings, players act out famous parables, miracles, and historical events using gestures and physical expression.',
    aboutAr: 'لعبة ميم الكتاب المقدس تجمع بين الإبداع المسرحي والمعرفة الروحية. صُممت لاجتماعات الشباب واللقاءات الجماعية حيث يمثل اللاعبون المعجزات والأمثال والأحداث الشهيرة باستخدام حركات الجسد والتعبير الحركي.',
    players: '4 – 30 Players',
    playersAr: '٤ - ٣٠ لاعب',
    duration: '25 – 45 Mins',
    durationAr: '٢٥ - ٤٥ دقيقة',
    type: 'Story Mime / Group Activity',
    typeAr: 'تمثيل قصصي / نشاط جماعي',
    difficulty: 'Medium',
    difficultyAr: 'متوسط',
    badge: 'Scripture Storytelling',
    badgeAr: 'سرد قصصي حركي',
    howToPlay: [
      {
        step: '01',
        title: 'Team Setup',
        titleAr: 'تجهيز الفرق',
        description: 'Divide into equal teams and select a scripture category level (Miracles, Parables, Characters, Events).',
        descriptionAr: 'قسّم المشاركين لفرق متساوية واختر فئة التحدي (معجزات، أمثال، شخصيات، أحداث).',
      },
      {
        step: '02',
        title: 'Prompt Card Draw',
        titleAr: 'سحب كرت الفكرة',
        description: 'A designated team member draws a hidden scripture prompt card without revealing it to teammates.',
        descriptionAr: 'يسحب ممثل الفريق كرت الفكرة سراً دون إظهاره لباقي فريقه.',
      },
      {
        step: '03',
        title: 'Expressive Charades',
        titleAr: 'التمثيل الحركي',
        description: 'The player has 90 seconds to mime the scripture narrative using physical expressions, body posture, and space.',
        descriptionAr: 'يملك الممثل ٩٠ ثانية لتمثيل المفهوم بالحركة والجسد بدون نطق أي كلمات.',
      },
      {
        step: '04',
        title: 'Teammate Guesses',
        titleAr: 'تخمين الفريق',
        description: 'Teammates shout out guesses. The actor confirms correct elements using head nods or thumbs-up signals.',
        descriptionAr: 'يصيح باقي أعضاء الفريق بالتخمينات، ويوجههم الممثل بإشارات الرأس واليد.',
      },
      {
        step: '05',
        title: 'Scoring & Round Finale',
        titleAr: 'احتساب النقاط',
        description: 'Points are awarded based on difficulty and speed. The team with the highest score at the end of rounds wins!',
        descriptionAr: 'تُحتسب النقاط بناءً على صعوبة الفكرة والسرعة. الفريق صاحب أعلى نقاط يكون الفائز!',
      },
    ],
  },
  {
    id: 'team-work',
    slug: 'team-work',
    category: 'general',
    name: 'Team Work Game',
    nameAr: 'لعبة العمل الجماعي (Team Work Game)',
    image: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726042/team_work_game_pr1prg.jpg',
    shortDescription: 'Collaborative group puzzle and strategic team-building challenge testing coordination under time pressure.',
    shortDescriptionAr: 'تحدي ألغاز ومهمات جماعية يختبر التنسيق والتواصل الفعال بين الفريق.',
    about: 'The Team Work Game is a flagship PAIZO group experience engineered to foster deep trust, clear communication, and collective problem solving. Teams must navigate physical and intellectual obstacles that require every single member to contribute.',
    aboutAr: 'لعبة العمل الجماعي هي تجربة تفاعلية مميزة قمنا بتطويرها في بيزو لبناء روح الفريق والتواصل الفعال وتوزيع الأدوار. يتطلب كل لغز مشاركة وتنسيق جميع أعضاء الفريق للوصول للهدف.',
    players: '6 – 50 Players',
    playersAr: '٦ - ٥٠ لاعب',
    duration: '30 – 60 Mins',
    durationAr: '٣٠ - ٦٠ دقيقة',
    type: 'Collaborative / Team Building',
    typeAr: 'عمل جماعي / بناء فرق',
    difficulty: 'Hard',
    difficultyAr: 'متقدم',
    badge: 'Team Building',
    badgeAr: 'بناء وتكامل الفريق',
    howToPlay: [
      {
        step: '01',
        title: 'Squad Role Assignment',
        titleAr: 'توزيع الأدوار',
        description: 'Form multidisciplinary teams of 4–8 members and assign operational roles (Strategist, Builder, Navigator, Communicator).',
        descriptionAr: 'كوّن فرقاً من ٤-٨ مشاركين ووّزع عليهم الأدوار (مخطط، منفذ، موجّه، مسؤول تواصل).',
      },
      {
        step: '02',
        title: 'Mission Briefing',
        titleAr: 'شرح المهمة',
        description: 'Teams receive a complex master objective with restricted resources, puzzle clues, and strict time limits.',
        descriptionAr: 'يتسلم كل فريق ملف المهمة الرئيسية مع الألغاز والموارد المتاحة والوقت المحدد.',
      },
      {
        step: '03',
        title: 'Execution & Assembly',
        titleAr: 'التنفيذ والتركيب',
        description: 'Work together to solve interconnected sub-challenges, decode physical puzzles, and assemble solutions.',
        descriptionAr: 'يعمل الجميع معاً لحل الألغاز المتشابكة وتفكيك التحديات وتركيب الحل النهائي.',
      },
      {
        step: '04',
        title: 'Synchronized Actions',
        titleAr: 'التنسيق المتزامن',
        description: 'Key milestones require simultaneous action from all team members to unlock the final key.',
        descriptionAr: 'تتطلب المراحل الحاسمة تنفيذ حركات متزامنة من جميع أعضاء الفريق لفتح القفل.',
      },
      {
        step: '05',
        title: 'Debrief & Score',
        titleAr: 'التقييم والتكريم',
        description: 'Teams are evaluated on speed, operational efficiency, and team communication clarity.',
        descriptionAr: 'تُقيم الفرق بناءً على سرعة الإنجاز، كفاءة الأداء، ووضوح التواصل الجماعي.',
      },
    ],
  },
  {
    id: 'levit',
    slug: 'levit',
    category: 'study-games',
    name: 'Levit',
    nameAr: 'ليفيت',
    image: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726056/liveit_4_xa4ha2.png',
    galleryImages: [
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726057/liveit_1_tfcpja.png',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726067/liveit_7_rbsdrq.png',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726068/liveit_5_f4529l.png',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726069/liveit_6_wufnqn.png',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726075/liveit_8_vlygdr.png',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726075/liveit_2_qdcrri.png',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788726079/liveit_3_itbazf.png',
    ],
    shortDescription: 'Discover the depth and meaning of Christ’s sacrifice through Levit, a visual study of the Book of Leviticus.',
    shortDescriptionAr: 'اكتشف أعماق ذبيحة المسيح من خلال «ليفيت» في اللاويين. دراسة بصرية وروحية تبسط الذبائح الخمسة.',
    about: 'Discover the depth and meaning of Christ’s sacrifice through Levit, a visual study of the Book of Leviticus. Levit makes the Book of Leviticus easier to understand by exploring the five offerings in a visual and spiritual way. Each page breaks down one offering with clear points and illustrations that connect it to the cross of Christ, along with dedicated space for your personal reflections and notes. Inspired by the look and feel of ancient papyrus, Levit turns Bible study into an engaging journey of discovery. Get your pen ready and begin the journey.',
    aboutAr: 'اكتشف أعماق ذبيحة المسيح من خلال «ليفيت» في اللاويين. فهم اللاويين مش لازم يكون معقد! دراسة «ليفيت» من بايزو بتبسطلك الذبائح الخمسة في سفر اللاويين بطريقة بصرية وروحية. كل صفحة فيها ذبيحة مشروحة بالنقاط، مع رسوم توضيحية بتربطها بوضوح بصليب المسيح، ومكان واسع تكتب فيه تأملك الشخصي. تصميم مميز مستوحى من ورق البردي. جهز قلمك وابدأ رحلة الاكتشاف.',
    players: 'Individual / Group Study',
    playersAr: 'دراسة فردية أو جماعية',
    duration: 'Self-Paced / 45 Mins',
    durationAr: 'حسب رغبتك / ٤٥ دقيقة',
    type: 'Visual Bible Study',
    typeAr: 'دراسة كتابية بصرية',
    difficulty: 'Medium',
    difficultyAr: 'متوسط',
    badge: 'Leviticus Study',
    badgeAr: 'دراسة سفر اللاويين',
    howToPlay: [
      {
        step: '01',
        title: 'Understand the Offerings',
        titleAr: 'فهم الذبائح الخمسة',
        description: 'Explore the five Leviticus offerings summarized in clear bullet points and visual layouts.',
        descriptionAr: 'استكشف الذبائح الخمسة في سفر اللاويين المبسطة في نقاط دقيقة ورسوم بصرية.',
      },
      {
        step: '02',
        title: 'Connect to the Cross',
        titleAr: 'الربط بصليب المسيح',
        description: 'Examine visual illustrations explicitly connecting each ancient offering to the sacrifice of Christ.',
        descriptionAr: 'تأمل الرسوم التوضيحية التي تربط كل ذبيحة بوضوح بفداء وصليب المسيح.',
      },
      {
        step: '03',
        title: 'Papyrus Journaling',
        titleAr: 'التدوين والتأمل',
        description: 'Use the dedicated journaling section to write your personal spiritual reflections and insights.',
        descriptionAr: 'استخدم المساحات المخصصة في التصميم المستوحى من البردي لتسجيل تأملاتك الروحية.',
      },
      {
        step: '04',
        title: 'Group Discussion',
        titleAr: 'المناقشة الجماعية',
        description: 'Share and debate findings with youth meeting participants or study group members.',
        descriptionAr: 'شارِك وناقش الاستنتاجات والتأملات مع باقي أعضاء الاجتماع أو المجموعة.',
      },
    ],
  },
  {
    id: 'exodus',
    slug: 'exodus',
    category: 'study-games',
    name: 'Exodus',
    nameAr: 'إكسودوس',
    image: 'https://res.cloudinary.com/no25n6db/image/upload/v1788729307/exodos_2_hgkmsx.jpg',
    galleryImages: [
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729308/exodos_5_xgiydl.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729308/exodos_3_cvhvwb.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729309/exodos_6_jnkzov.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729312/exodos_7_nsh6n6.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729312/exodos_8_nj4ejp.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729314/exodos_9_si9ak5.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729315/exodos_10_sl3tgu.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729317/exodos_11_wyua1y.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729318/exodos_12_ydmosr.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729319/exodos_o6vhec.jpg',
      'https://res.cloudinary.com/no25n6db/image/upload/v1788729321/exodos1_zpgntp.jpg',
    ],
    shortDescription: 'Have you ever wondered about the meaning behind each of the Ten Plagues? In PAIZO’s Exodus study, we take the story to another level.',
    shortDescriptionAr: 'عمرك سألت نفسك إيه الحكمة ورا كل ضربة من الضربات العشرة؟ 🤔 في دراسة «إكسودوس» من بايزو، خدنا القصة ليفل تاني!',
    about: 'Have you ever wondered about the meaning behind each of the Ten Plagues? In PAIZO’s Exodus study, we take the story to another level. Each page explores one of the plagues and connects it to the gods of ancient Egypt, helping you understand the challenge Pharaoh and his people were facing — such as the plague of frogs and the challenge to the goddess Heqet. The design is inspired by ancient papyrus, with dedicated space for you to write your own reflections and notes. Get your pen ready and begin the journey!',
    aboutAr: 'عمرك سألت نفسك إيه الحكمة ورا كل ضربة من الضربات العشرة؟ 🤔 في دراسة «إكسودوس» (Exodus) من بايزو، خدنا القصة ليفل تاني! كل صفحة بتشرح ضربة، وبتربطها بآلهة المصريين القدماء عشان تفهم التحدي كان عامل إزاي، زي ضربة الضفادع وتحدي الإلهة حقت. التصميم متكلف على ستايل ورق البردي، وسايبين لك مساحة مخصوصة تكتب فيها تأملاتك وملاحظاتك براحتك. جهز قلمك وابدأ الرحلة!',
    players: 'Individual / Group Study',
    playersAr: 'دراسة فردية أو جماعية',
    duration: 'Self-Paced / 45 Mins',
    durationAr: 'حسب رغبتك / ٤٥ دقيقة',
    type: 'Visual Bible Study',
    typeAr: 'دراسة كتابية بصرية',
    difficulty: 'Medium',
    difficultyAr: 'متوسط',
    badge: 'Ten Plagues Study',
    badgeAr: 'دراسة الضربات العشرة',
    howToPlay: [
      {
        step: '01',
        title: 'Open the Study',
        titleAr: 'افتح الدراسة',
        description: 'Begin by opening the Exodus visual study guide inspired by papyrus art.',
        descriptionAr: 'ابدأ بفتح دليل دراسة إكسودوس البصري المستوحى من الفن البردي.',
      },
      {
        step: '02',
        title: 'Explore the Plagues',
        titleAr: 'استكشف الضربات',
        description: 'Read through each plague page and discover its connection to ancient Egyptian deities.',
        descriptionAr: 'اقرأ صفحات الضربات واستكشف ارتباط كل ضربة بآلهة المصريين القدماء.',
      },
      {
        step: '03',
        title: 'Reflect & Write',
        titleAr: 'تأمل واكتب',
        description: 'Use the dedicated notes section to record your personal insights and spiritual reflections.',
        descriptionAr: 'استخدم المساحة المخصصة للتدوين لتسجيل تأملاتك الشخصية وملاحظاتك الروحية.',
      },
      {
        step: '04',
        title: 'Share in Groups',
        titleAr: 'شارِك في المجموعات',
        description: 'Discuss findings with your youth group or Bible study circle for deeper community learning.',
        descriptionAr: 'ناقش الاستنتاجات مع مجموعتك الدراسية لتبادل الخبرات والنمو الروحي.',
      },
    ],
  },
]

export const generalPaizoGames = paizoGames.filter((g) => g.category !== 'study-games')
export const studyPaizoGames = paizoGames.filter((g) => g.category === 'study-games')
