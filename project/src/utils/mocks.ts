import {
  address,
  commerce,
  datatype,
  date,
  image,
  internet,
  lorem,
} from 'faker';
import { City, Location, Offer, Offers } from '../types/offer';
import { Review, Reviews } from '../types/review';
import { User, UserData } from '../types/user';

export const makeFakeUser = (): User => ({
  id: datatype.number(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
});

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
  email: internet.email(),
  token: datatype.string(),
});

export const makeFakeLocation = (): Location => ({
  zoom: datatype.number({ min: 5, max: 15 }),
  latitude: datatype.number({ min: 5, max: 6, precision: 0.0001 }),
  longitude: datatype.number({ min: 4, max: 10, precision: 0.001 }),
});

export const makeFakeCity = (): City => ({
  name: address.city(),
  location: makeFakeLocation(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  title: lorem.word(10),
  type: commerce.product(),
  price: datatype.number(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
  images: Array.from({ length: 2 }, () =>
    image.imageUrl(260, 200, 'cat', true)
  ),
  bedrooms: datatype.number({ min: 1, max: 10 }),
  maxAdults: datatype.number({ min: 1, max: 5 }),
  goods: [commerce.product()],
  description: commerce.productDescription(),
  host: makeFakeUser(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
});

export const makeFakeOffers = (): Offers =>
  Array.from({ length: 10 }, makeFakeOffer);

export const makeFakeNearOffers = (): Offers =>
  Array.from({ length: 3 }, makeFakeOffer);

export const makeFakeReview = (): Review => ({
  id: datatype.number(),
  user: makeFakeUser(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  comment: lorem.sentence(),
  date: String(date.recent()),
});

export const makeFakeReviews = (): Reviews =>
  Array.from({ length: 5 }, makeFakeReview);
