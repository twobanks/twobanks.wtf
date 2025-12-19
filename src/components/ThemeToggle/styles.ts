import styled from "styled-components";
import { IconWrapperProps } from "@/utils/types/component";

export const Switch = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  position: relative; 
  overflow: hidden;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: ${({ $active }) => ($active ? 1 : 0.2)};
  transform: ${({ $active }) => ($active ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(90deg)')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  &.on {
    color: #FFC107;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.titleMain};
  }
`;