import styled from "styled-components";

export const Switch = styled.button`
  background: ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.03)'  
    : 'rgba(255, 255, 255, 0.7)'   
  };
  border: 1px solid ${({ theme }) => theme.colors.menuText};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.5rem;
  width: 4rem;
  height: 2rem;
  position: fixed; 
  top: 2rem; 
  right: 2rem; 
  z-index: 9999; 
  margin: 0;
  &:focus {
    outline: none;
  }
  @media (max-width: 600px) {
    top: 1rem;
    right: 1rem;
  }
  animation: slideDown 0.5s ease-out;
  @keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
`;

export const IconWrapper = styled.div<{ $active: boolean }>`
  height: 1rem;
  width: 1rem;
  transition: all 0.3s linear;
  opacity: ${({ $active }) => ($active ? '0' : '1')};
  transform: ${({ $active }) => ($active ? 'translateY(-100px)' : 'translateY(0)')};
`;