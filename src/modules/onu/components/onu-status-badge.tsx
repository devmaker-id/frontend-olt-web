import {
  Badge,
} from '@/components/ui/badge'

interface Props {
  status?: string | null
}

export function OnuStatusBadge({
  status,
}: Props) {

  const normalized =
    status?.toUpperCase()

  switch (normalized) {

    case 'ONLINE':

      return (
        <Badge>
          ONLINE
        </Badge>
      )

    case 'OFFLINE':

      return (
        <Badge
          variant="destructive"
        >
          OFFLINE
        </Badge>
      )

    case 'LOS':

      return (
        <Badge
          variant="secondary"
        >
          LOS
        </Badge>
      )

    default:

      return (
        <Badge
          variant="outline"
        >
          {
            status ||
            'UNKNOWN'
          }
        </Badge>
      )
  }
}