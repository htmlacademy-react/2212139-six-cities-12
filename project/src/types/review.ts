export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: {
          avatarUrl: string;
          id: number;
          isPro: boolean;
          name: string;
        };
};

export type Reviews = Review[];

export type AllReview ={
  [id: number]: Review[];
};
