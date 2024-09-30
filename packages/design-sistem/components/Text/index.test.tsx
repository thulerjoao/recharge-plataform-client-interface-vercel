import Text from "./index";
import { customRender } from "@4miga/test-commons/react-testing-library";

const render = customRender();

describe("<Text />", () => {
  it("render h1 tag", () => {
    const { container } = render(<Text tag="h2">Sample</Text>);
    expect(container).toMatchSnapshot();
  });
});
