import { useEffect, useState } from 'react';
import { Offer } from '../types/offer';
import { sortingOffers } from '../utils/sorting';

export const useSorting = (currentSorting: string, offers: Offer[]) => {

  const [sortedOffers, setSortedOffers] = useState<Offer[]>(offers);
  const [sorting, setSorting] = useState<string>(currentSorting);

  useEffect(() => {
    const sorted = sortingOffers(sorting, [...offers]);
    setSortedOffers(sorted ?? []);
    setSorting(sorting);
  }, [sorting, offers]);

  return ({sortedOffers, sorting, setSorting});
};


