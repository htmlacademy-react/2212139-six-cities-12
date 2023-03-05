export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',

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