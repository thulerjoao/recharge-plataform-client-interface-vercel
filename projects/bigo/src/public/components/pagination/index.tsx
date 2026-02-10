import Text from "@4miga/design-system/components/Text";
import React from "react";
import { useTheme } from "styled-components";
import { PaginationContainer } from "./style";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
  const theme = useTheme();
  const createPageArray = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <PaginationContainer totalPages={totalPages}>
      {createPageArray().map((element, index) =>
        typeof element === "number" ? (
          <Text
            key={index}
            align="center"
            color={
              element !== page
                ? theme.text_03
                : theme.text_01
            }
            fontName="REGULAR_SEMI_BOLD"
            style={{ cursor: "pointer" }}
            onClick={() => setPage(element)}
          >
            {element}
          </Text>
        ) : (
          <Text
            key={index}
            className="dots"
            align="center"
            color={theme.text_03}
            fontName="REGULAR_SEMI_BOLD"
          >
            {element}
          </Text>
        ),
      )}
    </PaginationContainer>
  );
};

export default Pagination;
