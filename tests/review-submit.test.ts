import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeReviewInput } from "../src/lib/review-submit";

test("normalizes a valid review without trusting client IDs or timestamps", () => {
  const review = normalizeReviewInput(
    {
      author: "  Alex Nguyen ",
      title: " Clear process ",
      body: " The team answered quickly. ",
      rating: 4,
    },
    {
      idFactory: () => "lab-test-id",
      now: () => new Date("2026-08-21T09:00:00.000Z"),
    },
  );

  assert.deepEqual(review, {
    id: "lab-test-id",
    author: "Alex Nguyen",
    title: "Clear process",
    body: "The team answered quickly.",
    rating: 4,
    createdAt: "2026-08-21T09:00:00.000Z",
  });
});

test("rejects incomplete or out-of-range review input", () => {
  assert.throws(() => normalizeReviewInput(null), /object/i);
  assert.throws(
    () => normalizeReviewInput({ author: "Alex", title: "", body: "Text", rating: 5 }),
    /title/i,
  );
  assert.throws(
    () => normalizeReviewInput({ author: "Alex", title: "Title", body: "Text", rating: 6 }),
    /rating/i,
  );
});
