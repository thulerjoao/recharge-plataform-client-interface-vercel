import { customRender } from "@4miga/test-commons/react-testing-library";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../theme/theme";
import Text from "./index";

const render = customRender();

describe("<Text />", () => {
  it("render h2 tag", () => {
    const { container } = render(
      <ThemeProvider theme={Theme.bigoColors}>
        <Text
          align="justify"
          underline
          fontName="REGULAR_SEMI_BOLD"
          color={Theme.bigoColors.background_01}
          tag="h2"
        >
          Sample
        </Text>
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
