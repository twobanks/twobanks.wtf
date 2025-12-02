import styled from "styled-components";



export const PageTitle = styled.h1`
  font-family: var(--font-graffiti);
  font-size: 4rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.titleMain};
  transition: color 0.4s ease, text-shadow 0.4s ease;
  margin: 0;    
  line-height: 0.7;
  letter-spacing: -4px; 
  text-transform: lowercase; 
  text-align: center;
  text-shadow: 2px 2px 0px #000, 0px 0px 20px ${({ theme }) => theme.colors.titleShadow};
  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--font-poppins);
  list-style: none;
  font-size: 1.2rem;
  li span {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`