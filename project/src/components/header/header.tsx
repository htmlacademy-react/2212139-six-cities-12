import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

export default function Header(): JSX.Element {

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type='header'/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.Favorites}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {authorizationStatus && (
                      <img
                        className="header__avatar-image"
                        src={userData.avatarUrl ?? './img/avatar.svg'}
                        width="20"
                        height="20"
                        alt={userData.name ?? 'User avatar.'}
                      />)}
                  </div>
                  <span className="header__user-name user__name">
                    {userData.email}
                  </span>
                  <span className="header__favorite-count">3</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link
                  className="header__nav-link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                  to={AppRoute.Root}
                >
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

