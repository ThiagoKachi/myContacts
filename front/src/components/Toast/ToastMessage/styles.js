import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from { opacity: 0; transform:  translateY(100%) }
  to { opacity: 1; transform: translateY(0) }
`;

const messageOut = keyframes`
  from { opacity: 1; transform: translateY(0) }
  to { opacity: 0; transform:  translateY(100%) }
`;

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success.main};
  `,
};

export const Container = styled.div`
  padding: 16px 32px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${messageIn} 0.3s ease-in-out;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${messageOut} 0.2s ease-in-out forwards;
  `}

  ${({ type }) => containerVariants[type] || containerVariants.default};

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`;
