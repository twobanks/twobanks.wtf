import styled from "styled-components";

export const StatsContent = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`;