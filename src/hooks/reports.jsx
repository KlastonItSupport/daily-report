import { useRef, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

export const useReports = () => {
  const reportId = useRef();
  const [originalReports, setOriginalReports] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedCheckBox, setCheckedCheckBox] = useState(0);
  const [number, setNumber] = useState(1);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const getReports = async (id) => {
    const response = await api.get(`/service-info/${id}`);
    setReports(response.data);
    setOriginalReports(response.data);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckBox = (number) => {
    setCheckedCheckBox(number);
    clearFilter();
  };

  const createReport = async (data) => {
    try {
      const response = await api.post("/service-info/report", { ...data });
      return response.data.link;
    } catch (e) {
      toast.error("Ocorreu um erro ao criar um report.");
    }
  };

  const filterReports = (inputValue) => {
    if (inputValue.length === 0) {
      clearFilter();
      return;
    }

    if (inputValue.length >= 3) {
      const filteredReports = reports.filter((report) => {
        const keysToFilter = Object.keys(report).filter(
          (key) => key !== "id" && !key.endsWith("Date")
        ); // Excluir 'id' e campos de data
        for (const key of keysToFilter) {
          if (
            typeof report[key] === "string" &&
            report[key].toLowerCase().includes(inputValue.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setReports(filteredReports);
    }
  };

  const clearFilter = () => {
    setReports(originalReports);
  };

  const sendReportToClient = async (data) => {
    setIsLoadingRequest(true);
    const dateString = data.serviceDate;
    const [day, month, year] = dateString.split("/");

    const formattedDate = `${year}-${month}-${day}`;
    data.serviceDate = formattedDate;
    try {
      await api.post("/service-info", { ...data, reportId: reportId.current });
      toast.success("Report Criado com sucesso.");
    } catch (_) {
      toast.error("Ocorreu um erro ao criar um report.");
    }
    setIsLoadingRequest(false);
  };

  const getReportPdfBuffer = async (id, sign) => {
    const response = await api.get(
      `service-info/report/pdf/${id}${sign ? "?sign=true" : ""}`
    );
    return response.data.buffer;
  };

  const fetchPdfData = async (id, sign) => {
    const bufferData = await getReportPdfBuffer(id, sign);

    const blob = new Blob([new Uint8Array(bufferData.data)], {
      type: "application/pdf",
    });
    const url = window.URL.createObjectURL(blob);

    setPdfData({
      url: url,
      filename: "document-sign.pdf",
      uint: new Uint8Array(bufferData.data),
    });
  };

  const signDocument = async (imageDataURL, dailyReportId, closeModal) => {
    await api
      .post("/service-info/sign", {
        imageDataURL: imageDataURL,
        reportId: dailyReportId,
      })
      .then((response) => {
        toast.success("Documento assinado com sucesso e emails disparados.");
        const blob = new Blob([new Uint8Array(response.data.buffer.data)], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);

        setPdfData({
          url: url,
          filename: "document-sign.pdf",
        });

        document.getElementById("iframe").src = url;
        closeModal();
      })
      .catch((_) => {
        toast.error("Erro ao criar documento");
      });
  };

  return {
    getReports,
    reports,
    isModalOpen,
    handleModalToggle,
    createReport,
    checkedCheckBox,
    handleCheckBox,
    filterReports,
    sendReportToClient,
    reportId,
    pdfData,
    fetchPdfData,
    signDocument,
    number,
    isLoadingRequest,
  };
};
