import {useState} from 'react';
import {Offers} from '../../types/offer';
import Card from '../card/card';
import { CardType } from '../../const';

type OfferListProps = {
  offers: Offers;
  classNames: string;
  cardType: CardType;
}

export default function OfferList({offers, cardType, classNames}: OfferListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className={`${classNames}`} data-active-card={activeCard}>
      { offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onCardHover={setActiveCard}
        />
      ))}
    </div>
  );
}
