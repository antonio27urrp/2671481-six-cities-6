import type { Offers } from '../../types/offer.type';
import { OfferCard } from '../offer-card/offer-card';

type OfferListProps = {
  className?: string;
  limit?: number;
  offers: Offers;
};

export function OfferList(props: OfferListProps): JSX.Element {
  const { offers, className, limit = 6 } = props;

  const limitCards = offers.slice(0, limit);

  return (
    <div className={className}>
      {limitCards.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
