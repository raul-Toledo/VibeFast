// ============================================================
// VibeFast · config.js
// ------------------------------------------------------------
// ESTE ES EL ARCHIVO MÁS IMPORTANTE DEL BOILERPLATE.
// Todo el branding, copy, features y configuración del producto vive aquí.
// Cambiar este archivo cambia el producto entero — sin abrir JSX.
//
// Estructura:
//   - app:      identidad del producto (nombre, descripción, dominio, color)
//   - features: toggles para encender/apagar funcionalidades
//   - ai:       configuración de OpenAI
//   - email:    configuración de Resend
//   - auth:     providers habilitados
//   - landing:  copy de la página pública
//   - pricing:  planes (si features.payments está activo)
//
// Tip Sem 1: empieza editando `app` y `landing.hero` con los datos de tu producto.
// ============================================================

const config = {
  // -----------------------------------------------------------
  // Identidad del producto
  // -----------------------------------------------------------
  app: {
    name: "Yobby",
    description:
      "Marketplace que conecta hogares en Chihuahua con técnicos verificados como plomeros y electricistas. Contrata de forma segura con pagos por Mercado Pago y decisiones basadas en reputación.",
    domain: "yobby.mx", // sin https://, sin www
    locale: "es", // "es" | "en"
    // URL pública: usa NEXT_PUBLIC_APP_URL en .env. En este config solo definimos el default.
    defaultUrl: "http://localhost:3000",
  },

  // -----------------------------------------------------------
  // Identidad visual
  // -----------------------------------------------------------
  brand: {
    // Color primario en HEX. DaisyUI lo aplica como --color-primary via theme.
    primary: "#FF8C00", // Perfil Cliente (Primario)
    
    // Paleta de colores Yobby
    background: "#FFFDF5", // Fondo Base (Global)
    clientSecondary: "#FFEDD5", // Perfil Cliente (Secundario)
    clientAccent: "#10B981", // Perfil Cliente (Acento)
    techPrimary: "#0068E6", // Perfil Técnico (Primario)
    techSecondary: "#DBEAFE", // Perfil Técnico (Secundario)
    techAccent: "#8B5CF6", // Perfil Técnico (Acento)
    textMain: "#334155", // Texto Principal

    // Logo: puede ser texto o ruta a /public/logo.svg
    logoText: "Yobby",
    logoSrc: null,
    // Estilo del bordeado global (DaisyUI usa esto para botones, cards)
    radius: "1rem",
  },

  // -----------------------------------------------------------
  // Toggles de features — encienden/apagan rutas y componentes
  // -----------------------------------------------------------
  features: {
    waitlist: true, // Captura emails en landing — Sem 1
    googleAuth: true, // Login con Google — Sem 2
    emailLogin: false, // Magic link email — opcional
    aiChat: true, // Chat AI en /chat — Sem 3
    toolUse: true, // Tool use registry — Sem 4
    agents: true, // LangGraph agents — Sem 5
    mcp: true, // Servidor MCP en /api/mcp — Sem 5
    rag: false, // RAG con pgvector — opcional
    posthog: false, // Tracking — opcional
    resend: true, // Email — Sem 1+
    pricing: true, // Muestra la sección de precios en la landing (vitrina; el cobro real es `payments`)
    payments: false, // Stripe — opcional, fuera del temario
    hardware: false, // ESP-Claw bridge — Sem 8
  },

  // -----------------------------------------------------------
  // OpenAI
  // -----------------------------------------------------------
  ai: {
    chatModel: "gpt-4o-mini", // default barato y rápido
    structuredModel: "gpt-4o-mini",
    agentModel: "gpt-4o", // los agentes razonan mejor con full gpt-4o
    embeddingModel: "text-embedding-3-small",
    maxTokens: 1500,
    temperature: 0.4,
  },

  // -----------------------------------------------------------
  // Resend (email transaccional)
  // -----------------------------------------------------------
  email: {
    // Asegúrate de tener el dominio verificado en Resend antes de cambiar `from`.
    // En desarrollo Resend permite enviar a tu propio correo desde `onboarding@resend.dev`.
    from: "Yobby <onboarding@resend.dev>",
    replyTo: "hola@yobby.mx",
    supportEmail: "soporte@yobby.mx",
  },

  // -----------------------------------------------------------
  // Auth providers
  // -----------------------------------------------------------
  auth: {
    loginUrl: "/login",
    afterLoginUrl: "/dashboard",
    afterLogoutUrl: "/",
    providers: ["google"], // se sincroniza con features.googleAuth / emailLogin
  },

  // -----------------------------------------------------------
  // Landing — todo el copy de la página pública
  // -----------------------------------------------------------
  landing: {
    nav: [
      { label: "Características", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "Preguntas", href: "#faq" },
      { label: "Docs", href: "/docs" },
    ],
    hero: {
      eyebrow: "Encuentra al experto ideal",
      title: "Contrata técnicos de confianza para tu hogar en Chihuahua de forma segura.",
      subtitle:
        "Conectamos tu hogar con plomeros y electricistas verificados, con pagos protegidos mediante Mercado Pago y reputación comprobada.",
      cta: { label: "Agendar ahora", href: "#waitlist" },
      ctaSecondary: { label: "Ver servicios", href: "#features" },
    },
    problem: {
      eyebrow: "El problema",
      title: "La incertidumbre al contratar servicios para el hogar.",
      subtitle:
        "Es difícil saber en quién confiar cuando abres la puerta de tu casa a un desconocido.",
      items: [
        {
          icon: "ShieldAlert",
          title: "Falta de confianza",
          body: "No sabes a quién estás contratando ni si su trabajo será de calidad.",
        },
        {
          icon: "Wallet",
          title: "Riesgos en el pago",
          body: "Temor a pagar por adelantado y que el técnico no termine el trabajo o lo haga mal.",
        },
        {
          icon: "Search",
          title: "Difícil de encontrar",
          body: "Perder tiempo buscando recomendaciones en lugar de tener expertos validados al instante.",
        },
      ],
    },
    features: {
      eyebrow: "Nuestra solución",
      title: "Tranquilidad garantizada en cada servicio.",
      subtitle: "Un marketplace diseñado pensando en tu seguridad y confianza.",
      items: [
        {
          icon: "ShieldCheck",
          title: "Técnicos Verificados (KYC)",
          body: "Todos nuestros técnicos pasan por un riguroso proceso de verificación de identidad para tu tranquilidad.",
        },
        {
          icon: "CreditCard",
          title: "Pagos Seguros",
          body: "Tu dinero está protegido con Mercado Pago hasta que el trabajo se complete satisfactoriamente.",
        },
        {
          icon: "Star",
          title: "Reputación Real",
          body: "Toma decisiones informadas basándote en reseñas y calificaciones de otros clientes en tu ciudad.",
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que todo cliente pregunta antes de agendar.",
      items: [
        {
          q: "¿Cómo funciona la garantía del pago seguro?",
          a: "Tu pago se retiene de forma segura con Mercado Pago. Solo se libera al técnico cuando confirmas que el trabajo se realizó correctamente.",
        },
        {
          q: "¿Qué pasa si el técnico no hace un buen trabajo?",
          a: "Si el servicio no cumple con lo acordado, nuestro sistema de pagos protegidos te permite solicitar una revisión y el reembolso de tu dinero.",
        },
        {
          q: "¿Cómo verifican a los técnicos?",
          a: "Realizamos un proceso de validación de identidad (KYC) exhaustivo, comprobando sus credenciales y antecedentes antes de permitirles ofrecer servicios.",
        },
        {
          q: "¿Puedo ver las opiniones de otros clientes?",
          a: "Sí, el perfil de cada técnico muestra calificaciones y reseñas reales dejadas por otros usuarios, ayudándote a elegir por su reputación.",
        },
      ],
    },
    socialProof: {
      text: "Con la confianza de hogares y profesionales en Chihuahua",
      logos: ["Mercado Pago", "Stripe"],
    },
    testimonials: {
      eyebrow: "Prueba social",
      title: "Lo que dicen nuestros clientes.",
      subtitle: "Historias reales de hogares y técnicos en Chihuahua.",
      items: [
        {
          quote:
            "Tenía miedo de contratar un plomero sin conocerlo, pero con Yobby vi sus reseñas y todo fue súper seguro. El trabajo quedó excelente.",
          author: "María G.",
          role: "Cliente",
        },
        {
          quote:
            "Saber que mi dinero estaba protegido por Mercado Pago me dio la tranquilidad que necesitaba para agendar una reparación eléctrica.",
          author: "Carlos T.",
          role: "Cliente",
        },
        {
          quote:
            "Como técnico, esta app me ha ayudado a conseguir clientes que valoran mi trabajo gracias a mis buenas calificaciones.",
          author: "Javier R.",
          role: "Electricista",
        },
      ],
    },
    finalCta: {
      eyebrow: "Tu turno",
      title: "Tu hogar en las mejores manos.",
      subtitle:
        "Agenda hoy mismo a un técnico confiable y olvídate de las preocupaciones.",
      cta: { label: "Agendar ahora", href: "#waitlist" },
      ctaSecondary: { label: "Soy técnico", href: "/docs" },
    },
    waitlist: {
      eyebrow: "Únete primero",
      title: "Sé de los primeros en enterarte.",
      subtitle: "Te avisamos cuando estemos disponibles en tu zona.",
      successMessage: "¡Listo! Te avisamos en cuanto haya novedades.",
      buttonLabel: "Quiero entrar",
      placeholder: "tu@email.com",
    },
    footer: {
      tagline: "El marketplace de servicios para el hogar más confiable de Chihuahua.",
      columns: [
        {
          title: "Producto",
          links: [
            { label: "Características", href: "#features" },
            { label: "Precios", href: "#pricing" },
            { label: "Preguntas", href: "#faq" },
          ],
        },
        {
          title: "Recursos",
          links: [
            { label: "Términos", href: "/terms" },
            { label: "Privacidad", href: "/privacy" },
          ],
        },
        {
          title: "Comunidad",
          links: [
            { label: "Facebook", href: "#", external: true },
            { label: "Instagram", href: "#", external: true },
          ],
        },
      ],
      // Compat: links planos usados en el bar inferior
      links: [
        { label: "Términos", href: "/terms" },
        { label: "Privacidad", href: "/privacy" },
      ],
    },
  },

  // -----------------------------------------------------------
  // Pricing — vitrina de planes.
  // Se muestra en la landing si features.pricing === true.
  // El cobro real (Stripe) depende de features.payments.
  // -----------------------------------------------------------
  pricing: {
    eyebrow: "Precios",
    title: "Simple y transparente.",
    subtitle: "Paga solo lo justo, sin costos ocultos.",
    plans: [
      {
        id: "cliente",
        name: "Clientes",
        price: 0,
        currency: "MXN",
        interval: "mes",
        description: "Encuentra y contrata profesionales gratis.",
        features: ["Búsqueda de técnicos", "Pagos protegidos", "Reseñas verificadas"],
        cta: "Crear cuenta",
      },
      {
        id: "tecnico",
        name: "Técnicos",
        price: 15,
        currency: "%",
        interval: "por servicio",
        description: "Para profesionales que buscan más clientes.",
        features: ["Perfil verificado (KYC)", "Garantía de cobro", "Más clientes"],
        cta: "Registrarme",
        highlighted: true,
        stripePriceId: "", // llenar cuando se active payments
      },
    ],
  },
}

export default config
