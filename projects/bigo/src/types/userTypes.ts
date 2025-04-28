export type UserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  individualIdentification: IndividualIdentificationType;
};

export type IndividualIdentificationType = {
  type: string;
  value: string;
};
