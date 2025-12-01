import styled from "styled-components";

export const Switch = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  position: relative; 
  overflow: hidden;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled.div<{ $active: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: ${({ $active }) => ($active ? '1' : '0')};
  transform: ${({ $active }) => ($active ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(90deg)')};
  color: ${({ theme }) => theme.colors.text};
  &.on {
    color: #FFC107;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.titleMain};
  }
`;