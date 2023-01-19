export interface Offer {
	mark?: string;
	imageSrc: string;
  price: number;
  inBookmarks: boolean;
  rating: number;
  name: string;
  type: string;
}

export interface State {
  rentalOffersCount: number;
  currentCity: string;
}

export const offersMock: Offer[] = [
  {
    mark: 'Premium',
    imageSrc: 'img/apartment-01.jpg',
    price: 120,
    inBookmarks: true,
    rating: 93,
    name: 'Beautiful luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    imageSrc: 'img/room.jpg',
    price: 80,
    inBookmarks: false,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Private room',
  },
  {
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    inBookmarks: true,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
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
  rentalOffersCount: 5,
  currentCity: 'Amsterdam'
};
