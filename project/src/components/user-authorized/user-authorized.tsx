import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/user-process/api-actions';
import { getUserData } from '../../store/user-process/selectors';

import styles from './user-authorized.module.css';
import { getFavoritesCount } from '../../store/favorite-data/selector';

export default function UserAuthorized(): JSX.Element {
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(getFavoritesCount);

  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={'/favorites'}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img
              className={styles.imgUser}
              src={userData?.avatarUrl ?? './img/avatar.svg'}
              width="20"
              height="20"
              alt={userData?.name ?? 'User avatar.'}
            />
          </div>
          <span className="header__user-name user__name">
            {userData?.email}
          </span>
          <span className="header__favorite-count">{favoritesCount}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          to="/favorites"
          className="header__nav-link"
          onClick={(event: MouseEvent) => {
            event.preventDefault();
            dispatch(logoutAction());
          }}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}
