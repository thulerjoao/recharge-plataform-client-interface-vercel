import { LineDetail } from "./style";

const Lines = () => {
  return (
    <LineDetail>
      <span className="verticalLines" />
      <span className="horizontalLine" />
      <span className="boldLittleLines">
        <span />
        <span />
      </span>
    </LineDetail>
  );
};

export default Lines;
