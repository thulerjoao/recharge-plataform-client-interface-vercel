import Text from "@4miga/design-system/components/Text";
import { DailySalesContainer, VerticalBar } from "./style";

const DailySales = () => {
  return (
    <DailySalesContainer>
      <Text fontName="LARGE_SEMI_BOLD">Vendas diárias</Text>
      <div className="graphics ">
        <div className="vertical metrics">
          <Text fontName="SMALL">100k</Text>
          <Text fontName="SMALL">75k</Text>
          <Text fontName="SMALL">50k</Text>
          <Text fontName="SMALL">25k</Text>
          <Text fontName="SMALL">1k</Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={40} />
          <Text margin="7px 0" fontName="SMALL">
            Seg
          </Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={75} />
          <Text margin="7px 0" fontName="SMALL">
            Ter
          </Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={80} />
          <Text margin="7px 0" fontName="SMALL">
            Qua
          </Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={90} />
          <Text margin="7px 0" fontName="SMALL">
            Qui
          </Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={70} />
          <Text margin="7px 0" fontName="SMALL">
            Sex
          </Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={48} />
          <Text margin="7px 0" fontName="SMALL">
            Sáb
          </Text>
        </div>
        <div className="vertical">
          <VerticalBar heightinpercent={53} />
          <Text margin="7px 0" fontName="SMALL">
            Som
          </Text>
        </div>
      </div>
    </DailySalesContainer>
  );
};

export default DailySales;
