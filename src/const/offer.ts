export enum CardStyle {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places',
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CITY_LIST_OPTIONS: string[] = Object.values(City);
