"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useRef, useState } from "react";
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
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; email: string }>
  >([]);
  const [showResults, setShowResults] = useState(false);
  const [modalAction, setModalAction] = useState<"promote" | "demote" | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Fechar resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Simular busca na API
    // Em produção: chamar GET /emails?search=${value}
    const filtered = mockUsers.filter((user) =>
      user.email.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleSelectUser = (userId: string, email: string) => {
    setSelectedUser(userId);
    setSearchTerm(email);
    setShowResults(false);
  };

  const handlePromoteClick = () => {
    if (!selectedUser) return;
    setModalAction("promote");
    setIsModalOpen(true);
  };

  const handleRemoveAdmin = (adminId: string) => {
    setSelectedUser(getUserEmail(adminId));
    setModalAction("demote");
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!password || !selectedUser || !modalAction) return;

    setLoadingAction(true);

    // Simular chamada à API
    setTimeout(() => {
      console.log(`Promovendo usuário ${selectedUser} com senha`);
      setLoadingAction(false);
      setIsModalOpen(false);
      setPassword("");
      setSelectedUser("");
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
          <DefaultHeader title="ADMINISTRAÇÃO" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          ADMINISTRAÇÃO
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
                      <div className="adminInfo">
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
                          className="adminEmail"
                          fontName="REGULAR_MEDIUM"
                          color={Theme.colors.mainlight}
                        >
                          {admin.email}
                        </Text>
                      </div>
                      <button
                        className="removeButton"
                        onClick={() => handleRemoveAdmin(admin.id)}
                        type="button"
                      >
                        <span className="removeText">Remover</span>
                        <svg
                          className="removeIcon"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
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

            <div className="searchSection">
              <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
                Busque o email do usuário:
              </Text>
              <div className="searchInputWrapper" ref={searchWrapperRef}>
                <Input
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() =>
                    searchResults.length > 0 && setShowResults(true)
                  }
                  placeholder="Digite o email do usuário..."
                  height={40}
                />
                {showResults && searchResults.length > 0 && (
                  <ul className="searchResults">
                    {searchResults.map((user) => (
                      <li
                        key={user.id}
                        className="searchResultItem"
                        onClick={() => handleSelectUser(user.id, user.email)}
                      >
                        <Text
                          className="resultEmail"
                          fontName="REGULAR_MEDIUM"
                          color={Theme.colors.mainlight}
                        >
                          {user.email}
                        </Text>
                      </li>
                    ))}
                  </ul>
                )}
                {showResults &&
                  searchResults.length === 0 &&
                  searchTerm.length >= 2 && (
                    <div className="noResults">
                      <Text fontName="SMALL" color={Theme.colors.secondaryText}>
                        Nenhum usuário encontrado
                      </Text>
                    </div>
                  )}
              </div>
            </div>

            <div className="actionSection">
              <Button
                onClick={handlePromoteClick}
                title="PROMOVER"
                width={240}
                height={36}
                rounded
                disabled={!selectedUser}
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
          modalAction={modalAction}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
          password={password}
          setPassword={setPassword}
          loading={loadingAction}
          email={selectedUser}
        />
      )}
    </AdmPageContainer>
  );
};

export default AdmPage;
