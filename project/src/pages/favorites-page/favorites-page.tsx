
import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import OfferList from '../../components/offer-list/offer-list';
import { Offers } from '../../types/offer';

type FavoritesPageProps = {
  offers: Offers;
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  return (
    <Layout className="">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <OfferList offers={offers} classNames={'favorites__places'} />
              </li>
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>

                <OfferList offers={offers} classNames={'favorites__places'} />
              </li>
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

export default FavoritesPage;
