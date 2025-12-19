import styled from 'styled-components';
import { StatusProps, StructureRowProps } from '@/utils/types/component';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-inter);
  strong {
    color: ${({ theme }) => theme.colors.menuHover};
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  font-family: var(--font-inter);
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  width: 100%;
  border-radius: 16px;
  padding: 1rem;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px; 
  font-family: var(--font-inter);
`;

export const WorkoutRowContainer = styled.div<StatusProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  padding: 1.2rem 0;
  gap: 0.8rem; /* Espaço entre a Linha 1 e a Linha 2 */

  &:last-child {
    border-bottom: none;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Alinha no topo caso o título quebre linha */
  width: 100%;
  gap: 1rem;

  .left-group {
    display: flex;
    gap: 1rem;
    align-items: center; /* Centraliza verticalmente Data e Título */
    flex: 1; /* Ocupa todo espaço disponível empurrando o MetaInfo */
  }
`;

export const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .meta-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    text-transform: uppercase;
    font-weight: 600;
  }

  .workout-title {
    font-size: 1rem;
    font-weight: 700;
    color: #FACC15; /* Amarelo destaque */
    margin: 0;
    line-height: 1.2;
  }
`;

export const BodyRow = styled.div`
  width: 100%;
  padding-left: 1rem; 

  .description {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    line-height: 1.5;
  }
  
  @media (max-width: 600px) {
    padding-left: 0; /* Em mobile, pode voltar para a margem zero se faltar espaço */
  }
`;

export const DateBox = styled.div<{ $status: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px; /* Altura fixa para alinhar melhor */
  flex-shrink: 0;

  .day {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text};
  }
  .month {
    font-size: 0.65rem;
    text-transform: uppercase;
    opacity: 0.7;
  }
  ${({ $status }) => $status === 'rest' && `opacity: 0.5;`}
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0; /* Garante que o botão não quebre/amasse */
`;



export const IconBox = styled.div<{ $status: string }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;

  background: ${({ $status, theme }) => {
    if ($status === 'rest') return theme.colors.text + '10';
    if ($status === 'completed') return '#10B98120';
    if ($status === 'missed') return '#EF444420';
    return theme.colors.primary + '15';
  }};

  color: ${({ $status, theme }) => {
    if ($status === 'rest') return theme.colors.text;
    if ($status === 'completed') return '#10B981';
    if ($status === 'missed') return '#EF4444';
    return theme.colors.primary;
  }};
`;

export const StatusTag = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 5px;
  text-transform: uppercase;

  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'completed': return 'rgba(16, 185, 129, 0.15)';
      case 'missed': return 'rgba(239, 68, 68, 0.15)';
      case 'rest': return theme.colors.text + '08';
      default: return theme.colors.text + '10';
    }
  }};

  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'completed': return '#10B981';
      case 'missed': return '#EF4444';
      case 'rest': return theme.colors.text;
      default: return theme.colors.text;
    }
  }};
  
  opacity: ${({ $status }) => $status === 'rest' ? 0.6 : 1};
`;


export const ToggleButton = styled.button<{ $isOpen: boolean, $status: string }>`
  background: transparent;
  border: none;
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'completed': return '#10B981';
      case 'missed': return '#EF4444';
      case 'rest': return theme.colors.text;
      default: return theme.colors.text;
    }
  }};
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.text}08;
    border-color: ${({ theme }) => theme.colors.text}40;
  }

  .caret {
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const AccordionContent = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ $isOpen }) => $isOpen ? '100%' : '0'};
  padding-left: 1rem;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  @media (max-width: 768px) {
    padding-left: 1rem;
  }
`;

export const ExecutedLink = styled.a`
  display: block;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.text}06;
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.text}10;
  }

  .label-link {
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
    opacity: 0.5;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ExecutedStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  .stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    
    &.highlight {
      color: #10B981; 
      opacity: 1;
      font-weight: 600;
    }
  }
`;



export const MainInfo = styled.div`
  display: flex;
  gap: 1.5rem; /* Espaço entre a data e o texto */
  flex: 1;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* Espaço entre a "Parte de Cima" e a "Parte de Baixo" */
  width: 100%;
  
  /* --- Estilos para Descanso --- */
  .rest-day {
     display: flex;
     flex-direction: column;
     opacity: 0.6;
  }

  /* --- PARTE DE CIMA (Header) --- */
  .top-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .meta-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.9;
      
      .bullet { opacity: 0.4; }
      .type { text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px; opacity: 0.7; }
    }

    .workout-title {
      font-size: 1.1rem;
      font-weight: 700;
      /* A cor amarela característica da imagem de referência */
      color: #FACC15; 
      margin: 0;
    }
  }

  /* --- PARTE DE BAIXO (Description/Structure) --- */
  .bottom-section {
    width: 100%;
    
    .description {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
      line-height: 1.4;
    }
  }
`;

export const StructureContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
   @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StructureRow = styled.div<StructureRowProps>`
  display: grid;
  grid-template-columns: 28px 1fr; 
  align-items: center;
  gap: 10px;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
`;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};

  .header {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-weight: 600;

    .label {
      font-size: 0.65rem;
      text-transform: uppercase;
      opacity: 0.6;
      font-weight: 500;
    }
  }

  .details {
    font-size: 0.75rem;
    opacity: 0.8;
    display: flex;
    align-items: center;
    gap: 6px;
    
    font-family: var(--font-mono, monospace);
  }

  .rest {
    font-size: 0.7rem;
    opacity: 0.6;
    font-style: italic;
    margin-left: 4px;
  }
`;

export const ExecutedContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.text}04;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ExecutedHeader = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  
  .label-link {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.4rem;
  }

  &:hover .label-link {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LapsContainer = styled.div`
  width: 100%;
  /* Aqui assumimos que o componente Laps vai preencher este espaço */
`;

export const LoadingState = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  padding: 1rem 0;
  text-align: center;
`;

export const EmptyState = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  padding: 0.5rem 0;
  font-style: italic;
`;

export const Message = styled.div<{ error?: boolean }>`
  font-size: 0.85rem;
  padding: 1rem;
  text-align: center;
  color: ${({ theme, error }) => error ? theme.colors.menuHover || 'red' : theme.colors.text};
  opacity: 0.7;
`;