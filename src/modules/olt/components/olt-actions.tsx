import {
  Eye,
  Pencil,
  Trash2,
  Plug,
  Activity,
  Radar,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  onConnect: () => void
  onOptical: () => void
  onDiscover: () => void
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function OltActions({
  onConnect,
  onOptical,
  onDiscover,
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
          title='Connect OLT'
        >
          <Plug />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={onOptical}
          title='Sfp Pon Olt'
        >
          <Activity />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={
            onDiscover
          }
          title="Discover ONU"
        >

          <Radar className=" h-4 w-4 " />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          onClick={onView}
          title='Detail Olt'
        >
          <Eye />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={onEdit}
          title='Edit Olt'
        >
          <Pencil />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={onDelete}
          title='Delete Olt'
        >
          <Trash2 />
        </Button>
      </div>
    </>
  )
}