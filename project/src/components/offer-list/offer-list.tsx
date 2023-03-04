import {useState} from 'react';
import {Offers} from '../../types/offer';
import Card from '../card/card';

type OfferListProps = {
offers: Offers;
}

export default function OfferList({offers}: OfferListProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (

    <div className="cities__places-list places__list tabs__content" data-active-card={activeCard}>
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
