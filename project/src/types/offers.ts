import { Host } from "./reviews";

export type Offer = {
  id: number;
	mark?: string;
  host: Host;
	imageSrc: string;
  price: number;
  bedrooms: number;
  capacity: number;
  inBookmarks: boolean;
  rating: number;
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
  goods: string[];
}

export type City = {
  rentalOffersCount: number;
  currentCity: string;
  lat: number;
  lng: number;
  zoom: number;
}
