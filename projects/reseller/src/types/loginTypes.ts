export type LoginParams = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

// export type LoginResponse = {
//   access: {
//     accessToken: string;
//     refreshToken: string;
//     expiresIn: number;
//   };
//   customer: UserType;
// };
