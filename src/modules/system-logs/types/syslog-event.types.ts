export type SyslogEventType =
  | 'ONU_LINKUP'
  | 'ONU_LINKDOWN'
  | 'ONU_ONLINE'
  | 'ONU_OFFLINE'
  | 'ONU_REGISTER'
  | 'ONU_UNREGISTER'
  | 'ONU_LOS'
  | 'ONU_DYING_GASP'
  | 'WEB_LOGIN'
  | 'WEB_LOGOUT'
  | 'SSH_LOGIN'
  | 'SSH_LOGOUT'
  | 'WEB_CONNECTION'
  | 'WEB_DISCONNECTION'
  | 'SYSTEM'
  | 'UNKNOWN'

export interface SyslogEvent {
  id: string

  oltId: string | null
  onuIdRef: string | null

  type: SyslogEventType

  sourceIp: string
  oltName: string

  portId: string | null
  onuId: string | null
  onuMac: string | null

  serialNumber: string | null
  onuName: string | null

  rawLog: string
  payload: string

  createdAt: string
}