import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

/**
 * Where the published site lives. Override at build time so the same config
 * serves local previews, a staging bucket and production without edits:
 *
 *   SITE_URL=https://developers.allowmena.com npm run build
 */
const siteUrl = process.env.SITE_URL ?? 'https://developers.allowmena.com';
const baseUrl = process.env.BASE_URL ?? '/';

const config: Config = {
  title: 'Allow MENA Delivery API',
  tagline: 'Integrate ordering, tracking and delivery operations with the Allow MENA platform.',
  favicon: 'img/favicon.ico',



  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
      siteStorageNamespacing: true,
      fasterByDefault: true,
      // Left OFF deliberately. Turning it on disables the MDX-v1 compat layer,
      // and with it the `:::note` / `:::caution` admonition syntax used
      // throughout these docs — the blocks then render as literal ":::" text
      // with no build error to warn you. Re-enable only after converting every
      // admonition to the directive syntax v4 expects.
      mdx1CompatDisabledByDefault: false,
    },
  },

  url: siteUrl,
  baseUrl,
  trailingSlash: false,

  organizationName: 'allowmena',
  projectName: 'allow-api-docs',

  // Broken links are a documentation bug, not a warning: fail the build.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      // Offline/local search index — no Algolia account, no crawler to operate.
      // Indexes headings and body so endpoint paths, parameters, error codes
      // and permission slugs are all reachable from the search box.
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcutHint: false,
        searchResultLimits: 12,
        searchResultContextMaxLength: 80,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/delivery-express/allow-api-docs/tree/main/',
          // "Last updated" is read from git history, so it needs this project to
          // be inside a git worktree with at least one commit. Once the docs are
          // committed, set SHOW_LAST_UPDATE=true (or hard-code `true` here) to
          // show a last-updated stamp on every page.
          showLastUpdateTime: process.env.SHOW_LAST_UPDATE === 'true',
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          // lastmod is read from git history too — same condition as above.
          lastmod: process.env.SHOW_LAST_UPDATE === 'true' ? 'date' : null,
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#6D28D9' },
    },
  ],

  themeConfig: {
    image: 'img/og-card.png',
    metadata: [
      {
        name: 'description',
        content:
          'REST API reference for the Allow MENA Delivery platform: partner order integration, ' +
          'order tracking, webhooks, operations endpoints and driver authentication.',
      },
      { name: 'keywords', content: 'Allow MENA, delivery API, order integration, logistics API, webhooks' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],

    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },

    docs: {
      sidebar: { hideable: true, autoCollapseCategories: false },
    },

    navbar: {
      title: 'Allow MENA',
      logo: { alt: 'Allow MENA Delivery', src: 'img/logo.png' },
      hideOnScroll: false,
      items: [
        { to: '/getting-started/quickstart', label: 'Getting Started', position: 'left' },
        { to: '/api/partner/create-order-v3', label: 'API Reference', position: 'left' },
        { to: '/getting-started/authentication', label: 'Authentication', position: 'left' },
        { to: '/concepts/pagination', label: 'Concepts', position: 'left' },
      ],
    },

    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/' },
            { label: 'Quick Start', to: '/getting-started/quickstart' },
            { label: 'Authentication', to: '/getting-started/authentication' },
            { label: 'Errors', to: '/getting-started/errors' },
          ],
        },
        {
          title: 'API Reference',
          items: [
            { label: 'Partner Orders', to: '/api/partner/create-order-v3' },
            { label: 'Webhooks', to: '/api/webhooks/order-status' },
            { label: 'Operations', to: '/api/operations/suppliers/list-suppliers' },
            { label: 'Driver Auth', to: '/api/driver/login' },
          ],
        },
        {
          title: 'Reference',
          items: [
            { label: 'Enumerations', to: '/concepts/enumerations' },
            { label: 'Pagination', to: '/concepts/pagination' },
            { label: 'Permissions', to: '/concepts/permissions' },
            { label: 'Coverage Audit', to: '/coverage' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Allow MENA Delivery. API documentation.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'sql'],
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
