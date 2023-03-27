import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import {CardType} from '../../const';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getOffers} from '../../utils';
import {checkAuthorizationStatus} from '../../store/user-process/selectors';
import {getOffersStatus} from '../../store/offers-data/selectors';
import {useEffect} from 'react';
import {checkAuthAction} from '../../store/user-process/api-actions';
import LoadingPage from '../loading-page/loading-page';
import { fetchOffersAction } from '../../store/offers-data/api-action';


export default function MainPage(): JSX.Element {

  const offersState = useAppSelector(getOffers);
  const location = useAppSelector((state) => state.location);
  const sortType = useAppSelector((state) => state.sortType);

  //  const offers = getOffers(offersState, location, sortType);

  const isAuthorizationChecked = useAppSelector(checkAuthorizationStatus);
  const status = useAppSelector(getOffersStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (!isAuthorizationChecked || status.isLoading) {
    return (
      <LoadingPage/>
    );
  }

  if (status.isError) {
    return (
      <ErrorFech/>
    );
  }


  return (
    <Layout className="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationList/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {location}
              </b>
              <Sort/>
              <OfferList
                classNames={'places__list cities__places-list'}
                cardType={CardType.Cities}
                offers={offers}
              />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" offers={offers}/>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}


