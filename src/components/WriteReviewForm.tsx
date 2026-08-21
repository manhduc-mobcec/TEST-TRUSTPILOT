"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { useReviews } from "@/hooks/useReviews";
import { StarRating } from "./StarRating";

export function WriteReviewForm() {
  const router = useRouter();
  const { addReview } = useReviews();
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!author.trim() || !title.trim() || !body.trim()) {
      setError("Please fill in name, title, and review text.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/review-ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          title: title.trim(),
          body: body.trim(),
          rating,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        review?: { id?: string; createdAt?: string };
        error?: string;
      } | null;
      if (!response.ok || !result?.review?.id || !result.review.createdAt) {
        throw new Error(result?.error || "The review could not be submitted.");
      }

      addReview(
        {
          author: author.trim(),
          title: title.trim(),
          body: body.trim(),
          rating,
        },
        { id: result.review.id, createdAt: result.review.createdAt },
      );
      router.push("/?posted=1");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "The review could not be submitted.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <div className="container container--narrow">
        <p className="breadcrumb">
          <Link href="/">← Back to {COMPANY.name}</Link>
        </p>

        <section className="write-panel">
          <h1 className="write-panel__title">Write a review</h1>
          <p className="write-panel__sub">
            Share your experience with <strong>{COMPANY.name}</strong> (
            {COMPANY.domain}). Reviews are sent to the test pipeline and saved in this browser for testing.
          </p>

          <form className="write-form" onSubmit={onSubmit} noValidate>
            <fieldset className="write-form__stars">
              <legend>Your rating</legend>
              <div className="star-picker">
                {([1, 2, 3, 4, 5] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`star-picker__btn${rating === value ? " is-active" : ""}`}
                    onClick={() => setRating(value)}
                    aria-pressed={rating === value}
                    aria-label={`${value} stars`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <StarRating rating={rating} size="lg" />
            </fieldset>

            <label className="field">
              <span>Your name</span>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Alex Nguyen"
                maxLength={80}
                required
              />
            </label>

            <label className="field">
              <span>Review title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                maxLength={120}
                required
              />
            </label>

            <label className="field">
              <span>Your review</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What went well? What could be improved?"
                rows={6}
                maxLength={2000}
                required
              />
            </label>

            {error ? <p className="form-error">{error}</p> : null}

            <div className="write-form__actions">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={submitting}
              >
                {submitting ? "Posting…" : "Post review"}
              </button>
              <Link href="/" className="btn btn--ghost">
                Cancel
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
