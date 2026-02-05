export interface DeletedUserDataType {
  name: string;
  email: string;
  phone: string;
  documentValue: string;
}

export interface StoreUserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  documentType: string;
  documentValue: string;
  emailVerified: boolean;
  storeId: string;
  rechargeBigoId: string | null;
  deletedAt: string | null;
  deletedUserData: DeletedUserDataType | null;
}

export interface StoreUsersResponseType {
  data: StoreUserType[];
  totalClients: number;
  page: number;
  totalPages: number;
}

export type CustomerStatusFilter = "all" | "active" | "excluded";
