import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import { CardType } from '../../const';
import LocationList from '../../components/location-list/location-list';
import { useAppSelector } from '../../hooks';
import { getOffersByLocation } from '../../utils';


export default function MainPage(): JSX.Element {

  const location = useAppSelector((state) => state.location);
  const offersByLocation = getOffersByLocation(location);

  return (
    <Layout className="page--gray page--main" >
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersByLocation.length} places to stay in {location}
              </b>
              <Sort/>
              <OfferList
                classNames={'places__list cities__places-list'}
                cardType={CardType.Cities}
              />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" offers={offersByLocation} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}


