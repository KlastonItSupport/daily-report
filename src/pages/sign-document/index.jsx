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
  SignButtonsContainer,
} from "./style";
import { api } from "../../api";
import LoadingSpin from "../../components/loading";
import { PropagateLoader } from "react-spinners";

export const SignDocumentPage = () => {
  const { signDocument } = useReports();
  const [isLoading, setLoading] = useState(true);
  const [isReqLoading, setIsReqLoading] = useState(false);
  const [reportService, setReportService] = useState({});
  const sigCanvas = useRef({});
  const params = useParams();

  const clear = () => sigCanvas.current.clear();

  const save = async (closeModal) => {
    setIsReqLoading(true);
    const imageDataURL = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    await signDocument(imageDataURL, params.dailyReportId, closeModal);
    setIsReqLoading(false);
  };

  const getServiceInfoById = async (id) => {
    await api.get(`service-info/report/by/id/${id}`).then((response) => {
      setReportService(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getServiceInfoById(params.dailyReportId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Button>Clique aqui para assinar</Button>
          </ButtonContainer>
        }
        closeOnDocumentClick={false}
        position={"bottom center"}
        contentStyle={{
          margin: "auto",
          border: "none",
          padding: "0",
          minWidth: 300,
        }}
        overlayStyle={{
          backgroundColor: isReqLoading ? "transparent" : "rgba(0, 0, 0, 0.5)",
        }}
      >
        {(close) =>
          isReqLoading ? (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PropagateLoader color="#17033a" />
            </div>
          ) : (
            <>
              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  className: "signatureCanvas",
                }}
              />
              <SignButtonsContainer>
                <Button
                  onClick={() => save(close)}
                  color={"#0F62FE"}
                  margin={"0px 10px 10px 0px"}
                >
                  Assinar e enviar
                </Button>
                <Button
                  onClick={clear}
                  color={"#eacc07"}
                  margin={"0px 10px 10px 0px"}
                >
                  Limpar
                </Button>
                <Button
                  onClick={close}
                  color={"#FF4742"}
                  margin={"0px 10px 10px 0px"}
                >
                  Fechar
                </Button>
              </SignButtonsContainer>
            </>
          )
        }
      </Popup>
    </Container>
  );
};
