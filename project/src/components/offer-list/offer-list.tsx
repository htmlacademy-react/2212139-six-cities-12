import {Offers} from '../../types/offer';
import Card from '../card/card';
import {CardType} from '../../const';

type OfferListProps = {
  offers: Offers;
  classNames: string;
  cardType: CardType;
}

export default function OfferList({offers, cardType, classNames}: OfferListProps): JSX.Element {
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
