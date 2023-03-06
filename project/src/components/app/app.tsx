import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Offers } from '../../types/offer';
import { Reviews } from '../../types/review';

type AppProps = {
  offers: Offers;
  nearOffers: Offers;
  reviews: Reviews;
}

function App({offers, nearOffers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Room}/:id`}
          element={
            <PropertyPage offers={offers}
              nearOffers={nearOffers}
              reviews={reviews}
            />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
