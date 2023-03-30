import { ChangeEvent, useState, Fragment } from 'react';
import { RATING_STARS } from '../../const';
import { useAppSelector } from '../../hooks';
import {getReviewFormBlockedStatus} from '../../store/offer-property-data/selectors';

export default function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  const isReviewFormBlocked = useAppSelector(getReviewFormBlockedStatus);

  const handleFieldChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map((еvaluation, index) => {
          const evaluationValue: number = RATING_STARS.length - index;
          return (
            <Fragment key={еvaluation}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={evaluationValue}
                id={`${evaluationValue}-stars`}
                type="radio"
                checked={Number(formData.rating) === evaluationValue}
                onChange={handleFieldChange}
              />
              <label htmlFor={`${evaluationValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title={еvaluation}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                  To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled >
          {!isReviewFormBlocked ? 'Submit' : 'Sending...'}
        </button>
      </div>
    </form>
  );
}
