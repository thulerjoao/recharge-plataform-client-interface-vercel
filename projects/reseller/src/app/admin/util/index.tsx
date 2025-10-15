"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIGet,
  connectionAPIPatch,
} from "@4miga/services/connectionAPI/connection";
import { useAuth } from "context/auth";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useRef, useState } from "react";
import PasswordModal from "../passwordModal";
import { AdmPageContainer } from "./style";

type emailUserType = {
  id: string;
  email: string;
};

const AdmPage = () => {
  const [selectedUser, setSelectedUser] = useState<emailUserType>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<emailUserType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [modalAction, setModalAction] = useState<"promote" | "demote" | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [admins, setAdmins] = useState<emailUserType[]>([]);
  const { user } = useAuth();

  const searchWrapperRef = useRef<HTMLDivElement>(null);

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

  const getAdmins = () => {
    connectionAPIGet<emailUserType[]>(`/user/admins`)
      .then((res) => {
        setAdmins(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const getUsersByEmail = (email: string) => {
    setSearchTerm(email);
    if (email.trim().length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    connectionAPIGet<emailUserType[]>(`/user/emails?search=${email}`)
      .then((res) => {
        setSearchResults(res);
        setShowResults(true);
      })
      .catch((err) => {
        console.error(err);
        setSearchResults([]);
        setShowResults(false);
      });
  };

  const handleSelectUser = (userId: string, email: string) => {
    const newUser = { email, id: userId };
    setSelectedUser(newUser);
    setSearchTerm(email);
    setShowResults(false);
  };

  const handlePromoteClick = () => {
    if (!selectedUser) return;
    setModalAction("promote");
    setIsModalOpen(true);
  };

  const handleRemoveAdminClick = (user: emailUserType) => {
    setSelectedUser(user);
    setModalAction("demote");
    setIsModalOpen(true);
  };

  const handleCleanResults = () => {
    handleCloseModal();
    setSelectedUser(null);
    setModalAction(null);
    setPassword("");
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
    getAdmins();
  };

  const handleConfirmAction = async () => {
    if (!password || !selectedUser || !modalAction) return;
    setLoadingAction(true);
    if (modalAction === "promote") {
      connectionAPIPatch(`/user/${selectedUser.id}/promote`, {
        password,
      })
        .then(() => {
          alert("Usuário promovido com sucesso!");
          handleCleanResults();
        })
        .catch((err) => {
          alert("Erro ao promover usuário");
          handleCloseModal();
          setSelectedUser(null);
          setModalAction(null);
          setPassword("");
        })
        .finally(() => setLoadingAction(false));
    } else if (modalAction === "demote") {
      connectionAPIPatch(`/user/${selectedUser.id}/demote`, {
        password,
      })
        .then(() => {
          alert("Usuário rebaixado com sucesso!");
          handleCleanResults();
        })
        .catch((err) => {
          alert("Erro ao rebaixar usuário");
          handleCloseModal();
          setSelectedUser(null);
          setModalAction(null);
          setPassword("");
        })
        .finally(() => setLoadingAction(false));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassword("");
    setModalAction(null);
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
              {admins?.length === 0 ? (
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
                  {admins?.map((admin) => (
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
                      {user?.email !== admin.email && (
                        <button
                          className="removeButton"
                          onClick={() => handleRemoveAdminClick(admin)}
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
                      )}
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
                  onChange={(e) => getUsersByEmail(e.target.value)}
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
                onClick={() => handlePromoteClick()}
                title="PROMOVER"
                width={240}
                height={36}
                rounded
                disabled={!selectedUser || loadingAction}
              />
            </div>
          </div>
        </section>
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
          email={selectedUser?.email}
        />
      )}
    </AdmPageContainer>
  );
};

export default AdmPage;
