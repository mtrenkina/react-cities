import leaflet from 'leaflet';
import { useRef, useEffect } from 'react';
import { memo } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { cities } from '../../const';

type MapProps = {
  city: string;
  points: Offer[];
  selectedPoint?: Offer;
};

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const Map = (props: MapProps): JSX.Element => {
  const { city, points, selectedPoint } = props;

  const currentCity = cities.filter((el) => el.name === city)[0];
  const mapRef = useRef(null);

  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      map.setView([currentCity.lat, currentCity.lng], currentCity.zoom);

      points.forEach((point) => {
        const marker = new leaflet.Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint.id ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, city, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
};

export default memo(Map);
