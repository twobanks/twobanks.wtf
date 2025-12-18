
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

export type TipoBloco = 'Aquecimento' | 'Desaquecimento' | 'Intervalos' | 'Rodagem';
export interface DetalhesIntervalo {
  distanciaKm: number;
  paceMinKm: string;
  velocidadeKmH: string;
}
export interface BlocoEstrutura {
  tipo: TipoBloco;
  distanciaKm?: number; 
  repeticoes?: number;  
  corrida?: DetalhesIntervalo; 
  descanso?: string;    
}
export interface TempoEstimado {
  minimo: string;
  maximo: string;
}

export interface TreinoDia {
  dia: string;
  data: string;
  modalidade: string; 
  tipo: string;       
  distanciaKm: number;
  terreno: string;
  estrutura?: BlocoEstrutura[];
  tempo?: TempoEstimado;
  intensidade?: string;
  descricao?: string;
  treino?: boolean | null; 
}
export interface PlanoTreinoSemana {
  atleta: string;
  semana: {
    inicio: string;
    fim: string;
  };
  volumeSemanaKm: number;
  treinos: TreinoDia[];
}