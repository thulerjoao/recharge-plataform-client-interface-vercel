import { render } from "@testing-library/react";
import Button from "./index";

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
