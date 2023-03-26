import { CardType } from '../../const';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { Offer, Offers } from '../../types/offer';
import OfferListFavorites from '../../components/offer-list-favorites/offer-list-favorites';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../utils';


type OfferGroupedByCity = {
  [city: string]: Offers;
}

export default function FavoritesPage(): JSX.Element {

  const location = useAppSelector((state) => state.location);
  const offers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);
  const currentOffers = getOffers(offers, location, sortType);


  const offersGroupedByCity = currentOffers.reduce((acc: OfferGroupedByCity, offer: Offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  return (
    <Layout className="">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              { Object.entries(offersGroupedByCity).map(([cityName, offersMap]) => (
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
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </Layout>
  );
}
