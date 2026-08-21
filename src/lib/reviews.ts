import type { Review } from "./types";

export const STORAGE_KEY = "vibetrustpilot-reviews-v1";

export const SEED_REVIEWS: Review[] = [
  {
    id: "seed-1",
    author: "Gilbert Marino",
    title: "Terrible experience with EIN application",
    body: "They are inexperienced and unprofessional. Numerous mistakes and always a new excuse. We lost over 3 months to get an EIN due to constant mistakes. I would never do business with them again.",
    rating: 1,
    createdAt: "2025-01-04T10:00:00.000Z",
  },
  {
    id: "seed-2",
    author: "Steven Lloyd-Jones",
    title: "No response to emails",
    body: "They spend a fortune on advertising but strangely don't respond to emails. I sent emails to various addresses and never got a response. Impression is they just want people to fill out an application and pay — no real professional service.",
    rating: 1,
    createdAt: "2024-06-02T10:00:00.000Z",
  },
  {
    id: "seed-3",
    author: "Andy",
    title: "Corporate setup OK, rest was a shambles",
    body: "I used One IBC to set up a corporation and bank account in the UAE. Initial corporate setup was efficient but the rest was a mess. No representative in the UAE, no office, and no idea how to secure a visa. Ended up with an extended stay and no refund.",
    rating: 1,
    createdAt: "2023-12-06T10:00:00.000Z",
  },
  {
    id: "seed-4",
    author: "Kirill Maksimov",
    title: "Tax reports delayed every year",
    body: "I've been working with them since 2018 and taxation reports were delayed every year. Would advise everybody to avoid this company.",
    rating: 1,
    createdAt: "2023-08-09T10:00:00.000Z",
  },
  {
    id: "seed-5",
    author: "Maria Chen",
    title: "Helpful with company formation",
    body: "Company formation process was clear and they answered my questions quickly. Took about two weeks end to end. Happy with the result for a first-time founder.",
    rating: 5,
    createdAt: "2024-11-18T10:00:00.000Z",
  },
  {
    id: "seed-6",
    author: "James Okonkwo",
    title: "Mixed — good start, slow follow-up",
    body: "Onboarding was smooth and docs were ready on time. Follow-up support after payment was slower than expected, but the company itself was registered correctly.",
    rating: 3,
    createdAt: "2024-09-12T10:00:00.000Z",
  },
];

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function ratingDistribution(reviews: Review[]): Record<1 | 2 | 3 | 4 | 5, number> {
  const dist: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  for (const r of reviews) dist[r.rating] += 1;
  return dist;
}

export function trustLabel(score: number): string {
  if (score >= 4.5) return "Excellent";
  if (score >= 4) return "Great";
  if (score >= 3.5) return "Average";
  if (score >= 2.5) return "Poor";
  if (score > 0) return "Bad";
  return "No reviews yet";
}

export function loadReviews(): Review[] {
  if (typeof window === "undefined") return SEED_REVIEWS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REVIEWS));
      return SEED_REVIEWS;
    }
    const parsed = JSON.parse(raw) as Review[];
    if (!Array.isArray(parsed)) return SEED_REVIEWS;
    return parsed;
  } catch {
    return SEED_REVIEWS;
  }
}

export function saveReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function formatReviewDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
