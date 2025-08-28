"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { CouponsContainer } from "./style";
import CouponCard from "../couponCard";

interface Coupon {
  id: string;
  title: string;
  discountPercentage?: number;
  discountAmount?: number;
  expiresAt?: Date;
  timesUsed: number;
  totalSalesAmount: number;
  maxUses?: number;
  minOrderAmount?: number;
  isActive: boolean;
  influencerId: string;
  influencerName: string;
  isFirstPurchase: boolean;
  createdAt: Date;
}

interface CouponsListData {
  data: Coupon[];
  page: number;
  totalPages: number;
  totalCoupons: number;
}

interface CouponsProps {
  currentPage: number;
}

// Mock data - será substituído por dados reais da API
const mockCoupons: Coupon[] = [
  {
    id: "1",
    title: "DESCONTO10",
    discountPercentage: 10,
    timesUsed: 25,
    totalSalesAmount: 1250.0,
    maxUses: 100,
    minOrderAmount: 50.0,
    isActive: true,
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "PRIMEIRACOMPRA",
    discountAmount: 20.0,
    timesUsed: 15,
    totalSalesAmount: 800.0,
    maxUses: 50,
    minOrderAmount: 100.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "SUPERDESCONTO",
    discountPercentage: 25,
    timesUsed: 8,
    totalSalesAmount: 400.0,
    maxUses: 30,
    minOrderAmount: 75.0,
    isActive: false,
    influencerId: "3",
    influencerName: "Pedro Costa",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "BLACKFRIDAY",
    discountPercentage: 30,
    timesUsed: 45,
    totalSalesAmount: 2200.0,
    maxUses: 200,
    minOrderAmount: 80.0,
    isActive: true,
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    title: "FREESHIPPING",
    discountAmount: 15.0,
    timesUsed: 32,
    totalSalesAmount: 1200.0,
    maxUses: 150,
    minOrderAmount: 60.0,
    isActive: true,
    influencerId: "4",
    influencerName: "Ana Oliveira",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "6",
    title: "WELCOME20",
    discountPercentage: 20,
    timesUsed: 18,
    totalSalesAmount: 900.0,
    maxUses: 80,
    minOrderAmount: 40.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "1",
    title: "DESCONTO10",
    discountPercentage: 10,
    timesUsed: 25,
    totalSalesAmount: 1250.0,
    maxUses: 100,
    minOrderAmount: 50.0,
    isActive: true,
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "PRIMEIRACOMPRA",
    discountAmount: 20.0,
    timesUsed: 15,
    totalSalesAmount: 800.0,
    maxUses: 50,
    minOrderAmount: 100.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "SUPERDESCONTO",
    discountPercentage: 25,
    timesUsed: 8,
    totalSalesAmount: 400.0,
    maxUses: 30,
    minOrderAmount: 75.0,
    isActive: false,
    influencerId: "3",
    influencerName: "Pedro Costa",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "BLACKFRIDAY",
    discountPercentage: 30,
    timesUsed: 45,
    totalSalesAmount: 2200.0,
    maxUses: 200,
    minOrderAmount: 80.0,
    isActive: true,
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    title: "FREESHIPPING",
    discountAmount: 15.0,
    timesUsed: 32,
    totalSalesAmount: 1200.0,
    maxUses: 150,
    minOrderAmount: 60.0,
    isActive: true,
    influencerId: "4",
    influencerName: "Ana Oliveira",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "6",
    title: "WELCOME20",
    discountPercentage: 20,
    timesUsed: 18,
    totalSalesAmount: 900.0,
    maxUses: 80,
    minOrderAmount: 40.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "5",
    title: "FREESHIPPING",
    discountAmount: 15.0,
    timesUsed: 32,
    totalSalesAmount: 1200.0,
    maxUses: 150,
    minOrderAmount: 60.0,
    isActive: true,
    influencerId: "4",
    influencerName: "Ana Oliveira",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "6",
    title: "WELCOME20",
    discountPercentage: 20,
    timesUsed: 18,
    totalSalesAmount: 900.0,
    maxUses: 80,
    minOrderAmount: 40.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-08"),
  },
];

const CouponsPage = ({ currentPage }: CouponsProps) => {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [couponsData, setCouponsData] = useState<CouponsListData>({
    data: [],
    page: currentPage,
    totalPages: 1,
    totalCoupons: 0,
  });

  const itemsPerPage = 6;

  useEffect(() => {
    const filteredCoupons = mockCoupons.filter((coupon) => {
      const matchesSearch =
        coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.influencerName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && coupon.isActive) ||
        (filterStatus === "inactive" && !coupon.isActive);

      const matchesType =
        filterType === "all" ||
        (filterType === "percentage" && coupon.discountPercentage) ||
        (filterType === "amount" && coupon.discountAmount) ||
        (filterType === "firstPurchase" && coupon.isFirstPurchase);

      return matchesSearch && matchesStatus && matchesType;
    });

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredCoupons.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

    setCouponsData({
      data: paginatedData,
      page,
      totalPages,
      totalCoupons: filteredCoupons.length,
    });

    router.push(`/coupons/${page}`);
  }, [page, searchTerm, filterStatus, filterType, router]);

  const handleCreateCoupon = () => {
    router.push("/coupons/create");
  };

  const handleViewCoupon = (couponId: string) => {
    router.push(`/coupons/details/${couponId}`);
  };

  return (
    <CouponsContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="CUPONS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CUPONS
        </Text>
      </div>

      <div className="mainContent">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              Gerenciamento de Cupons
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Gerencie todos os cupons da plataforma
            </Text>
          </div>
          <Button
            title="NOVO CUPOM"
            onClick={handleCreateCoupon}
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
              placeholder="Buscar por título ou influencer..."
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
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filterSelect"
            >
              <option value="all">Todos os tipos</option>
              <option value="percentage">Porcentagem</option>
              <option value="amount">Valor fixo</option>
              <option value="firstPurchase">Primeira compra</option>
            </select>
          </div>
        </div>

        <div className="tableSection">
          <div className="tableHeader">
            <div className="tableCell">Título</div>
            <div className="tableCell">Desconto</div>
            <div className="tableCell">Influencer</div>
            <div className="tableCell">Status</div>
          </div>

          {couponsData.data.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onClick={handleViewCoupon}
            />
          ))}
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={couponsData.totalPages}
      />
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Text fontName="TINY" color={Theme.colors.secondaryText}>
          Total: {couponsData.totalCoupons} cupons encontrados
        </Text>
      </div>
    </CouponsContainer>
  );
};

export default CouponsPage;
