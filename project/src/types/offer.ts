import { Host } from "./review";
import { City } from "./city";

export type Offer = {
  id: number;
  city: City;
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
