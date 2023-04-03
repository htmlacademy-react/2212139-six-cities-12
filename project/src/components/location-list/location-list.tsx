import LocationItem from '../location-item/location-item';
import {Location} from '../../const';


export default function LocationList(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.entries(Location).map(([_,location]) => (
            <LocationItem
              key={location}
              location={location}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
