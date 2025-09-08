import Input from "@4miga/design-system/components/input";
import InputMask from "react-input-mask";

interface PixKeyInputProps {
  paymentMethod: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  height?: 32 | 36 | 40 | 48 | 53;
}

export const PixKeyInput = ({
  paymentMethod,
  value,
  onChange,
  error,
  height = 32,
}: PixKeyInputProps) => {
  if (paymentMethod === "CPF") {
    return (
      <InputMask
        mask="999.999.999-99"
        maskChar=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {(inputProps: any) => (
          <Input
            {...inputProps}
            placeholder="000.000.000-00"
            height={height}
            className={error ? "error" : ""}
          />
        )}
      </InputMask>
    );
  }

  if (paymentMethod === "CNPJ") {
    return (
      <InputMask
        mask="99.999.999/9999-99"
        maskChar=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {(inputProps: any) => (
          <Input
            {...inputProps}
            placeholder="00.000.000/0000-00"
            height={height}
            className={error ? "error" : ""}
          />
        )}
      </InputMask>
    );
  }

  if (paymentMethod === "PHONE") {
    return (
      <InputMask
        mask="(99) 99999-9999"
        maskChar=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {(inputProps: any) => (
          <Input
            {...inputProps}
            placeholder="(11) 99999-9999"
            height={height}
            className={error ? "error" : ""}
          />
        )}
      </InputMask>
    );
  }

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={
        paymentMethod === "EMAIL"
          ? "email@exemplo.com"
          : paymentMethod === "RANDOM"
            ? "Chave aleatória de 32 caracteres"
            : "Chave PIX"
      }
      height={height}
      className={error ? "error" : ""}
    />
  );
};
