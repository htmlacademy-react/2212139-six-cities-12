import { Link } from 'react-router-dom';

type LogoProps = {
  type: 'heder' | 'footer';
};

const sizes = {
  heder: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  },
};

const Logo = ({ type }: LogoProps) => {

  const { width, height } = sizes[type];

  return (
    <Link className={`${type}__logo-link`} to="/">

      <img
        className={`${type}__logo`}
        src="/img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
