import clsx from 'clsx';
import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useAppSelector} from '../../hooks';
import { Offers } from '../../types/offer';

type MapProps = {
  className: string;
  offers: Offers;
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

function Map({className, offers}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const selectedOfferId = useAppSelector((state) => state.selectedOfferId);
  const cityLocation = offers[0].city.location;
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map) {
      const markerGroup = leaflet.layerGroup().addTo(map);
      const { latitude, longitude, zoom } = cityLocation;
      map.setView([latitude, longitude], zoom);

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
          .addTo(markerGroup);
      });

      return () => {
        markerGroup.clearLayers();
      };
    }
  }, [map, offers, selectedOfferId, cityLocation]);

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
