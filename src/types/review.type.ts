export interface IUserReview {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IReviewData {
  id: string;
  comment: string;
  rating: number;
}

export interface IReview extends IReviewData {
  date: string;
  user: IUserReview;
}
