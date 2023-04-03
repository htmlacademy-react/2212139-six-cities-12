import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user-process/selectors';
import UserAuthorized from '../user-authorized/user-authorized';
import UserUnauthorized from '../user-unauthorized/user-unauthorized';


export default function UserNavigation(): JSX.Element {

  const isAuth = useAppSelector(getIsAuthorized);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {(isAuth)
          ? <UserAuthorized />
          : <UserUnauthorized />}
      </ul>
    </nav>
  );
}
