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

export enum OfferSortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRating = 'Top rated first',
}

export const OFFER_SORT_OPTIONS: string[] = Object.values(OfferSortType);

export const CITY_LIST_OPTIONS: string[] = Object.values(City);
