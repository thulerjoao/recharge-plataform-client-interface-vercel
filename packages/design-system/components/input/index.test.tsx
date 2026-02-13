import React from "react";
import { customRender } from "@4miga/test-commons/react-testing-library";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../theme/theme";
import Input from "./index";

const render = customRender();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={Theme.bigoColors}>{ui}</ThemeProvider>);

describe("Global input snapshot test", () => {
  const heights = [40, 48] as const;

  heights.forEach((height) => {
    test(`matches snapshot with height ${height}`, () => {
      const { asFragment } = renderWithTheme(
        <Input height={height} value={`The height value is ${height}`} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test("matches the snapshot with a left element", () => {
    const { asFragment } = renderWithTheme(
      <Input height={40} leftElement={<span>Left</span>} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshot when loading", () => {
    const { asFragment } = renderWithTheme(
      <Input height={40} loading={true} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshot with custom margin and padding", () => {
    const { asFragment } = renderWithTheme(
      <Input height={48} margin="10px" padding="5px" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
