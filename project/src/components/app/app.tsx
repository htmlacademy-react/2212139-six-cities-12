import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {useAppDispatch, useAppSelector} from '../../hooks';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {Suspense, useEffect} from 'react';
import {checkAuthAction} from '../../store/user-process/api-actions';
import LoadingPage from '../../pages/loading-page/loading-page';


export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingPage/>}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop/>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Room}`}
            element={
              <PropertyPage/>
            }
          />
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </HistoryRouter>
    </Suspense>
  );
}

