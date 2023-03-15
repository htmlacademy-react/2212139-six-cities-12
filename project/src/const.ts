export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',

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

export enum Location {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const MAX_IMAGES_PROPERTIES = 6;

