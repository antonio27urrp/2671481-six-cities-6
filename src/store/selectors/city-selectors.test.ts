import { State } from '..';
import { getActiveCity } from './city-selectors';

describe('City Selectors', () => {
  it('should return active city from state', () => {
    const mockCity = 'Amsterdam';
    const mockState = {
      city: {
        city: mockCity,
      },
    } as State;

    const result = getActiveCity(mockState);

    expect(result).toBe(mockCity);
  });
});
