import { offers } from './mocks/offers';

export const calculateRatingWidth = (rating: number, maxRating = 5): string =>
  `${Math.round( rating ) * 20}%`;

export const upperFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const formatDate = (date: string, locales = 'en-US'): string =>
  new Date(date).toLocaleString(locales, {month: 'long', year: 'numeric'});

export const getOffersByLocation = (location: string) =>
  offers.filter((offer) => offer.city.name === location);
