import { NavLink } from 'react-router-dom';
import {upperFirstLetter} from '../../utils';

type LocationItemProps = {
  location: string;
};

export default function LocationItem({location}: LocationItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <NavLink className="locations__item-link tabs__item" to="#/">
        <span>{upperFirstLetter(location)}</span>
      </NavLink>
    </li>
  );
}
