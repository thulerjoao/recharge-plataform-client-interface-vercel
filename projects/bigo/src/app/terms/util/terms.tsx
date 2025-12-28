"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { TermsContainer } from "./style";

const Terms = () => {
  return (
    <TermsContainer>
      <div className="content-wrapper">
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          color={Theme.colors.mainlight}
          margin="0 0 32px 0"
        >
          Termos e Condições de Uso – 4MIGA GAMES
        </Text>

        <Text
          tag="p"
          fontName="REGULAR"
          color={Theme.colors.mainlight}
          margin="0 0 24px 0"
        >
          Estes Termos de Serviço regem seus (&quot;Você&quot;, &quot;seu&quot;)
          direitos e obrigações como usuários dos portais gerenciados pela 4MIGA
          GAMES. A menos que seja indicado de outra forma pela 4MIGA GAMES,
          todos os novos portais introduzidos e gerenciados pela 4MIGA GAMES
          serão regidos por estes Termos de Serviço.
        </Text>

        <Text
          tag="p"
          fontName="REGULAR"
          color={Theme.colors.mainlight}
          margin="0 0 32px 0"
        >
          Ao acessar qualquer um dos Portais e/ou comprar qualquer item, você
          reconhece e aceita que o uso dos Portais e a compra de Itens serão
          regidos por estes Termos de Serviço e quaisquer outras regras
          específicas determinadas pela 4MIGA GAMES a seu exclusivo critério.
        </Text>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Definições
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Para fins destes Termos, aplicam-se as seguintes definições:
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                <strong>Conta:</strong> Sua conta registrada no aplicativo
                correspondente (ex: BIGO Live, Poppo Live, etc.).
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                <strong>Comprador:</strong> Usuário que compra Itens na 4MIGA
                GAMES.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                <strong>Itens / Créditos de Jogos:</strong> Produtos digitais
                listados para venda na 4MIGA GAMES. Este termo refere-se, mas
                não se limita, a: Diamantes do Bigo Live, Moedas do Poppo Live
                ou quaisquer outros créditos virtuais de aplicativos
                disponibilizados na plataforma.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                <strong>Portais:</strong> O site da 4MIGA GAMES disponível em
                www.4miga.games e quaisquer plataformas afiliadas gerenciadas
                pela empresa.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                <strong>Serviços:</strong> A venda e entrega de Créditos de
                Jogos através da 4MIGA GAMES.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Processo de Compra e Cadastro
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            O processo para comprar Créditos de Jogos na 4MIGA GAMES é o
            seguinte:
          </Text>

          <ol className="ordered-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                O comprador seleciona o pacote de Créditos de Jogos desejado
                (Bigo, Poppo, etc.). Os preços são exibidos na moeda local ou
                conforme indicado no site.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
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
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A precisão do ID do Usuário (UID) é de responsabilidade
                exclusiva do comprador. Créditos enviados para um ID incorreto
                não podem ser recuperados.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES entrega os Créditos adquiridos para o ID fornecido
                no pedido. Após a entrega, os Créditos não são reembolsáveis nem
                recuperáveis.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Se um pedido não puder ser atendido ou for rejeitado, os fundos
                serão reembolsados ou o pedido será cancelado a critério
                exclusivo da 4MIGA GAMES.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
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
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Licença de Uso
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 24px 0"
          >
            Ao aceitar estes Termos, a 4MIGA GAMES concede a você uma licença
            não exclusiva e intransferível para acessar seus Portais e utilizar
            seus Serviços conforme estes Termos.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Declarações e Garantias
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Ao usar nossos Portais, você declara e garante que:
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Você tem pelo menos 18 anos ou tem consentimento dos
                pais/responsável para usar nossos Serviços.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Todas as informações fornecidas, incluindo seu Nome, CPF, e-mail
                e ID do Usuário, são precisas, verdadeiras e atualizadas.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Você não usará os Serviços para atividades fraudulentas ou
                ilegais.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Você não revenderá os Itens adquiridos sem autorização prévia da
                4MIGA GAMES.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Você não adotará comportamento ofensivo, abusivo ou prejudicial
                contra a equipe 4MIGA GAMES ou outros usuários.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Quaisquer itens adicionais enviados por engano devem ser
                devolvidos à 4MIGA GAMES mediante notificação.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES não se responsabiliza pela forma como o cliente
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
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Pagamentos e Proteção contra Fraudes
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Pagamentos são aceitos nas moedas e métodos exibidos no site.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Para clientes brasileiros, o CPF informado será validado durante
                o checkout para garantir a segurança da transação e a
                identificação do responsável pela compra. O fornecimento de
                informações falsas ou o uso de dados de terceiros sem
                autorização pode resultar no cancelamento imediato do pedido.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Clientes internacionais concordam em fornecer informações
                pessoais reais e verificáveis no momento do checkout. Atividades
                suspeitas podem resultar na suspensão do pedido.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Estornos ou disputas não autorizadas podem resultar em bloqueio
                permanente da conta na plataforma, bloqueio do ID do Usuário
                para compras futuras e possível ação legal.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
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
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Disponibilidade dos Serviços
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES busca operar 24/7, mas pode haver interrupções
                devido a manutenções ou circunstâncias imprevistas.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Não garantimos acesso ininterrupto aos nossos Serviços.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES pode suspender, encerrar ou restringir o acesso
                aos Serviços a qualquer momento, sem aviso prévio.
              </Text>
            </li>
          </ul>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Limitação de Responsabilidade
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES atua como revendedora intermediária e não se
                responsabiliza por mudanças nas políticas dos desenvolvedores
                dos jogos (Bigo Technology, Poppo, etc.), alterações no valor
                das moedas virtuais ou pela descontinuação dos serviços pelos
                aplicativos originais.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES não garante que os Itens atenderão às suas
                expectativas ou que os Serviços estarão livres de erros.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Em nenhuma hipótese a 4MIGA GAMES será responsável por danos
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
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Indenização
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 24px 0"
          >
            Você concorda em indenizar e isentar a 4MIGA GAMES de quaisquer
            reivindicações, danos ou responsabilidades decorrentes do seu uso
            dos Serviços ou violação destes Termos.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Suspensão e Cancelamento
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            A 4MIGA GAMES reserva-se o direito de:
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Encerrar ou restringir imediatamente o acesso aos Serviços por
                qualquer motivo.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Suspender ou cancelar um pedido se houver suspeita de fraude,
                dados cadastrais inconsistentes (como CPF inválido) ou uso
                indevido.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
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
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Reembolso ou Cancelamento
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Para que o reembolso possa ser efetuado, antes o cancelamento da
            recarga precisa ser realizado.
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            O processo pode durar até 30 dias. E o usuário que recebeu as moedas
            não pode usá-las, a fim de que o aplicativo possa recuperar.
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
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
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Legislação Aplicável e Jurisdição
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 24px 0"
          >
            Estes Termos são regidos pelas leis aplicáveis no local de operação
            da 4MIGA GAMES. Ao utilizar nossos Serviços, você renuncia ao
            direito de participar de ações coletivas contra a 4MIGA GAMES.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Política de Privacidade
          </Text>

          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.mainlight}
            margin="0 0 24px 0"
          >
            A 4MIGA GAMES valoriza sua privacidade e a segurança de seus dados
            (incluindo Nome e CPF). Consulte nossa Política de Privacidade para
            saber como coletamos, usamos e protegemos suas informações pessoais.
          </Text>
        </section>

        <section className="section">
          <Text
            tag="h2"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="0 0 16px 0"
          >
            Disposições Finais
          </Text>

          <ul className="definitions-list">
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                A 4MIGA GAMES pode modificar estes Termos a qualquer momento.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                O uso contínuo dos nossos Serviços após as alterações constitui
                aceitação dos Termos revisados.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Estes Termos são vinculativos para todos os usuários e seus
                sucessores.
              </Text>
            </li>
            <li>
              <Text
                tag="span"
                fontName="REGULAR"
                color={Theme.colors.mainlight}
              >
                Em caso de dúvidas, entre em contato através do e-mail:{" "}
                <a href="mailto:suporte@4miga.games" className="email-link">
                  suporte@4miga.games
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
            color={Theme.colors.mainlight}
            margin="32px 0 0 0"
          >
            Última atualização: 17/12/2025
          </Text>
        </div>
      </div>
    </TermsContainer>
  );
};

export default Terms;
