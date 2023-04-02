import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {Reviews} from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Reviews;
  offerId: number;
};

export default function ReviewList({reviews, offerId}: ReviewListProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthStatus = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews && reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </ul>
      {isAuthStatus && <ReviewForm offerId={offerId}/>}
    </section>
  );
}


