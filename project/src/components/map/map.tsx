import clsx from 'clsx';

type MapProps = {
  className: string;
}

export default function Map({className}: MapProps): JSX.Element {
  return (
    <section className={clsx('map', {className})} ></section>
  );
}

