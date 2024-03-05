import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import Input from "../../components/input";
import * as yup from "yup";
import {
  ButtonContainer,
  Container,
  Form,
  FormTitle,
  LoadingContainer,
} from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../api/index";
import { toast } from "react-toastify";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
const scheme = yup.object().shape({
  email: yup
    .string()
    .required("* Email obrigatório")
    .email("* Insira um email válido"),
});

export const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    api
      .post("users/forgot-password", { email: data.email })
      .then((_) => {
        toast.success("Verifique seu email");
        setIsLoading(false);
      })
      .catch((_) => {
        toast.error("Ocorreu um erro");
        setIsLoading(false);
      });
  };
  return (
    <Container>
      {isLoading && (
        <LoadingContainer>
          <PropagateLoader color="#17033a" className="spinner" />
        </LoadingContainer>
      )}
      <FormTitle>Insira seu email para recuperar sua senha</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={"Email"}
          margin="20px 0px 20px 0px"
          error={errors.email?.message}
          {...register("email")}
        />
        <ButtonContainer>
          <Button type="submit">Recuperar Senha</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};
