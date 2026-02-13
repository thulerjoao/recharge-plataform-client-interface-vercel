import Text from "@4miga/design-system/components/Text";
import React, { useRef, useState } from "react";
import { useTheme } from "styled-components";
import { ValidationContainer } from "./style";

interface Props {
  code: number;
  setCode: React.Dispatch<React.SetStateAction<number>>;
}

const InputCode = ({ code, setCode }: Props) => {
  const theme = useTheme();
  const [isInputFocused, setInputFocused] = useState(false);

  const handlechange = (newNumber: number) => {
    if (newNumber.toString().length < 7) {
      setCode(newNumber);
    }
  };

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setInputFocused(true);
    }
  };

  const handleShowCaret = (num: number) => {
    if (isInputFocused) {
      if (code) {
        if (code.toString().length === num) {
          return true;
        } else {
          return false;
        }
      } else if (num === 0) {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <ValidationContainer>
      <div className="codeBox" onClick={() => focusInput()}>
        <Text
          color={theme.background_01}
          align="center"
          fontName="REGULAR_MEDIUM"
        >
          {code ? code.toString()[0] : null}
        </Text>
        {handleShowCaret(0) && <span>|</span>}
      </div>
      <div className="codeBox" onClick={() => focusInput()}>
        <Text
          color={theme.background_01}
          align="center"
          fontName="REGULAR_MEDIUM"
        >
          {code ? code.toString()[1] : null}
        </Text>
        {handleShowCaret(1) && <span>|</span>}
      </div>
      <div className="codeBox" onClick={() => focusInput()}>
        <Text
          color={theme.background_01}
          align="center"
          fontName="REGULAR_MEDIUM"
        >
          {code ? code.toString()[2] : null}
        </Text>
        {handleShowCaret(2) && <span>|</span>}
      </div>
      <div className="codeBox" onClick={() => focusInput()}>
        <Text
          color={theme.background_01}
          align="center"
          fontName="REGULAR_MEDIUM"
        >
          {code ? code.toString()[3] : null}
        </Text>
        {handleShowCaret(3) && <span>|</span>}
      </div>
      <div className="codeBox" onClick={() => focusInput()}>
        <Text
          color={theme.background_01}
          align="center"
          fontName="REGULAR_MEDIUM"
        >
          {code ? code.toString()[4] : null}
        </Text>
        {handleShowCaret(4) && <span>|</span>}
      </div>
      <div className="codeBox" onClick={() => focusInput()}>
        <Text
          color={theme.background_01}
          align="center"
          fontName="REGULAR_MEDIUM"
        >
          {code ? code.toString()[5] : null}
        </Text>
        {handleShowCaret(5) && <span>|</span>}
      </div>
      <input
        onBlur={() => setInputFocused(false)}
        ref={inputRef}
        className="hiddenInput"
        type="number"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/[^0-9-]/g, "");
        }}
        value={code}
        onChange={(e) => handlechange(e.target.valueAsNumber)}
      ></input>
    </ValidationContainer>
  );
};

export default InputCode;
