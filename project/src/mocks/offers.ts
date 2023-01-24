//import { nanoid } from 'nanoid';
import { Offer, State} from '../types/types';

export const offersMock: Offer[] = [
  {
    id: 5,
    mark: 'Premium',
    imageSrc: 'img/apartment-01.jpg',
    price: 120,
    inBookmarks: true,
    rating: 93,
    name: 'Beautiful luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 2,
    imageSrc: 'img/room.jpg',
    price: 80,
    inBookmarks: false,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Private room',
  },
  {
    id: 3,
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    inBookmarks: true,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 4,
    mark: 'Premium',
    imageSrc: 'img/apartment-03.jpg',
    price: 180,
    inBookmarks: false,
    rating: 100,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
];

export const stateMock: State = {
  rentalOffersCount: 4,
  currentCity: 'Amsterdam'
};
