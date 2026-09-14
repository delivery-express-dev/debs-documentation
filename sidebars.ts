import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * One hand-written sidebar.
 *
 * Endpoints are grouped by the audience that calls them, then by domain module,
 * so a reader lands in the right section from the surface they are integrating
 * with rather than scanning one flat list of fifty paths. Groups are `collapsed`
 * except the partner API, which is what most readers came for.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'introduction',

    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quickstart',
        'getting-started/base-url',
        'getting-started/authentication',
        'getting-started/request-headers',
        'getting-started/response-format',
        'getting-started/errors',
      ],
    },

    {
      type: 'category',
      label: 'Partner Orders',
      collapsed: false,
      link: { type: 'doc', id: 'api/partner/overview' },
      items: [
        'api/partner/create-order-v3',
        'api/partner/create-order-v2',
        'api/partner/create-order-v1',
        'api/partner/cancel-orders',
        'api/partner/track-order',
        'api/partner/order-status',
        'api/partner/delivery-price',
      ],
    },

    {
      type: 'category',
      label: 'Webhooks',
      collapsed: false,
      link: { type: 'doc', id: 'api/webhooks/overview' },
      items: ['api/webhooks/order-status', 'api/webhooks/driver-assigned'],
    },

    {
      type: 'category',
      label: 'Service API',
      collapsed: true,
      link: { type: 'doc', id: 'api/service/overview' },
      items: [
        'api/service/create-order',
        'api/service/get-order',
        'api/service/cancel-order',
      ],
    },

    {
      type: 'category',
      label: 'Operations API',
      collapsed: true,
      link: { type: 'doc', id: 'api/operations/overview' },
      items: [
        {
          type: 'category',
          label: 'Suppliers',
          collapsed: true,
          items: [
            'api/operations/suppliers/list-suppliers',
            'api/operations/suppliers/get-supplier',
            'api/operations/suppliers/create-supplier',
            'api/operations/suppliers/update-supplier',
            'api/operations/suppliers/delete-supplier',
          ],
        },
        {
          type: 'category',
          label: 'Issued Items',
          collapsed: true,
          items: [
            'api/operations/issued-items/list-issued-items',
            'api/operations/issued-items/get-issued-item',
            'api/operations/issued-items/create-issued-item',
            'api/operations/issued-items/update-issued-item',
          ],
        },
        {
          type: 'category',
          label: 'Driver Issued Items',
          collapsed: true,
          items: [
            'api/operations/driver-issued-items/list-driver-issued-items',
            'api/operations/driver-issued-items/create-driver-issued-item',
            'api/operations/driver-issued-items/restore-driver-issued-item',
          ],
        },
        {
          type: 'category',
          label: 'Orders & Cash',
          collapsed: true,
          items: [
            'api/operations/orders/collect-cash',
            'api/operations/orders/deposit-eligible',
            'api/operations/orders/deposit',
            'api/operations/orders/cancel-after-delivery',
            'api/operations/orders/restore-to-delivered',
          ],
        },
        {
          type: 'category',
          label: 'Reports',
          collapsed: true,
          items: [
            'api/operations/reports/driver-performance',
            'api/operations/reports/driver-performance-drivers',
            'api/operations/reports/driver-attendance',
            'api/operations/reports/supplier-branch-financials',
          ],
        },
        'api/operations/resolve-location',
        'api/operations/reference-data',
        'api/operations/health',
      ],
    },

    {
      type: 'category',
      label: 'Driver App',
      collapsed: true,
      link: { type: 'doc', id: 'api/driver/overview' },
      items: [
        'api/driver/login',
        'api/driver/confirm-login',
        'api/driver/refresh-token',
        'api/driver/logout',
      ],
    },

    {
      type: 'category',
      label: 'API Concepts',
      collapsed: true,
      items: [
        'concepts/pagination',
        'concepts/filtering-sorting',
        'concepts/date-time',
        'concepts/permissions',
        'concepts/enumerations',
      ],
    },

    'coverage',
    'changelog',
  ],
};

export default sidebars;
