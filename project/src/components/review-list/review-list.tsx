
import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user-process/selectors';
import {Reviews} from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Reviews;
  offerId: number;
};

export default function ReviewList({reviews, offerId}: ReviewListProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuthorized);


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
      {isAuth && <ReviewForm offerId={offerId}/>}
    </section>
  );
}


