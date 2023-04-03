import { ChangeEvent, useState, Fragment, FormEvent, useEffect } from 'react';
import { RATING_STARS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewStatus } from '../../store/offer-property-data/selectors';
import { sendReviewAction } from '../../store/offer-property-data/api-actions';

enum ReviewLength {
  Min = 50,
  Max = 300,
}

type FormData = {
  rating: string;
  review: string;
};

type ReviewFormProps = {
  offerId: number;
};

export default function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const reviewStatus = useAppSelector(getReviewStatus);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    rating: '',
    review: '',
  });

  useEffect(() => {
    if(reviewStatus.isSuccess){
      resetForm();
    }
  }, [reviewStatus]);

  const resetForm = () => {
    setFormData({
      rating: '',
      review: '',
    });
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      sendReviewAction({
        id: offerId,
        rating: Number(formData.rating),
        comment: formData.review,
      })
    );
  };

  const isButtonBlocked =
    !formData.rating ||
    formData.review.length < ReviewLength.Min ||
    formData.review.length > ReviewLength.Max ||
    reviewStatus.isLoading;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map((evaluation, index) => {
          const evaluationValue: number = RATING_STARS.length - index;

          return (
            <Fragment key={evaluation}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={evaluationValue}
                id={`${evaluationValue}-stars`}
                type="radio"
                checked={Number(formData.rating) === evaluationValue}
                onChange={handleFieldChange}
                disabled={reviewStatus.isLoading}
              />
              <label
                htmlFor={`${evaluationValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title={evaluation}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
        disabled={reviewStatus.isLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonBlocked}
        >
          {!reviewStatus.isLoading ? 'Submit' : 'Sending...'}
        </button>
      </div>
    </form>
  );
}
