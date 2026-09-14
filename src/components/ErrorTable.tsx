import React from 'react';
import styles from './ErrorTable.module.css';

export interface ErrorRow {
  status: number;
  /** Machine-readable `error_code` from the envelope, when the service sends one. */
  code?: string;
  /** What actually causes it on this endpoint. */
  when: React.ReactNode;
}

/**
 * Per-endpoint error list. Only statuses the endpoint can actually return
 * belong here — the shared envelope and the platform-wide catalogue live on
 * the Errors concept page.
 */
export default function ErrorTable({ errors }: { errors: ErrorRow[] }): React.JSX.Element {
  const showCode = errors.some((e) => e.code);

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Status</th>
            {showCode && <th scope="col">Error code</th>}
            <th scope="col">When it happens</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((e, i) => (
            <tr key={`${e.status}-${e.code ?? i}`}>
              <td>
                <span className={styles.status} data-class={String(e.status).charAt(0)}>
                  {e.status}
                </span>
              </td>
              {showCode && <td>{e.code ? <code>{e.code}</code> : <span className={styles.dash}>—</span>}</td>}
              <td className={styles.when}>{e.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
