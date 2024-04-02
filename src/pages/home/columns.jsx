import moment from "moment";

export const columns = [
  {
    header: "Data de criação",
    access: "createdAt",
    formatData: (data) => moment(data).format("DD/MM/YYYY"),
  },
  {
    header: "Nome profissional",
    access: "professionalName",
  },
  {
    header: "Email do profissional",
    access: "professionalEmail",
  },
  {
    header: "Foi assinado?",
    access: "isSigned",
    formatData: (data) => {
      return data ? "Assinado" : "Não assinado";
    },
  },
  {
    header: "Nome do cliente",
    access: "clientName",
  },
  {
    header: "Email do cliente",
    access: "clientEmail",
  },
  {
    header: "Início do serviço",
    access: "startDate",
  },
  {
    header: "Fim do serviço",
    access: "endDate",
  },
  {
    header: "Data do serviço",
    access: "serviceDate",
    formatData: (data) => moment(data).format("DD/MM/YYYY"),
  },
  {
    header: "Tipo do serviço",
    access: "serviceType",
    formatData: (data) => {
      if (data === 1) return "Auditoria";
      if (data === 2) return "Consultoria";
      if (data === 3) return "Treinamento";
    },
  },
  {
    header: "Serviço executado",
    access: "executedService",
  },
  {
    header: "Pendências",
    access: "pendencies",
  },
  {
    header: "Planejamento",
    access: "planning",
  },
];
