import { offers } from './mocks/offers';
import { Offers } from './types/offer';
import {DEFAULT_LOCATION, DEFAULT_SORT, SortType} from './const';


export const calculateRatingWidth = (_rating: number, maxRating = 5): string =>
  `${Math.round( _rating ) * 20}%`;

export const upperFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const formatDate = (date: string, locales = 'en-US'): string =>
  new Date(date).toLocaleString(locales, {month: 'long', year: 'numeric'});

const getOffersByLocation = (location: string) =>
  offers.filter((offer) => offer.city.name === location);

export const getOffers = ( location = DEFAULT_LOCATION, sortType = DEFAULT_SORT): Offers => {

  const offersByLocation = getOffersByLocation(location);

  switch (sortType) {
    case SortType.lowPrice:
      return offersByLocation.sort((a, b) => a.price - b.price);
    case SortType.hightPrice:
      return offersByLocation.sort((b, a) => a.price - b.price);
    case SortType.rating:
      return offersByLocation.sort((b, a) => a.rating - b.rating);
    default:
      return offersByLocation;
  }
};
