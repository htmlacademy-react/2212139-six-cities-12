import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import LocationList from '../../components/location-list/location-list';
import styles from './page-404.module.css';


function Page404(): JSX.Element {

  return (
    <Layout className="page--gray page--main" >
      <main
        className="page__main page__main--index page__main--index-empty"
        data-testid="page-404"
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList />
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className={styles.status}>404</b>
                <p className="cities__status-description">This page does not exist</p>
                <Link className={styles.link__blue} to="/">Back to the home page</Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page404;
