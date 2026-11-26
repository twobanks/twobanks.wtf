import { Trip } from "@/utils/types/viagens"
import { grandeSertaoDays } from "./days"

export const nordiminasGrandeSertaoTrip: Trip = {
  slug: "nordiminas-grande-sertao",
  title: "NÓRDIMINAS - Grande Sertão",
  subtitle:
    "10 dias cruzando o rio, as cavernas do Peruaçu e o Alto Cerrado norte-mineiro pelas trilhas literárias de Guimarães Rosa e Darcy Ribeiro.",
  status: "planned",
  startDate: "2027-01-11",
  endDate: "2027-01-20",
  origin: "Pirapora, MG",
  destination: "Montes Claros, MG",
  styleDescription:
    "Cicloturismo com pernoite em pousadas/hotéis e bagagem dividida (Bolsa de Selim Curtlo 10L, Bolsa Guidão Topeak 8L e Mochila Salomon 8L).",
  coverImage:
    "https://images.unsplash.com/photo-1452573992436-6d508f200b30?q=60&w=3000&auto=format&fit=crop",
  overviewMarkdown: `
Travessia em **3 fases** ligando as margens do Rio São Francisco em **Pirapora** ao planalto de **Montes Claros**, percorrendo **540,1 km** e **5.468 m** de ganho de elevação acumulados em 7 dias de pedal, intercalados por 2 dias de imersão arqueológica no Parque Nacional Cavernas do Peruaçu e 1 dia de descanso familiar em Brasília de Minas.

A rota entrelaça geografia sertaneja, memória histórica e literatura — passando por Barra do Guaicuí, São Romão, Januária, Pedras de Maria da Cruz, a antiga Contendas e Coração de Jesus durante os festejos de Folias de Reis e São Sebastião.
  `,
  plannedTotalDistanceMeters: 540100,
  plannedTotalElevationGain: 5468,
  // Coordenadas geográficas dos marcos do roteiro (Pirapora -> Montes Claros)
  // Substituir por `plannedRoutePolyline` quando o GPX oficial for consolidado
  plannedCoordinates: [
    [-44.9419, -17.345], // Pirapora
    [-44.9189, -17.2067], // Barra do Guaicuí
    [-44.9125, -16.8617], // Ibiaí
    [-45.0694, -16.6319], // Ponto Chique
    [-45.0694, -16.3689], // São Romão
    [-44.8644, -15.9486], // São Francisco
    [-44.3619, -15.4881], // Januária
    [-44.3917, -15.6056], // Pedras de Maria da Cruz
    [-44.3047, -15.9028], // Lontra
    [-44.4333, -16.2064], // Brasília de Minas
    [-44.365, -16.6853], // Coração de Jesus
    [-43.8617, -16.7286], // Montes Claros
  ],
  elevationProfile: [
    { distanceKm: 0, elevationM: 495, dayLabel: "Dia 1" },
    { distanceKm: 85.5, elevationM: 472, dayLabel: "Dia 2" },
    { distanceKm: 166.7, elevationM: 465, dayLabel: "Dia 3" },
    { distanceKm: 307.9, elevationM: 455, dayLabel: "Dia 6" },
    { distanceKm: 365.0, elevationM: 790 },
    { distanceKm: 407.6, elevationM: 845, dayLabel: "Dia 7" },
    { distanceKm: 418.1, elevationM: 820, dayLabel: "Dia 9" },
    { distanceKm: 474.1, elevationM: 860, dayLabel: "Dia 10" },
    { distanceKm: 540.1, elevationM: 650 },
  ],
  phases: [
    {
      id: "fase-1",
      number: 1,
      title: "O Rio e a Planície",
      modality: "Mountain Bike • Dias 1 a 3",
      dayRangeLabel: "11 a 13 de Janeiro",
      culturalNoteTitle: "Nota Cultural da Fase 1 (Dias 1 a 4)",
      culturalNote:
        'Época dos "Remates" e entrega das bandeiras das Folias de Reis nas fazendas e vilas ribeirinhas.',
    },
    {
      id: "fase-2",
      number: 2,
      title: "O Labirinto de Pedras",
      modality: "Turismo e Imersão • Dias 4 e 5",
      dayRangeLabel: "14 e 15 de Janeiro",
      baseLogistics:
        "Base: Hospedagem escolhida em Januária com Transfer + Guia para o Parque Nacional Cavernas do Peruaçu.",
    },
    {
      id: "fase-3",
      number: 3,
      title: "O Desafio do Alto Cerrado",
      modality: "Mountain Bike & Encerramento • Dias 6 a 10",
      dayRangeLabel: "16 a 20 de Janeiro",
      culturalNoteTitle: "Nota Cultural da Fase 3 (Dias 9 e 10)",
      culturalNote:
        "Novenas e barraquinhas da Festa de São Sebastião (Coração de Jesus), culminando no grande repique de sinos e fogueiras em Montes Claros (20 de janeiro), sincretizado com o Orixá Oxóssi.",
    },
  ],
  luggageSetup: [
    {
      name: "Bolsa de Selim Curtlo",
      brand: "Curtlo",
      capacity: "10L",
      role: "Vestuário de pedal e descanso",
    },
    {
      name: "Bolsa de Guidão Topeak",
      brand: "Topeak",
      capacity: "8L",
      role: "Acesso rápido, higiene, proteção e itens de madrugada",
    },
    {
      name: "Mochila Salomon",
      brand: "Salomon",
      capacity: "8L",
      role: "Cultura e registro (Canon SL3, Kindle, diário) + hidratação",
    },
  ],
  gearList: [
    {
      category: "Vestuário de Pedal e Descanso",
      items: [
        { name: "3 camisas", detail: "2 de manga comprida e 1 manga curta", essential: true },
        { name: "2 bretelles", detail: "Essenciais para o conforto no selim", essential: true },
        { name: "2 bermudas", essential: true },
        { name: "1 calça", essential: true },
        { name: "2 pares de meia", essential: true },
        { name: "2 cuecas", essential: true },
        { name: "1 corta vento", essential: true },
      ],
    },
    {
      category: "Calçados",
      items: [
        { name: "Tênis (Hoka)", essential: true },
        { name: "Havaianas", essential: true },
      ],
    },
    {
      category: "Cultura e Registro (Na Mochila Salomon)",
      items: [
        { name: "Câmera Canon SL3 + 1 lente", essential: true },
        { name: "Kindle", essential: true },
        { name: "Diário e canetas", essential: true },
      ],
    },
    {
      category: "Saúde, Higiene e Segurança",
      items: [
        { name: "Protetor solar resistente à água/suor", essential: true },
        { name: "Pomada antiassadura", essential: true },
        { name: "Kit primeiros socorros / remédios", essential: true },
        { name: "Lenço umedecido", essential: true },
        {
          name: "Farol / lanterna",
          detail: "Obrigatório para as largadas de madrugada",
          essential: true,
        },
      ],
    },
  ],
  pois: [
    {
      id: "poi-pirapora",
      name: "Largada — Pirapora",
      type: "city",
      coordinates: [-44.9419, -17.345],
      description: "Início da Fase 1 às margens do Rio São Francisco.",
      daySlug: "dia-01",
    },
    {
      id: "poi-guaicui",
      name: "Barra do Guaicuí (Guararavacã)",
      type: "highlight",
      coordinates: [-44.9189, -17.2067],
      description:
        "Encontro dos rios das Velhas e São Francisco; Igreja de Pedras com a gameleira.",
      daySlug: "dia-01",
    },
    {
      id: "poi-ibiai",
      name: "Pernoite Dia 1 — Ibiaí",
      type: "city",
      coordinates: [-44.9125, -16.8617],
      description: "Fim da 1ª etapa (85,5 km).",
      daySlug: "dia-01",
    },
    {
      id: "poi-sao-romao",
      name: "Pernoite Dia 2 — São Romão",
      type: "city",
      coordinates: [-45.0694, -16.3689],
      description:
        "Antigo porto militar (1668) e ponto de embarque na voadeira às 05:00.",
      daySlug: "dia-02",
    },
    {
      id: "poi-januaria",
      name: "Base Dias 3 a 5 — Januária",
      type: "city",
      coordinates: [-44.3619, -15.4881],
      description: "Chegada da Etapa Rainha (141,2 km) e base para o Peruaçu.",
      daySlug: "dia-03",
    },
    {
      id: "poi-peruacu",
      name: "PARNA Cavernas do Peruaçu",
      type: "highlight",
      coordinates: [-44.2414, -15.1117],
      description:
        "Lapa Bonita, Lapa dos Desenhos, Lapa do Boquete, Lapa do Índio e Gruta do Janelão.",
      daySlug: "dia-04",
    },
    {
      id: "poi-maria-cruz",
      name: "Pedras de Maria da Cruz",
      type: "highlight",
      coordinates: [-44.3917, -15.6056],
      description: "Palco da revolta de 1736 contra os impostos da Coroa.",
      daySlug: "dia-06",
    },
    {
      id: "poi-brasilia-minas",
      name: "Brasília de Minas (Contendas)",
      type: "city",
      coordinates: [-44.4333, -16.2064],
      description: "Base dos Dias 7 e 8 para descanso, convívio familiar e manutenção.",
      daySlug: "dia-07",
    },
    {
      id: "poi-coracao-jesus",
      name: "Coração de Jesus",
      type: "city",
      coordinates: [-44.365, -16.6853],
      description: "Pernoite do Dia 9 na véspera da Festa de São Sebastião.",
      daySlug: "dia-09",
    },
    {
      id: "poi-montes-claros",
      name: "Chegada Final — Montes Claros",
      type: "city",
      coordinates: [-43.8617, -16.7286],
      description:
        "Fronteira final da obra de Rosa, Festa de São Sebastião / Oxóssi e despacho da bike para Uberaba.",
      daySlug: "dia-10",
    },
  ],
  usefulInfo: [
    {
      title: "Logística de Travessia Fluvial (Dia 3)",
      contentMarkdown:
        "Em **São Romão**, a travessia particular do Rio São Francisco em **voadeira** ocorre às **05:00 da manhã** (com nascer do sol às 05:34 e lua crescente a 20%). Farol e lanterna são obrigatórios.",
    },
    {
      title: "Imersão no Peruaçu (Dias 4 e 5)",
      contentMarkdown:
        "Durante os dias 4 e 5 a bicicleta permanece na hospedagem em **Januária**, com deslocamento ao Parque Nacional Cavernas do Peruaçu realizado via **Transfer + Guia**.",
    },
    {
      title: "Desmontagem e Retorno para Uberaba (Dias 8 e 10)",
      contentMarkdown:
        "No **Dia 8** (Brasília de Minas) ocorre a prospecção de plástico-bolha e materiais de proteção. No **Dia 10** (Montes Claros), a bike passa por desmontagem (remoção de roda, pedais, giro do guidão e proteção do câmbio traseiro) para despacho via **ônibus** (com **Jadlog / Gollog** como backup) rumo a Uberaba.",
    },
  ],
  days: grandeSertaoDays,
}