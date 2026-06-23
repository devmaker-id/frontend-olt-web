export type OltPlatform =
  | 'HIOSO'
  | 'VSOL'
export type OltConnectionType =
  | 'TELNET'
  | 'SSH'
  | 'API'
  | 'SNMP'

export interface Olt {
  id: string
  name: string
  syslogName: string
  ipAddress: string
  managementPort: number
  username: string
  password: string
  vendor: string
  platform: OltPlatform
  connectionType: OltConnectionType
  location: string
  createdAt: string
  updatedAt: string
}

export interface CreateOltRequest {
  name: string
  syslogName: string
  ipAddress: string
  managementPort: number
  username: string
  password: string
  vendor: string
  platform: OltPlatform
  connectionType: OltConnectionType
  location: string
}

export interface UpdateOltRequest {
  name: string
  syslogName: string
  managementPort: number
  username: string
  password: string
  vendor: string
  platform: OltPlatform
  connectionType: OltConnectionType
  location: string
}

export interface UpdateOltMutationDto {
  id: string
  data: UpdateOltRequest
}

export interface OltOpticalInfo {
  port: string
  status: string
  temperature: string
  voltage: string
  txBias: string
  txPower: string
}

export interface OltConnectionInfo {
  mac: string
  name: string
  description: string
  location: string
  model: string
  software: string
  revisiondate: string
  hardware: string
  sn: string
  uptime: string
}