import { useNavigate } from 'react-router-dom';
import { AppRoute, CardType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFavoritesAction } from '../../store/favorite-data/api-actions';
import { getIsAuthorized } from '../../store/user-process/selectors';
import clsx from 'clsx';

type BookmarkButtonProps = {
  offerId: number;
  isFavorite: boolean;
  cardType: CardType;
}

export default function BookmarkButton({offerId, isFavorite, cardType}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuthorized);
  const navigate = useNavigate();
  const isLarge = cardType === CardType.Property;


  const handleButtonClick = () => {
    if (isAuth) {
      dispatch(setFavoritesAction({
        id: offerId,
        status: Number(isFavorite)
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };


  return (
    <button
      className={clsx('button', {
        'property__bookmark-button': isLarge,
        'property__bookmark-button--active': isLarge && isFavorite,
        'place-card__bookmark-button': !isLarge,
        'place-card__bookmark-button--active': !isLarge && isFavorite
      })}
      type="button"
      onClick={handleButtonClick}
    >
      <svg
        className="place-card__bookmark-icon"
        width={isLarge ? '31' : '18'}
        height={isLarge ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

