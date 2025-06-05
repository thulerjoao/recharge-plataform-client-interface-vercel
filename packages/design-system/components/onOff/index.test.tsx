import { customRender } from "@4miga/test-commons/react-testing-library";
import OnOff from "./index";

const render = customRender();

describe("<OnOff /> snapshot tests", () => {
  it("onOff in on position", () => {
    const { container } = render(<OnOff onOff={true} />);
    expect(container).toMatchSnapshot();
  });

  it("onOff in off position", () => {
    const { container } = render(<OnOff onOff={false} />);
    expect(container).toMatchSnapshot();
  });
});
