// Português de Portugal (pt-PT). Mesma forma que `en` (o tipo `Dictionary`
// garante que nenhuma chave fica por traduzir). Nomes próprios, tecnologias,
// nomes de projetos e títulos de funções usados no mercado em inglês
// (Front-End Developer, Design Engineer, Project Manager) mantêm-se.

import type { Dictionary } from "./en"

const pt: Dictionary = {
  meta: {
    title: "Daniela Silva — Programadora Front-End & Full-Stack",
    description:
      "Portefólio de Daniela Silva — programadora full-stack com foco no front-end, baseada no Porto. Trabalho selecionado em Next.js, React, Vue e Laravel.",
    cvTitle: "CV — Daniela Silva, Programadora Front-End",
    cvDescription:
      "Curriculum vitae de Daniela Silva, programadora front-end no Porto: experiência na Dyn-Link e na Bliss Applications, projetos, formação, prémios e competências.",
    notFoundTitle: "Página não encontrada — Daniela Silva",
    ogImageAlt: "Daniela Silva — Front-End Developer e Design Engineer",
    cvOgImageAlt: "Curriculum vitae — Daniela Silva",
  },

  breadcrumb: {
    label: "Navegação estrutural",
    home: "Início",
    cv: "CV",
  },

  nav: {
    language: "Idioma",
    languageNames: { en: "English", pt: "Português (Portugal)" },
    sections: "Navegação por secções",
    chapter: "Capítulo {num} — {label}",
    chapters: {
      home: "Início",
      work: "Trabalho",
      story: "Percurso",
      toolbox: "Ferramentas",
      offDuty: "Fora de Horas",
      contact: "Contacto",
    },
    skip: "Saltar para o conteúdo",
    backToTop: "Voltar ao topo",
    backToTopShort: "voltar ao topo",
  },

  loader: {
    hi: "Olá",
    name: "Sou a Daniela",
    findOut: "Descobre o que ando a fazer",
    roles: ["Front-End Developer", "Design Engineer"],
  },

  hero: {
    heading: "Daniela Silva — Front-End Developer e Design Engineer",
    intro:
      "Crio experiências web *centradas no utilizador*, aproximando a tecnologia das pessoas que a usam.",
    meta: {
      role: { label: "FUNÇÃO", value: "Front-End Developer · Design Engineer" },
      based: { label: "BASE", value: "Porto, Portugal" },
      status: { label: "ESTADO", value: "Disponível para novas oportunidades" },
      stack: { label: "STACK", value: "Next.js · React · Vue · Laravel" },
    },
  },

  projects: {
    eyebrow: "Trabalho Selecionado",
    stack: "stack",
    visitSite: "Visitar site",
    live: "online",
    inProgress: "em curso",
    previous: "Projeto anterior",
    next: "Projeto seguinte",
    goTo: "Ir para o projeto {n}: {title}",
    pause: "Pausar reprodução automática",
    resume: "Retomar reprodução automática",
    coverAlt: "Capa do projeto {title}",
    items: {
      twovest: {
        role: "Design UI/UX e Desenvolvimento Front-End",
        description:
          "Uma plataforma de moda em segunda mão pensada para tornar o consumo sustentável a escolha óbvia. Desenhei toda a experiência no Figma e depois desenvolvi a interface em Next.js, com o Supabase como base. Venceu dois prémios de design e execução.",
        awards: [
          { title: "Academy Award · Media Play", issuer: "Universidade de Aveiro, 2024" },
          { title: "Melhor Projeto 2023/2024", issuer: "Mindera × Mestrado" },
        ],
      },
      gomes: {
        role: "Web Design e Desenvolvimento",
        description:
          "Um site profissional para uma sociedade de advogados que precisava de transmitir credibilidade online. Pensado para a clareza — arquitetura de informação limpa, tipografia cuidada, responsivo em todos os breakpoints e calls-to-action claros que se traduziram num aumento mensurável de pedidos de contacto.",
        awards: [],
      },
      dogwarts: {
        role: "Desenvolvimento Full-Stack",
        description:
          "Um marketplace de cuidados caninos que liga donos de cães a prestadores de serviços. Interface baseada em perfis, desenvolvida com Next.js e TypeScript, com o Sanity CMS a gerir o conteúdo editorial. Atualmente em desenvolvimento ativo.",
        awards: [],
      },
    },
  },

  story: {
    eyebrow: "O Percurso",
    intertitle: "intertítulo",
    quote:
      "Aproximar a tecnologia da experiência do utilizador — criar soluções digitais tão cuidadas no uso como no aspeto.",
    bio: [
      "Olá — sou uma programadora full-stack júnior com forte orientação para o front-end. Crio experiências web atentas à pessoa do outro lado do ecrã e apoio-me na minha formação em design para o fazer bem.",
      "O meu percurso académico passa pelas tecnologias audiovisuais e pela comunicação web — por isso cheguei ao código já a pensar em composição, hierarquia e ritmo. Os estágios levaram isso mais longe: entregar software real, em equipas reais.",
    ],
    traits: ["Proativa", "Empática", "Colaborativa", "Inovadora"],
    chronology: "cronologia",
    pauseMotion: "Pausar o movimento da galeria",
    badges: { work: "trabalho", study: "formação" },
    timeline: {
      dyn: {
        title: "Full-Stack Developer · Project Manager",
        org: "Dyn-Link",
        location: "Aveiro, Portugal",
        years: "2025 - atual",
        bullets: [
          "Desenhei e lancei o Plan4Marketing — um SaaS multi-tenant com editor de emails drag-and-drop, campanhas e contactos, servido por uma única biblioteca de componentes para várias marcas de clientes.",
          "Liderei a migração do SEAC para uma arquitetura TypeScript orientada a componentes no Front-End e lancei uma integração com o Google Calendar.",
          "Recuperei uma integração com o Stripe que estava avariada no Scopphu — os pagamentos em produção estabilizaram.",
          "Assumi o papel de Project Manager do software principal da empresa, conduzindo workshops de produto para clientes internacionais.",
        ],
      },
      bliss: {
        title: "Estágio — Front-End Developer",
        org: "Bliss Applications",
        location: "Porto, Portugal",
        years: "2024 — 2025",
        bullets: [
          "Desenvolvi todos os blocos do site institucional, do design em Figma à produção pixel-perfect — Hero, Why Bliss, Where We've Been, escritório escandinavo, Quotes e Brands.",
          "Reconstruí o padrão de componente dos cartões de projeto nas páginas de Projetos, para garantir consistência e reutilização.",
          "Documentei cada implementação para manter a biblioteca de componentes sustentável para a equipa.",
        ],
      },
      digimedia: {
        title: "Investigação · Web Imersiva",
        org: "Centro de Investigação em Media Digitais e Interação",
        location: "Aveiro, Portugal",
        years: "2023 - 2024",
        bullets: [
          "Apresentei ao centro de investigação o conceito de educação em web imersiva e montei a base de código.",
          "Conduzi as entrevistas iniciais de investigação com utilizadores e defini os blocos da experiência de aprendizagem.",
          "Desenhei e prototipei o ambiente imersivo em VR da plataforma StudySphere. Apresentado no Students@DigiMedia#03.",
          "Realizei testes manuais de usabilidade em VR ao longo de toda a experiência.",
        ],
      },
      mctw: {
        title: "Mestrado em Comunicação e Tecnologias Web",
        org: "Universidade de Aveiro",
        location: "Aveiro, Portugal",
        years: "2023 - 2025",
        bullets: [
          "Foco em ambientes imersivos, design de interação e no lado humano da web.",
          "Onde a Twovest passou de um briefing a uma plataforma premiada — reconhecida 2× pelo design e pela execução.",
          "Onde treinei os instintos que me tornam útil na fronteira entre o design e o código.",
        ],
      },
      tcav: {
        title: "Licenciatura em Tecnologias da Comunicação Audiovisual",
        org: "Escola Superior de Media Artes e Design",
        location: "Vila do Conde, Portugal",
        years: "2020 - 2023",
        bullets: [
          "Onde nasceu o olhar para a composição — design, vídeo, fotografia, som.",
          "A base de todas as interfaces que construo hoje: timing, hierarquia, ritmo.",
        ],
      },
    },
  },

  toolbox: {
    eyebrow: "Ferramentas",
    groups: {
      frontend: {
        label: "Front-End",
        description:
          "A camada onde o detalhe encontra o código — componentes, animação e interfaces precisas ao píxel.",
      },
      design: {
        label: "Design & UX",
        description:
          "Onde o pensamento começa antes do código — investigação, protótipos e os sistemas que dão coesão a um produto.",
      },
      backend: {
        label: "Back-End & Ferramentas",
        description:
          "A estrutura que torna possível lançar — APIs, dados, deploys e os ambientes pelo meio.",
      },
      languages: {
        label: "Línguas",
        description: "Comunicar também é um ofício — para pessoas e para máquinas.",
      },
    },
    tools: {
      designSystems: "Sistemas de Design",
      componentLibraries: "Bibliotecas de Componentes",
      userResearch: "Investigação com Utilizadores",
      prototyping: "Prototipagem",
      accessibility: "Acessibilidade",
      portuguese: "Português (Nativo)",
      english: "Inglês (Profissional)",
    },
  },

  offDuty: {
    eyebrow: "Fora de Horas",
    title: "O que faço quando *não* estou a programar.",
    intro:
      "A versão curta de uma verdade mais longa: sou mais útil a uma equipa quando sou uma pessoa completa, e não apenas uma programadora. É aqui que vive o resto de mim.",
    volunteering: {
      eyebrow: "voluntariado · um valor, não uma nota de rodapé",
      text: "Recolha de alimentos com o Banco Alimentar Contra a Fome — a organizar e a reunir donativos para que ninguém à nossa volta passe fome.",
      location: "Porto, Portugal",
    },
    viewPortfolio: "Ver portefólio",
    photoAlt:
      "Capa do portefólio de fotografia da Daniela — 'Hello, welcome to my corner of the world'",
    featured: "destaque",
    pursuits: {
      photography: {
        name: "Fotografia",
        kicker: "prática visual · portefólio →",
        detail:
          "O olhar que levo para as interfaces vem de anos atrás de uma câmara. Enquadramentos, luz, a paciência para esperar pelo momento.",
      },
      football: {
        name: "Futebol",
        kicker: "4.ª divisão nacional",
        detail:
          "A competir a nível nacional — onde aprendi que uma equipa vence sempre as estrelas solitárias.",
      },
      padel: {
        name: "Padel",
        kicker: "ritual semanal",
        detail:
          "A outra raquete. Comecei entre sprints de desenvolvimento — trocas rápidas, reflexos mais apurados.",
      },
      music: {
        name: "Música",
        kicker: "@danizmusic",
        detail:
          "Canto. O outro sítio onde penso em timing, tom e no que o público precisa realmente de sentir.",
      },
    },
  },

  contact: {
    eyebrow: "Contacto",
    status: "Disponível para novas oportunidades",
    title: "Vamos construir *algo* que valha a pena lançar.",
    body: "Procuras uma front-end developer ou design engineer júnior que se preocupa com o detalhe? Adorava saber mais sobre a função, a equipa e o que estão a construir!",
    download: "download",
    cv: "Ver / Descarregar CV",
    channels: "canais",
    emailSubject: "Olá Daniela",
  },

  footer: {
    navLabel: "Site",
    development: "desenvolvimento",
    builtBy: "Desenhado e desenvolvido por Daniela Silva.",
    edition: "edição",
  },

  cv: {
    eyebrow: "curriculum vitae",
    tagline: "Design Engineer · Front-End Developer",
    download: "Descarregar CV em PDF",
    generating: "A gerar PDF…",
    downloadError: "Não foi possível descarregar o PDF. Tenta novamente.",
    pdfFilename: "Daniela_Silva_CV_PT.pdf",
    contactPortfolio: "portefólio",
    sections: {
      about: "sobre",
      experience: "experiência profissional",
      projects: "projetos",
      education: "formação",
      awards: "prémios",
      skills: "competências",
    },
    skillGroups: {
      frontend: "front-end",
      design: "design & UX",
      backend: "back-end & ferramentas",
      languages: "línguas",
    },
    about:
      "Front-End developer que pensa como designer e edita como realizadora. O meu percurso em audiovisual não é uma vida passada — é a forma como penso o timing, o ritmo e a hierarquia: os mesmos instintos que fazem uma cena resultar fazem um componente resultar. Desenvolvo interfaces pixel-perfect, orientadas a componentes, em Next.js, React e TypeScript, vivo no Figma e cuido dos detalhes que uma boa interação esconde: timing das animações, detalhe tipográfico, acessibilidade, transições de estado. Sinto-me em casa na fronteira entre o design e o código.",
    inProgress: "Em curso",
    experience: {
      dyn: {
        role: "Full-Stack Developer · Project Manager",
        company: "Dynamikfloat | Dyn-Link",
        date: "08/2025 — atual",
        location: "Aveiro, Portugal",
        bullets: [
          "Contribuí para vários projetos de desenvolvimento de software.",
          "Assumi o papel de Project Manager do software principal da empresa, liderando entregas para clientes internacionais.",
          "Integrei a equipa de suporte e conduzi workshops sobre todos os produtos de software da empresa para clientes internacionais.",
          "Reforcei competências de desenvolvimento Back-End com Laravel (APIs REST, lógica de negócio e interação com bases de dados) e usei o DBeaver para gerir dados.",
          "Trabalhei com Vue.js no Front-End para criar componentes e integrá-los com serviços de Back-End, ganhando experiência prática em fluxos full-stack, boas práticas e desenvolvimento em equipa.",
          "Fiz QA em vários projetos, preparei documentação técnica e de processos e colaborei com a equipa de design em pequenas tarefas, como newsletters e publicações para redes sociais.",
        ],
      },
      bliss: {
        role: "Estágio — Front-End Developer",
        company: "Bliss Applications",
        date: "12/2024 — 06/2025",
        location: "Porto, Portugal",
        bullets: [
          "Criei o site da empresa, que serviu de base à sua presença online e apresentou os seus serviços de forma eficaz.",
          "Desenvolvi o site com WordPress, PHP, Sass, HTML e JavaScript, respondendo a necessidades diversas e melhorando a visibilidade online da empresa.",
          "Melhorei a experiência de utilização e a funcionalidade, aumentando a satisfação e o envolvimento dos utilizadores.",
        ],
      },
      digimedia: {
        role: "Investigação em Ambientes Web Imersivos",
        company: "Centro de Investigação em Media Digitais e Interação",
        date: "11/2023 — 07/2024",
        location: "Aveiro, Portugal",
        bullets: [
          "Apresentei ao centro de investigação o conceito de educação em web imersiva e montei a base de código.",
          "Conduzi as entrevistas iniciais de investigação com utilizadores e defini os blocos da experiência de aprendizagem.",
          "Desenhei e prototipei o ambiente imersivo em VR da plataforma StudySphere. Apresentado no Students@DigiMedia#03.",
          "Realizei testes manuais de usabilidade em VR ao longo de toda a experiência.",
        ],
      },
    },
    projects: {
      twovest: {
        role: "Front-End Developer · UX/UI Designer",
        company: "Twovest",
        date: "07/2024",
        location: "Aveiro, Portugal",
        bullets: [
          "Conduzi entrevistas de UX para o primeiro protótipo e traduzi as conclusões num design system orientado a componentes para a plataforma.",
          "Desenhei e desenvolvi o slider da homepage, a página de Perfil e o Processo de Compra (front-end) — um dos principais fluxos de utilizador.",
          "Prototipei o backoffice (não lançado), a página de pontos de entrega, as páginas de marca e o fluxo de submissão de looks.",
          "Criei a landing page do MediaPlay Showcase e uma biblioteca de componentes reutilizáveis e precisos ao píxel.",
          "Implementei componentes como Front-End developer e fiz QA manual nas versões em produção.",
          "Apresentei o projeto aos professores, à equipa de engenharia da Mindera e ao público do Showcase — a história completa de um produto, da investigação ao lançamento.",
        ],
      },
      gomes: {
        role: "Front-End Developer · UX/UI Designer",
        company: "Website Gomes Rego & Associados",
        date: "12/2024",
        location: "Porto, Portugal",
        bullets: [
          "Desenhei e desenvolvi um site profissional centrado na credibilidade, com uma arquitetura de informação cuidada e orientada para a clareza.",
          "Implementei uma interface responsiva e rica em animação com Framer Motion — pixel-perfect em todos os breakpoints.",
          "Criei calls-to-action claros que se traduziram num aumento mensurável de pedidos de clientes.",
        ],
      },
      dogwarts: {
        role: "Full-Stack Developer",
        company: "Website Dogwarts",
        date: "08/2025",
        location: "Porto, Portugal",
        bullets: [
          "Website moderno para um serviço de cuidados caninos — construído com uma arquitetura orientada a componentes, pensada para escalar para mais categorias de serviço.",
          "Interface baseada em perfis (donos vs. prestadores), com o Sanity CMS a gerir o conteúdo editorial.",
        ],
      },
    },
    education: [
      {
        title: "Mestrado em Comunicação e Tecnologias Web",
        school: "Universidade de Aveiro",
        date: "09/2023 — 12/2025",
      },
      {
        title: "Licenciatura em Tecnologias da Comunicação Audiovisual",
        school: "Escola Superior de Media Artes e Design",
        date: "10/2020 — 07/2023",
      },
    ],
    awards: [
      {
        title: "Academy Award",
        issuer: "Universidade de Aveiro · 07/2024",
        detail:
          "Pelo projeto Twovest, em reconhecimento do contributo para a tecnologia de moda sustentável.",
      },
      {
        title: "Melhor Projeto 2023/2024",
        issuer: "Mindera · 07/2024",
        detail: "Pelo projeto Twovest, destacando a excelência em design e experiência do utilizador.",
      },
    ],
  },

  notFound: {
    eyebrow: "404",
    title: "Esta página não existe.",
    body: "O link pode estar errado ou a página pode ter mudado de sítio.",
    back: "Voltar ao início",
  },

  error: {
    eyebrow: "erro",
    title: "Algo correu mal.",
    body: "Ocorreu um erro inesperado ao carregar esta página.",
    retry: "Tentar novamente",
    back: "Voltar ao início",
  },
}

export default pt
