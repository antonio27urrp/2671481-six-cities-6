import { memo, MouseEvent, useCallback } from 'react';
import { CITY_LIST_OPTIONS } from '../../const/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCity } from '../../store/reducers/city-slice';

import { getActiveCity } from '../../store/selectors/city-selectors';

function CityList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);

  const handleCityClick = useCallback(
    (evt: MouseEvent<HTMLAnchorElement>, city: string) => {
      evt.preventDefault();
      dispatch(changeCity(city));
    },
    [dispatch]
  );

  return (
    <ul className="locations__list tabs__list">
      {CITY_LIST_OPTIONS.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${
              city === activeCity ? 'tabs__item--active' : ''
            }`}
            href="#"
            onClick={(evt) => handleCityClick(evt, city)}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const memoCityList = memo(CityList);
export { memoCityList as CityList };
