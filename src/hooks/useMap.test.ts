import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import { useMap } from './useMap';

describe('Hook: useMap', () => {
  const mockLocation = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  };

  it('should return Map instance', () => {
    const mapRef = { current: document.createElement('div') };
    const { result } = renderHook(() => useMap(mapRef, mockLocation));

    expect(result.current).toBeInstanceOf(Map);
  });

  it('should not recreate Map instance if already rendered', () => {
    const mapRef = { current: document.createElement('div') };
    const { result, rerender } = renderHook(
      ({ location }) => useMap(mapRef, location),
      {
        initialProps: { location: mockLocation },
      }
    );

    const firstMapInstance = result.current;

    rerender({
      location: { ...mockLocation, latitude: 48.85661 },
    });

    expect(result.current).toBe(firstMapInstance);
  });

  it('should return null if ref is empty', () => {
    const mapRef = { current: null };
    const { result } = renderHook(() => useMap(mapRef, mockLocation));

    expect(result.current).toBeNull();
  });
});
