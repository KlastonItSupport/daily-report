import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  margin-top: 20px;
`;
export const FormTitle = styled.h1`
  font-size: 24px;
  padding: 10px 0px;
  color: #17033a;
`;

export const FormDescription = styled.h1`
  font-size: 15px;
  padding: 10px 0px 20px 0px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const Row = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CantSendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const CantSendMessageTitle = styled.div`
  font-size: 30px;
  margin-top: 20px;
`;

export const CantSendMessage = styled.div`
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
`;

export const Image = styled.img`
  width: 140px;
  height: 40px;
  margin-top: 50px;
`;

export const InputCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarContainer = styled.div`
  position: absolute;
  top: 385px;

  @media (max-width: 768px) {
    top: 625px;
  }
`;
