
export interface IntervalBlock {
  tipo: string;
  distanciaKm?: number;
  repeticoes?: number;
  corrida?: {
    distanciaKm: number;
    paceMinKm: string;
    velocidadeKmH: string;
  };
  descanso?: string;
}

export interface WorkoutDay {
  dia: string;
  data: string;
  modalidade: string;
  treino?: null | boolean; 
  tipo?: string;
  distanciaKm?: number;
  terreno?: string;
  intensidade?: string;
  descricao?: string;
  estrutura?: IntervalBlock[];
  tempo?: {
    minimo: string;
    maximo: string;
  };
  observacao?: string;
}

export interface TrainingPlan {
  atleta: string;
  semana: {
    inicio: string;
    fim: string;
  };
  volumeSemanaKm: number;
  treinos: WorkoutDay[];
}