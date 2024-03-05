import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Form = styled.form`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 60px;
`;
export const FormTitle = styled.p`
  color: #17033a;
  font-size: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white; /* Alterado para fundo branco */
  position: fixed; /* Alterado para fixed para cobrir toda a viewport */
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
