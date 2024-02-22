import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const scheme = yup.object().shape({
  professionalName: yup.string().required("* Nome obrigatório"),
  professionalEmail: yup
    .string()
    .required("* Email obrigatório")
    .email("* Insira um Email válido"),
  clientName: yup.string().required("* Nome obrigatório"),
  clientEmail: yup
    .string()
    .required("* Email obrigatório")
    .email("* Insira um Email válido"),
  startDate: yup
    .string()
    .required("* Hora obrigatória")
    .test("is-valid-hour", "Formato de hora inválido. Ex: 17:40", (value) => {
      const regex = /^([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
      return regex.test(value);
    }),

  endDate: yup
    .string()
    .required("* Hora obrigatória")
    .test("is-valid-hour", "Formato de hora inválido. Ex: 17:40", (value) => {
      const regex = /^([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
      return regex.test(value);
    }),

  serviceDate: yup
    .string()
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Formato inválido. Formato correto: dd/mm/yyyy"
    )
    .required("* Data obrigatória"),
  serviceType: yup.string().required("* Tipo de serviço obrigatório"),
  executedService: yup
    .string()
    .required("* Serviço executado obrigatório")
    .max(1200, "Limite de 1200 caracteres")
    .matches(/^[^\r\n]*$/, "Não são permitidas quebras de linha no campo"),

  pendencies: yup
    .string()
    .required("* Pendências obrigatórias")
    .matches(/^[^\r\n]*$/, "Não são permitidas quebras de linha no campo")
    .test("max-length", "Limite de 700 caracteres", (value) => {
      if (value) {
        return value.length <= 700;
      }
      return true;
    }),

  planning: yup
    .string()
    .required("* Planejamento obrigatório")
    .max(500, "Limite de 500 caracteres")
    .matches(/^[^\r\n]*$/, "Não são permitidas quebras de linha no campo"),
});
