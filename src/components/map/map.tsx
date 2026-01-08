import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useMap } from '../../hooks/useMap';
import { ICity, MapPoint } from '../../types/offer.type';

interface IMapProps {
  city: ICity;
  points: MapPoint[];
  page: string;
  selectedPoint: MapPoint | null;
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

function Map(props: IMapProps) {
  const { city, points, page, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);
  const markerLayerRef = useRef<LayerGroup | null>(null);

  const mapClassName: string = `${
    page === 'MainPage'
      ? 'cities__map'
      : (page === 'OfferPage' ? 'offer__map' : '') || ''
  } map`;

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      if (!markerLayerRef.current) {
        markerLayerRef.current = leaflet.layerGroup().addTo(map);
      }

      const markerLayer = markerLayerRef.current;
      markerLayer.clearLayers();

      points.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.location.latitude,
              lng: point.location.longitude,
            },
            {
              icon:
                selectedPoint && point.id === selectedPoint.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(markerLayer);
      });
    }
  }, [map, points, selectedPoint]);

  return <section className={mapClassName} ref={mapRef}></section>;
}

const memoMap = memo(Map);

export { memoMap as Map };
