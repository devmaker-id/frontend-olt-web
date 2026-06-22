import {
  Eye,
  Pen,
  Trash2,
  Router
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  onView: () => void
  onOnu: () => void
  onEdit: () => void
  onDelete: () => void
}

export function EndpointActions({
  onView,
  onOnu,
  onEdit,
  onDelete
}: Props) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <Button
        size="icon"
        variant="outline"
        onClick={onView}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onOnu}
      >
        <Router className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onEdit}
      >
        <Pen className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="destructive"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

    </div>
  )
}