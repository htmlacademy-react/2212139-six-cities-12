import {useState} from 'react';
import {Offers} from '../../types/offer';
import Card from '../card/card';

type OfferListProps = {
  offers: Offers;
  className: string;
}

export default function OfferList({offers, className}: OfferListProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (

    <div className={`${className}`} data-active-card={activeCard}>
      {offers && offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardHover={setActiveCard}
        />
      ))}
    </div>
  );
}
