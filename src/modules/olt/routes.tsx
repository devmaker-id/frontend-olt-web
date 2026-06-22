import { lazyPage, } from '@/shared/lib/lazy-page'

const OltListPage = lazyPage(
    () =>
      import(
        './pages/olt-list.page'
      ),
    'OltListPage',
  )

export const oltRoutes = [

  {
    path: 'olts',
    element: (
      <OltListPage />
    ),
  }

]