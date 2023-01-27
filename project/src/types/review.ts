export type Host = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: number;
  user: Host;
  rating: number;
  date: string;
  comment: string;
};
