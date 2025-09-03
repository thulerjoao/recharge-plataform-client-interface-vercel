"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useInfluencers } from "context/influencers";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import Search from "../icons/Search.svg";
import InfluencerCard from "../influencerCard";
import { InfluencerContainer } from "./style";

interface Props {
  currentPage: number;
  search: string;
  status: "all" | "active" | "inactive";
}

const PartnersPage = ({
  currentPage,
  search,
  status: initialStatus,
}: Props) => {
  const router = useRouter();
  const {
    loadingInfluencers,
    influencers,
    getInfluencers,
    setPage,
    setFilter,
    setStatus,
  } = useInfluencers();

  // Estado local para o input de busca
  const [localFilter, setLocalFilter] = useState(search);
  const [localStatus, setLocalStatus] = useState(initialStatus);

  useEffect(() => {
    setPage(currentPage);
    setFilter(search);
    setLocalFilter(search);
    setStatus(initialStatus);
    setLocalStatus(initialStatus);
    getInfluencers(currentPage, 2, search, initialStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, initialStatus]);

  const handleChangeStatus = (newStatus: "all" | "active" | "inactive") => {
    setLocalStatus(newStatus);
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (newStatus !== "all") params.append("status", newStatus);

    const queryString = params.toString();
    const url = `/parceiros/1${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  const handleChangeFilter = (newFilter: string) => {
    setLocalFilter(newFilter);
    const params = new URLSearchParams();
    if (newFilter) params.append("search", newFilter);
    if (localStatus !== "all") params.append("status", localStatus);

    const queryString = params.toString();
    const url = `/parceiros/1${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  const handleInfluencerClick = (influencerId: string) => {
    router.push(`/parceiros/detalhes/${influencerId}`);
  };

  const handleAddInfluencer = () => {
    router.push("/parceiros/cadastrar");
  };

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (localStatus !== "all") params.append("status", localStatus);

    const queryString = params.toString();
    const url = `/parceiros/${newPage}${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  if (loadingInfluencers || !influencers) {
    return (
      <InfluencerContainer>
        <div className="desktop">
          <HeaderEnviroment>
            <DefaultHeader title="INFLUENCERS" />
          </HeaderEnviroment>
        </div>
        <div className="mobile mobileHeader">
          <Text align="center" fontName="LARGE_SEMI_BOLD">
            PARCEIROS
          </Text>
        </div>
        <main className="influencersContainer">
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Carregando parceiros...
            </Text>
          </div>
        </main>
      </InfluencerContainer>
    );
  }

  return (
    <InfluencerContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="PARCEIROS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          PARCEIROS
        </Text>
      </div>

      <main className="influencersContainer">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              Gerenciamento de Parceiros
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Gerencie todos os parceiros de sua loja
            </Text>
          </div>
          <Button
            onClick={handleAddInfluencer}
            title="CADASTRAR"
            width={140}
            height={32}
            rounded
          />
        </div>
        <div className="filtersSection">
          <form
            className="searchSection"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChangeFilter(localFilter);
            }}
          >
            <Input
              value={localFilter}
              onChange={(e) => setLocalFilter(e.target.value)}
              placeholder="Buscar por email ou telefone..."
              height={36}
            />
            <div
              className="searchButton"
              onClick={() => handleChangeFilter(localFilter)}
            >
              <Search />
            </div>
          </form>
          <div className="filterControls">
            <select
              value={localStatus}
              onChange={(e) => {
                handleChangeStatus(
                  e.target.value as "all" | "active" | "inactive",
                );
              }}
              className="filterSelect"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
        <section className="cardsSection">
          {loadingInfluencers && <div>Carregando...</div>}
          {!loadingInfluencers &&
            (!influencers?.data || influencers.data.length === 0) && (
              <div className="emptyState">
                <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
                  Nenhum parceiro encontrado
                </Text>
              </div>
            )}
          {influencers?.data?.map((influencer) => (
            <div key={influencer.id} className="influencerCardWrapper">
              <InfluencerCard
                influencer={{
                  ...influencer,
                  createdAt: new Date(influencer.createdAt),
                  updatedAt: new Date(influencer.updatedAt),
                }}
                onClick={() => handleInfluencerClick(influencer.id)}
                formatDate={(date: Date) => {
                  return new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(date);
                }}
              />
            </div>
          ))}
        </section>
      </main>

      {influencers.data.length !== 0 && (
        <Pagination
          page={influencers.page}
          setPage={navigateToPage}
          totalPages={influencers.totalPages}
        />
      )}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Text fontName="TINY" color={Theme.colors.secondaryText}>
          Número total: {influencers?.totalInfluencers || 0} parceiros
        </Text>
      </div>
    </InfluencerContainer>
  );
};

export default PartnersPage;
