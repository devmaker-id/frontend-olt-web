export const ENDPOINT_TYPES = [
  'CUSTOMER',
  'RESELLER',
  'POP',
  'BACKHAUL',
] as const

export type EndpointType = typeof ENDPOINT_TYPES[number]

export interface Endpoint {
  id: string
  internetNo: string
  type: EndpointType
  name: string
  email: string
  telepon: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  description: string | null
  packageId: string | null
  createdAt: string
  updatedAt: string
  onus?: EndpointOnu[]
  package?: EndpointPackage | null
}

export interface EndpointPackage {
  id: string
  type: string
  name: string
  speed: string
  price: number
  normalDevice: string
  createdAt: string
  updatedAt: string
}

export interface EndpointOnu {
  id: string
}

export interface CreateEndpointRequest {
  internetNo: string
  type: EndpointType
  name: string
  email: string
  telepon?: string
  address?: string
  latitude?: number
  longitude?: number
  description?: string
}

export interface UpdateEndpointRequest {
  type: EndpointType
  name: string
  email: string
  telepon?: string
  address?: string
  latitude?: number
  longitude?: number
  description?: string
  packageId?: string
}

export interface UpdateEndpointMutationRequest {
  id: string
  data: UpdateEndpointRequest
}

export interface EndpointRealtimeOnu {
  id: string
  olt: {
    id: string
    name: string
  }
  port: string
  name: string
  status: string
  signalStatus: string
  model: string
  rxPower: string
  txPower: string
  temperature: string
  offlineCount: string
  firstUptime: string
  lastOfftime: string
}

export interface EndpointInternetDetail {
  internetNo: string
  name: string
  type: EndpointType
  address: string | null
  description: string | null
  package: EndpointPackage | null
  onuCount?: number
  onus: EndpointRealtimeOnu[]
}