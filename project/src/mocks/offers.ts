import { Offer, City} from '../types/types';

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
    lat: 52.3909553943508,
    lng: 4.85309666406198,
  },
  {
    id: 2,
    imageSrc: 'img/room.jpg',
    price: 80,
    inBookmarks: false,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Private room',
    lat: 52.369553943508,
    lng: 4.85309666406198,
  },
  {
    id: 3,
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    inBookmarks: true,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    lat: 52.3909553943508,
    lng: 4.929309666406198,
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
    lat: 52.3809553943508,
    lng: 4.939309666406198,
  },
];

export const currentCityMock: City = {
  rentalOffersCount: 4,
  currentCity: 'Amsterdam',
  lat: 52.374,
  lng: 4.88969,
  zoom: 12,
};
