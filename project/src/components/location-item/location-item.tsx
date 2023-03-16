import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLocation, updateOffersByLocation } from '../../store/actions';


type LocationItemProps = {
  location: string;
};

export default function LocationItem({location}: LocationItemProps): JSX.Element {

  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.location);


  return (
    <li className="locations__item">
      <NavLink
        className={clsx('locations__item-link tabs__item', {
          'tabs__item--active': location === currentLocation
        })} to="#/"
        onClick={(event) => {
          event.preventDefault();

          dispatch(changeLocation(location));
          dispatch(updateOffersByLocation());
        }}
      >
        <span>{location}</span>
      </NavLink>
    </li>
  );
}
