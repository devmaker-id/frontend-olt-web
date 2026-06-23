export interface DiscoverOnuRequest {
  oltId: string
  portId: string
}

export interface DiscoverOnuSummary {
  total: number
  registered: number
  unauthorized: number
}

export interface DiscoveredOnu {
  id: string
  port: string
  onuId: string
  macAddress: string
  status: string
  ctcStatus: string
  onuComtName: string
  name: string
}

export interface DiscoverOnuResult {
  summary: DiscoverOnuSummary
  registered: DiscoveredOnu[]
  unauthorize: DiscoveredOnu[]
}