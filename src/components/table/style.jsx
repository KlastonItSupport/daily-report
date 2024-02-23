import styled from "styled-components";

export const StyledTable = styled.div`
  overflow: auto;
  height: 700px;
  max-width: 100%;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  tr {
    background-color: #f2f2f2;
  }
  td {
    font-weight: bold;
  }
`;

export const StickyHeader = styled(TableHeader)`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableBody = styled.tbody`
  max-height: 800px;
  overflow-y: auto;
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  min-width: 100px;
`;
