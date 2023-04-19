import clsx from 'clsx';
import {useEffect, useRef} from 'react';
import leaflet, {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import 'leaflet/dist/leaflet.css';
import { Offers } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getSelectedOfferId } from '../../store/app-data/selectors';


type MapProps = {
  className: 'property__map' | 'cities__map';
  offers: Offers;
}

const DEFAULT_COORDINATE = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 11
};

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

export default function Map({className, offers}: MapProps): JSX.Element {

  let selectedOfferId = useAppSelector(getSelectedOfferId);
  const mapRef = useRef(null);
  const cityLocation = offers[0]?.city?.location ?? DEFAULT_COORDINATE;
  const map = useMap(mapRef, cityLocation);

  if(className === 'property__map') {
    selectedOfferId = offers[offers.length - 1].id;
  }

  useEffect(() => {
    if (map) {
      const {latitude, longitude, zoom} = cityLocation;
      map.flyTo([latitude, longitude], zoom);
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerGroup = leaflet.layerGroup().addTo(map);
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
        map.removeLayer(markerGroup);
      };
    }
  }, [map, offers, selectedOfferId, cityLocation]);

  return (
    <section
      className={clsx('map', {className})}
      ref={mapRef}
      style={{height: '100%', minHeight: '500px', width: '100%', maxWidth: '1144px', margin: '0 auto'}}
      data-testid="map"
    >
    </section>
  );
}
