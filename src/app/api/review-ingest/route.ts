import { normalizeReviewInput, type ReviewInput } from "@/lib/review-submit";

const DEFAULT_SOURCE_URL = "https://test-trustpilot-henna.vercel.app/";

function jsonError(message: string, status: number) {
  return Response.json({ status: "ERROR", error: message }, { status });
}

export async function POST(request: Request) {
  const webhookUrl = process.env.REVIEW_LAB_N8N_WEBHOOK_URL?.trim();
  const webhookToken = process.env.REVIEW_LAB_WEBHOOK_TOKEN?.trim();
  const sourceExternalId =
    process.env.REVIEW_LAB_SOURCE_EXTERNAL_ID?.trim() || "review-lab";
  const sourceUrl =
    process.env.REVIEW_LAB_SOURCE_URL?.trim() || DEFAULT_SOURCE_URL;

  if (!webhookUrl || !webhookToken) {
    return jsonError("Review Lab server integration is not configured", 503);
  }
  if (process.env.NODE_ENV === "production" && !webhookUrl.startsWith("https://")) {
    return jsonError("Review Lab webhook must use HTTPS in production", 503);
  }

  let input: ReviewInput;
  try {
    input = (await request.json()) as ReviewInput;
  } catch {
    return jsonError("Request body must be valid JSON", 400);
  }

  let review;
  try {
    review = normalizeReviewInput(input);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Invalid review", 400);
  }

  let reviewUrl: string;
  try {
    const url = new URL(sourceUrl);
    url.searchParams.set("review_id", review.id);
    reviewUrl = url.toString();
  } catch {
    return jsonError("Review Lab source URL is invalid", 503);
  }

  const payload = {
    source_external_id: sourceExternalId,
    url: sourceUrl,
    page_status: "OK",
    collector_engine: "review_lab",
    collector_mode: "webhook",
    observed_at: review.createdAt,
    reviews: [
      {
        review_id: review.id,
        rating: review.rating,
        reviewer_name: review.author,
        review_title: review.title,
        review_text: review.body,
        review_url: reviewUrl,
        review_created_at: review.createdAt,
        raw_payload: { source: "vibetrustpilot", review_id: review.id },
      },
    ],
  };

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${webhookToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return jsonError("Review ingest service is unreachable", 502);
  }

  const responseText = await response.text();
  let result: unknown = null;
  try {
    result = responseText ? JSON.parse(responseText) : null;
  } catch {
    result = null;
  }

  if (!response.ok) {
    return jsonError("Review ingest service rejected the review", 502);
  }

  return Response.json({ status: "SUCCESS", review, ingest: result });
}
