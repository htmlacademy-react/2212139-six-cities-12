import { CardType } from '../../const';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import OfferList from '../../components/offer-list/offer-list';
import { AppRoute } from '../../const';
import { Offer, Offers } from '../../types/offer';

type FavoritesPageProps = {
  offers: Offers;
};
type OfferGroupedByCity = {
  [city: string]: Offers;
}

export default function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {

  const offersGroupedByCity = offers.reduce((acc: OfferGroupedByCity, offer: Offer) => {
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
                  <OfferList
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
