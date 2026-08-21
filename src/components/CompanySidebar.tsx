import { COMPANY } from "@/lib/company";
import { trustLabel } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { RatingBreakdown } from "./RatingBreakdown";

type CompanySidebarProps = {
  score: number;
  reviewCount: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export function CompanySidebar({
  score,
  reviewCount,
  distribution,
}: CompanySidebarProps) {
  return (
    <aside className="company-sidebar">
      <div className="panel">
        <h2 className="panel-title">Company details</h2>
        <p className="company-sidebar__category">{COMPANY.category}</p>
        <p className="company-sidebar__desc">{COMPANY.description}</p>
      </div>

      <div className="panel">
        <h2 className="panel-title">Contact info</h2>
        <p className="company-sidebar__contact">{COMPANY.address}</p>
        <a
          className="company-sidebar__link"
          href={COMPANY.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {COMPANY.domain}
        </a>
      </div>

      <div className="panel panel--score">
        <p className="panel-score__num">{score.toFixed(1)}</p>
        <p className="panel-score__label">{trustLabel(score)}</p>
        <StarRating rating={score} />
        <p className="panel-score__count">{reviewCount} reviews</p>
        <RatingBreakdown distribution={distribution} total={reviewCount} />
      </div>
    </aside>
  );
}
