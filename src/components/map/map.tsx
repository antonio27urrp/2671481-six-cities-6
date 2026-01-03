import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useMap } from '../../hooks/useMap';
import { ICity, Offer } from '../../types/offer.type';

interface IMapProps {
  city: ICity;
  points: Offer[];
  page: string;
  selectedPoint: Offer | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export function Map(props: IMapProps) {
  const { city, points, page, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  const mapClassName: string = `${
    page === 'MainPage'
      ? 'cities__map'
      : (page === 'OfferPage' ? 'offer__map' : '') || ''
  } map`;

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      points.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.location.latitude,
              lng: point.location.longitude,
            },
            {
              icon:
                selectedPoint?.id && point.id === selectedPoint.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint, city]);

  return <section className={mapClassName} ref={mapRef}></section>;
}
