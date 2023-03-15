import LocationItem from '../location-item/location-item';
import {LOCATIONS} from '../../const';


export default function LocationList(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS.map((location) => (
          <LocationItem
            key={location}
            location={location}
          />
        ))}
      </ul>
    </section>
  );
}
