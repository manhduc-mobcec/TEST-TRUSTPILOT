import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo" aria-label="VibeTrustpilot home">
          <span className="site-logo__mark" aria-hidden>
            ★
          </span>
          <span className="site-logo__text">
            Vibe<span>Trustpilot</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <span className="site-nav__muted">Categories</span>
          <span className="site-nav__muted">Blog</span>
          <Link href="/write-review" className="btn btn--primary btn--sm">
            Write a review
          </Link>
        </nav>
      </div>
    </header>
  );
}
