export type Offer = {
  id: number;
	mark?: string;
	imageSrc: string;
  price: number;
  inBookmarks: boolean;
  rating: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
}

export type City = {
  rentalOffersCount: number;
  currentCity: string;
  lat: number;
  lng: number;
  zoom: number;
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
