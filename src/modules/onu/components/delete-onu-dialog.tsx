import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteOnu } from '../hooks/use-delete-onu'
import type { Onu } from '../types/onu.types'

interface Props {
  onu: Onu | null
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function DeleteOnuDialog({
  onu,
  open,
  onOpenChange,
}: Props) {
  const deleteMutation =
    useDeleteOnu()
  const handleDelete =
    async () => {
      if (!onu) {
        return
      }
      await deleteMutation.mutateAsync(
        onu.id,
      )
      onOpenChange(
        false,
      )
    }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete ONU
          </DialogTitle>
          <DialogDescription>
            Kamu akan kehilangan data onu ini
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            Yakin! tetap di hapus?
          </p>
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            {onu?.onuName}
          </p>
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            {onu?.onuMac}
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(
                false,
              )
            }
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={
              handleDelete
            }
            disabled={
              deleteMutation.isPending
            }
          >
            {
              deleteMutation.isPending
                ? 'Deleting...'
                : 'Delete'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}