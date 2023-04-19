import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import {CardType} from '../../const';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getOffers, getOffersStatus} from '../../store/offers-data/selectors';
import {useEffect} from 'react';
import LoadingPage from '../loading-page/loading-page';
import {fetchOffersAction} from '../../store/offers-data/api-actions';
import {getLocation, getSortType} from '../../store/app-data/selectors';
import NoPlaces from '../../components/no-places/no-places';
import clsx from 'clsx';
import FullPageError from '../../components/full-page-error/full-page-error';
import { getCurrentOffers } from '../../utils/utils';

export default function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const location = useAppSelector(getLocation);
  const sortType = useAppSelector(getSortType);
  const currentOffers = getCurrentOffers(offers, location, sortType);
  const status = useAppSelector(getOffersStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!offers.length){
      dispatch(fetchOffersAction());
    }
  }, [dispatch, offers]);

  if (status.isLoading) {
    return (
      <LoadingPage />
    );
  }

  if (status.isError) {
    return (
      <FullPageError/>
    );
  }

  return (
    <Layout className="page--gray page--main">
      <main
        data-testid="main-page"
        className={
          clsx(
            'page__main',
            'page__main--index',
            {'page__main--index-empty':!currentOffers.length},
            {'page__main--index-error':status.isError})
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
                  {currentOffers.length} places to stay in {location}
                </b>

                <Sort/>

                <OfferList
                  classNames={'places__list cities__places-list'}
                  cardType={CardType.Cities}
                  offers={currentOffers}
                />

              </section>
              <div className="cities__right-section">

                <Map
                  className="cities__map"
                  offers={currentOffers}
                />

              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}


