import React from "react";
import {
  StickyHeader,
  StyledTable,
  Table,
  TableBody,
  TableCell,
} from "./style";

const DataTable = ({ data }) => {
  const handleServiceType = (type) => {
    if (type === 1) return "Auditoria";
    if (type === 2) return "Consultoria";
    if (type === 3) return "Treinamento";
  };

  return (
    <StyledTable>
      <Table>
        <StickyHeader>
          <tr>
            <TableCell>Nome do profissional</TableCell>
            <TableCell>Email do profissional</TableCell>
            <TableCell>Nome do cliente</TableCell>
            <TableCell>Email do cliente</TableCell>
            <TableCell>Inicio do serviço</TableCell>
            <TableCell>Fim do serviço</TableCell>
            <TableCell>Data do serviço</TableCell>
            <TableCell>Tipo do serviço</TableCell>
            <TableCell>Preço do serviço</TableCell>
            <TableCell>Serviço executado</TableCell>
            <TableCell>Pendências</TableCell>
            <TableCell>Planejamento</TableCell>
          </tr>
        </StickyHeader>
        <TableBody>
          {data.map((row) => (
            <tr key={row.id}>
              <TableCell>{row.professionalName}</TableCell>
              <TableCell>{row.professionalEmail}</TableCell>
              <TableCell>{row.clientName}</TableCell>
              <TableCell>{row.clientEmail}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.serviceDate}</TableCell>
              <TableCell>{handleServiceType(row.serviceType)}</TableCell>
              <TableCell>{row.servicePrice}</TableCell>
              <TableCell>{row.executedService}</TableCell>
              <TableCell>{row.pendencies}</TableCell>
              <TableCell>{row.planning}</TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </StyledTable>
  );
};

export default DataTable;
