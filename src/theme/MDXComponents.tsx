import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
// Import the original mapper so every built-in MDX component keeps working.
import MDXComponents from '@theme-original/MDXComponents';

import Endpoint, { Method } from '@site/src/components/Endpoint';
import ErrorTable from '@site/src/components/ErrorTable';
import ParamTable from '@site/src/components/ParamTable';

/**
 * Components available in every `.mdx` page without an import statement.
 *
 * This is the maintainability contract for this site: someone documenting a
 * new endpoint writes `<Endpoint …/>`, `<ParamTable …/>`, `<ErrorTable …/>`,
 * `<Tabs>` and nothing else. Adding an import line to fifty pages to change
 * one component is exactly the cost this avoids.
 */
export default {
  ...MDXComponents,
  Endpoint,
  Method,
  ParamTable,
  ErrorTable,
  Tabs,
  TabItem,
};
