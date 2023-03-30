import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import {CardType, FetchStatus} from '../../const';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getOffers, getStatus} from '../../store/offers-data/selectors';
import {useEffect} from 'react';
import {checkAuthAction} from '../../store/user-process/api-actions';
import LoadingPage from '../loading-page/loading-page';
import { fetchOffersAction } from '../../store/offers-data/api-actions';
import { getLocation, getSelectedOfferId, getSortType } from '../../store/app-process/selectors';
import { getCurrentOffers } from '../../utils';
import NoPlaces from '../../components/no-places/no-places';
import clsx from 'clsx';


export default function MainPage(): JSX.Element {
  const offersState = useAppSelector(getOffers);
  const location = useAppSelector(getLocation);
  const sortType = useAppSelector(getSortType);
  const selectedOfferId = useAppSelector(getSelectedOfferId);


  const offers = offersState ? getCurrentOffers(offersState, location, sortType) : [];

  const isAuthorizationChecked = useAppSelector(getAuthorizationStatus);
  const status = useAppSelector(getStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (!isAuthorizationChecked || status === FetchStatus.Loading) {
    return (
      <LoadingPage/>
    );
  }

  // if (status === FetchStatus.Failed) {
  //   return (
  //     <ErrorFetch/>
  //   );
  // }


  return (
    <Layout className="page--gray page--main">
      <main className={
        clsx(
          'page__main',
          'page__main--index',
          {'page__main--index-empty': !offers.length},
          {'page__main--index-error': status === FetchStatus.Failed})
      }
      >
        <h1 className="visually-hidden">Cities</h1>
        <LocationList/>
        {!offers.length ? <NoPlaces location={location}/> : (
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
                <Map
                  className="cities__map"
                  offers={offers}
                  selectedOfferId={selectedOfferId}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}


