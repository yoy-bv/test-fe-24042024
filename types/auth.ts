type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: string;
    expiresAt: string;
  };
};

export type { LoginRequest, LoginResponse };
