import {
  Eye,
  Pencil,
  Trash2,
  Plug,
  Activity
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  onConnect: () => void
  onOptical: () => void
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function OltActions({
  onConnect,
  onOptical,
  onView,
  onEdit,
  onDelete,
}: Props) {

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={onConnect}
        >
          <Plug />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={onOptical}
        >
          <Activity />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          onClick={onView}
        >
          <Eye />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={onEdit}
        >
          <Pencil />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 />
        </Button>
      </div>
    </>
  )
}