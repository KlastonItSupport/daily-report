import { useCallback, useState } from "react";
import { api } from "../api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const scheme = yup.object().shape({
  email: yup
    .string()
    .required("* Email obrigatório")
    .email("* Insira um email válido"),
  password: yup.string().required("* Senha obrigatória"),
});

export const useAuth = () => {
  const accessTokenKey = "@DailyReport:accessToken";
  const userKey = "@DailyReport:user";
  const history = useNavigate();

  const onSubmit = useCallback(
    async ({ email, password }) => {
      try {
        const response = await api.post("/users/signIn", { email, password });

        const { accessToken } = response.data;
        const user = {
          id: response.data.id,
          name: response.data.name,
          email,
        };

        localStorage.setItem(accessTokenKey, accessToken);
        localStorage.setItem(userKey, JSON.stringify(user));

        dealingWithAuth();
      } catch (error) {
        toast.error("Erro ao realizar o login. Verifique suas credenciais.");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const dealingWithAuth = () => {
    const hasAccessToken = localStorage.getItem(accessTokenKey);
    const hasUser = localStorage.getItem(userKey);

    if (hasAccessToken && hasUser) {
      history("/home");
      return;
    }
    history("/");
  };

  const getUser = () => {
    const userStorage = JSON.parse(localStorage.getItem(userKey));
    return userStorage;
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    dealingWithAuth,
    getUser,
  };
};
