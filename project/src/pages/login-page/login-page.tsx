import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { AppRoute, Location } from '../../const';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import { getIsAuthorized } from '../../store/user-data/selectors';
import { changeLocation } from '../../store/app-data/app-data';
import { getRandomInt } from '../../utils/utils';

export default function LoginPage(): JSX.Element {

  const randomIndex = getRandomInt(Object.keys(Location).length);
  const randomLocation = Object.values(Location)[randomIndex];
  const isAuth = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  if (isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return (
    <Layout className='page--gray page--login'>
      <main className="page__main page__main--login" data-testid="login-page">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => dispatch(changeLocation(Location[randomLocation]))}
              >
                <span data-testid="locations-login">{Location[randomLocation]}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
