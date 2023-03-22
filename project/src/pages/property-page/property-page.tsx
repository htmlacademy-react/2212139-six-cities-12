import {Navigate, useParams} from 'react-router-dom';
import Layout from '../../components/layout/layout';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyHost from '../../components/property-host/property-host';
import PropertyList from '../../components/property-list/property-list';
import ReviewList from '../../components/review-list/review-list';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {AppRoute, AuthorizationStatus, CardType} from '../../const';
import { useAppSelector } from '../../hooks';
import { fetchReviewAction, fetchNearOffersAction, fetchOfferByIdAction} from '../../store/api-actions';
import { useEffect } from 'react';
import { store } from '../../store';
import LoadingScreen from '../loading-screen/loading-screen';


export default function PropertyPage(): JSX.Element {

  const {id} = useParams();
  const offerId = Number(id);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const shouldDisplayReviews = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    store.dispatch(fetchOfferByIdAction(offerId));
    store.dispatch(fetchNearOffersAction(offerId));

    if (shouldDisplayReviews) {
      store.dispatch(fetchReviewAction(offerId));
    }
  }, [offerId, shouldDisplayReviews]);

  const offerById = useAppSelector((state) => state.offerById);
  const reviews = useAppSelector((state) => state.reviews);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (!offerById || isDataLoading) {
    return <LoadingScreen />;
  }

  if (!offerById) {
    return (<Navigate to={AppRoute.Root} />);
  }

  return (
    <Layout className="">
      <main className="page__main page__main--property">
        <section className="property">
          <PropertyGallery offer={offerById}/>
          <div className="property__container container">
            <div className="property__wrapper">
              <PropertyList offer={offerById}/>
              <PropertyHost offer={offerById}/>
              <ReviewList reviews={reviews}/>
            </div>
          </div>
          <Map
            className="property__map"
            offers={nearOffers}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              classNames={'near-places__list places__list'}
              cardType={CardType.NearPlaces}
              offers={nearOffers}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
}

