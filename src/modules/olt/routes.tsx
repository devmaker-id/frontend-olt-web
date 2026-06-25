import { OwnerRoute } from '@/shared/routes/owner-route'
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
      <OwnerRoute>
        <OltListPage />
      </OwnerRoute>
    ),
  }

]