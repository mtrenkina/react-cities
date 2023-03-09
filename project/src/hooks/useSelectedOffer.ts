import { useEffect, useState } from 'react';
import { Offer } from '../types/offer';
import { useFilter } from './useFilter';

export const useSelectedOffer = () => {
  const { filteredOffers } = useFilter();
  const [currentOfferId, setCurrentOfferId] = useState<number>();
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  useEffect(() => {
    const selectedOffer = filteredOffers.find((offer) => offer.id === currentOfferId);
    setCurrentOffer(selectedOffer ?? undefined);
  }, [currentOfferId, filteredOffers]);

  return { currentOffer, setCurrentOfferId };
};
