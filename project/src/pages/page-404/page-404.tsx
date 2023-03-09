import Layout from '../../components/layout/layout';
import Tabs from '../../components/tabs/tabs';
import styles from './page-404.module.css';


function Page404(): JSX.Element {

  return (
    <Layout className="page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">a
              <div className="cities__status-wrapper tabs__content">
                <b className={styles.status}>404</b>
                <p className="cities__status-description">This page does not exist</p>
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
