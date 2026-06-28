import Link from "next/link";

export default function NotFound() {
  return (
    <section className="error-page">
      <div className="container">
        <span className="eyebrow">Error 404</span>
        <div className="ecode mt-24">404</div>
        <h1 className="mt-24">This page took a wrong turn.</h1>
        <p className="lead mt-24" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 560 }}>
          The page you were looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to the right division.
        </p>
        <div className="cta-row cta-center mt-36">
          <Link className="btn btn-primary" href="/">Back to home</Link>
          <Link className="btn btn-outline-light" href="/contact/">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
