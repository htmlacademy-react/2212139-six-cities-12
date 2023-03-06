import {useState} from 'react';
import {Offers} from '../../types/offer';
import Card from '../card/card';

type OfferListProps = {
  offers: Offers;
  classNames: string;
}

export default function OfferList({offers, classNames}: OfferListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className={`${classNames}`} data-active-card={activeCard}>
      { offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardHover={setActiveCard}
        />
      ))}
    </div>
  );
}
