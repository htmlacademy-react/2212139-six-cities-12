import cn from 'classnames';

type MapProps = {
  className: string;
}

export default function Map({className}: MapProps): JSX.Element {
  return (
    <section className={cn('map', className)} ></section>
  );
}

