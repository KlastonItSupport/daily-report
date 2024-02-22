import { useParams } from "react-router-dom";
import {
  ButtonContainer,
  CantSendContainer,
  CantSendMessage,
  CantSendMessageTitle,
  Container,
  Form,
  Image,
  Row,
} from "./style";
import Input from "../../components/input/index";
import SelectInput from "../../components/select";
import TextArea from "../../components/text_area";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { scheme } from "./schema";
import { useReports } from "../../hooks/reports";
import { useEffect, useState } from "react";
import klastonLogo from "../../assets/klastonblue.png";
import LoadingSpin from "../../components/loading";

const options = [
  { value: 1, label: "Auditoria" },
  { value: 2, label: "Consultoria" },
  { value: 3, label: "Treinamento" },
];

export const CreateDailyReportPage = () => {
  const params = useParams();
  const [isAllowedToSend, setIsAllowedToSend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { sendReportToClient, canSendReport, reportId } = useReports();

  const onLoad = async () => {
    const isAllowed = await canSendReport(params.id);

    reportId.current = params.id;
    setIsAllowedToSend(isAllowed);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  return isLoading ? (
    <LoadingSpin />
  ) : isAllowedToSend ? (
    <Container>
      <Form onSubmit={handleSubmit(sendReportToClient)}>
        <Row>
          <Input
            label={"Nome do profissional"}
            {...register("professionalName")}
            error={errors.professionalName?.message}
            margin="0px 20px 0px 0px"
          />

          <Input
            label={"Email do profissional"}
            {...register("professionalEmail")}
            error={errors.professionalEmail?.message}
          />
        </Row>
        <Row>
          <Input
            label={"Nome do Cliente"}
            {...register("clientName")}
            error={errors.clientName?.message}
            margin="0px 20px 0px 0px"
          />
          <Input
            label={"Email do Cliente"}
            {...register("clientEmail")}
            error={errors.clientEmail?.message}
          />
        </Row>
        <Row>
          <Input
            placeholder="Ex: 08:30"
            label={"Horário de inicio do Serviço"}
            {...register("startDate")}
            error={errors.startDate?.message}
            margin="0px 20px 0px 0px"
          />
          <Input
            placeholder="Ex: 17:45"
            label={"Horário de término do Serviço"}
            {...register("endDate")}
            error={errors.endDate?.message}
          />
        </Row>
        <Row>
          <Input
            label="Dia em que foi feito o serviço"
            placeholder={"Ex: 28/09/2024"}
            {...register("serviceDate")}
            error={errors.serviceDate?.message}
            margin="0px 20px 0px 0px"
          />
        </Row>
        <TextArea
          label={"Serviço Executado"}
          {...register("executedService")}
          error={errors.executedService?.message}
        />
        <TextArea
          label={"Pendências"}
          {...register("pendencies")}
          error={
            errors.pendencies?.type === "max-length"
              ? errors.pendencies?.message
              : errors.pendencies?.message
          }
        />
        <TextArea
          label={"Planejamento"}
          {...register("planning")}
          error={errors.planning?.message}
        />
        <SelectInput
          options={options}
          label={"Tipo de serviço"}
          {...register("serviceType")}
        />

        <ButtonContainer>
          <Button type=""> Gerar Daily Report</Button>
        </ButtonContainer>
      </Form>
    </Container>
  ) : (
    <CantSendContainer>
      <Image src={klastonLogo} alt="klaston logo" />
      <CantSendMessageTitle>Permissão negada</CantSendMessageTitle>
      <CantSendMessage>
        Esse formulário já foi enviado. Para o envio de um novo formulário, por
        favor entre em contato com a nossa administração.
      </CantSendMessage>
    </CantSendContainer>
  );
};
