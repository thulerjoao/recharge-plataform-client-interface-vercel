"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import PasswordModal from "../passwordModal";
import { AdmPageContainer } from "./style";

// Mock data - dados simulados (formato que o backend retorna)
const mockUsers = [
  { id: "1", email: "usuario1@example.com" },
  { id: "2", email: "usuario2@example.com" },
  { id: "3", email: "usuario3@example.com" },
  { id: "4", email: "teste@example.com" },
  { id: "5", email: "contato@example.com" },
  { id: "6", email: "joao.silva@example.com" },
  { id: "7", email: "maria.santos@example.com" },
  { id: "8", email: "pedro.oliveira@example.com" },
];

const mockAdmins = [
  { id: "admin1", email: "admin@example.com" },
  { id: "admin2", email: "gerente@example.com" },
  { id: "admin3", email: "supervisor@example.com" },
];

const AdmPage = () => {
  const [selectedUserToPromote, setSelectedUserToPromote] = useState("");
  // const [selectedAdminToDemote, setSelectedAdminToDemote] = useState("");
  const [modalAction, setModalAction] = useState<"promote" | "demote" | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const handlePromoteClick = () => {
    if (!selectedUserToPromote) return;
    setModalAction("promote");
    setIsModalOpen(true);
  };

  // Função para rebaixar (desabilitada temporariamente)
  // const handleDemoteClick = () => {
  //   if (!selectedAdminToDemote) return;
  //   setModalAction("demote");
  //   setIsModalOpen(true);
  // };

  const handleConfirmAction = async () => {
    if (!password || !selectedUserToPromote || !modalAction) return;

    setLoadingAction(true);

    // Simular chamada à API
    setTimeout(() => {
      console.log(`Promovendo usuário ${selectedUserToPromote} com senha`);
      setLoadingAction(false);
      setIsModalOpen(false);
      setPassword("");
      setSelectedUserToPromote("");
      setModalAction(null);

      // Aqui você mostraria uma notificação de sucesso
      alert("Usuário promovido com sucesso!");
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassword("");
    setModalAction(null);
  };

  const getUserEmail = (userId: string) => {
    if (!userId) return "Usuário";
    const user = mockUsers.find((u) => u.id === userId);
    return user?.email || "Usuário";
  };

  return (
    <AdmPageContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="PERMISSÕES" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          PERMISSÕES
        </Text>
      </div>

      <main className="permissionsContainer">
        <section className="adminsListSection">
          <div className="sectionCard">
            <div className="headerSection">
              <div className="titleSection">
                <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
                  Administradores Atuais
                </Text>
                <Text
                  fontName="REGULAR_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Lista de todos os administradores da loja
                </Text>
              </div>
            </div>

            <div className="adminsListContent">
              {mockAdmins.length === 0 ? (
                <div className="emptyState">
                  <Text
                    align="center"
                    fontName="REGULAR_MEDIUM"
                    color={Theme.colors.secondaryText}
                  >
                    Nenhum administrador cadastrado
                  </Text>
                </div>
              ) : (
                <ul className="adminsList">
                  {mockAdmins.map((admin) => (
                    <li key={admin.id} className="adminItem">
                      <div className="adminIcon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <Text
                        fontName="REGULAR_MEDIUM"
                        color={Theme.colors.mainlight}
                      >
                        {admin.email}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
        <section className="promoteSection">
          <div className="sectionCard">
            <div className="headerSection">
              <div className="titleSection">
                <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
                  Promover Usuário para Administrador
                </Text>
                <Text
                  fontName="REGULAR_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Selecione um usuário para promover
                </Text>
              </div>
            </div>

            <div className="selectSection">
              <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
                Selecione o email do usuário:
              </Text>
              <select
                className="emailSelect"
                value={selectedUserToPromote}
                onChange={(e) => setSelectedUserToPromote(e.target.value)}
              >
                <option value="">Selecione um usuário...</option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="actionSection">
              <Button
                onClick={handlePromoteClick}
                title="PROMOVER"
                width={240}
                height={36}
                rounded
                disabled={!selectedUserToPromote}
              />
            </div>
          </div>
        </section>

        {/* <section className="demoteSection">
          <div className="sectionCard">
            <div className="headerSection">
              <div className="titleSection">
                <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
                  Rebaixar Administrador
                </Text>
                <Text
                  fontName="REGULAR_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Selecione um administrador para rebaixar
                </Text>
              </div>
            </div>

            <div className="selectSection">
              <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
                Selecione o email do administrador:
              </Text>
              <select
                className="emailSelect"
                value={selectedAdminToDemote}
                onChange={(e) => setSelectedAdminToDemote(e.target.value)}
              >
                <option value="">Selecione um administrador...</option>
                {mockAdmins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="actionSection demote">
              <Button
                onClick={handleDemoteClick}
                title="REBAIXAR PARA USUÁRIO"
                width={220}
                height={36}
                rounded
                disabled={!selectedAdminToDemote}
              />
            </div>
          </div>
        </section> */}
      </main>
      {isModalOpen && (
        <PasswordModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
          password={password}
          setPassword={setPassword}
          loading={loadingAction}
          userName={getUserEmail(selectedUserToPromote)}
        />
      )}
    </AdmPageContainer>
  );
};

export default AdmPage;
