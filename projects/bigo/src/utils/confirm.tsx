import Button from "@4miga/design-system/components/button";
import { Theme } from "@4miga/design-system/theme/theme";
import toast from "react-hot-toast";

export const confirmToast = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast.custom(
      (t) => (
        <div
          style={{
            background: Theme.colors.maindark,
            color: Theme.colors.mainlight,
            border: `1px solid ${Theme.colors.mainHighlight}`,
            borderRadius: "12px",
            padding: "16px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minWidth: "300px",
            maxWidth: "400px",
            fontFamily: "'Montserrat', 'Open Sans', sans-serif",
            fontSize: "14px",
          }}
        >
          <p
            style={{
              margin: 0,
              whiteSpace: "pre-line",
              textAlign: "center",
              color: Theme.colors.mainlight,
            }}
          >
            {message}
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <Button
              onClick={() => {
                resolve(false);
                toast.remove(t.id);
              }}
              title="Cancelar"
              width={120}
              height={32}
              rounded
              isNotSelected
              style={{ color: Theme.colors.mainlight }}
            />
            <Button
              onClick={() => {
                resolve(true);
                toast.remove(t.id);
              }}
              title="Confirmar"
              width={120}
              height={32}
              rounded
            />
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      },
    );
  });
};
