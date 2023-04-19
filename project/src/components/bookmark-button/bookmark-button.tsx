import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFavoritesAction } from '../../store/favorite-data/api-actions';
import { getIsAuthorized } from '../../store/user-data/selectors';
import clsx from 'clsx';

type BookmarkButtonProps = {
  offerId: number;
  isFavorite: boolean;
  isBigSize: boolean;
}

export default function BookmarkButton({offerId, isFavorite, isBigSize}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuthorized);
  const navigate = useNavigate();


  const handleButtonClick = () => {
    if (isAuth) {
      dispatch(setFavoritesAction({
        id: offerId,
        status: Number(!isFavorite)
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };


  return (
    <button
      className={clsx('button', {
        'property__bookmark-button': isBigSize,
        'property__bookmark-button--active': isBigSize && isFavorite,
        'place-card__bookmark-button': !isBigSize,
        'place-card__bookmark-button--active': !isBigSize && isFavorite
      })}
      type="button"
      onClick={handleButtonClick}
      data-testid="to-bookmarks"
    >
      <svg
        className={clsx('', {
          'property__bookmark-icon': isBigSize,
          'place-card__bookmark-icon': !isBigSize,
        })}
        width={isBigSize ? '31' : '18'}
        height={isBigSize ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

