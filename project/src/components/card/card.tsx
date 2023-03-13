import {generatePath, Link} from 'react-router-dom';
import {AppRoute, CardType} from '../../const';
import {Offer} from '../../types/offer';
import {calculateRatingWidth, upperFirstLetter} from '../../utils';
import BookmarkButton from '../bookmark-button/bookmark-button';

type CardProps = {
  offer: Offer;
  cardType: CardType;
  onCardHover?: (id: number | null) => void;
}

export default function Card({offer, cardType, onCardHover}: CardProps): JSX.Element {
  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={() => onCardHover?.(offer.id)}
      onMouseLeave={() => onCardHover?.(null)}
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
          <BookmarkButton/>
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

