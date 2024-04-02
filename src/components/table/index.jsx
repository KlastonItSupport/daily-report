import React, { useState } from "react";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { DownloadSimple } from "@phosphor-icons/react";
import moment from "moment";

const TableCustom = ({ columns, data }) => {
  const [sort, setSort] = useState({
    column: "",
    direction: "desc",
    previousClicked: "",
  });

  const isMobile = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    sm: true,
  });

  const checkSortDirection = (columnName) => {
    if (columnName === sort.column && sort.direction !== "desc") {
      return <CaretUp style={{ marginLeft: "10px" }} size={20} />;
    }
    return <CaretDown style={{ marginLeft: "10px" }} size={20} />;
  };

  const handleSort = (column, index) => {
    if (sort.previousClicked && sort.previousClicked !== column) {
      sort.direction = "desc";
    }
    const newDirection = sort.direction === "asc" ? "desc" : "asc";

    setSort({
      column,
      direction: newDirection,
      previousClicked: column,
    });

    data.sort((a, b) => {
      if (columns[index].sortFunc) {
        return columns[index].sortFunc(
          a,
          b,
          columns[index].access,
          newDirection
        );
      } else {
        console.log("VALOR", a[column]);
        if (typeof a[column] == "number" && typeof b[column] == "number") {
          return (a[column] - b[column]) * (newDirection === "asc" ? 1 : -1);
        }

        if (typeof a[column] === "boolean" && typeof b[column] === "boolean") {
          return a[column] === b[column]
            ? 0
            : newDirection === "asc"
              ? a[column]
                ? -1
                : 1
              : a[column]
                ? 1
                : -1;
        }

        return (
          a[column].localeCompare(b[column]) * (newDirection === "asc" ? 1 : -1)
        );
      }
    });
  };

  const renderTableHeader = () => {
    return columns.map((column, index) => {
      return (
        <Th
          onClick={() => handleSort(column.access, index)}
          key={column.header + "thx"}
          cursor={"pointer"}
          border={"1px solid #ddd"}
        >
          <Text display={"flex"} alignItems={"center"}>
            {column.header} {checkSortDirection(column.access)}
          </Text>
        </Th>
      );
    });
  };
  const handleDownload = (item) => {
    const idUrl = item.isSigned ? `${item.id}-signed` : item.id;
    return (
      "url:", `https://daily-report-klaston.s3.us-east-2.amazonaws.com/${idUrl}`
    );
  };

  const dateWhenDownloadBecomeAvailable = moment("2024-04-03");

  const renderTableRows = () => {
    return data.map((item, index) => {
      const isEvenNumber = index % 2 === 0 ? true : false;
      return (
        <Tr
          key={item.name + index}
          bgColor={isEvenNumber ? "#F5F5F5" : "white"}
          _hover={{ bgColor: "#ebebeb" }}
        >
          <Td border={"1px solid #ddd"} height={"15px"}>
            <a
              href={handleDownload(item)}
              target="_blank"
              rel="noreferrer"
              style={{
                pointerEvents: moment(item.createdAt).isAfter(
                  dateWhenDownloadBecomeAvailable
                )
                  ? ""
                  : "none",
              }}
            >
              <DownloadSimple
                size={32}
                color={
                  moment(item.createdAt).isAfter(
                    dateWhenDownloadBecomeAvailable
                  )
                    ? "black"
                    : "lightgray"
                }
              />
            </a>
          </Td>
          {columns.map((column, index) => {
            return (
              <Td
                height={"15px"}
                border={"1px solid #ddd"}
                key={column + index}
              >
                <Text
                  maxW={250}
                  maxH={140}
                  overflowY={"auto"}
                  fontSize="sm"
                  p={"0px"}
                >
                  {column.formatData
                    ? column.formatData(item[column.access])
                    : item[column.access]}
                </Text>
              </Td>
            );
          })}
        </Tr>
      );
    });
  };

  return (
    <Box w="100%" px="0px" margin={"0 auto"} bgColor={"white"}>
      <VStack alignItems={"start"} padding={"20px"}>
        <Flex
          flexDirection={isMobile ? "column" : "row"}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Text
            fontSize={{ lg: "24px", md: "32px", sm: "24px" }}
            color={"navy.700"}
            fontWeight={"bold"}
            paddingBottom={isMobile ? "10px" : "0"}
          ></Text>
        </Flex>
      </VStack>
      <Box width={"95vw"} height={{ lg: "70vh", sm: "60vh" }} overflow={"auto"}>
        <Table>
          <Thead>
            <Tr>
              <Th border={"1px solid #ddd"}></Th>
              {renderTableHeader()}

              <Th border={"1px solid #ddd"}></Th>
            </Tr>
          </Thead>
          <Tbody>{renderTableRows()}</Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableCustom;
