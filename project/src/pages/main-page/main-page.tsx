import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import { Offers } from '../../types/offer';
import { CardType } from '../../const';
import LocationList from '../../components/location-list/location-list';


type MainPageProps = {
  offers: Offers;
}

export default function MainPage({offers }: MainPageProps): JSX.Element {
  return (
    <Layout className="page--gray page--main" >
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <Sort/>
              <OfferList
                offers={offers}
                classNames={'places__list cities__places-list'}
                cardType={CardType.Cities}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={offers[0].city.location}
                offers={offers}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}


