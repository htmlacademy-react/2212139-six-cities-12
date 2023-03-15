import {Navigate, useParams} from 'react-router-dom';
import Layout from '../../components/layout/layout';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyHost from '../../components/property-host/property-host';
import PropertyList from '../../components/property-list/property-list';
import {Reviews} from '../../types/review';
import {Offers} from '../../types/offer';
import ReviewList from '../../components/review-list/review-list';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {AppRoute, CardType} from '../../const';

type PropertyPageProps = {
  offers: Offers;
  nearOffers: Offers;
  reviews: Reviews;
};

export default function PropertyPage({offers, nearOffers, reviews}: PropertyPageProps): JSX.Element {

  const {id} = useParams();
  const offer = offers.find((item) => item.id === Number(id));

  if (!offer) {
    return (<Navigate to={AppRoute.Root} />);
  }

  return (
    <Layout className="">
      <main className="page__main page__main--property">
        <section className="property">
          <PropertyGallery offer={offer}/>
          <div className="property__container container">
            <div className="property__wrapper">
              <PropertyList offer={offer}/>
              <PropertyHost offer={offer}/>
              <ReviewList reviews={reviews}/>
            </div>
          </div>
          <Map
            className="property__map"
            city={nearOffers[0].city.location}
            offers={nearOffers}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={nearOffers}
              classNames={'near-places__list places__list'}
              cardType={CardType.NearPlaces}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
}

