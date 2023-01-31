import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';

type MapProps = {
  selectedPoint?: Offer;
  city: City;
  points: Offer[];
};

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const Map = (props: MapProps): JSX.Element => {

  const {selectedPoint, city, points} = props;
  //const city = useAppSelector((state) => state.change.city);
  //const points = useAppSelector((state) => state.change.offers).filter((offer) => offer.city.id === city.id);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.lat,city.lng], city.zoom);

      points.forEach((point) => {
        const marker = new leaflet.Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.name === selectedPoint.name
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, city, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
};

export default Map;
