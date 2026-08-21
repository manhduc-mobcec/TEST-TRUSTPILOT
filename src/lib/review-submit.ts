import type { Review } from "./types";

export type ReviewInput = {
  author: unknown;
  title: unknown;
  body: unknown;
  rating: unknown;
};

type Clock = {
  idFactory?: () => string;
  now?: () => Date;
};

function requiredText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new Error(`${field} is required`);
  }
  const result = value.trim();
  if (!result) throw new Error(`${field} is required`);
  if (result.length > maxLength) throw new Error(`${field} is too long`);
  return result;
}

export function normalizeReviewInput(
  input: ReviewInput,
  clock: Clock = {},
): Review {
  const author = requiredText(input.author, "author", 80);
  const title = requiredText(input.title, "title", 120);
  const body = requiredText(input.body, "body", 2000);
  const rating = Number(input.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("rating must be an integer from 1 to 5");
  }

  const now = (clock.now ?? (() => new Date()))();
  const id = clock.idFactory?.() ?? `user-${crypto.randomUUID()}`;
  return {
    id,
    author,
    title,
    body,
    rating: rating as Review["rating"],
    createdAt: now.toISOString(),
  };
}
