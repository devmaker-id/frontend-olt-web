import { Badge } from '@/components/ui/badge'

interface Props {
  type: string
}

export function SyslogEventTypeBadge({
  type,
}: Props) {

  switch (type) {

    case 'ONU_LINKUP':
    case 'ONU_ONLINE':
    case 'ONU_REGISTER':
      return <Badge>{type}</Badge>

    case 'ONU_LINKDOWN':
    case 'ONU_OFFLINE':
    case 'ONU_UNREGISTER':
    case 'ONU_LOS':
    case 'ONU_DYING_GASP':
      return (
        <Badge variant="destructive">
          {type}
        </Badge>
      )

    default:
      return (
        <Badge variant="secondary">
          {type}
        </Badge>
      )
  }
}