import React from 'react';
import styles from './ParamTable.module.css';

export interface Param {
  name: string;
  type: string;
  required?: boolean;
  /** Prose description. Accepts inline JSX for links and `code`. */
  description?: React.ReactNode;
  /** Rendered verbatim in a code span, e.g. `8` or `"ACTIVE"`. */
  default?: string;
  /** Allowed values, rendered as code chips. */
  values?: string[];
  example?: string;
}

export interface ParamTableProps {
  /** Optional caption above the table, e.g. "Query parameters". */
  title?: string;
  params: Param[];
}

/**
 * The parameter table used for path params, query params, headers and request
 * body fields alike. Driving it from data rather than hand-written Markdown
 * keeps the columns consistent across ~50 endpoint pages, and means a column
 * can be added in one place.
 */
export default function ParamTable({ title, params }: ParamTableProps): React.JSX.Element {
  const showDefault = params.some((p) => p.default !== undefined);
  const showExample = params.some((p) => p.example !== undefined);

  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.caption}>{title}</p>}
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Required</th>
              {showDefault && <th scope="col">Default</th>}
              <th scope="col">Description</th>
              {showExample && <th scope="col">Example</th>}
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.name}>
                <td>
                  <code className={styles.name}>{p.name}</code>
                </td>
                <td className={styles.type}>{p.type}</td>
                <td>
                  {p.required ? (
                    <span className={styles.required}>Required</span>
                  ) : (
                    <span className={styles.optional}>Optional</span>
                  )}
                </td>
                {showDefault && <td>{p.default !== undefined ? <code>{p.default}</code> : <span className={styles.dash}>—</span>}</td>}
                {/* Allowed values live inside the description cell rather than in a
                    column of their own: a seventh column pushes the table past the
                    content width on a laptop. They go on their own labelled line
                    below the prose, so the chips never run into a sentence that
                    starts with one of the values. */}
                <td className={styles.description}>
                  {p.description ?? (p.values?.length ? null : <span className={styles.dash}>—</span>)}
                  {p.values?.length ? (
                    <span className={styles.values}>
                      <span className={styles.valuesLabel}>Allowed</span>
                      {p.values.map((v) => (
                        <code key={v}>{v}</code>
                      ))}
                    </span>
                  ) : null}
                </td>
                {showExample && <td>{p.example !== undefined ? <code>{p.example}</code> : <span className={styles.dash}>—</span>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
