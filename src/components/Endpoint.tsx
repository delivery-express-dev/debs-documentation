import React from 'react';
import styles from './Endpoint.module.css';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Inline method badge. Also used standalone inside prose and tables. */
export function Method({ children }: { children: HttpMethod }): React.JSX.Element {
  return (
    <span className={styles.badge} data-method={children}>
      {children}
    </span>
  );
}

export interface EndpointProps {
  method: HttpMethod;
  /** Path as the caller writes it, e.g. `/api/v3/external/orders`. */
  path: string;
  /** Auth scheme in words, e.g. `x-api-key header` or `Bearer token`. */
  auth?: string;
  /**
   * Permission slug(s) read from the backend. Multiple slugs mean *any one*
   * grants access, which is how `authorise_access` evaluates them.
   */
  permission?: string | string[];
  /** Set when the route is reachable without credentials. */
  publicAccess?: boolean;
}

/**
 * The header block that opens every endpoint page: method, path, and the
 * credentials needed to call it. Kept as one component so a change to how
 * permissions are presented lands on every endpoint at once.
 */
export default function Endpoint({
  method,
  path,
  auth,
  permission,
  publicAccess,
}: EndpointProps): React.JSX.Element {
  const permissions = permission == null ? [] : Array.isArray(permission) ? permission : [permission];

  return (
    <div className={styles.card}>
      <div className={styles.signature}>
        <span className={styles.badge} data-method={method}>
          {method}
        </span>
        <code className={styles.path}>{path}</code>
      </div>

      {(auth || publicAccess || permissions.length > 0) && (
        <dl className={styles.meta}>
          {(auth || publicAccess) && (
            <div className={styles.metaRow}>
              <dt>Authentication</dt>
              <dd>{publicAccess ? <span className={styles.public}>None — public endpoint</span> : auth}</dd>
            </div>
          )}
          {permissions.length > 0 && (
            <div className={styles.metaRow}>
              <dt>{permissions.length > 1 ? 'Permissions' : 'Permission'}</dt>
              <dd>
                {permissions.map((p) => (
                  <code key={p} className={styles.permission}>
                    {p}
                  </code>
                ))}
                {permissions.length > 1 && <span className={styles.anyOf}>any one of these</span>}
              </dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
