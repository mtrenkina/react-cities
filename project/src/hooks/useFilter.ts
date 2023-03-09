import { useMemo } from 'react';
import { useAppSelector } from '.';
import { getOffers } from '../store/offers-data/offers-data-selectors';
import { getCity } from '../store/user-actions/user-actions-selectors';

export const useFilter = () => {

  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);

  const filteredOffers = useMemo(() => offers.filter((offer) => offer.city.name === city), [offers, city]);

  return ({filteredOffers, city});
};
