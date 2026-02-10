import React from "react";
import { customRender } from "@4miga/test-commons/react-testing-library";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../theme/theme";
import OnOff from "./index";

const render = customRender();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={Theme.bigoColors}>{ui}</ThemeProvider>);

describe("<OnOff /> snapshot tests", () => {
  it("onOff in on position", () => {
    const { container } = renderWithTheme(<OnOff onOff={true} />);
    expect(container).toMatchSnapshot();
  });

  it("onOff in off position", () => {
    const { container } = renderWithTheme(<OnOff onOff={false} />);
    expect(container).toMatchSnapshot();
  });
});
