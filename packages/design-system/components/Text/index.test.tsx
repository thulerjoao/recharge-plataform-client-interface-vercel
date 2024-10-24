import { customRender } from "@4miga/test-commons/react-testing-library";
import { Theme } from "../../theme/theme";
import Text from "./index";

const render = customRender();

describe("<Text />", () => {
  it("render h2 tag", () => {
    const { container } = render(
      <Text
        align="justify"
        underline
        fontName="REGULAR_SEMI_BOLD"
        color={Theme.colors.maindark}
        tag="h2"
      >
        Sample
      </Text>,
    );
    expect(container).toMatchSnapshot();
  });
});
