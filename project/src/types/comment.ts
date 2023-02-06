export type Host = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
};

export type Input = {
  review: string;
  rating: string;
};
