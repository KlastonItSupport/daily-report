import { Container, Info, Title } from "./style";

export const Card = ({ report }) => {
  return (
    <Container>
      <Title>{report.professionalEmail}</Title>
      <Info>{report.clientName}</Info>
      <Info>R${report.servicePrice}</Info>
    </Container>
  );
};
