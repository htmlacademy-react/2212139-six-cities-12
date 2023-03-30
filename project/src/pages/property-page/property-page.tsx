import {useParams} from 'react-router-dom';
import Layout from '../../components/layout/layout';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyHost from '../../components/property-host/property-host';
import PropertyList from '../../components/property-list/property-list';
import ReviewList from '../../components/review-list/review-list';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {CardType} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import {getOfferProperty, getOfferPropertyLoadingStatus,
  getOfferPropertyError, getReviews, getNearOffers}
  from '../../store/offer-property-data/selectors';
import { fetchNearOffersAction, fetchOfferPropertyAction,
  fetchReviewAction } from '../../store/offer-property-data/api-actions';
import Page404 from '../page-404/page-404';


export default function PropertyPage(): JSX.Element {
  const {id} = useParams();
  const offerId = Number(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchOfferPropertyAction(offerId));
      dispatch(fetchNearOffersAction(offerId));
      dispatch(fetchReviewAction(offerId));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, offerId]);

  const offerProperty = useAppSelector(getOfferProperty);
  const reviews = useAppSelector(getReviews);
  const nearOffers = useAppSelector(getNearOffers);
  const isDataLoading = useAppSelector(getOfferPropertyLoadingStatus);
  const isOfferPropertyError = useAppSelector(getOfferPropertyError);


  if (!offerProperty || isDataLoading) {
    return <LoadingPage />;
  }

  if (isOfferPropertyError) {
    return <Page404 />;
  }

  return (
    <Layout className="">
      <main className="page__main page__main--property">
        <section className="property">
          <PropertyGallery offer={offerProperty}/>
          <div className="property__container container">
            <div className="property__wrapper">
              <PropertyList offer={offerProperty}/>
              <PropertyHost offer={offerProperty}/>
              <ReviewList reviews={reviews} />
            </div>
          </div>
          <Map
            className="property__map"
            offers={[...nearOffers, offerProperty]}
            selectedOfferId={offerProperty.id}
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

