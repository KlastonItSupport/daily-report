import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const Description = styled.h1`
  font-size: 16px;
  padding: 5px 0;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  max-width: 300px;
  padding-right: 10px;
`;
export const ContainerButtons = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
