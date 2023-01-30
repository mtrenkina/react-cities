import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../mocks/const';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fillOffersList } from '../../store/action';

type MapProps = {
  selectedPoint?: Offer;
};

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const Map = (props: MapProps): JSX.Element => {

  const {selectedPoint} = props;
  const city = useAppSelector((state) => state.change.city);
  const points = useAppSelector((state) => state.change.offers).filter((offer) => offer.city.id === city.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fillOffersList(points));
  }, [city]);

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
