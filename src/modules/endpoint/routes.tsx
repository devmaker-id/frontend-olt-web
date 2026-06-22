import type { AppRoute } from '@/shared/types/app-route.types'
import {
  EndpointListPage
} from './pages/endpoint-list.page'

export const endpointRoutes: AppRoute[] = [

  {
    path: 'endpoints',
    element: <EndpointListPage />
  }
]