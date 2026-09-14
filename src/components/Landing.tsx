import Link from '@docusaurus/Link';
import React from 'react';
import styles from './Landing.module.css';

interface CardProps {
  to: string;
  title: string;
  children: React.ReactNode;
}

function Card({ to, title, children }: CardProps): React.JSX.Element {
  return (
    <Link to={to} className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardBody}>{children}</p>
      <span className={styles.cardArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/** The hero and call-to-action grid on the documentation home page. */
export default function Landing(): React.JSX.Element {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Allow MENA Delivery</p>
        <h1 className={styles.title}>Delivery API documentation</h1>
        <p className={styles.lede}>
          Create and track deliveries from your own storefront, warehouse or order-management system,
          and run the operations behind them — drivers, suppliers, cash reconciliation and reporting.
        </p>

        <nav className={styles.ctas} aria-label="Primary">
          <Link className={styles.ctaPrimary} to="/getting-started/quickstart">
            Get started
          </Link>
          <Link className={styles.ctaSecondary} to="/api/partner/create-order-v3">
            API reference
          </Link>
          <Link className={styles.ctaSecondary} to="/getting-started/authentication">
            Authentication
          </Link>
        </nav>
      </header>

      <section className={styles.section} aria-labelledby="start-here">
        <h2 id="start-here" className={styles.sectionTitle}>
          Start here
        </h2>
        <div className={styles.grid}>
          <Card to="/getting-started/quickstart" title="Quick start">
            Send your first order in four steps, from API key to webhook callback.
          </Card>
          <Card to="/getting-started/authentication" title="Authentication">
            Three credential types: partner <code>x-api-key</code>, service API key, and driver bearer
            tokens.
          </Card>
          <Card to="/getting-started/base-url" title="Base URL &amp; versions">
            Which host to call, and how <code>v1</code>, <code>v2</code> and <code>v3</code> differ.
          </Card>
          <Card to="/getting-started/errors" title="Errors">
            The two error envelopes in use, and what each status code means.
          </Card>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="surfaces">
        <h2 id="surfaces" className={styles.sectionTitle}>
          API surfaces
        </h2>
        <div className={styles.grid}>
          <Card to="/api/partner/create-order-v3" title="Partner Orders">
            The public integration API. Create, cancel and track deliveries with your{' '}
            <code>x-api-key</code>.
          </Card>
          <Card to="/api/webhooks/order-status" title="Webhooks">
            Callbacks the platform sends you when a driver is assigned and as the order progresses.
          </Card>
          <Card to="/api/operations/suppliers/list-suppliers" title="Operations">
            Internal portal endpoints: suppliers, issued items, cash collection, reports and reference
            data.
          </Card>
          <Card to="/api/driver/login" title="Driver App">
            Session-backed login, device switching and token refresh for the driver mobile app.
          </Card>
        </div>
      </section>
    </div>
  );
}
