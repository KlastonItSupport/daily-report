import {
  ButtonContainer,
  InputCalendarContainer,
  CalendarContainer,
  Container,
  Form,
  Row,
  FormTitle,
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
import LoadingSpin from "../../components/loading";
import { useAuth } from "../../hooks/auth";
import { CalendarChanged } from "../../components/calendar";
import Popup from "reactjs-popup";
import { LoadingModalContent } from "../../components/loading-modal-content";
import { PropagateLoader } from "react-spinners";

const options = [
  { value: 1, label: "Auditoria" },
  { value: 2, label: "Consultoria" },
  { value: 3, label: "Treinamento" },
];

export const CreateDailyReportPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);

  const { user, getUser, dealingWithAuth } = useAuth();
  const { sendReportToClient, isLoadingRequest } = useReports();

  const onLoad = () => {
    dealingWithAuth(false);
    if (!user.current) {
      getUser();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
    setValue("professionalName", user.current?.name);
    setValue("professionalEmail", user.current?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(scheme),
  });

  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Container>
      <Form onSubmit={handleSubmit(sendReportToClient)}>
        <FormTitle>Daily Report</FormTitle>

        <Row>
          <Input
            label={"Nome do profissional"}
            {...register("professionalName")}
            error={errors.professionalName?.message}
            margin="0px 20px 0px 0px"
            disabled={true}
          />

          <Input
            label={"Email do profissional"}
            {...register("professionalEmail")}
            error={errors.professionalEmail?.message}
            value={user.current?.email}
            disabled={true}
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
          <InputCalendarContainer>
            <Input
              label="Dia em que foi feito o serviço"
              placeholder={"Ex:  28/09/2024"}
              {...register("serviceDate")}
              error={errors.serviceDate?.message}
              margin="0px 20px 0px 0px"
              onClick={() => setIsShowingCalendar(!isShowingCalendar)}
              autocomplete="off"
              onChange={(e) => {
                if (e.target.value.length === 10) setIsShowingCalendar(false);
              }}
            />
            {isShowingCalendar && (
              <CalendarContainer>
                <CalendarChanged
                  onChangeDate={(date) => {
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0"); // O mês é baseado em zero, então adicionamos 1
                    const year = date.getFullYear();
                    const formattedDate = `${day}/${month}/${year}`;

                    setValue("serviceDate", formattedDate);
                    setIsShowingCalendar(false);
                  }}
                />
              </CalendarContainer>
            )}
          </InputCalendarContainer>
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
          defaultValue={2}
          options={options}
          label={"Tipo de serviço"}
          {...register("serviceType")}
        />
        <Popup
          modal
          trigger={
            <ButtonContainer>
              <Button type="" onClick={(e) => e.preventDefault()}>
                {" "}
                Enviar para assinatura do cliente
              </Button>
            </ButtonContainer>
          }
          closeOnDocumentClick={false}
          lockScroll={true}
          position={"bottom center"}
          contentStyle={{
            margin: "auto",
            border: "none",
            padding: "0",
          }}
          overlayStyle={{
            backgroundColor: isLoadingRequest
              ? "transparent"
              : "rgba(0, 0, 0, 0.5)",
          }}
        >
          {(close) =>
            isLoadingRequest ? (
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <PropagateLoader color="#17033a" />
              </div>
            ) : (
              <LoadingModalContent
                onClose={close}
                onSubmit={() => {
                  handleSubmit(async (data) => {
                    await sendReportToClient(data);
                    close();
                  })();
                }}
              />
            )
          }
        </Popup>
      </Form>
    </Container>
  );
};
