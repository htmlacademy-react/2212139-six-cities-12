import Logo from '../logo/logo';
import UserNavigation from '../user-navigation/user-navigation';

export default function Header(): JSX.Element {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type='header'/>
          </div>
          <UserNavigation />
        </div>
      </div>
    </header>
  );
}

