import Button from "./index";
import { customRender } from "@4miga/test-commons/react-testing-library";

const render = customRender();

describe("Button Component Snapshots", () => {
  const heights = [28, 32, 40, 48] as const;

  heights.forEach((height) => {
    test(`matches snapshot with height ${height}`, () => {
      const { asFragment } = render(
        <Button title={`Height ${height}`} height={height} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test("matches snapshot with rounded corners", () => {
    const { asFragment } = render(
      <Button title="Rounded Button" height={40} rounded />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot with no rounded corners", () => {
    const { asFragment } = render(
      <Button title="Square Button" height={40} rounded={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
