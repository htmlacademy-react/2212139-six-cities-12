import { Offers } from './types/offer';
import {DEFAULT_LOCATION, DEFAULT_SORT, SortType, MAX_RATING} from './const';

export const calculateRatingWidth = (rating: number ): string =>
  `${Math.round( rating ) * (100 / MAX_RATING)}%`;

export const upperFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const formatDate = (date: string, locales = 'en-US'): string =>
  new Date(date).toLocaleString(locales, {month: 'long', year: 'numeric'});

const getOffersByLocation = (location: string, offers: Offers) =>
  offers.filter((offer) => offer.city.name === location);

export const getOffers = ( offers: Offers, location = DEFAULT_LOCATION, sortType = DEFAULT_SORT): Offers => {

  const offersByLocation = getOffersByLocation(location, offers);

  switch (sortType) {
    case SortType.LowPrice:
      return offersByLocation.sort((a, b) => a.price - b.price);
    case SortType.HightPrice:
      return offersByLocation.sort((b, a) => a.price - b.price);
    case SortType.Rating:
      return offersByLocation.sort((b, a) => a.rating - b.rating);
    default:
      return offersByLocation;
  }
};
