"use client";

import { useCallback, useEffect, useState } from "react";
import {
  averageRating,
  loadReviews,
  ratingDistribution,
  saveReviews,
  SEED_REVIEWS,
} from "@/lib/reviews";
import type { Review } from "@/lib/types";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReviews(loadReviews());
    setReady(true);
  }, []);

  const addReview = useCallback(
    (
      input: Omit<Review, "id" | "createdAt">,
      metadata?: Pick<Review, "id" | "createdAt">,
    ) => {
    const next: Review = {
      ...input,
      id: metadata?.id ?? `user-${crypto.randomUUID()}`,
      createdAt: metadata?.createdAt ?? new Date().toISOString(),
    };
    setReviews((prev) => {
      const updated = [next, ...prev];
      saveReviews(updated);
      return updated;
    });
    return next;
    },
    [],
  );

  const resetToSeed = useCallback(() => {
    saveReviews(SEED_REVIEWS);
    setReviews(SEED_REVIEWS);
  }, []);

  const score = averageRating(reviews);
  const distribution = ratingDistribution(reviews);

  return { reviews, ready, addReview, resetToSeed, score, distribution };
}
