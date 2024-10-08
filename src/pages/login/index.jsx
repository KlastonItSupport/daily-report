import {
  Container,
  Form,
  Image,
  ButtonContainer,
  ForgotPassword,
  ForgotPasswordContainer,
} from "./style";
import logoKlaston from "../../assets/klastonblue.png";
import Input from "../../components/input";
import { Button } from "../../components/button";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import LoadingSpin from "../../components/loading";
export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { handleSubmit, onSubmit, register, errors, dealingWithAuth } =
    useAuth();

  const onLoading = async () => {
    dealingWithAuth(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    onLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Image src={logoKlaston} alt="klaston logo" />
        <Input
          label={"Email"}
          margin="20px 0px 20px 0px"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label={"Senha"}
          margin="0px"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <ButtonContainer>
          <Button type="submit">Entrar</Button>
        </ButtonContainer>
      </Form>

      <ForgotPasswordContainer>
        <ForgotPassword href="/forgot/password">Recuperar Senha</ForgotPassword>
      </ForgotPasswordContainer>
    </Container>
  );
};
