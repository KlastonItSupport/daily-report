import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/auth";
import {
  Container,
  Header,
  Image,
  WelcomeMessage,
  ContainerInput,
  InputsContainer,
  CheckBoxContainer,
  ButtonContainer,
} from "./style";
import logoKlaston from "../../assets/klastonblue.png";
import Checkbox from "../../components/checkbox";
import Input from "../../components/input";
import searchIcon from "../../assets/search-normal.png";
import { useReports } from "../../hooks/reports";
import { Button } from "../../components/button";
import Modal from "../../components/modal";
import { FormCreateDailyReport } from "../../components/form/form-create-daily-report";
import LoadingSpin from "../../components/loading";
import DataTable from "../../components/table";

export const HomePage = () => {
  const { dealingWithAuth, getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const user = useRef();

  const {
    getReports,
    reports,
    isModalOpen,
    handleModalToggle,
    checkedCheckBox,
    handleCheckBox,
    filterReports,
  } = useReports();

  const onLoading = async () => {
    dealingWithAuth();
    user.current = getUser();
    getReports(user.current.id);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  useEffect(() => {
    onLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Container>
      <Image src={logoKlaston} alt="klaston logo" />
      <Header>
        <WelcomeMessage>Bem vindo, Cristiano</WelcomeMessage>
        <InputsContainer>
          <CheckBoxContainer>
            <Checkbox
              label={"Cliente(Nome)"}
              margin={"0px 20px 0px 0px"}
              checked={checkedCheckBox === 0}
              onChange={() => handleCheckBox(0)}
            />
            <Checkbox
              label={"Email do profissional"}
              checked={checkedCheckBox === 1}
              onChange={() => handleCheckBox(1)}
            />
          </CheckBoxContainer>

          <ContainerInput>
            <Input
              icon={<img src={searchIcon} alt="search" />}
              borderRadius="25px"
              hint="Pesquisar"
              onChange={(e) => filterReports(e.target.value)}
            />
          </ContainerInput>
        </InputsContainer>
      </Header>
      {/* <CardList reports={reports} /> */}
      <DataTable data={reports} />
      <ButtonContainer>
        <Button onClick={handleModalToggle} type="">
          Gerar Daily Report
        </Button>
      </ButtonContainer>

      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <FormCreateDailyReport />
      </Modal>
    </Container>
  );
};
