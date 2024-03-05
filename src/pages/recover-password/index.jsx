import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import Input from "../../components/input";
import * as yup from "yup";
import { ButtonContainer, Container, Form, FormTitle } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../api/index";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const scheme = yup.object().shape({
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória"),
});

export const RecoverPasswordPage = () => {
  const params = useParams();
  const history = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = (data) => {
    api
      .post("users/change/password", {
        id: params.userId,
        token: params.token,
        newPassword: data.password,
      })
      .then((_) => {
        toast.success("Senha alterada com sucesso");
        history("/");
      })
      .catch((_) => {
        toast.error("Acesso expirado");
      });
  };
  return (
    <Container>
      <FormTitle>Insira sua nova senha</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={"Senha"}
          margin="20px 0px 20px 0px"
          error={errors.password?.message}
          {...register("password")}
          type="password"
        />
        <Input
          label={"Confirmar senha"}
          margin="20px 0px 20px 0px"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          type="password"
        />
        <ButtonContainer>
          <Button type="submit">Alterar Senha</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};
