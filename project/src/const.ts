export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  Favorite = '/favorites',
  NotFound = '*',
}

export enum APIRoute {
  Offers = '/hotels',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
  Loading = 'LOADING',
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
  NearPlaces = 'near-places',
  Property = 'property',
}


export enum Location {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const DEFAULT_LOCATION = Location.Paris;

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
  Notifications = 'NOTIFICATIONS',
  Favorite = 'FAVORITE',
}

export const DEFAULT_SORT = SortType.Popular;
export const MAX_RATING = 5;
export const MAX_REVIEWS = 10;

export enum FetchStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}

export enum ReviewLength {
  Min = 50,
  Max = 300,
}
