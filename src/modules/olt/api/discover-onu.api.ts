import { api } from '@/shared/api/api'
import type { ApiResponse } from '@/shared/api/types'

import type {
    DiscoverOnuRequest,
    DiscoverOnuResult
} from '../types/discover-onu.types'

export async function discoverOnu(
    payload: DiscoverOnuRequest
) {
    const response = await api.post<ApiResponse<DiscoverOnuResult>>(
        'olt/sync',
        payload
    )
    return response.data.data
}