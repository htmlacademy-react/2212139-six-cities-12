import {generatePath, Link} from 'react-router-dom';
import {AppRoute, CardType} from '../../const';
import { useAppDispatch } from '../../hooks';
import { selectOffer } from '../../store/app-data/app-data';
import {Offer} from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { calculateRatingWidth, upperFirstLetter } from '../../utils/utils';


type CardProps = {
  offer: Offer;
  cardType: CardType;
}

export default function Card({offer, cardType }: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isBigSize = cardType === CardType.Property;

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={() => dispatch(selectOffer(offer.id))}
      onMouseLeave={() => dispatch(selectOffer(null))}
      data-testid="card-article"
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className={`place-card__image-wrapper ${cardType}__image-wrapper`}>
        <Link to={generatePath(AppRoute.Room, {id: `${offer.id}`})}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={!(cardType === CardType.Favorites) ? '260' : '150'}
            height={!(cardType === CardType.Favorites) ? '200' : '110'}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className={`place-card__info ${cardType}__card-info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            offerId={offer.id}
            isFavorite={offer.isFavorite}
            isBigSize={isBigSize}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: calculateRatingWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room, {id: `${offer.id}`})}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{upperFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

