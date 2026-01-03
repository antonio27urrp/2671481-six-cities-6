import { State } from '..';

export const getActiveCity = (state: State): string => state.city.city;
