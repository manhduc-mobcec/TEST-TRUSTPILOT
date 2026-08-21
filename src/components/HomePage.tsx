"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CompanyHero } from "@/components/CompanyHero";
import { CompanySidebar } from "@/components/CompanySidebar";
import { ReviewCard } from "@/components/ReviewCard";
import { useReviews } from "@/hooks/useReviews";

function PostedBanner() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("posted") === "1") setVisible(true);
  }, [searchParams]);

  if (!visible) return null;

  return (
    <div className="posted-banner" role="status">
      Review posted — it now appears at the top of the list.
      <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

export function HomePage() {
  const { reviews, ready, score, distribution, resetToSeed } = useReviews();

  return (
    <main className="page">
      <div className="container">
        <Suspense fallback={null}>
          <PostedBanner />
        </Suspense>
        <CompanyHero score={score} reviewCount={reviews.length} />

        <div className="layout-grid">
          <section className="reviews-section" aria-labelledby="reviews-heading">
            <div className="reviews-section__head">
              <h2 id="reviews-heading">All reviews</h2>
              <div className="reviews-section__actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={resetToSeed}
                >
                  Reset seed data
                </button>
                <Link href="/write-review" className="btn btn--primary btn--sm">
                  Write a review
                </Link>
              </div>
            </div>

            {!ready ? (
              <p className="muted">Loading reviews…</p>
            ) : reviews.length === 0 ? (
              <p className="muted">No reviews yet. Be the first to write one.</p>
            ) : (
              <ul className="review-list">
                {reviews.map((review) => (
                  <li key={review.id}>
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <CompanySidebar
            score={score}
            reviewCount={reviews.length}
            distribution={distribution}
          />
        </div>
      </div>
    </main>
  );
}
