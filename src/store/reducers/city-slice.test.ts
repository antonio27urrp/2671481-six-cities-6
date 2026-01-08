import { changeCity, cityReducer } from './city-slice';

describe('City Slice', () => {
  const initialState = {
    city: 'Paris',
  };

  it('should return initial state with empty action', () => {
    const result = cityReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const newCity = 'Amsterdam';
    const result = cityReducer(initialState, changeCity(newCity));
    expect(result.city).toBe(newCity);
  });
});
