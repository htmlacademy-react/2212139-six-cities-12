export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum APIRoute {
  Offers = '/hotelss',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_STARS: string[] = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

export enum CardType {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places'
}


export const LOCATIONS = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const DEFAULT_LOCATION = LOCATIONS[0];

export const MAX_IMAGES_PROPERTIES = 6;

export enum SortType {
  Popular = 'Popular',
  LowPrice = 'Price: low to high',
  HightPrice = 'Price: high to low',
  Rating = 'Top rated first'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  OfferProperty = 'OFFER_PROPERTY',
  App = 'APP',
}

export const DEFAULT_SORT = SortType.Popular;
export const MAX_RATING = 5;

export enum FetchStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}
