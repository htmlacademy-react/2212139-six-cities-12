export type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type UserData = User & {
  email: string;
  token: string;
};
