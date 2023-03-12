import clsx from 'clsx';
import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import {Offers, Location} from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: Location;
  offers: Offers;
  selectedOffer: number | null;
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

function Map({city, offers, selectedOffer, className}: MapProps): JSX.Element {

  const mapRef = useRef(null);
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
            selectedOffer !== null && offer.id === selectedOffer
              ? activeMarkerIcon
              : defaultMarkerIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

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
