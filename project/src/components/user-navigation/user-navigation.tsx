import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import UserAuthorized from '../user-authorized/user-authorized';
import UserUnauthorized from '../user-unauthorized/user-unauthorized';


export default function UserNavigation(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {(authorizationStatus === AuthorizationStatus.Auth)
          ? <UserAuthorized />
          : <UserUnauthorized />}
      </ul>
    </nav>
  );
}
