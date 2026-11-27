import { TripDay } from "@/utils/types/viagens";

export const grandeSertaoDays: TripDay[] = [
  {
    slug: "dia-01",
    dayNumber: 1,
    phaseId: "fase-1",
    dayType: "ride",
    date: "2027-01-11",
    title: "A Gênese do Amor e a Adaptação",
    origin: "Pirapora",
    destination: "Ibiaí",
    waypoints: ["Pirapora", "Barra do Guaicuí", "Ibiaí"],
    summary:
      "Largada às margens do Velho Chico passando pelo encontro das águas em Barra do Guaicuí até a chegada em Ibiaí.",
    plannedDistanceMeters: 85500,
    plannedElevationGain: 526,
    plannedGpxFile: "/gpx/sertao/VEREDAS - DIA 1.gpx",
    externalRoutes: {
      stravaUrl: "#",
      googleMapsUrl: "https://www.google.com/maps/dir/Pirapora,+MG/Barra+do+Guaicuí,+Várzea+da+Palma+-+MG/Ibiaí,+MG",
    },
    sunAndMoon: {
      sunrise: "05:32",
      sunset: "18:41",
      moonPhase: "Crescente Fina (4%)",
      moonNote: "Céu escuro nas madrugadas.",
    },
    literaryHistory:
      'Barra do Guaicuí ("Guararavacã") é onde Riobaldo descobre seu amor por Diadorim. A Igreja de Pedras com a gameleira marca o avanço da bandeira de Fernão Dias. Relatos locais de Richard Burton (1867).',
    accommodationCity: "Ibiaí",
    accommodations: [
      {
        name: "Manos Hotel",
        price: "R$ 100,00",
        breakfastIncluded: true,
        contact: "Instagram",
      },
      {
        name: "Gomes Hotel",
        price: "R$ 125,00",
        breakfastIncluded: true,
        contact: "Instagram",
      },
    ],
    stravaWorkoutIds: [],
    highlights: [
      "Encontro dos rios das Velhas e São Francisco",
      "Igreja de Pedras com a gameleira em Barra do Guaicuí",
      "Estradões ribeirinhos até Ibiaí",
    ],
    photos: [],
  },
  {
    slug: "dia-02",
    dayNumber: 2,
    phaseId: "fase-1",
    dayType: "ride",
    date: "2027-01-12",
    title: "O Mar de Terra Batida e a Alma Barranqueira",
    origin: "Ibiaí",
    destination: "São Romão",
    waypoints: ["Ibiaí", "Ponto Chique", "São Romão"],
    summary:
      "Travessia plana e extensa pelo sertão barranqueiro passando por Ponto Chique rumo ao histórico porto de São Romão.",
    plannedDistanceMeters: 81200,
    plannedElevationGain: 325,
    plannedGpxFile: "/gpx/sertao/VEREDAS - DIA 2.gpx",
    externalRoutes: {
      stravaUrl: "#",
      googleMapsUrl: "https://www.google.com/maps/dir/Ibiaí,+MG/Ponto+Chique,+MG/São+Romão,+MG",
    },
    sunAndMoon: {
      sunrise: "05:33",
      sunset: "18:41",
      moonPhase: "Crescente Inicial (11%)",
    },
    literaryHistory:
      'A travessia do "mar de terra batida" de Guimarães Rosa e Darcy Ribeiro. São Romão (1668) era o porto militar que ligava São Paulo à Bahia.',
    accommodationCity: "São Romão",
    accommodations: [
      {
        name: "Hotel São Geraldo",
        price: "R$ 100,00",
        breakfastIncluded: true,
        contact: "Instagram",
      },
      {
        name: "Hotel Caminhos das Pedras",
        price: "R$ 100,00",
        breakfastIncluded: false,
        contact: "Instagram",
      },
      {
        name: "Hotel São Lucas",
        price: "R$ 120,00",
        breakfastIncluded: true,
        contact: "WhatsApp: (38) 99973-9963",
      },
      {
        name: "Hotel Beira Rio",
        price: "R$ 120,00",
        breakfastIncluded: true,
        contact: "Instagram",
      },
    ],
    stravaWorkoutIds: [],
    highlights: [
      "Travessia por Ponto Chique",
      "Chegada ao histórico porto fluvial de São Romão (1668)",
    ],
    photos: [],
  },
  {
    slug: "dia-03",
    dayNumber: 3,
    phaseId: "fase-1",
    dayType: "ride",
    date: "2027-01-13",
    title: "A Etapa Rainha e o Território de Fartura",
    origin: "São Romão",
    destination: "Januária",
    waypoints: [
      "São Romão",
      "Povoado de Nova Aparecida",
      "São Francisco",
      "Januária",
    ],
    summary:
      "Etapa mais longa da expedição (141,2 km), iniciando antes do amanhecer com travessia do Rio São Francisco de voadeira.",
    plannedDistanceMeters: 141200,
    plannedElevationGain: 802,
    plannedGpxFile: "/gpx/sertao/VEREDAS - DIA 3.gpx",
    externalRoutes: {
      stravaUrl: "#",
      googleMapsUrl: "https://www.google.com/maps/dir/São+Romão,+MG/São+Francisco,+MG/Januária,+MG",
    },
    sunAndMoon: {
      sunrise: "05:34",
      sunset: "18:42",
      moonPhase: "Crescente (20%)",
      moonNote: "Céu estrelado para a travessia noturna.",
    },
    logisticsNote:
      "Logística da Madrugada: Travessia particular do Rio São Francisco em voadeira às 05:00 da manhã.",
    literaryHistory:
      "Januária é a terra da fartura jagunça e berço de Manuel Ambrósio, historiador cujos registros inspiraram o vocabulário de Rosa.",
    accommodationCity: "Januária",
    accommodationNote: "Base fixa para os Dias 3, 4 e 5 (3 diárias).",
    accommodations: [
      {
        name: "Hotel Velho Chico",
        price: "R$ 80,00 (vent.) / R$ 120,00 (ar)",
        breakfastIncluded: true,
        contact: "Instagram",
      },
      {
        name: "Sobradinho Hostel",
        price: "R$ 90,00",
        breakfastIncluded: false,
        contact: "Instagram",
      },
      {
        name: "Hotel Brilhante Januária",
        price: "R$ 100,00 (vent.) / R$ 140,00 (ar)",
        breakfastIncluded: true,
        contact: "Instagram",
      },
      {
        name: "Hotel Hawai",
        price: "R$ 160,00 (cartão) / R$ 150,00 (Pix/dinheiro)",
        breakfastIncluded: true,
        contact: "Instagram",
      },
      {
        name: "Pousada Passaredo",
        price: "R$ 160,00 (cartão) / R$ 150,00 (Pix/dinheiro)",
        breakfastIncluded: true,
        contact: "Instagram",
      },
      {
        name: "Hotel Paraguassú",
        price: "R$ 160,00 (cartão) / R$ 150,00 (Pix/dinheiro)",
        breakfastIncluded: true,
        contact: "Instagram",
      },
    ],
    stravaWorkoutIds: [],
    highlights: [
      "Travessia de voadeira às 05:00 da manhã",
      "141,2 km rumo à capital do Médio São Francisco",
    ],
    photos: [],
  },
  {
    slug: "dia-04",
    dayNumber: 4,
    phaseId: "fase-2",
    dayType: "immersion",
    date: "2027-01-14",
    title: "Recuperação Ativa e Arqueologia",
    origin: "Januária (Base)",
    destination: "PARNA Cavernas do Peruaçu",
    summary:
      "Primeiro dia de imersão sem bike no Parque Nacional Cavernas do Peruaçu, explorando sítios rupestres monumentais.",
    plannedDistanceMeters: 0,
    plannedElevationGain: 0,
    sunAndMoon: {
      sunrise: "05:34",
      sunset: "18:42",
      moonPhase: "Crescente (30%)",
    },
    logisticsNote:
      "Saída a partir da hospedagem escolhida em Januária com Transfer + Guia credenciado.",
    attractions: ["Lapa Bonita", "Lapa dos Desenhos", "Lapa do Boquete"],
    stravaWorkoutIds: [],
    highlights: [
      "Arte rupestre na Lapa dos Desenhos",
      "Trilhas arqueológicas da Lapa Bonita e Lapa do Boquete",
    ],
    photos: [],
  },
  {
    slug: "dia-05",
    dayNumber: 5,
    phaseId: "fase-2",
    dayType: "immersion",
    date: "2027-01-15",
    title: "O Grande Clímax Monumental",
    origin: "Januária (Base)",
    destination: "Gruta do Janelão (Peruaçu)",
    summary:
      "Segundo dia de imersão no cânion do Peruaçu visitando as maiores claraboias e galerias subterrâneas do parque.",
    plannedDistanceMeters: 0,
    plannedElevationGain: 0,
    sunAndMoon: {
      sunrise: "05:35",
      sunset: "18:42",
      moonPhase: "Quarto Crescente (41%)",
    },
    logisticsNote:
      "Base em Januária com Transfer + Guia. Preparação da bike à noite para a retomada do pedal na 3ª Fase.",
    attractions: ["Lapa do Índio", "Gruta do Janelão"],
    stravaWorkoutIds: [],
    highlights: [
      "Clarabóias e salões monumentais da Gruta do Janelão",
      "Lapa do Índio",
    ],
    photos: [],
  },
  {
    slug: "dia-06",
    dayNumber: 6,
    phaseId: "fase-3",
    dayType: "ride",
    date: "2027-01-16",
    title: "O Paredão e as Raízes do Coronelismo",
    origin: "Januária",
    destination: "Tatu",
    waypoints: [
      "Januária",
      "Pedras de Maria da Cruz",
      "Lontra",
      "Angicos de Minas",
      "Tatu",
    ],
    summary:
      "Retomada do pedal deixando o vale do São Francisco e encarando a maior altimetria acumulada da viagem (+1.545 m).",
    plannedDistanceMeters: 99700,
    plannedElevationGain: 1545,
    plannedGpxFile: "/gpx/sertao/VEREDAS - DIA 6.gpx",
    externalRoutes: {
      stravaUrl: "#",
    },
    sunAndMoon: {
      sunrise: "05:36",
      sunset: "18:43",
      moonPhase: "Gibosa Crescente (53%)",
    },
    literaryHistory:
      "O trajeto cruza Pedras de Maria da Cruz (revolta de 1736 liderada pela matriarca contra os impostos da Coroa).",
    stravaWorkoutIds: [],
    highlights: [
      "Subida do paredão rumo ao Alto Cerrado (+1.545 m)",
      "Passagem histórica por Pedras de Maria da Cruz",
    ],
    photos: [],
  },
  {
    // TODO: adicionar GPX (arquivo VEREDAS - DIA 7.gpx ainda não disponível)
    slug: "dia-07",
    dayNumber: 7,
    phaseId: "fase-3",
    dayType: "ride",
    date: "2027-01-17",
    title: "A Chegada à Terra das Contendas (Brasília de Minas)",
    origin: "Tatu",
    destination: "Brasília de Minas",
    waypoints: ["Tatu", "Brasília de Minas"],
    summary:
      "Deslocamento curto de 10,5 km concluindo a chegada à histórica Contendas para reencontro familiar.",
    plannedDistanceMeters: 10500,
    plannedElevationGain: 105,
    sunAndMoon: {
      sunrise: "05:36",
      sunset: "18:43",
      moonPhase: "Gibosa Crescente (63%)",
    },
    literaryHistory:
      'A lendária "Contendas" de Guimarães Rosa, fundada graças à doação de terras da matriarca Maria de Almeida (1832).',
    stravaWorkoutIds: [],
    highlights: ["Chegada à antiga Contendas (Brasília de Minas)"],
    photos: [],
  },
  {
    slug: "dia-08",
    dayNumber: 8,
    phaseId: "fase-3",
    dayType: "rest",
    date: "2027-01-18",
    title: "Imersão, Descanso e Manutenção",
    origin: "Brasília de Minas",
    destination: "Brasília de Minas",
    summary:
      "Dia livre para convívio familiar, recuperação muscular, revisão mecânica e prospecção de materiais de embalagem.",
    plannedDistanceMeters: 0,
    plannedElevationGain: 0,
    sunAndMoon: {
      sunrise: "05:37",
      sunset: "18:43",
    },
    logisticsNote:
      "Dia livre para convívio familiar, recuperação e prospecção de materiais de embalagem (plástico-bolha) para o retorno da bike.",
    stravaWorkoutIds: [],
    highlights: [
      "Convívio familiar e descanso",
      "Prospecção de plástico-bolha e materiais de proteção da bike",
    ],
    photos: [],
  },
  {
    // TODO: adicionar GPX (arquivo VEREDAS - DIA 9.gpx ainda não disponível)
    slug: "dia-09",
    dayNumber: 9,
    phaseId: "fase-3",
    dayType: "ride",
    date: "2027-01-19",
    title: "As Marchas da Secura e as Quermesses",
    origin: "Brasília de Minas",
    destination: "Coração de Jesus",
    waypoints: ["Brasília de Minas", "Coração de Jesus"],
    summary:
      "56 km pelo platô árido e pedregoso do Alto Cerrado chegando a Coração de Jesus na véspera da Festa de São Sebastião.",
    plannedDistanceMeters: 56000,
    plannedElevationGain: 978,
    externalRoutes: {
      stravaUrl: "#",
    },
    sunAndMoon: {
      sunrise: "05:37",
      sunset: "18:44",
      moonPhase: "Gibosa Crescente forte (84%)",
    },
    literaryHistory:
      "As marchas do bando de Riobaldo no platô árido e pedregoso. À noite, a praça da matriz estará em festa (véspera de São Sebastião).",
    stravaWorkoutIds: [],
    highlights: [
      "Travessia do platô pedregoso do Alto Cerrado",
      "Novenas e barraquinhas na praça da matriz (véspera de São Sebastião)",
    ],
    photos: [],
  },
  {
    // TODO: adicionar GPX (arquivo VEREDAS - DIA 10.gpx ainda não disponível)
    slug: "dia-10",
    dayNumber: 10,
    phaseId: "fase-3",
    dayType: "ride",
    date: "2027-01-20",
    title: "Retorno à Civilização e o Clímax de São Sebastião",
    origin: "Coração de Jesus",
    destination: "Montes Claros",
    waypoints: ["Coração de Jesus", "Montes Claros"],
    summary:
      "Etapa final de 66 km cruzando a fronteira da obra rosiana até Montes Claros no dia de São Sebastião / Oxóssi.",
    plannedDistanceMeters: 66000,
    plannedElevationGain: 1187,
    externalRoutes: {
      stravaUrl: "#",
    },
    sunAndMoon: {
      sunrise: "05:38",
      sunset: "18:44",
      moonPhase: "Gibosa Crescente avançada (91%)",
    },
    literaryHistory:
      "Montes Claros é a fronteira final da obra de Rosa e terra de Darcy Ribeiro. Chegada coroada pela Festa de São Sebastião / Oxóssi (20 de janeiro).",
    logisticsNote:
      "Logística de Retorno: Desmontagem da bike (remoção de roda, pedais, giro do guidão), proteção do câmbio traseiro e embalagem para despacho via ônibus (com opção de Jadlog/Gollog como backup) rumo a Uberaba.",
    stravaWorkoutIds: [],
    highlights: [
      "Chegada em Montes Claros (540,1 km concluídos)",
      "Festa de São Sebastião / Oxóssi (20 de janeiro)",
      "Desmontagem e despacho da bike rumo a Uberaba",
    ],
    photos: [],
  },
]