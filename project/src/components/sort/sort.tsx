import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortType } from '../../const';
import useOnClickOutside from '../../hooks/useOnClickOutside/use-on-click-outside';
import { getSortType } from '../../store/app-process/selectors';
import { changeSort } from '../../store/app-process/app-process';

export default function Sort(): JSX.Element {

  const [open, setOpen] = useState(false);
  const sortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();
  const refOne = useRef<HTMLDivElement>(null);

  useOnClickOutside(refOne, () => setOpen(false));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        ref={refOne}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx ('places__options places__options--custom', {
          'places__options--opened': open
        })}
      >
        {Object.entries(SortType).map(([,value]) => (
          <li
            key={value}
            className={clsx('places__option', {
              'places__option--active': value === sortType
            })}
            tabIndex={0}
            onClick={() => {
              setOpen(false);
              dispatch(changeSort(value));
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

