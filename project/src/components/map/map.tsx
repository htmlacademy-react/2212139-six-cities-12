import clsx from 'clsx';
import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import 'leaflet/dist/leaflet.css';
import {useAppSelector} from '../../hooks';

type MapProps = {
  className: string;
}

const defaultMarkerIcon = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const activeMarkerIcon = new Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function Map({className}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const selectedOfferId = useAppSelector((state) => state.selectedOfferId);
  const offers = useAppSelector((state) => state.offersByLocation);
  const city = offers[0].city.location;
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId !== null && offer.id === selectedOfferId
              ? activeMarkerIcon
              : defaultMarkerIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={clsx('map', {className})}
      ref={mapRef}
      style={{height: '500px', width: '100%'}}
    >
    </section>
  );
}

export default Map;
