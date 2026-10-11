export type LangCode = 'en' | 'pt' | 'es' | 'ru';

export interface Translations {
  // Nav
  nav_openRuler: string;
  nav_about: string;
  nav_faq: string;
  nav_privacy: string;

  // Ruler toolbar
  ruler_dragHint: string;
  ruler_clear: string;
  ruler_calibrate: string;
  ruler_calibrated: string;

  // Calibration modal
  cal_title: string;
  cal_intro: string;
  cal_auto: string;
  cal_auto_desc: string;
  cal_diagonal: string;
  cal_diagonal_desc: string;
  cal_card: string;
  cal_card_desc: string;
  cal_detecting: string;
  cal_use: string;
  cal_back: string;
  cal_diagonal_label: string;
  cal_diagonal_placeholder: string;
  cal_calculate: string;
  cal_card_drag: string;
  cal_copy_link: string;

  // Home page
  home_h1: string;
  home_sub: string;
  home_calibrate_h2: string;
  home_auto_title: string;
  home_auto_desc: string;
  home_diag_title: string;
  home_diag_desc: string;
  home_card_title: string;
  home_card_desc: string;
  home_built_h2: string;
  home_twopoint_title: string;
  home_twopoint_desc: string;
  home_share_title: string;
  home_share_desc: string;
  home_privacy_label: string;
  home_privacy_desc: string;
  home_clientside_label: string;
  home_clientside_desc: string;
  home_free_label: string;
  home_free_desc: string;
  home_faq_h2: string;
  home_faq_more: string;

  // Footer
  footer_tagline: string;
  footer_product: string;
  footer_ruler: string;
  footer_calibration: string;
  footer_company: string;
  footer_privacy_note: string;

  // Keyboard shortcuts popover
  shortcuts_title: string;
  shortcut_unit: string;
  shortcut_guides: string;
  shortcut_fullscreen: string;
  shortcut_calibrate: string;
  shortcut_dark: string;
  shortcut_close: string;
}

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export const translations: Record<LangCode, Translations> = {
  en: {
    nav_openRuler: 'Open Ruler',
    nav_about: 'About',
    nav_faq: 'FAQ',
    nav_privacy: 'Privacy',

    ruler_dragHint: 'Drag anywhere to measure · press C to calibrate',
    ruler_clear: 'Clear',
    ruler_calibrate: 'Calibrate',
    ruler_calibrated: 'Calibrated',

    cal_title: 'Calibrate your screen',
    cal_intro: 'Pick a calibration method. This tells the ruler how many pixels equal a real-world inch on your screen.',
    cal_auto: 'Auto-Detect Device',
    cal_auto_desc: 'Guess from your screen size and pixel ratio',
    cal_diagonal: 'Screen Diagonal',
    cal_diagonal_desc: "Enter your display's diagonal size in inches",
    cal_card: 'Credit Card Calibration',
    cal_card_desc: 'Match a card outline to any real card',
    cal_detecting: 'Detecting…',
    cal_use: 'Use this calibration',
    cal_back: 'Back',
    cal_diagonal_label: 'Screen diagonal (inches)',
    cal_diagonal_placeholder: 'e.g. 13.3',
    cal_calculate: 'Calculate',
    cal_card_drag: 'Drag the slider until the outline exactly matches the width of any real credit/debit/ID card held up to your screen.',
    cal_copy_link: 'Copy shareable calibration link',

    home_h1: "An on-screen ruler that's actually the right size",
    home_sub: "Most online rulers guess your screen's pixel density and hope for the best. Online Ruler Scale calibrates to your exact display, so an inch on screen is an inch in real life.",
    home_calibrate_h2: 'Three ways to calibrate',
    home_auto_title: 'Auto-Detect Device',
    home_auto_desc: 'We fingerprint your screen size and pixel ratio against known devices and suggest a calibration instantly.',
    home_diag_title: 'Screen Diagonal',
    home_diag_desc: "Enter your display's diagonal size in inches and we compute pixels-per-inch geometrically.",
    home_card_title: 'Credit Card Calibration',
    home_card_desc: 'Hold up any ID-1 card — a credit card, license, or loyalty card — and match it to an on-screen outline.',
    home_built_h2: 'Built to be better',
    home_twopoint_title: 'Free two-point measurement',
    home_twopoint_desc: 'Drag anywhere on the page to measure between any two points — not just from a ruler\'s zero edge — with a live mm/cm/in/px readout.',
    home_share_title: 'Shareable calibration',
    home_share_desc: "Copy a calibration link and open it on another device, or send it to a teammate, to skip re-calibrating from scratch.",
    home_privacy_label: 'Privacy',
    home_privacy_desc: 'No accounts, no tracking, no analytics.',
    home_clientside_label: 'Client-side',
    home_clientside_desc: 'Runs entirely in your browser once loaded.',
    home_free_label: 'Free',
    home_free_desc: 'No paywalls, no watermarks, no limits.',
    home_faq_h2: 'Frequently asked questions',
    home_faq_more: 'See all FAQs →',

    footer_tagline: 'A free, calibrated on-screen ruler that measures real objects to actual size.',
    footer_product: 'Product',
    footer_ruler: 'Ruler tool',
    footer_calibration: 'Calibration',
    footer_company: 'Company',
    footer_privacy_note: 'No tracking. No account. 100% client-side — your measurements never leave your device.',

    shortcuts_title: 'Keyboard shortcuts',
    shortcut_unit: '1–4 switch unit',
    shortcut_guides: 'G clear guides',
    shortcut_fullscreen: 'F fullscreen',
    shortcut_calibrate: 'C calibrate',
    shortcut_dark: 'D dark mode',
    shortcut_close: 'Esc close',
  },

  pt: {
    nav_openRuler: 'Abrir Régua',
    nav_about: 'Sobre',
    nav_faq: 'Perguntas',
    nav_privacy: 'Privacidade',

    ruler_dragHint: 'Arraste para medir · pressione C para calibrar',
    ruler_clear: 'Limpar',
    ruler_calibrate: 'Calibrar',
    ruler_calibrated: 'Calibrado',

    cal_title: 'Calibre sua tela',
    cal_intro: 'Escolha um método de calibração. Isso diz à régua quantos pixels equivalem a uma polegada real na sua tela.',
    cal_auto: 'Detectar Dispositivo',
    cal_auto_desc: 'Estimar pelo tamanho da tela e proporção de pixels',
    cal_diagonal: 'Diagonal da Tela',
    cal_diagonal_desc: 'Insira o tamanho diagonal do seu monitor em polegadas',
    cal_card: 'Calibração por Cartão',
    cal_card_desc: 'Ajuste o contorno a qualquer cartão real',
    cal_detecting: 'Detectando…',
    cal_use: 'Usar esta calibração',
    cal_back: 'Voltar',
    cal_diagonal_label: 'Diagonal da tela (polegadas)',
    cal_diagonal_placeholder: 'ex: 13.3',
    cal_calculate: 'Calcular',
    cal_card_drag: 'Arraste o controle até que o contorno coincida exatamente com a largura de qualquer cartão real encostado na tela.',
    cal_copy_link: 'Copiar link de calibração',

    home_h1: 'Uma régua na tela com o tamanho certo de verdade',
    home_sub: 'A maioria das réguas online chuta a densidade de pixels da sua tela. O Online Ruler Scale calibra para o seu monitor exato, então uma polegada na tela é uma polegada na vida real.',
    home_calibrate_h2: 'Três formas de calibrar',
    home_auto_title: 'Detectar Dispositivo',
    home_auto_desc: 'Identificamos o tamanho e a proporção de pixels da sua tela e sugerimos uma calibração instantânea.',
    home_diag_title: 'Diagonal da Tela',
    home_diag_desc: 'Informe o tamanho diagonal do seu monitor em polegadas e calculamos os pixels por polegada.',
    home_card_title: 'Calibração por Cartão',
    home_card_desc: 'Encoste qualquer cartão ID-1 — crédito, habilitação ou fidelidade — e ajuste ao contorno na tela.',
    home_built_h2: 'Feito para ser melhor',
    home_twopoint_title: 'Medição de dois pontos livre',
    home_twopoint_desc: 'Arraste em qualquer lugar para medir entre dois pontos — não apenas a partir da borda zero — com leitura em mm/cm/in/px.',
    home_share_title: 'Calibração compartilhável',
    home_share_desc: 'Copie um link de calibração e abra em outro dispositivo, ou envie a um colega, para pular a recalibração.',
    home_privacy_label: 'Privacidade',
    home_privacy_desc: 'Sem contas, sem rastreamento, sem análises.',
    home_clientside_label: 'No navegador',
    home_clientside_desc: 'Funciona inteiramente no seu navegador após carregado.',
    home_free_label: 'Grátis',
    home_free_desc: 'Sem paywalls, sem marcas d\'água, sem limites.',
    home_faq_h2: 'Perguntas frequentes',
    home_faq_more: 'Ver todas as perguntas →',

    footer_tagline: 'Uma régua gratuita e calibrada na tela que mede objetos reais em tamanho real.',
    footer_product: 'Produto',
    footer_ruler: 'Régua',
    footer_calibration: 'Calibração',
    footer_company: 'Empresa',
    footer_privacy_note: 'Sem rastreamento. Sem conta. 100% no navegador — suas medições nunca saem do seu dispositivo.',

    shortcuts_title: 'Atalhos de teclado',
    shortcut_unit: '1–4 trocar unidade',
    shortcut_guides: 'G limpar guias',
    shortcut_fullscreen: 'F tela cheia',
    shortcut_calibrate: 'C calibrar',
    shortcut_dark: 'D modo escuro',
    shortcut_close: 'Esc fechar',
  },

  es: {
    nav_openRuler: 'Abrir Regla',
    nav_about: 'Acerca de',
    nav_faq: 'Preguntas',
    nav_privacy: 'Privacidad',

    ruler_dragHint: 'Arrastra para medir · pulsa C para calibrar',
    ruler_clear: 'Borrar',
    ruler_calibrate: 'Calibrar',
    ruler_calibrated: 'Calibrado',

    cal_title: 'Calibra tu pantalla',
    cal_intro: 'Elige un método de calibración. Esto le dice a la regla cuántos píxeles equivalen a una pulgada real en tu pantalla.',
    cal_auto: 'Detectar Dispositivo',
    cal_auto_desc: 'Estimar según el tamaño de pantalla y la proporción de píxeles',
    cal_diagonal: 'Diagonal de Pantalla',
    cal_diagonal_desc: 'Introduce el tamaño diagonal de tu monitor en pulgadas',
    cal_card: 'Calibración con Tarjeta',
    cal_card_desc: 'Ajusta el contorno a cualquier tarjeta real',
    cal_detecting: 'Detectando…',
    cal_use: 'Usar esta calibración',
    cal_back: 'Volver',
    cal_diagonal_label: 'Diagonal de pantalla (pulgadas)',
    cal_diagonal_placeholder: 'ej. 13.3',
    cal_calculate: 'Calcular',
    cal_card_drag: 'Arrastra el control hasta que el contorno coincida exactamente con el ancho de cualquier tarjeta real apoyada en la pantalla.',
    cal_copy_link: 'Copiar enlace de calibración compartible',

    home_h1: 'Una regla en pantalla del tamaño correcto de verdad',
    home_sub: 'La mayoría de las reglas en línea adivinan la densidad de píxeles de tu pantalla. Online Ruler Scale se calibra para tu monitor exacto, así que una pulgada en pantalla es una pulgada en la vida real.',
    home_calibrate_h2: 'Tres formas de calibrar',
    home_auto_title: 'Detectar Dispositivo',
    home_auto_desc: 'Identificamos el tamaño de pantalla y la proporción de píxeles y sugerimos una calibración al instante.',
    home_diag_title: 'Diagonal de Pantalla',
    home_diag_desc: 'Introduce el tamaño diagonal de tu monitor en pulgadas y calculamos los píxeles por pulgada.',
    home_card_title: 'Calibración con Tarjeta',
    home_card_desc: 'Pon cualquier tarjeta ID-1 — crédito, licencia o fidelidad — y ajústala al contorno en pantalla.',
    home_built_h2: 'Diseñado para ser mejor',
    home_twopoint_title: 'Medición libre de dos puntos',
    home_twopoint_desc: 'Arrastra en cualquier lugar para medir entre dos puntos — no solo desde el borde cero — con lectura en mm/cm/in/px.',
    home_share_title: 'Calibración compartible',
    home_share_desc: 'Copia un enlace de calibración y ábrelo en otro dispositivo, o compártelo con un compañero, para no tener que recalibrar.',
    home_privacy_label: 'Privacidad',
    home_privacy_desc: 'Sin cuentas, sin rastreo, sin análisis.',
    home_clientside_label: 'En el navegador',
    home_clientside_desc: 'Funciona completamente en tu navegador una vez cargado.',
    home_free_label: 'Gratis',
    home_free_desc: 'Sin paywalls, sin marcas de agua, sin límites.',
    home_faq_h2: 'Preguntas frecuentes',
    home_faq_more: 'Ver todas las preguntas →',

    footer_tagline: 'Una regla en pantalla gratuita y calibrada que mide objetos reales a tamaño real.',
    footer_product: 'Producto',
    footer_ruler: 'Regla',
    footer_calibration: 'Calibración',
    footer_company: 'Empresa',
    footer_privacy_note: 'Sin rastreo. Sin cuenta. 100% en el navegador — tus mediciones nunca salen de tu dispositivo.',

    shortcuts_title: 'Atajos de teclado',
    shortcut_unit: '1–4 cambiar unidad',
    shortcut_guides: 'G borrar guías',
    shortcut_fullscreen: 'F pantalla completa',
    shortcut_calibrate: 'C calibrar',
    shortcut_dark: 'D modo oscuro',
    shortcut_close: 'Esc cerrar',
  },

  ru: {
    nav_openRuler: 'Открыть линейку',
    nav_about: 'О нас',
    nav_faq: 'Вопросы',
    nav_privacy: 'Конфиденциальность',

    ruler_dragHint: 'Перетащите для измерения · нажмите C для калибровки',
    ruler_clear: 'Очистить',
    ruler_calibrate: 'Калибровать',
    ruler_calibrated: 'Откалибровано',

    cal_title: 'Калибровка экрана',
    cal_intro: 'Выберите метод калибровки. Это скажет линейке, сколько пикселей соответствует реальному дюйму на вашем экране.',
    cal_auto: 'Автоопределение устройства',
    cal_auto_desc: 'Оценка по размеру экрана и соотношению пикселей',
    cal_diagonal: 'Диагональ экрана',
    cal_diagonal_desc: 'Введите диагональ вашего дисплея в дюймах',
    cal_card: 'Калибровка по карте',
    cal_card_desc: 'Совместите контур с любой реальной картой',
    cal_detecting: 'Определение…',
    cal_use: 'Использовать калибровку',
    cal_back: 'Назад',
    cal_diagonal_label: 'Диагональ экрана (дюймы)',
    cal_diagonal_placeholder: 'напр. 13.3',
    cal_calculate: 'Вычислить',
    cal_card_drag: 'Перетащите ползунок, пока контур не совпадёт точно с шириной любой реальной карты, приложенной к экрану.',
    cal_copy_link: 'Скопировать ссылку на калибровку',

    home_h1: 'Экранная линейка правильного размера',
    home_sub: 'Большинство онлайн-линеек угадывают плотность пикселей вашего экрана. Online Ruler Scale калибруется под ваш конкретный дисплей, поэтому дюйм на экране — это дюйм в реальной жизни.',
    home_calibrate_h2: 'Три способа калибровки',
    home_auto_title: 'Автоопределение устройства',
    home_auto_desc: 'Мы анализируем размер и плотность пикселей вашего экрана и мгновенно предлагаем калибровку.',
    home_diag_title: 'Диагональ экрана',
    home_diag_desc: 'Введите диагональ дисплея в дюймах, и мы вычислим пиксели на дюйм геометрически.',
    home_card_title: 'Калибровка по карте',
    home_card_desc: 'Приложите любую карту ID-1 — кредитную, водительские права или карту лояльности — и совместите с контуром на экране.',
    home_built_h2: 'Создано быть лучше',
    home_twopoint_title: 'Свободное измерение двух точек',
    home_twopoint_desc: 'Перетащите в любом месте для измерения между двумя точками — не только от нулевого края — с показаниями в мм/см/дюймах/пикселях.',
    home_share_title: 'Общая калибровка',
    home_share_desc: 'Скопируйте ссылку на калибровку и откройте на другом устройстве или отправьте коллеге, чтобы пропустить повторную калибровку.',
    home_privacy_label: 'Конфиденциальность',
    home_privacy_desc: 'Без аккаунтов, без отслеживания, без аналитики.',
    home_clientside_label: 'На стороне клиента',
    home_clientside_desc: 'Работает полностью в вашем браузере после загрузки.',
    home_free_label: 'Бесплатно',
    home_free_desc: 'Без платных ограничений, без водяных знаков, без лимитов.',
    home_faq_h2: 'Часто задаваемые вопросы',
    home_faq_more: 'Все вопросы →',

    footer_tagline: 'Бесплатная откалиброванная экранная линейка для реальных измерений.',
    footer_product: 'Продукт',
    footer_ruler: 'Линейка',
    footer_calibration: 'Калибровка',
    footer_company: 'Компания',
    footer_privacy_note: 'Без отслеживания. Без аккаунта. 100% на стороне клиента — ваши измерения никогда не покидают устройство.',

    shortcuts_title: 'Горячие клавиши',
    shortcut_unit: '1–4 сменить единицу',
    shortcut_guides: 'G очистить направляющие',
    shortcut_fullscreen: 'F полный экран',
    shortcut_calibrate: 'C калибровка',
    shortcut_dark: 'D тёмный режим',
    shortcut_close: 'Esc закрыть',
  },
};

export const DEFAULT_LANG: LangCode = 'en';
