import { name, date, internet, address, random, datatype, lorem } from 'faker';
import { Offer } from "../types/offer";
import { City, CityMock } from "../types/city";
import { Comment } from '../types/comment';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';
import { cities } from '../const';

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const transformToOfferCity = (city: City): CityMock => ({
  location: {
    latitude: city.lat,
    longitude: city.lng,
    zoom: city.zoom,
  },
  name: city.name,
});

export const makeOffer = (): Offer => ({
  bedrooms: 3,
  isFavorite: datatype.boolean(),
  city: transformToOfferCity(cities[getRandomInt(0, 5)]),
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

export const makeNotFavouriteOffer = (): Offer => ({
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

export const makeComment = (): Comment => ({
  comment: lorem.word(),
  date: date.recent().toDateString(),
  id: datatype.number(20),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.url(),
    id: datatype.number(20),
    isPro: true,
    name: name.title(),
  },
});

export const makeComments = (): Comment[] => {
  const comments: Comment[] = [];
  for (let i = 0; i < 3; i++) {
    comments.push(makeComment());
  }

  return comments;
};

export const makeUserData = (): UserData => ({
  id: datatype.number(),
  email: internet.exampleEmail(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
  token: lorem.word()
});

export const makeCommentData = (): CommentData => ({
  comment: lorem.word(50),
  hotelId: String(datatype.number(20)),
  rating: datatype.number({min: 1, max: 5, precision: 0.1})
})

export const getNeabyOffers = Array.from({length: 3}, makeOffer);

export const makeEmail = (): string => internet.email();

export const makeOfferId = (): string => String(datatype.number(20));
