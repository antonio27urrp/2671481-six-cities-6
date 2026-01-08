import { render } from '@testing-library/react';
import { Map } from './map';

const mockCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
};

const mockPoints = [
  {
    id: '1',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
];

describe('Component: Map', () => {
  it('should render with correct class for MainPage', () => {
    const { container } = render(
      <Map
        city={mockCity}
        points={mockPoints}
        page="MainPage"
        selectedPoint={null}
      />
    );

    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('cities__map');
    expect(sectionElement).toHaveClass('map');
  });

  it('should render with correct class for OfferPage', () => {
    const { container } = render(
      <Map
        city={mockCity}
        points={mockPoints}
        page="OfferPage"
        selectedPoint={null}
      />
    );

    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('offer__map');
    expect(sectionElement).toHaveClass('map');
  });
});
