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

