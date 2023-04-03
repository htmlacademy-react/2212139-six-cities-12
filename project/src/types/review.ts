type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
};

export type Reviews = Review[];
export type ReviewData = Omit<Review, 'user' | 'date'>;

