import Logo from '../logo/logo';
import UserInfo from '../user-info/user-info';

type HeaderProps = {
  isLogoPage?: boolean;
};

const Header = (props: HeaderProps): JSX.Element => {
  const { isLogoPage } = props;

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          {!isLogoPage && (
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <UserInfo />
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
