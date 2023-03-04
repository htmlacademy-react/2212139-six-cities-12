type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

type Location = {
  zoom: number;
  latitude: number;
  longitude: number;
};

type City = {
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

export type Offers = Offer[];
