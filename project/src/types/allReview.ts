export type review = {
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
}

export type AllReview ={
  [id: number]: review[];
};
