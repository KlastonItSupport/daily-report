import { MoonLoader } from "react-spinners";
import { Button } from "../button";
import {
  ButtonContainer,
  Container,
  Description,
  Title,
  ContainerButtons,
} from "./style";

export const LoadingModalContent = ({ onClose, onSubmit }) => {
  return (
    <Container>
      <Title>Daily Report</Title>
      <Description>
        Ao submeter este formulário será enviado um email para empresa
        requisitando a assinatura da mesma, após a assinatura será enviado um
        email para você com este documento assinado para seu controle.
      </Description>
      <Description>Tem certeza que deseja enviar o formulário?</Description>
      <ContainerButtons>
        <ButtonContainer>
          <Button onClick={onSubmit} type="submit">
            Enviar
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button color={"#FF4742"} onClick={onClose}>
            Fechar
          </Button>
        </ButtonContainer>
      </ContainerButtons>
    </Container>
  );
};
