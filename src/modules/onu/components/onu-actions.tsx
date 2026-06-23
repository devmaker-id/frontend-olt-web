import {
  Activity,
  Eye,
  RefreshCcw,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
interface Props {
  onView: () => void
  onRealtime: () => void
  onReplace: () => void
  onDelete: () => void
}

export function OnuActions({
  onView,
  onRealtime,
  onReplace,
  onDelete,
}: Props) {

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={onView}
        title="View ONU"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onRealtime}
        title="Realtime ONU"
      >
        <Activity className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onReplace}
        title="Replace ONU"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="destructive"
        onClick={onDelete}
        title="Delete ONU"
      >

        <Trash2
          className="
            h-4
            w-4
          "
        />

      </Button>

    </div>

  )

}