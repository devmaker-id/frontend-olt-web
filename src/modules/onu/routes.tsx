import { lazyPage } from '@/shared/lib/lazy-page'
const OnuListPage = lazyPage(() => import('./pages/onu-list.page'),
    'OnuListPage'
)
const UnregisteredOnuPage = lazyPage(() => import('./pages/unregistered-onu.page'),
    'UnregisteredOnuPage',
)

export const onuRoutes = [
  {
    path: 'onu',
    element: (
      <OnuListPage />
    )
  },
  {
    path: 'onu/unregistered',
    element: (
      <UnregisteredOnuPage />
    ),
  },
]