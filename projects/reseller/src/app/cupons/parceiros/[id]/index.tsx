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
import { formatPrice } from "utils/formatPrice";
import Icon from "../../../influencer/icons/icon.svg";
import CouponCard from "../../couponCard";
import { InfluencerCouponsContainer } from "./style";

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

interface InfluencerCouponsProps {
  influencerId: string;
}

// Mock data - será substituído por dados reais da API
const mockInfluencers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 88888-8888",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@email.com",
    phone: "(11) 77777-7777",
  },
];

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
    influencerId: "1",
    influencerName: "João Silva",
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
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-05"),
  },
];

const InfluencerCoupons = ({ influencerId }: InfluencerCouponsProps) => {
  const router = useRouter();
  const [influencer, setInfluencer] = useState<any>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [couponsData, setCouponsData] = useState<{
    data: Coupon[];
    page: number;
    totalPages: number;
    totalCoupons: number;
  }>({
    data: [],
    page: 1,
    totalPages: 1,
    totalCoupons: 0,
  });

  const itemsPerPage = 6;

  useEffect(() => {
    const foundInfluencer = mockInfluencers.find(
      (inf) => inf.id === influencerId,
    );
    const influencerCoupons = mockCoupons.filter(
      (c) => c.influencerId === influencerId,
    );

    setInfluencer(foundInfluencer || null);
    setCoupons(influencerCoupons);
    setLoading(false);
  }, [influencerId]);

  useEffect(() => {
    const filteredCoupons = coupons.filter((coupon) => {
      const matchesSearch = coupon.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && coupon.isActive) ||
        (filterStatus === "inactive" && !coupon.isActive);

      return matchesSearch && matchesStatus;
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
  }, [coupons, page, searchTerm, filterStatus]);

  const totalSales = couponsData.data.reduce(
    (sum, coupon) => sum + coupon.totalSalesAmount,
    0,
  );
  const totalUses = couponsData.data.reduce(
    (sum, coupon) => sum + coupon.timesUsed,
    0,
  );

  const handleBack = () => {
    router.back();
  };

  const handleCreateCoupon = () => {
    router.push(`/coupons/create?influencerId=${influencerId}`);
  };

  const handleViewCoupon = (couponId: string) => {
    router.push(`/coupons/details/${couponId}`);
  };

  if (loading) {
    return (
      <InfluencerCouponsContainer>
        <Text align="center" fontName="REGULAR_MEDIUM">
          Carregando...
        </Text>
      </InfluencerCouponsContainer>
    );
  }

  if (!influencer) {
    return (
      <InfluencerCouponsContainer>
        <Text
          align="center"
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.refused}
        >
          Influencer não encontrado
        </Text>
        <Button
          title="VOLTAR"
          onClick={handleBack}
          width={120}
          height={40}
          rounded
          style={{
            backgroundColor: Theme.colors.mainHighlight,
            color: Theme.colors.mainlight,
          }}
        />
      </InfluencerCouponsContainer>
    );
  }

  return (
    <InfluencerCouponsContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CUPONS DO INFLUENCER" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CUPONS
        </Text>
      </div>

      <div className="mainContent">
        <div className="actionsSection">
          <Button
            title="NOVO CUPOM"
            onClick={handleCreateCoupon}
            width={140}
            height={36}
            rounded
          />
        </div>
        <div className="headerSection">
          <div className="influencerInfo">
            <div className="avatar">
              <Icon />
            </div>
            <div className="info">
              <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
                {influencer.name}
              </Text>
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.secondaryText}
              >
                {influencer.email}
              </Text>
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.secondaryText}
              >
                {influencer.phone}
              </Text>
            </div>
          </div>
          <div className="statsSection">
            <div className="statItem">
              <Text
                fontName="LARGE_SEMI_BOLD"
                color={Theme.colors.mainHighlight}
              >
                {couponsData.data.length}
              </Text>
              <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
                Cupons ativos
              </Text>
            </div>
            <div className="statItem">
              <Text
                fontName="LARGE_SEMI_BOLD"
                color={Theme.colors.mainHighlight}
              >
                {totalUses}
              </Text>
              <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
                Total de usos
              </Text>
            </div>
            <div className="statItem">
              <Text
                nowrap
                fontName="LARGE_SEMI_BOLD"
                color={Theme.colors.mainHighlight}
              >
                R$ {formatPrice(totalSales)}
              </Text>
              <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
                Vendas geradas
              </Text>
            </div>
          </div>
        </div>

        <div className="filtersSection">
          <div className="searchSection">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título..."
              height={36}
              width={300}
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

          {couponsData.data.length === 0 && (
            <div className="emptyState">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.secondaryText}
              >
                Nenhum cupom encontrado
              </Text>
            </div>
          )}
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
    </InfluencerCouponsContainer>
  );
};

export default InfluencerCoupons;
