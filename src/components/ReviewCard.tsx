import { formatReviewDate } from "@/lib/reviews";
import type { Review } from "@/lib/types";
import { StarRating } from "./StarRating";

type ReviewCardProps = {
  review: Review;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="review-card">
      <div className="review-card__aside">
        <div className="avatar" aria-hidden>
          {initials(review.author)}
        </div>
        <div>
          <p className="review-card__author">{review.author}</p>
          <time className="review-card__date" dateTime={review.createdAt}>
            {formatReviewDate(review.createdAt)}
          </time>
        </div>
      </div>
      <div className="review-card__body">
        <StarRating rating={review.rating} size="sm" />
        <h3 className="review-card__title">{review.title}</h3>
        <p className="review-card__text">{review.body}</p>
      </div>
    </article>
  );
}
