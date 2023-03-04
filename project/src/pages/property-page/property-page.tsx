import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/card/card';
import Layout from '../../components/layout/layout';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyHost from '../../components/property-host/property-host';
import PropertyList from '../../components/property-list/property-list';
import { AllReview } from '../../types/review';
import { Offers, Offer } from '../../types/offer';


type PropertyPageProps = {
  offers: Offers;
  allReviews: AllReview;
};

function PropertyPage({offers, allReviews}: PropertyPageProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const {id} = useParams();
  const offer = offers.find((item) => item.id === Number(id)) as Offer;
  const reviews = allReviews[Number(id)];

  return (
    <Layout classNameProps="">

      <main className="page__main page__main--property">
        <section className="property">

          <PropertyGallery offer={offer}/>

          <div className="property__container container">
            <div className="property__wrapper">

              <PropertyList offer={offer} />
              <PropertyHost offer={offer} />
              <ReviewList reviews={reviews} />


            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <Card />
              <Card />
              <Card />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default PropertyPage;
