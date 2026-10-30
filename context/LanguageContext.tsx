import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'fr-cd' | 'en-us' | 'pt-br';

export interface Translations {
  // Navigation & General
  navHome: string;
  navSearch: string;
  navTrail: string;
  navDownloads: string;
  navProfile: string;
  navLogout: string;
  navAboutAcademy: string;
  navStartNow: string;

  // Landing Page
  heroTitle1: string;
  heroSubtitle1: string;
  heroDesc1: string;
  heroBadge1: string;
  
  heroTitle2: string;
  heroSubtitle2: string;
  heroDesc2: string;

  heroTitle3: string;
  heroSubtitle3: string;
  heroDesc3: string;

  accessAccount: string;
  fillProfessionalCredentials: string;
  emailLabel: string;
  passwordLabel: string;
  loginButton: string;
  forgotPassword: string;
  newStudentPrompt: string;
  createAccount: string;

  ecosystemTitle: string;
  ecosystemSubtitle: string;
  ecosystemDesc: string;
  
  forEnterprise: string;
  forEnterpriseDesc: string;
  forGov: string;
  forGovDesc: string;
  forCreators: string;
  forCreatorsDesc: string;

  featuredCourses: string;
  techInnovation: string;
  techInnovationSubtitle: string;
  sustainabilityClimate: string;
  sustainabilityClimateSubtitle: string;
  viewAll: string;

  devicesTitle: string;
  devicesSubtitle: string;
  devicesDesc: string;

  faqTitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;

  // Categories
  catTech: string;
  catSust: string;
  catGest: string;
  catEdu: string;
  catLang: string;
  catBio: string;

  exploreCategory: string;
  upcomingCategoryTitle: string;
  upcomingCategoryMessage: string;
  understoodBtn: string;

  // Course Details / Funnel
  instructorLabel: string;
  durationLabel: string;
  certificationLabel: string;
  enrollNow: string;
  startLessons: string;
  officialCertificationBadge: string;
  beginnerLevel: string;
  aiTuteurBtn: string;

  tabSummary: string;
  tabLessons: string;
  tabMaterials: string;
  tabQuiz: string;
  tabAITutor: string;

  modulesTitle: string;
  lessonsTitle: string;
  downloadMaterials: string;
  quizTitle: string;

  // Checkout Modal
  checkoutTitle: string;
  checkoutSubtitle: string;
  orderSummary: string;
  studentNameLabel: string;
  studentEmailLabel: string;
  studentPhoneLabel: string;
  paymentMethod: string;
  mobileMoneyRdc: string;
  creditCard: string;
  bankTransfer: string;
  confirmEnrollment: string;
  processing: string;
  successTitle: string;
  successMessage: string;
  startStudyingNow: string;

  // AI Tutor
  aiTutorTitle: string;
  aiTutorSubtitle: string;
  aiTutorCourseLocked: string;
  aiTutorWelcome: string;
  aiTutorInputPlaceholder: string;

  // Profile Settings
  profileTitle: string;
  settingsTitle: string;
  languageSettingTitle: string;
  languageSettingDesc: string;
}

const translations: Record<LanguageCode, Translations> = {
  'fr-cd': {
    navHome: 'Accueil',
    navSearch: 'Recherche',
    navTrail: 'Mon Parcours',
    navDownloads: 'Téléchargements',
    navProfile: 'Profil',
    navLogout: 'Déconnexion',
    navAboutAcademy: 'À PROPOS DE L\'ACADEMY',
    navStartNow: 'COMMENCER MAINTENANT',

    heroTitle1: 'TRANSFORMATION DIGITALE & CLIMATIQUE DE L\'AFRIQUE',
    heroSubtitle1: 'Souveraineté & Avenir',
    heroDesc1: 'L\'Amanitech Academy est la plateforme éducative de l\'AMANITECH – Technology and Sustainability, dédiée à former le capital humain qui conduira la transformation digitale et climatique de la République Démocratique du Congo et du continent africain.',
    heroBadge1: 'Amanitech Academy • Exclusif',

    heroTitle2: 'ADAPTIVE LEARNING & ADAPTIVE STREAMING',
    heroSubtitle2: 'Innovation Pédagogique',
    heroDesc2: 'Nous combinons des parcours personnalisés selon votre profil et votre rythme avec la technologie d\'adaptive streaming garantissant un accès ininterrompu aux cours même en zones à connectivité réduite.',

    heroTitle3: 'ÉCONOMIE VERTE & SOUVERAINETÉ ÉCOLOGIQUE',
    heroSubtitle3: 'Bassin du Congo',
    heroDesc3: 'Formation certifiante aux marchés du carbone, aux normes ESG, au leadership vert et aux technologies émergentes pour faire de la RDC le leader mondial du climat.',

    accessAccount: 'ACCÉDER À VOTRE COMPTE',
    fillProfessionalCredentials: 'Renseignez vos identifiants professionnels',
    emailLabel: 'EMAIL PROFESSIONNEL',
    passwordLabel: 'MOT DE PASSE',
    loginButton: 'SE CONNECTER',
    forgotPassword: 'Mot de passe oublié ?',
    newStudentPrompt: 'Nouvel apprenant ?',
    createAccount: 'Créer un compte',

    ecosystemTitle: 'Écosystème Éducatif',
    ecosystemSubtitle: 'Complet & Innovant',
    ecosystemDesc: 'La plateforme Amanitech Academy transcende le simple streaming vidéo. Elle constitue un environnement d\'apprentissage intégré articulant technologie adaptative et formation professionnelle.',

    forEnterprise: 'Pour les Entreprises',
    forEnterpriseDesc: 'Déploiement d\'universités d\'entreprise sur mesure. Formez vos collaborateurs avec des parcours personnalisés.',
    forGov: 'Gouvernement & Secteur Public',
    forGovDesc: 'Programmes de formation massive pour la jeunesse et les agents de l\'État en RDC avec métriques d\'impact auditables.',
    forCreators: 'Créateurs & Enseignants',
    forCreatorsDesc: 'Monétisez et distribuez votre savoir auprès de milliers d\'apprenants à travers la RDC et l\'Afrique.',

    featuredCourses: 'Formations en Vedette',
    techInnovation: 'Technologie et Innovation',
    techInnovationSubtitle: 'Compétences digitales de pointe pour les nouveaux défis africains',
    sustainabilityClimate: 'Sustentabilité, Climat et Économie Verde',
    sustainabilityClimateSubtitle: 'Crédits carbone, ESG et leadership environnemental dans le Bassin du Congo',
    viewAll: 'Voir tout →',

    devicesTitle: 'Aprenda onde e quando quiser',
    devicesSubtitle: 'Adaptive Streaming Multi-Dispositif',
    devicesDesc: 'Sur smartphone, tablette, ordinateur portable ou Smart TV. L\'Amanitech Academy ajuste automatiquement la qualité vidéo et synchronise votre progression.',

    faqTitle: 'Foire Aux Questions',
    faq1Q: 'Qu\'est-ce que l\'Amanitech Academy ?',
    faq1A: 'L\'Amanitech Academy est la plateforme éducative de l\'AMANITECH dédiée à former le capital humain pour la transformation digitale et climatique de la RDC et de l\'Afrique.',
    faq2Q: 'Que sont l\'Adaptive Learning et l\'Adaptive Streaming ?',
    faq2A: 'L\'Adaptive Learning personnalise votre parcours d\'apprentissage. L\'Adaptive Streaming adapte la vidéo à votre connexion et permet le téléchargement hors-ligne.',
    faq3Q: 'Les formations délivrent-elles des certificats officiels ?',
    faq3A: 'Oui. Chaque formation complétée délivre un certificat numérique officiel vérifiable.',

    catTech: 'Technologie et Innovation',
    catSust: 'Sustentabilité, Climat et Économie Verde',
    catGest: 'Gestion & Affaires',
    catEdu: 'Éducation Professionnelle',
    catLang: 'Langues & Affaires',
    catBio: 'Bioéconomie & Production',

    exploreCategory: 'Explorer par Domaine Stratégique',
    upcomingCategoryTitle: 'Formation en cours de production',
    upcomingCategoryMessage: 'Nous produisons actuellement de nouvelles formations pour ce domaine. Elles seront très bientôt disponibles !',
    understoodBtn: 'Compris',

    instructorLabel: 'Formateur / Expert',
    durationLabel: 'Durée Recommandée',
    certificationLabel: 'Certification Officielle',
    enrollNow: 'S\'INSCRIRE MAINTENANT',
    startLessons: 'COMMENCER LE COURS',
    officialCertificationBadge: 'Certificat Officiel AMANITECH Academy',
    beginnerLevel: 'Niveau Débutant',
    aiTuteurBtn: 'Tuteur IA Gemini',

    tabSummary: '📋 Sommaire Complet (Programme)',
    tabLessons: '🎬 Leçons Vidéo & Modules',
    tabMaterials: '📄 Documents & Supports',
    tabQuiz: '✍️ Évaluations & Quiz',
    tabAITutor: '✨ Tuteur IA Gemini',

    modulesTitle: 'Modules de Formation',
    lessonsTitle: 'Leçons Vidéo',
    downloadMaterials: 'Télécharger les Supports PDF',
    quizTitle: 'Évaluation des Connaissances',

    checkoutTitle: 'S\'inscrire à la Formation',
    checkoutSubtitle: 'Accès instantané à l\'Amanitech Academy & Certification Officielle',
    orderSummary: 'Récapitulatif de votre Inscription',
    studentNameLabel: 'Nom & Prénom complet',
    studentEmailLabel: 'Email professionnel',
    studentPhoneLabel: 'Numéro de Téléphone (Mobile Money)',
    paymentMethod: 'Mode de Paiement',
    mobileMoneyRdc: 'Mobile Money RDC (M-Pesa, Orange, Airtel, Afrimoney)',
    creditCard: 'Carte Bancaire (Visa / Mastercard)',
    bankTransfer: 'Virement / Versement Bancaire',
    confirmEnrollment: 'Valider l\'Inscription & Accéder au Cours',
    processing: 'Traitement sécurisé en cours...',
    successTitle: 'Inscription Validée avec Succès !',
    successMessage: 'Bienvenue dans la communauté Amanitech Academy. Votre accès est désormais actif.',
    startStudyingNow: 'Commencer à étudier maintenant',

    aiTutorTitle: 'Tuteur IA Gemini',
    aiTutorSubtitle: 'Assistant Pédagogique Officiel Amanitech Academy',
    aiTutorCourseLocked: 'Focus Pédagogique Exclusif sur ce Cours',
    aiTutorWelcome: 'Bonjour ! Je suis votre Tuteur IA Gemini dédié exclusivement à cette formation. Posez-moi vos questions sur les leçons, les concepts ou les études de cas !',
    aiTutorInputPlaceholder: 'Posez votre question sur cette formation...',

    profileTitle: 'Profil de l\'Apprenant',
    settingsTitle: 'Paramètres de la Plateforme',
    languageSettingTitle: 'Choix de la Langue',
    languageSettingDesc: 'Sélectionnez la langue d\'affichage de la plateforme Amanitech Academy'
  },

  'pt-br': {
    navHome: 'Início',
    navSearch: 'Buscar',
    navTrail: 'Minha Trilha',
    navDownloads: 'Downloads',
    navProfile: 'Perfil',
    navLogout: 'Sair',
    navAboutAcademy: 'SOBRE A ACADEMY',
    navStartNow: 'COMEÇAR AGORA',

    heroTitle1: 'TRANSFORMAÇÃO DIGITAL & CLIMÁTICA DA ÁFRICA',
    heroSubtitle1: 'Soberania & Futuro',
    heroDesc1: 'A Amanitech Academy é a plataforma educacional da AMANITECH – Technology and Sustainability, dedicada a formar o capital humano que conduzirá a transformação digital e climática da República Democrática do Congo e do continente africano.',
    heroBadge1: 'Amanitech Academy • Exclusivo',

    heroTitle2: 'ADAPTIVE LEARNING & ADAPTIVE STREAMING',
    heroSubtitle2: 'Inovação Pedagógica',
    heroDesc2: 'Combinamos trilhas personalizadas conforme seu perfil e ritmo com tecnologia de adaptive streaming que garante acesso ininterrompto às aulas mesmo em áreas de conectividade reduzida.',

    heroTitle3: 'ECONOMIA VERDE & SOBERANIA ECOLÓGICA',
    heroSubtitle3: 'Bacia do Congo',
    heroDesc3: 'Formação certificada em mercados de carbono, normas ESG, liderança verde e tecnologias emergentes para posicionar o Congo como líder climático global.',

    accessAccount: 'ACCÉDER À VOTRE COMPTE',
    fillProfessionalCredentials: 'Preencha suas credenciais profissionais',
    emailLabel: 'EMAIL PROFISSIONAL',
    passwordLabel: 'SENHA',
    loginButton: 'ENTRAR NA PLATAFORMA',
    forgotPassword: 'Esqueceu a senha?',
    newStudentPrompt: 'Novo estudante?',
    createAccount: 'Criar uma conta',

    ecosystemTitle: 'Ecossistema Educacional',
    ecosystemSubtitle: 'Completo & Inovador',
    ecosystemDesc: 'A plataforma Amanitech Academy vai além do streaming de vídeo. É um ambiente de aprendizagem integrado articulando tecnologia adaptativa e qualificação profissional.',

    forEnterprise: 'Para Empresas',
    forEnterpriseDesc: 'Universidades corporativas sob medida. Capacite suas equipes com métricas de desempenho em tempo real.',
    forGov: 'Governo & Setor Público',
    forGovDesc: 'Programas de capacitação massiva para jovens e servidores públicos na RDC com métricas auditáveis.',
    forCreators: 'Criadores & Professores',
    forCreatorsDesc: 'Monetize e distribua seu conhecimento para milhares de alunos na RDC e em toda a África.',

    featuredCourses: 'Cursos em Destaque',
    techInnovation: 'Tecnologia e Inovação',
    techInnovationSubtitle: 'Competências digitais de ponta para os novos desafios africanos',
    sustainabilityClimate: 'Sustentabilidade, Clima e Economia Verde',
    sustainabilityClimateSubtitle: 'Créditos de carbono, ESG e liderança ambiental na Bacia do Congo',
    viewAll: 'Ver todos →',

    devicesTitle: 'Aprenda onde e quando quiser',
    devicesSubtitle: 'Adaptive Streaming Multi-Dispositivo',
    devicesDesc: 'No smartphone, tablet, laptop ou Smart TV. A Amanitech Academy ajusta automaticamente a qualidade do vídeo e sincroniza seu progresso.',

    faqTitle: 'Perguntas Frequentes',
    faq1Q: 'O que é a Amanitech Academy?',
    faq1A: 'A Amanitech Academy é a plataforma educacional da AMANITECH dedicada a formar o capital humano para a transformação digital e climática da RDC e da África.',
    faq2Q: 'O que são Adaptive Learning e Adaptive Streaming?',
    faq2A: 'O Adaptive Learning personaliza sua trilha de estudo. O Adaptive Streaming ajusta o vídeo à sua conexão e permite downloads para estudar offline.',
    faq3Q: 'Os cursos emitem certificados oficiais?',
    faq3A: 'Sim. Cada curso concluído emite um certificado digital oficial com validação criptográfica.',

    catTech: 'Tecnologia e Inovação',
    catSust: 'Sustentabilidade, Clima e Economia Verde',
    catGest: 'Gestão & Negócios',
    catEdu: 'Educação Profissional',
    catLang: 'Idiomas & Negócios',
    catBio: 'Bioeconomia & Produção',

    exploreCategory: 'Explorar por Área Estratégica',
    upcomingCategoryTitle: 'Curso em Produção',
    upcomingCategoryMessage: 'Estamos produzindo e em breve vamos estar disponibilizando mais cursos nesta categoria!',
    understoodBtn: 'Entendido',

    instructorLabel: 'Conteudista / Formador',
    durationLabel: 'Carga Horária Sugerida',
    certificationLabel: 'Certificação Oficial',
    enrollNow: 'MATRICULAR-SE AGORA',
    startLessons: 'ASSISTIR AULAS',
    officialCertificationBadge: 'Certificação AMANITECH Academy',
    beginnerLevel: 'Nível Iniciante',
    aiTuteurBtn: 'Tutor IA Gemini',

    tabSummary: '📋 Sumário Completo (Ementa)',
    tabLessons: '🎬 Videoaulas & Módulos',
    tabMaterials: '📄 Materiais & Apostilas',
    tabQuiz: '✍️ Avaliações & Quiz',
    tabAITutor: '✨ Tutor IA Gemini',

    modulesTitle: 'Módulos do Curso',
    lessonsTitle: 'Videoaulas',
    downloadMaterials: 'Baixar Materiais PDF',
    quizTitle: 'Avaliação de Aprendizado',

    checkoutTitle: 'Matricular-se no Curso',
    checkoutSubtitle: 'Acesso instantâneo à Amanitech Academy & Certificação Oficial',
    orderSummary: 'Resumo da sua Matrícula',
    studentNameLabel: 'Nome Completo',
    studentEmailLabel: 'E-mail Profissional',
    studentPhoneLabel: 'Número de Telefone (Mobile Money)',
    paymentMethod: 'Forma de Pagamento',
    mobileMoneyRdc: 'Mobile Money RDC (M-Pesa, Orange, Airtel, Afrimoney)',
    creditCard: 'Cartão de Crédito (Visa / Mastercard)',
    bankTransfer: 'Transferência / Depósito Bancário',
    confirmEnrollment: 'Confirmar Matrícula & Acessar Curso',
    processing: 'Processando pagamento com segurança...',
    successTitle: 'Matrícula Confirmada com Sucesso!',
    successMessage: 'Bem-vindo à Amanitech Academy. Seu acesso ao curso foi liberado.',
    startStudyingNow: 'Começar a estudar agora',

    aiTutorTitle: 'Tutor IA Gemini',
    aiTutorSubtitle: 'Assistente Pedagógico Oficial Amanitech Academy',
    aiTutorCourseLocked: 'Foco Pedagógico Exclusivo Neste Curso',
    aiTutorWelcome: 'Olá! Sou o seu Tutor IA Gemini dedicado exclusivamente a este curso. Tire suas dúvidas sobre as aulas, conceitos e estudos de caso!',
    aiTutorInputPlaceholder: 'Faça sua pergunta sobre este curso...',

    profileTitle: 'Perfil do Estudante',
    settingsTitle: 'Configurações da Plataforma',
    languageSettingTitle: 'Idioma do Sistema',
    languageSettingDesc: 'Selecione o idioma de exibição da plataforma Amanitech Academy'
  },

  'en-us': {
    navHome: 'Home',
    navSearch: 'Search',
    navTrail: 'My Learning Trail',
    navDownloads: 'Downloads',
    navProfile: 'Profile',
    navLogout: 'Logout',
    navAboutAcademy: 'ABOUT THE ACADEMY',
    navStartNow: 'START NOW',

    heroTitle1: 'AFRICA\'S DIGITAL & CLIMATE TRANSFORMATION',
    heroSubtitle1: 'Sovereignty & Future',
    heroDesc1: 'Amanitech Academy is the educational platform of AMANITECH – Technology and Sustainability, dedicated to training human capital to lead digital and climate transformation in the Democratic Republic of Congo and Africa.',
    heroBadge1: 'Amanitech Academy • Exclusive',

    heroTitle2: 'ADAPTIVE LEARNING & ADAPTIVE STREAMING',
    heroSubtitle2: 'Pedagogical Innovation',
    heroDesc2: 'We combine personalized learning trails adapted to your pace and goals with adaptive streaming technology ensuring uninterrupted access to lessons even in low-connectivity areas.',

    heroTitle3: 'GREEN ECONOMY & ECOLOGICAL SOVEREIGNTY',
    heroSubtitle3: 'Congo Basin',
    heroDesc3: 'Certified training in carbon markets, ESG standards, green leadership, and emerging technologies to establish DRC as a global climate leader.',

    accessAccount: 'ACCESS YOUR ACCOUNT',
    fillProfessionalCredentials: 'Enter your professional credentials',
    emailLabel: 'PROFESSIONAL EMAIL',
    passwordLabel: 'PASSWORD',
    loginButton: 'LOG IN TO PLATFORM',
    forgotPassword: 'Forgot password?',
    newStudentPrompt: 'New student?',
    createAccount: 'Create an account',

    ecosystemTitle: 'Educational Ecosystem',
    ecosystemSubtitle: 'Comprehensive & Innovative',
    ecosystemDesc: 'Amanitech Academy goes beyond simple video streaming. It provides an integrated learning environment combining adaptive tech and professional skills.',

    forEnterprise: 'For Enterprise',
    forEnterpriseDesc: 'Custom corporate academy deployments. Train your workforce with real-time skill metrics.',
    forGov: 'Government & Public Sector',
    forGovDesc: 'Massive capacity-building programs for youth and civil servants in DRC with auditable impact metrics.',
    forCreators: 'Instructors & Creators',
    forCreatorsDesc: 'Monetize and distribute your knowledge to thousands of learners across DRC and Africa.',

    featuredCourses: 'Featured Courses',
    techInnovation: 'Technology and Innovation',
    techInnovationSubtitle: 'Cutting-edge digital skills for new African challenges',
    sustainabilityClimate: 'Sustainability, Climate and Green Economy',
    sustainabilityClimateSubtitle: 'Carbon credits, ESG, and environmental leadership in the Congo Basin',
    viewAll: 'View all →',

    devicesTitle: 'Learn anytime, anywhere',
    devicesSubtitle: 'Multi-Device Adaptive Streaming',
    devicesDesc: 'On smartphone, tablet, laptop, or Smart TV. Amanitech Academy automatically adjusts video quality and syncs your learning progress.',

    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'What is Amanitech Academy?',
    faq1A: 'Amanitech Academy is the educational platform of AMANITECH dedicated to training human capital for DRC and Africa\'s digital and climate transformation.',
    faq2Q: 'What are Adaptive Learning and Adaptive Streaming?',
    faq2A: 'Adaptive Learning personalizes your learning path. Adaptive Streaming adjusts video quality to your internet speed and enables offline downloads.',
    faq3Q: 'Do courses issue official certificates?',
    faq3A: 'Yes. Every completed course awards an official digital certificate with cryptographic verification.',

    catTech: 'Technology and Innovation',
    catSust: 'Sustainability, Climate and Green Economy',
    catGest: 'Management & Business',
    catEdu: 'Professional Education',
    catLang: 'Languages & Business',
    catBio: 'Bioeconomy & Production',

    exploreCategory: 'Explore by Strategic Area',
    upcomingCategoryTitle: 'Course in Production',
    upcomingCategoryMessage: 'We are producing new courses for this category. They will be available very soon!',
    understoodBtn: 'Understood',

    instructorLabel: 'Instructor / Expert',
    durationLabel: 'Recommended Duration',
    certificationLabel: 'Official Certification',
    enrollNow: 'ENROLL NOW',
    startLessons: 'START LESSONS',
    officialCertificationBadge: 'Official AMANITECH Academy Certification',
    beginnerLevel: 'Beginner Level',
    aiTuteurBtn: 'Gemini AI Tutor',

    tabSummary: '📋 Full Syllabus',
    tabLessons: '🎬 Video Lessons & Modules',
    tabMaterials: '📄 Documents & Handouts',
    tabQuiz: '✍️ Assessments & Quiz',
    tabAITutor: '✨ Gemini AI Tutor',

    modulesTitle: 'Course Modules',
    lessonsTitle: 'Video Lessons',
    downloadMaterials: 'Download Handouts (PDF)',
    quizTitle: 'Knowledge Assessment',

    checkoutTitle: 'Enroll in Course',
    checkoutSubtitle: 'Instant access to Amanitech Academy & Official Certification',
    orderSummary: 'Order Summary',
    studentNameLabel: 'Full Name',
    studentEmailLabel: 'Professional Email',
    studentPhoneLabel: 'Phone Number (Mobile Money)',
    paymentMethod: 'Payment Method',
    mobileMoneyRdc: 'DRC Mobile Money (M-Pesa, Orange, Airtel, Afrimoney)',
    creditCard: 'Credit Card (Visa / Mastercard)',
    bankTransfer: 'Bank Transfer / Deposit',
    confirmEnrollment: 'Confirm Enrollment & Start Course',
    processing: 'Processing payment securely...',
    successTitle: 'Enrollment Successfully Confirmed!',
    successMessage: 'Welcome to Amanitech Academy. Your access has been activated.',
    startStudyingNow: 'Start Studying Now',

    aiTutorTitle: 'Gemini AI Tutor',
    aiTutorSubtitle: 'Official Amanitech Academy Learning Assistant',
    aiTutorCourseLocked: 'Exclusive Pedagogical Focus on This Course',
    aiTutorWelcome: 'Hello! I am your Gemini AI Tutor dedicated exclusively to this course. Ask me anything about the lessons, concepts, or case studies!',
    aiTutorInputPlaceholder: 'Ask a question about this course...',

    profileTitle: 'Student Profile',
    settingsTitle: 'Platform Settings',
    languageSettingTitle: 'System Language',
    languageSettingDesc: 'Select the display language for Amanitech Academy'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('amanitech_language') || localStorage.getItem('cerclehub_language');
    if (saved === 'en-us' || saved === 'pt-br' || saved === 'fr-cd') return saved as LanguageCode;
    return 'fr-cd'; // Congolese French default as requested
  });

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem('amanitech_language', code);
    localStorage.setItem('cerclehub_language', code);
  };

  useEffect(() => {
    // Listen for custom language events if triggered anywhere
    const handleStorageChange = () => {
      const saved = localStorage.getItem('amanitech_language');
      if (saved && (saved === 'en-us' || saved === 'pt-br' || saved === 'fr-cd')) {
        setLanguageState(saved as LanguageCode);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = translations[language] || translations['fr-cd'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      language: 'fr-cd',
      setLanguage: () => {},
      t: translations['fr-cd']
    };
  }
  return context;
};
