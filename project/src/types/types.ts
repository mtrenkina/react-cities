export type Offer = {
  id: number;
	mark?: string;
	imageSrc: string;
  price: number;
  inBookmarks: boolean;
  rating: number;
  name: string;
  type: string;
}

export type State = {
  rentalOffersCount: number;
  currentCity: string;
}

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  date: string;
  comment: string;
};
