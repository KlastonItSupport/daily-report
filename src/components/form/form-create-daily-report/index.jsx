import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../input";
import {
  ButtonContainer,
  Container,
  Form,
  LinkContainer,
  Title,
} from "./style";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../../button";
import { useReports } from "../../../hooks/reports";
import { useState } from "react";

const scheme = yup.object().shape({
  professionalEmail: yup
    .string()
    .required("* Email obrigatório")
    .email("* Insira um email válido"),
  companyName: yup.string().required("* Nome da empresa obrigatória"),
});

export const FormCreateDailyReport = () => {
  const [link, setLink] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const { createReport } = useReports();

  const onSubmit = async (data) => {
    const response = await createReport(data);
    setLink(response);
  };
  return (
    <Container>
      <Title>Preencha o formulário</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={"Email do profissional"}
          margin="20px 0px 20px 0px"
          {...register("professionalEmail")}
          error={errors.professionalEmail?.message}
        />
        <Input
          label={"Nome da empresa"}
          margin="0px 0px 0px 0px"
          {...register("companyName")}
          error={errors.companyName?.message}
        />
        {link.length !== 0 && (
          <LinkContainer>
            Link:<a href={link}> {link}</a>
          </LinkContainer>
        )}
        <ButtonContainer>
          <Button type=""> Gerar Daily Report</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};
