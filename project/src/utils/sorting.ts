import { sortingTypes } from '../const';
import { Offer } from '../types/offer';

const sortingByPrice = (offerA: Offer, offerB: Offer) => {
  const priceA = offerA.price;
  const priceB = offerB.price;

  switch (priceA < priceB) {
    case true:
      return 1;
    case false:
      return -1;
    default:
      return 0;
  }
};

export const sortingOffers = (currentSorting: string, copyOffers: Offer[]) => {
  switch (currentSorting) {
    case sortingTypes.PRICELOWTOHIGHT:
      return copyOffers.sort((x, y) => x.price - y.price);
    case sortingTypes.PRICEHIGHTTOLOW:
      return copyOffers.sort(sortingByPrice);
    case sortingTypes.RAITING:
      return copyOffers.sort((x, y) => y.rating - x.rating);
    case sortingTypes.POPULAR:
      return copyOffers;
  }
};
