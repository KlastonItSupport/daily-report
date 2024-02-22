import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";
import { useParams } from "react-router-dom";
import { PdfViewer } from "../../components/pdf_viewer";
import { useReports } from "../../hooks/reports";
import { Button } from "../../components/button/index";
import klastonLogo from "../../assets/klastonblue.png";
import {
  Container,
  Title,
  Description,
  ButtonContainer,
  CantSendContainer,
  Image,
  CantSendMessageTitle,
  CantSendMessage,
} from "./style";
import { api } from "../../api";
import LoadingSpin from "../../components/loading";

export const SignDocumentPage = () => {
  const { signDocument } = useReports();
  const [isLoading, setLoading] = useState(true);
  const [reportService, setReportService] = useState({});
  const sigCanvas = useRef({});
  const params = useParams();

  const clear = () => sigCanvas.current.clear();
  const save = (closeModal) => {
    const imageDataURL = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    signDocument(imageDataURL, params.dailyReportId, closeModal);
  };

  const getServiceInfoById = async (id) => {
    console.log("eentrei");
    await api.get(`service-info/report/by/id/${id}`).then((response) => {
      setReportService(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getServiceInfoById(params.dailyReportId);
  }, []);

  return isLoading ? (
    <LoadingSpin />
  ) : reportService.isSigned ? (
    <CantSendContainer>
      <Image src={klastonLogo} alt="klaston logo" />
      <CantSendMessageTitle>Permissão negada</CantSendMessageTitle>
      <CantSendMessage>
        Esse document já foi assinado. Para assinar um novo documento, por favor
        entre em contato conosco.
      </CantSendMessage>
    </CantSendContainer>
  ) : (
    <Container>
      <Title>Assinatura do Daily Report </Title>
      <Description>
        Por favor, revise o PDF e assine-o. Após assinado será enviado uma cópia
        para o profissional prestador do serviço e também para nós da Klaston
        Managment
      </Description>

      <PdfViewer id={params.dailyReportId} />
      <Popup
        modal
        trigger={
          <ButtonContainer>
            <Button>Abrir Modal de assinatura</Button>
          </ButtonContainer>
        }
        closeOnDocumentClick={false}
        position={"bottom center"}
        contentStyle={{ width: "50%", margin: "auto" }}
      >
        {(close) => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
            />
            <Button
              onClick={() => save(close)}
              color={"#0F62FE"}
              margin={"0px 10px 0px 0px"}
            >
              Assinar e enviar
            </Button>
            <Button
              onClick={clear}
              color={"#eacc07"}
              margin={"0px 10px 0px 0px"}
            >
              Limpar
            </Button>
            <Button onClick={close} color={"#FF4742"}>
              Fechar
            </Button>
          </>
        )}
      </Popup>
    </Container>
  );
};
