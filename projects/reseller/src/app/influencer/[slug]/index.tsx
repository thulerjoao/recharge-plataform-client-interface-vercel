"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";

import DefaultHeader from "public/components/defaultHeader";
import { useEffect, useState } from "react";
import InfluencerCard from "../influencerCard";
import { InfluencerContainer } from "./style";

interface Influencer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
  paymentData?: string;
  isActive: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InfluencerListData {
  data: Influencer[];
  page: number;
  totalPages: number;
  totalInfluencers: number;
}

interface InfluencerProps {
  currentPage: number;
}

// Mock data - será substituído por dados reais da API
const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    paymentMethod: "PIX",
    paymentData: "joao.silva@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 88888-8888",
    paymentMethod: "PIX",
    paymentData: "maria.santos@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@email.com",
    phone: "(11) 77777-7777",
    paymentMethod: "PIX",
    paymentData: "pedro.costa@email.com",
    isActive: false,
    storeId: "store-1",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    phone: "(11) 66666-6666",
    paymentMethod: "PIX",
    paymentData: "ana.oliveira@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    phone: "(11) 55555-5555",
    paymentMethod: "PIX",
    paymentData: "carlos.ferreira@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "6",
    name: "Lucia Mendes",
    email: "lucia.mendes@email.com",
    phone: "(11) 44444-4444",
    paymentMethod: "PIX",
    paymentData: "lucia.mendes@email.com",
    isActive: false,
    storeId: "store-1",
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "7",
    name: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    phone: "(11) 33333-3333",
    paymentMethod: "PIX",
    paymentData: "roberto.almeida@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "8",
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    phone: "(11) 22222-2222",
    paymentMethod: "PIX",
    paymentData: "fernanda.lima@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "9",
    name: "Marcos Santos",
    email: "marcos.santos@email.com",
    phone: "(11) 11111-1111",
    paymentMethod: "PIX",
    paymentData: "marcos.santos@email.com",
    isActive: false,
    storeId: "store-1",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "10",
    name: "Juliana Costa",
    email: "juliana.costa@email.com",
    phone: "(11) 00000-0000",
    paymentMethod: "PIX",
    paymentData: "juliana.costa@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
];

const InfluencerPage = ({ currentPage }: InfluencerProps) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [influencersData, setInfluencersData] = useState<InfluencerListData>({
    data: [],
    page: 1,
    totalPages: 1,
    totalInfluencers: 0,
  });

  const itemsPerPage = 6;

  useEffect(() => {
    const filteredInfluencers = mockInfluencers.filter((influencer) => {
      const matchesSearch =
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && influencer.isActive) ||
        (filterStatus === "inactive" && !influencer.isActive);

      return matchesSearch && matchesStatus;
    });

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredInfluencers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredInfluencers.length / itemsPerPage);

    setInfluencersData({
      data: paginatedData,
      page,
      totalPages,
      totalInfluencers: filteredInfluencers.length,
    });

    router.push(`/influencer/${page}`);
  }, [page, searchTerm, filterStatus, router]);

  const handleInfluencerClick = (influencerId: string) => {
    router.push(`/influencer/details/${influencerId}`);
  };

  const handleAddInfluencer = () => {
    router.push("/influencer/create");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <InfluencerContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="INFLUENCERS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          INFLUENCERS
        </Text>
      </div>

      <main className="influencersContainer">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              Gerenciamento de Influencers
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Gerencie todos os influencers de sua loja
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
          <div className="searchSection">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, email ou telefone..."
              height={36}
            />
          </div>
          <div className="filterControls">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filterSelect"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
        {influencersData.data.length > 0 ? (
          influencersData.data.map((influencer) => (
            <div key={influencer.id} className="influencerCardWrapper">
              <InfluencerCard
                influencer={influencer}
                onClick={() => handleInfluencerClick(influencer.id)}
                formatDate={formatDate}
              />
            </div>
          ))
        ) : (
          <div className="emptyState">
            <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
              Nenhum parceiro cadastrado
            </Text>
          </div>
        )}
      </main>

      <Pagination
        page={influencersData.page}
        setPage={setPage}
        totalPages={influencersData.totalPages}
      />
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Text fontName="TINY" color={Theme.colors.secondaryText}>
          Número total: {influencersData.totalInfluencers} influencers
        </Text>
      </div>
    </InfluencerContainer>
  );
};

export default InfluencerPage;
