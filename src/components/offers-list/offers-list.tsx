import type { Offers } from '../../types/offer.type';
import { OfferCard } from '../offer-card/offer-card';

type OfferListProps = {
  className?: string;
  limit?: number;
  offers: Offers;
  cardStyle: string;
  onItemHover?: (item: string) => void;
};

export function OfferList(props: OfferListProps): JSX.Element {
  const { offers, className, limit = 6, cardStyle, onItemHover } = props;

  const limitCards = offers.slice(0, limit);

  const handleListItemHover = (item: string) => {
    onItemHover?.(item);
  };

  return (
    <div className={className}>
      {limitCards.map((offer) => (
        <OfferCard
          key={offer.id}
          cardStyle={cardStyle}
          offer={offer}
          onItemHover={handleListItemHover}
        />
      ))}
    </div>
  );
}
