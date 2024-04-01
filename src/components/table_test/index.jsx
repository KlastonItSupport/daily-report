import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "../card/Card";

// Assets
import moment from "moment";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const handleServiceType = (type) => {
    if (type === 1) return "Auditoria";
    if (type === 2) return "Consultoria";
    if (type === 3) return "Treinamento";
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("black", "white");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX="auto"
      overflowY="auto"
      height={{ lg: "70vh", sm: "60vh" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center"></Flex>
      <Table
        {...getTableProps()}
        variant="simple"
        color="gray.500"
        mb="24px"
        overflowX={"auto"}
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th pe="10px" key={index} borderRight="1px solid #E1E9F8">
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="#8F9BBA"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={index}
                _hover={{ backgroundColor: "#F7F7F7" }}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Data de criação") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {moment(cell.value).format("DD/MM/YYYY")}
                      </Text>
                    );
                  } else if (cell.column.Header === "Nome profissional") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Email do profissional") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Foi assinado?") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value ? "Assinado" : "Não assinado"}
                      </Text>
                    );
                  } else if (cell.column.Header === "Nome do cliente") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Email do cliente") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Início do serviço") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Fim do serviço") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Data do serviço") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {moment(cell.value).format("DD/MM/YYYY")}
                      </Text>
                    );
                  } else if (cell.column.Header === "Tipo do serviço") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {handleServiceType(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "Serviço executado") {
                    data = (
                      <Text
                        maxW={250}
                        maxH={140}
                        overflowY={"auto"}
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Pendências") {
                    data = (
                      <Text
                        maxW={250}
                        maxH={140}
                        overflowY={"auto"}
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Planejamento") {
                    data = (
                      <Text
                        maxW={250}
                        maxH={140}
                        overflowY={"auto"}
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderRight={` 1px solid #E1E9F8`}
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
