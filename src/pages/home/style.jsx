import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  flex-wrap: wrap;
`;

export const Image = styled.img`
  width: 140px;
  height: 40px;
`;

export const Header = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const WelcomeMessage = styled.h1`
  color: #17033a;
  font-size: 40px;
  font-weight: bold;
  width: 50%;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    width: 100%;
    font-size: 30px;
  }
`;
export const ContainerInput = styled.div`
  width: 200px;
  margin-left: 20px;
`;

export const InputsContainer = styled.div`
  display: flex;
  width: 50%;
  flex-wrap: wrap;
`;

export const CheckBoxContainer = styled.div`
  width: 50%;
  display: flex;
`;
export const ButtonContainer = styled.div`
  width: 300px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;
