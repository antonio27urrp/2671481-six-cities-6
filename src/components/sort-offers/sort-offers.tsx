import { memo, useCallback, useState } from 'react';
import { OFFER_SORT_OPTIONS, OfferSortType } from '../../const/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeSortType } from '../../store/reducers/offers-slice';
import { getSortType } from '../../store/selectors/offers-selectors';

function SortOffers(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortParam = useAppSelector(getSortType);

  const [isOpened, setIsOpened] = useState(false);

  const handleSortClick = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const handleSortParamClick = useCallback(
    (type: OfferSortType) => {
      dispatch(changeSortType(type));
      setIsOpened(false);
    },
    [dispatch]
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortClick}
      >
        {sortParam}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
      >
        {OFFER_SORT_OPTIONS.map((optionParam) => (
          <li
            key={optionParam}
            className={`places__option ${
              sortParam === (optionParam as OfferSortType)
                ? 'places__option--active'
                : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortParamClick(optionParam as OfferSortType)}
          >
            {optionParam}
          </li>
        ))}
      </ul>
    </form>
  );
}

const memoSortOffers = memo(SortOffers);
export { memoSortOffers as SortOffers };
