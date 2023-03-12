type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type Location = {
  zoom: number;
  latitude: number;
  longitude: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
  title: string;
  type: string;
  price: number;
  rating: number;
  previewImage: string;
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  description: string;
  host: User;
  city: City;
  location: Location;
};

export type Point = {
  title: string;
  lat: number;
  lng: number;
};

export type Points = Point[];

export type Offers = Offer[];
