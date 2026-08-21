import type { Review } from "@/lib/types";

type RatingBreakdownProps = {
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  total: number;
};

export function RatingBreakdown({ distribution, total }: RatingBreakdownProps) {
  const rows: Array<Review["rating"]> = [5, 4, 3, 2, 1];

  return (
    <div className="rating-breakdown">
      <h2 className="panel-title">Rating breakdown</h2>
      <ul className="rating-breakdown__list">
        {rows.map((star) => {
          const count = distribution[star];
          const pct = total === 0 ? 0 : Math.round((count / total) * 100);
          return (
            <li key={star} className="rating-breakdown__row">
              <span className="rating-breakdown__label">{star}-star</span>
              <div className="rating-breakdown__bar" aria-hidden>
                <div
                  className="rating-breakdown__fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="rating-breakdown__pct">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
