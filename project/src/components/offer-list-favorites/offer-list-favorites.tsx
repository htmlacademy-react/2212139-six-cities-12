
import Card from '../card/card';
import {CardType} from '../../const';
import { Offers } from '../../types/offer';

type OfferListProps = {
  offers: Offers;
  classNames: string;
  cardType: CardType;
}

export default function OfferListFavorites({offers, cardType, classNames}: OfferListProps): JSX.Element {

  return (
    <div className={classNames}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
        />
      ))}
    </div>
  );
}
