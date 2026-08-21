import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { trustLabel } from "@/lib/reviews";
import { StarRating } from "./StarRating";

type CompanyHeroProps = {
  score: number;
  reviewCount: number;
};

export function CompanyHero({ score, reviewCount }: CompanyHeroProps) {
  return (
    <section className="company-hero">
      <div className="company-hero__brand">
        <div className="company-logo" aria-hidden>
          <span>OI</span>
        </div>
        <div>
          <p className="company-hero__claimed">Claimed profile</p>
          <h1 className="company-hero__title">{COMPANY.name}</h1>
          <p className="company-hero__domain">{COMPANY.domain}</p>
          <p className="company-hero__category">{COMPANY.category}</p>
        </div>
      </div>

      <div className="company-hero__score">
        <div className="company-hero__score-row">
          <StarRating rating={score} size="lg" />
          <span className="company-hero__score-num">{score.toFixed(1)}</span>
        </div>
        <p className="company-hero__score-meta">
          {trustLabel(score)} · Based on <strong>{reviewCount}</strong> reviews
        </p>
        <div className="company-hero__actions">
          <Link href="/write-review" className="btn btn--primary">
            Write a review
          </Link>
          <a
            href={COMPANY.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Visit website
          </a>
        </div>
      </div>
    </section>
  );
}
