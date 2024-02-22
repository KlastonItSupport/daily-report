import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 70vh;
  overflow-y: auto;

  /* Esconde a barra de rolagem para telas menores que 768px */
  @media (min-width: 768px) {
    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: lightgray;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
