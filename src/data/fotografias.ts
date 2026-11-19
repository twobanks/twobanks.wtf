export interface PhotoItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  width: number;
  height: number;
  capturedAt: string;
  camera: {
    model: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: number;
  };
  location: {
    name: string;
    region: string;
    latitude: number;
    longitude: number;
    elevationMeters?: number;
  };
}

export const MOCK_PHOTOS: PhotoItem[] = [
  {
    id: "foto-01",
    title: "Amanhecer na Crista da Serra",
    description: "Primeiros raios de sol antes da descida técnica pelo singletrack.",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&h=1500&q=85",
    width: 1000,
    height: 1500, // Vertical 2:3
    capturedAt: "2026-07-18",
    camera: {
      model: "Sony A7C II",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "35mm",
      aperture: "f/5.6",
      shutterSpeed: "1/500s",
      iso: 160,
    },
    location: {
      name: "Serra da Canastra",
      region: "São Roque de Minas, MG",
      latitude: -20.2422,
      longitude: -46.4383,
      elevationMeters: 1380,
    },
  },
  {
    id: "foto-02",
    title: "Estradão de Cascalho ao Entardecer",
    description: "Trecho final de 95 km de gravel cruzando o planalto.",
    imageUrl:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&h=800&q=85",
    width: 1200,
    height: 800, // Horizontal 3:2
    capturedAt: "2026-06-29",
    camera: {
      model: "Fujifilm X100VI",
      lens: "23mm f/2.0",
      focalLength: "23mm",
      aperture: "f/4.0",
      shutterSpeed: "1/1000s",
      iso: 200,
    },
    location: {
      name: "Serra do Cipó",
      region: "Santana do Riacho, MG",
      latitude: -19.3489,
      longitude: -43.6014,
      elevationMeters: 1190,
    },
  },
  {
    id: "foto-03",
    title: "Trilha entre Araucárias",
    description: "Subida longa sob neblina nas primeiras horas da manhã.",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&h=1350&q=85",
    width: 1000,
    height: 1350, // Vertical 3:4
    capturedAt: "2026-06-12",
    camera: {
      model: "Sony A7C II",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "24mm",
      aperture: "f/4.5",
      shutterSpeed: "1/200s",
      iso: 320,
    },
    location: {
      name: "Monte Verde",
      region: "Camanducaia, MG",
      latitude: -22.8625,
      longitude: -46.0358,
      elevationMeters: 1554,
    },
  },
  {
    id: "foto-04",
    title: "Vale Nebuloso",
    description: "Neblina baixa cobrindo o vale logo após a chuva da madrugada.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&h=1000&q=85",
    width: 1000,
    height: 1000, // Quadrada 1:1
    capturedAt: "2026-05-14",
    camera: {
      model: "Sony A7C II",
      lens: "FE 70-200mm f/4 Macro G",
      focalLength: "115mm",
      aperture: "f/8.0",
      shutterSpeed: "1/250s",
      iso: 100,
    },
    location: {
      name: "Alto Paraíso de Goiás",
      region: "Chapada dos Veadeiros, GO",
      latitude: -14.1325,
      longitude: -47.5161,
      elevationMeters: 1250,
    },
  },
  {
    id: "foto-05",
    title: "Subida do Passo Alto",
    description: "Trecho exposto de pedra solta no km 32 do percurso.",
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&h=800&q=85",
    width: 1200,
    height: 800, // Horizontal 3:2
    capturedAt: "2026-04-11",
    camera: {
      model: "iPhone 16 Pro",
      lens: "24mm Main Camera",
      focalLength: "24mm",
      aperture: "f/1.78",
      shutterSpeed: "1/1250s",
      iso: 80,
    },
    location: {
      name: "Serra Fina",
      region: "Passa Quatro, MG",
      latitude: -22.4317,
      longitude: -44.9182,
      elevationMeters: 2140,
    },
  },
  {
    id: "foto-06",
    title: "Curva na Serra do Rio do Rastro",
    description: "Subida constante com visual aberto para o cânion.",
    imageUrl:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1000&h=1450&q=85",
    width: 1000,
    height: 1450, // Vertical alta
    capturedAt: "2026-03-29",
    camera: {
      model: "Fujifilm X100VI",
      lens: "23mm f/2.0",
      focalLength: "23mm",
      aperture: "f/5.6",
      shutterSpeed: "1/640s",
      iso: 160,
    },
    location: {
      name: "Lauro Müller",
      region: "Santa Catarina, SC",
      latitude: -28.3964,
      longitude: -49.5492,
      elevationMeters: 1421,
    },
  },
  {
    id: "foto-07",
    title: "Pausa na Estrada Real",
    description: "Travessia entre trechos de mata fechada e serra aberta.",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&h=1250&q=85",
    width: 1000,
    height: 1250, // Vertical 4:5
    capturedAt: "2026-03-22",
    camera: {
      model: "Fujifilm X100VI",
      lens: "23mm f/2.0",
      focalLength: "23mm",
      aperture: "f/2.8",
      shutterSpeed: "1/800s",
      iso: 160,
    },
    location: {
      name: "Ouro Preto",
      region: "Minas Gerais, MG",
      latitude: -20.3855,
      longitude: -43.5035,
      elevationMeters: 1179,
    },
  },
  {
    id: "foto-08",
    title: "Cânion ao Fim da Tarde",
    description: "Luz dourada batendo nas paredes de quartzito.",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=820&q=85",
    width: 1200,
    height: 820, // Horizontal
    capturedAt: "2026-02-08",
    camera: {
      model: "Sony A7C II",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "28mm",
      aperture: "f/7.1",
      shutterSpeed: "1/320s",
      iso: 100,
    },
    location: {
      name: "Capitólio",
      region: "Minas Gerais, MG",
      latitude: -20.6403,
      longitude: -46.2719,
      elevationMeters: 865,
    },
  },
];