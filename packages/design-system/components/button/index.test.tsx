import React from "react";
import Button from "./index";
import { customRender } from "@4miga/test-commons/react-testing-library";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../theme/theme";

const render = customRender();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={Theme.bigoColors}>{ui}</ThemeProvider>);

describe("Button Component Snapshots", () => {
  const heights = [28, 32, 40, 48] as const;

  heights.forEach((height) => {
    test(`matches snapshot with height ${height}`, () => {
      const { asFragment } = renderWithTheme(
        <Button title={`Height ${height}`} height={height} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test("matches snapshot with rounded corners", () => {
    const { asFragment } = renderWithTheme(
      <Button title="Rounded Button" height={40} rounded />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot with no rounded corners", () => {
    const { asFragment } = renderWithTheme(
      <Button title="Square Button" height={40} rounded={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
