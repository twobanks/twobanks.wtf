import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 2rem;
  font-family: var(--font-poppins);
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: fadeIn 0.4s ease;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  &:last-child {
    border-bottom: none;
  }
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    border-radius: 8px;
    border-bottom-color: transparent;
  }
  .left-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.8;
      font-family: var(--font-poppins);
    }
  }

  .icon-box {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  strong {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-poppins);
  }
`;