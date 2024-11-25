import styled from "styled-components";

export const StyledDatePickerWrapper = styled.div`
  /* Definindo o fundo transparente */
  .MuiPickersBasePicker-root {
    background-color: black !important;
    border-radius: 8px;
    background-color: #00c8ff;
  }

  /* Estilo para o cabeçalho do calendário */
  .MuiPickersCalendarHeader-root {
    color: white;
  }

  /* Estilo para os dias do calendário */
  .MuiPickersDay-root {
    color: white;
    &:hover {
      background-color: #00c8ff; /* cor suave ao passar o mouse */
    }
  }

  /* Estilo para o dia selecionado */
  .Mui-selected {
    color: white;
  }

  /* Estilo para os números e letras do calendário */
  .MuiTypography-root {
    color: white;
  }
`;
