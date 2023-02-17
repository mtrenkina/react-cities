import {name, date, internet, address, random, datatype} from 'faker';
import { Offer } from "../types/offer";
import { City, CityMock } from "../types/city";
import { Comment } from '../types/comment';

export const makeMockCity = (): CityMock => ({
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: 10,
  },
  name: address.cityName(),
});

export const makeCity = (): City => ({
  lat: Number(address.latitude()),
  lng: Number(address.longitude()),
  zoom: 10,
  name: address.cityName(),
});

export const makeOffer = (): Offer => ({
  bedrooms: 3,
  isFavorite: datatype.boolean(),
  city: makeMockCity(),
  description: random.words(),
  goods: ['TV', 'conditioner'],
  host: {
    avatarUrl: internet.url(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title(),
  },
  id: datatype.number(20),
  images: [internet.url(), internet.url()],
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: 10
  },
  maxAdults: 4,
  previewImage: internet.url(),
  price: datatype.number(),
  rating: 5,
  title: address.streetName(),
  type: 'hotel'
});

export const makeFavouriteOffer = (): Offer => ({
  bedrooms: datatype.number(),
  isFavorite: true,
  city: makeMockCity(),
  description: random.words(),
  goods: ['TV', 'conditioner'],
  host: {
    avatarUrl: internet.url(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title(),
  },
  id: datatype.number(),
  images: [internet.url(), internet.url()],
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: 10
  },
  maxAdults: datatype.number(),
  previewImage: internet.url(),
  price: datatype.number(),
  rating: 4,
  title: address.streetName(),
  type: 'hotel'
});

export const makeOffers = () => {
  const offers: Offer[] = [];
  for (let i = 0; i < 5; i++) {
    offers.push(makeOffer());
  }

  return offers;
};

export const makeFavouriteOffers = () => {
  const offers: Offer[] = [];
  for (let i = 0; i < 5; i++) {
    offers.push(makeFavouriteOffer());
  }

  return offers;
};

export const makeComment = (i: number): Comment => ({
  comment: 'Great',
  date: date.recent().toDateString(),
  id: i + 10,
  rating: i + 3,
  user: {
    avatarUrl: internet.url(),
    id: i + 20,
    isPro: true,
    name: name.title(),
  },
});

export const makeComments = (): Comment[] => {
  const comments: Comment[] = [];
  for (let i = 0; i < 2; i++) {
    comments.push(makeComment(i));
  }

  return comments;
};

export const makeEmail = (): string => internet.email();