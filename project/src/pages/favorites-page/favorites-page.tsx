import {AppRoute, CardType} from '../../const';
import {Link} from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import {Offer, Offers} from '../../types/offer';
import OfferListFavorites from '../../components/offer-list-favorites/offer-list-favorites';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/favorite-data/api-actions';
import { getFavorites, getFavoriteFetchStatus } from '../../store/favorite-data/selector';
import LoadingPage from '../loading-page/loading-page';
import FullPageError from '../../components/full-page-error/full-page-error';
import FavoriteEmpty from '../../components/favorites-empty/favorites-empty';


type OfferGroupedByCity = {
  [city: string]: Offers;
}

export default function FavoritesPage(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const fetchStatus = useAppSelector(getFavoriteFetchStatus);
  const favoriteOffers = useAppSelector(getFavorites);

  if(fetchStatus.isLoading){
    return <LoadingPage />;
  }

  if(fetchStatus.isError){
    return <FullPageError />;
  }

  const offersGroupedByCity = favoriteOffers.reduce((acc: OfferGroupedByCity, offer: Offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  return (
    <Layout className="">
      <main className="page__main page__main--favorites" data-testid="favorite-page">
        <div className="page__favorites-container container">

          {favoriteOffers.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {Object.entries(offersGroupedByCity).map(([cityName, offersMap]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Root}>
                          <span>{cityName}</span>
                        </Link>
                      </div>
                    </div>

                    <OfferListFavorites
                      offers={offersMap}
                      cardType={CardType.Favorites}
                      classNames="favorites__places"
                    />
                  </li>
                ))}

              </ul>
            </section>
            :
            <FavoriteEmpty /> }

        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer"/>
      </footer>
    </Layout>
  );
}
