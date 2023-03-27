import { MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions-delete';
import styles from './user-authorized.module.css';

export default function UserAuthorized(): JSX.Element {
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();

  return (
    <>
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img
              className={styles.imgUser}
              src={userData?.avatarUrl ?? './img/avatar.svg'}
              width="20"
              height="20"
              alt={userData?.name ?? 'User avatar.'}
            />
          </div>
          <span className="header__user-name user__name">{userData?.email}</span>
        </div>
      </li>
      <li className="header__nav-item">
        <Link to='#/'
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
