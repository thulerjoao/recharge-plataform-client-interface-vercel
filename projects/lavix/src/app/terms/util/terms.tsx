"use client";

import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { TermsContainer } from "./style";

const Terms = () => {
  const theme = useTheme();
  return (
    <TermsContainer>
      <div className="content-wrapper">
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          color={theme.text_01}
          margin="0 0 32px 0"
        >
          Termos e Condições de Uso – LAVIX
        </Text>

        <Text
          tag="p"
          fontName="REGULAR"
          color={theme.text_01}
          margin="0 0 24px 0"
        >
          Estes Termos de Serviço regem seus (&quot;Você&quot;, &quot;seu&quot;)
          direitos e obrigações como usuários dos portais gerenciados pela LAVIX. A menos que seja indicado de outra forma pela LAVIX,
          todos os novos portais introduzidos e gerenciados pela LAVIX
          serão regidos por estes Termos de Serviço.
        </Text>

        <Text
          tag="p"
          fontName="REGULAR"
          color={theme.text_01}
          margin="0 0 32px 0"
        >
          Ao acessar qualquer um dos Portais e/ou comprar qualquer item, você
          reconhece e aceita que o uso dos Portais e a compra de Itens serão
          regidos por estes Termos de Serviço e quaisquer outras regras
          específicas determinadas pela LAVIX a seu exclusivo critério.
        </Text>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Definições
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Para fins destes Termos, aplicam-se as seguintes definições:
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                <strong>Conta:</strong> Sua conta registrada no aplicativo
                correspondente (ex: BIGO Live, Poppo Live, etc.).
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                <strong>Comprador:</strong> Usuário que compra Itens na LAVIX.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                <strong>Itens / Créditos de Jogos:</strong> Produtos digitais
                listados para venda na LAVIX. Este termo refere-se, mas
                não se limita, a: Diamantes do Bigo Live, Moedas do Poppo Live
                ou quaisquer outros créditos virtuais de aplicativos
                disponibilizados na plataforma.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                <strong>Portais:</strong> O site da LAVIX e quaisquer plataformas afiliadas gerenciadas
                pela empresa.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                <strong>Serviços:</strong> A venda e entrega de Créditos de
                Jogos através da LAVIX.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Processo de Compra e Cadastro
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            O processo para comprar Créditos de Jogos na LAVIX é o
            seguinte:
          </Text>

          <ol className="ordered-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                O comprador seleciona o pacote de Créditos de Jogos desejado
                (Bigo, Poppo, etc.). Os preços são exibidos na moeda local ou
                conforme indicado no site.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Para fins de cadastro e responsabilização, o comprador deve
                fornecer informações precisas, incluindo:
              </Text>
              <ul className="nested-list">
                <li>Nome Completo;</li>
                <li>CPF (Cadastro de Pessoas Físicas) válido;</li>
                <li>Um endereço de e-mail válido;</li>
                <li>Detalhes de faturamento;</li>
                <li>
                  O ID do Usuário (UID) do aplicativo para onde os créditos
                  devem ser entregues.
                </li>
              </ul>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A precisão do ID do Usuário (UID) é de responsabilidade
                exclusiva do comprador. Créditos enviados para um ID incorreto
                não podem ser recuperados.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX entrega os Créditos adquiridos para o ID fornecido
                no pedido. Após a entrega, os Créditos não são reembolsáveis nem
                recuperáveis.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Se um pedido não puder ser atendido ou for rejeitado, os fundos
                serão reembolsados ou o pedido será cancelado a critério
                exclusivo da LAVIX.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Os pedidos normalmente são feitos instantaneamente assim que o
                pagamento é confirmado pelo nosso sistema, mas podem levar até
                um (1) dia útil para serem processados a partir do momento em
                que o pagamento integral for recebido.
              </Text>
            </li>
          </ol>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Licença de Uso
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 24px 0"
          >
            Ao aceitar estes Termos, a LAVIX concede a você uma licença
            não exclusiva e intransferível para acessar seus Portais e utilizar
            seus Serviços conforme estes Termos.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Declarações e Garantias
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Ao usar nossos Portais, você declara e garante que:
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Você tem pelo menos 18 anos ou tem consentimento dos
                pais/responsável para usar nossos Serviços.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Todas as informações fornecidas, incluindo seu Nome, CPF, e-mail
                e ID do Usuário, são precisas, verdadeiras e atualizadas.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Você não usará os Serviços para atividades fraudulentas ou
                ilegais.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Você não revenderá os Itens adquiridos sem autorização prévia da
                LAVIX.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Você não adotará comportamento ofensivo, abusivo ou prejudicial
                contra a equipe LAVIX ou outros usuários.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Quaisquer itens adicionais enviados por engano devem ser
                devolvidos à LAVIX mediante notificação.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX não se responsabiliza pela forma como o cliente
                escolhe usar os Créditos dentro dos aplicativos (seja Bigo Live,
                Poppo Live ou outros). Todo uso, consumo ou gasto no aplicativo
                é de responsabilidade exclusiva do cliente.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Pagamentos e Proteção contra Fraudes
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Pagamentos são aceitos nas moedas e métodos exibidos no site.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Para clientes brasileiros, o CPF informado será validado durante
                o checkout para garantir a segurança da transação e a
                identificação do responsável pela compra. O fornecimento de
                informações falsas ou o uso de dados de terceiros sem
                autorização pode resultar no cancelamento imediato do pedido.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Clientes internacionais concordam em fornecer informações
                pessoais reais e verificáveis no momento do checkout. Atividades
                suspeitas podem resultar na suspensão do pedido.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Estornos ou disputas não autorizadas podem resultar em bloqueio
                permanente da conta na plataforma, bloqueio do ID do Usuário
                para compras futuras e possível ação legal.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Para evitar fraudes e mal-entendidos, todas as transações são
                rastreadas e os comprovantes digitais armazenados.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Disponibilidade dos Serviços
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX busca operar 24/7, mas pode haver interrupções
                devido a manutenções ou circunstâncias imprevistas.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Não garantimos acesso ininterrupto aos nossos Serviços.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX pode suspender, encerrar ou restringir o acesso
                aos Serviços a qualquer momento, sem aviso prévio.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Limitação de Responsabilidade
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX atua como revendedora intermediária e não se
                responsabiliza por mudanças nas políticas dos desenvolvedores
                dos jogos (Bigo Technology, Poppo, etc.), alterações no valor
                das moedas virtuais ou pela descontinuação dos serviços pelos
                aplicativos originais.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX não garante que os Itens atenderão às suas
                expectativas ou que os Serviços estarão livres de erros.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Em nenhuma hipótese a LAVIX será responsável por danos
                incidentais, especiais ou consequenciais decorrentes do uso dos
                nossos Serviços.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Indenização
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 24px 0"
          >
            Você concorda em indenizar e isentar a LAVIX de quaisquer
            reivindicações, danos ou responsabilidades decorrentes do seu uso
            dos Serviços ou violação destes Termos.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Suspensão e Cancelamento
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            A LAVIX reserva-se o direito de:
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Encerrar ou restringir imediatamente o acesso aos Serviços por
                qualquer motivo.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Suspender ou cancelar um pedido se houver suspeita de fraude,
                dados cadastrais inconsistentes (como CPF inválido) ou uso
                indevido.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Cobrar valores pendentes antes de permitir novo uso dos
                Serviços.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Reembolso ou Cancelamento
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Para que o reembolso possa ser efetuado, antes o cancelamento da
            recarga precisa ser realizado.
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            O processo pode durar até 30 dias. E o usuário que recebeu as moedas
            não pode usá-las, a fim de que o aplicativo possa recuperar.
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 24px 0"
          >
            Caso as moedas sejam usadas, os aplicativos ficam isentos da
            recuperação, como previsto nos termos dos próprios.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Legislação Aplicável e Jurisdição
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 24px 0"
          >
            Estes Termos são regidos pelas leis aplicáveis no local de operação
            da LAVIX. Ao utilizar nossos Serviços, você renuncia ao
            direito de participar de ações coletivas contra a LAVIX.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Política de Privacidade
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={theme.text_01}
            margin="0 0 24px 0"
          >
            A LAVIX valoriza sua privacidade e a segurança de seus dados
            (incluindo Nome e CPF). Consulte nossa Política de Privacidade para
            saber como coletamos, usamos e protegemos suas informações pessoais.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={theme.text_01}
            margin="0 0 16px 0"
          >
            Disposições Finais
          </Text>

          <ul className="definitions-list">
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                A LAVIX pode modificar estes Termos a qualquer momento.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                O uso contínuo dos nossos Serviços após as alterações constitui
                aceitação dos Termos revisados.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Estes Termos são vinculativos para todos os usuários e seus
                sucessores.
              </Text>
            </li>
            <li>
              <Text tag="span" fontName="REGULAR" color={theme.text_01}>
                Em caso de dúvidas, entre em contato através do e-mail:{" "}
                <a href="mailto:suporte@lavix.com" className="email-link">
                  suporte@lavix.com
                </a>
                .
              </Text>
            </li>
          </ul>
        </section>

        <div className="last-update">
          <Text
            tag="p"
            fontName="SMALL"
            color={theme.text_01}
            margin="32px 0 0 0"
          >
            Última atualização: 17/03/2026
          </Text>
        </div>
      </div>
    </TermsContainer>
  );
};

export default Terms;
