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
    .required("* Data obrigatória")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Formato inválido. Formato correto: dd/mm/yyyy"
    ),
  serviceType: yup.string().required("* Tipo de serviço obrigatório"),
  executedService: yup
    .string()
    .required("* Serviço executado obrigatório")
    .max(2000, "Limite de 2000 caracteres")
    .test("max-line-breaks", "Limite de 5 quebras de linha", (value) => {
      if (value) {
        const lineBreaks = value.match(/\r\n|\r|\n/g);
        return lineBreaks ? lineBreaks.length <= 5 : true;
      }
      return true;
    }),

  pendencies: yup
    .string()
    .required("* Pendências obrigatórias")
    .max(2000, "Limite de 2000 caracteres")
    .test("max-line-breaks", "Limite de 5 quebras de linha", (value) => {
      if (value) {
        const lineBreaks = value.match(/\r\n|\r|\n/g);
        return lineBreaks ? lineBreaks.length <= 5 : true;
      }
      return true;
    }),

  planning: yup
    .string()
    .required("* Planejamento obrigatório")
    .max(2000, "Limite de 2000 caracteres")
    .test("max-line-breaks", "Limite de 5 quebras de linha", (value) => {
      if (value) {
        const lineBreaks = value.match(/\r\n|\r|\n/g);
        return lineBreaks ? lineBreaks.length <= 5 : true;
      }
      return true;
    }),
});
