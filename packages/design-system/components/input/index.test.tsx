import { customRender } from "@4miga/test-commons/react-testing-library";
import Input from "./index";

const render = customRender();

describe("Global input snapshot test", () => {
  const heights = [40, 48] as const;

  heights.forEach((height) => {
    test(`matches snapshot with height ${height}`, () => {
      const { asFragment } = render(
        <Input height={height} value={`The height value is ${height}`} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test("matches the snapshot with a left element", () => {
    const { asFragment } = render(
      <Input height={40} leftElement={<span>Left</span>} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshot when loading", () => {
    const { asFragment } = render(<Input height={40} loading={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshot with custom margin and padding", () => {
    const { asFragment } = render(
      <Input height={48} margin="10px" padding="5px" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
