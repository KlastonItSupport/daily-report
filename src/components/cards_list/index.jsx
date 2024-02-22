import { Card } from "../card";
import { Container } from "./style";

export const CardList = ({ reports }) => {
  return (
    <Container>
      {reports.length > 0 &&
        reports.map((report) => <Card report={report} key={report.id} />)}
    </Container>
  );
};
