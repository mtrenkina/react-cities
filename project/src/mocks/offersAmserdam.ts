import { Offer} from '../types/offer';
import { Amsterdam } from './cities';

export const offersAmsterdamMock: Offer[] = [
  {
    id: 1,
    city: Amsterdam,
    host: {
      id: 3,
      avatarUrl: 'img/1.png',
      isPro: true,
      name: 'Angelina'
    },
    mark: 'Premium',
    imageSrc: 'img/apartment-01.jpg',
    price: 120,
    bedrooms: 3,
    capacity: 4,
    inBookmarks: true,
    rating: 4.6,
    name: 'Beautiful luxurious apartment at great location',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    type: 'apartment',
    lat: 52.3909553943508,
    lng: 4.85309666406198,
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen'],
  },
  {
    id: 2,
    city: Amsterdam,
    host: {
      id: 1,
      avatarUrl: 'img/1.png',
      isPro: true,
      name: 'Marcella'
    },
    imageSrc: 'img/room.jpg',
    price: 80,
    bedrooms: 1,
    capacity: 1,
    inBookmarks: false,
    rating: 80,
    name: 'Wood and stone place',
    description: 'Enjoy its many windows, the comfortable boxspring beds and bathtub overlooking the canal ;-)',
    type: 'private room',
    lat: 52.369553943508,
    lng: 4.85309666406198,
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen', 'Cable TV'],
  },
  {
    id: 3,
    city: Amsterdam,
    host: {
      id: 2,
      avatarUrl: 'img/1.png',
      isPro: false,
      name: 'Willie'
    },
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    bedrooms: 3,
    capacity: 6,
    inBookmarks: true,
    rating: 80,
    name: 'Canal View Prinsengracht',
    description: 'We are within 30 minutes reach from our awesome capital city Amsterdam, the typical Dutch village Zaanse Schans.',
    type: 'apartment',
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen', 'Heating', 'Air conditioner'],
  },
  {
    id: 4,
    city: Amsterdam,
    host: {
      id: 4,
      avatarUrl: 'img/1.png',
      isPro: false,
      name: 'Mark'
    },
    mark: 'Premium',
    imageSrc: 'img/apartment-03.jpg',
    price: 180,
    bedrooms: 10,
    capacity: 30,
    inBookmarks: false,
    rating: 100,
    name: 'Hotel is situated in the hip, up-and-coming neighbourhood of Amsterdam Noord',
    description: 'Our restaurant is the perfect place to hang out, all day long. ',
    type: 'hotel',
    lat: 52.3809553943508,
    lng: 4.939309666406198,
    goods: ['Wi-Fi'],
  },
];


