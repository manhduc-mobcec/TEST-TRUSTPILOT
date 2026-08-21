type StarRatingProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Trustpilot-style star strip: filled green stars for whole rating. */
export function StarRating({ rating, size = "md", className = "" }: StarRatingProps) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  const px = size === "sm" ? 16 : size === "lg" ? 28 : 20;

  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="inline-flex items-center justify-center"
          style={{
            width: px,
            height: px,
            background: i <= rounded ? "var(--tp-star)" : "var(--tp-star-empty)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={px * 0.72}
            height={px * 0.72}
            aria-hidden
          >
            <path
              fill="#fff"
              d="M12 2.5l2.9 6.1 6.7.9-4.8 4.7 1.1 6.6L12 17.8 6.1 21l1.1-6.6L2.4 9.5l6.7-.9L12 2.5z"
            />
          </svg>
        </span>
      ))}
    </span>
  );
}
