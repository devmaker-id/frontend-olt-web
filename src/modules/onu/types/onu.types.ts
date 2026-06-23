export interface AuthorizeOnuRequest {
  unauthorizeId: string
  endpointId: string
}

export interface UnauthorizedOnu {
  id: string
  oltId: string
  onuComtName: string
  onuName: string
  status: string
  serialNumber: string
  macAddress: string
  portId: string
  onuId: string
  discoveredAt: string
  createdAt: string
}

export interface Onu {
  id: string
  oltId: string
  endpointId: string
  onuId: string
  portId: string | null
  serialNumber: string | null
  onuMac: string
  onuName: string
  onuComtName: string
  onuType: string
  model: string
  firmware: string
  status: string
  connectionState: string
  temperature: string
  voltage: string
  txBias: string
  txPower: string
  rxPower: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface RealtimeOnu {
  onu: {
    onu_id: string
    onu_mac: string
    onu_name: string
    online_status: string
    activate_status: string
    firmware_version: string
    chip_id: string
    model_string: string
    onu_type: string
    ge_number: string
    fe_number: string
    pots_number: string
    wifi: string
    catv: string
    ctc_autoneg: string
    connectionState: string
    is_online: boolean
    first_uptime: string
    last_uptime: string
    last_offtime: string
    online_time: string
    offline_event_count: string
  }
  optical: {
    status: string
    temperature: string
    voltage: string
    txbias: string
    txpower: string
    rxpower: string
  }
}

export interface ReplaceOnuRequest {
  endpointId: string
  unauthorizedOnuId: string
  reason?: string
}