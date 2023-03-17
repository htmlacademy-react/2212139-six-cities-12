
import Card from '../card/card';
import {CardType} from '../../const';
import { Offers } from '../../types/offer';

type OfferListProps = {
  classNames: string;
  cardType: CardType;
  offers: Offers;
}

export default function OfferList({cardType, classNames, offers}: OfferListProps): JSX.Element {

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
