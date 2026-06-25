import {
  useEffect,
  useState
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuthorizeOnu } from '../hooks/use-authorize-onu'
import type { UnauthorizedOnu } from '../types/onu.types'
import { useEndpoints } from '@/modules/endpoint/hooks/use-endpoints'
import { SearchableSelect } from '@/shared/components/searchable-select'

interface AuthorizeOnuDialogProps {
  onu: UnauthorizedOnu | null
  open: boolean
  onOpenChange: (
    open: boolean
  ) => void
}

export function AuthorizeOnuDialog({
  onu,
  open,
  onOpenChange,
}: AuthorizeOnuDialogProps) {

  const authorizeMutation = useAuthorizeOnu()
  const [endpointId, setEndpointId] = useState('')
  const { data: endpoints = [] } = useEndpoints()

  useEffect(() => { setEndpointId('') }, [onu])

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault()
    if (!onu) {
      return
    }
    await authorizeMutation.mutateAsync({
      unauthorizeId: onu.id,
      endpointId,
    })
    onOpenChange(false)
  }
  if (!onu) {
    return null
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Authorize ONU
          </DialogTitle>
          <DialogDescription>
            Authorize discovered ONU
            and assign it to an endpoint.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 rounded-lg border p-4 text-sm md:grid-cols-2">
          <div>
            <span className="font-medium">
              ONU ID:
            </span>
            {' '}
            {onu.onuId}
          </div>
          <div>
            <span className="font-medium">
              PORT:
            </span>
            {' '}
            {onu.portId ?? '-'}
          </div>
          <div>
            <span className="font-medium">
              ONU Name:
            </span>
            {' '}
            {onu.onuName || '-'}
          </div>
          <div>
            <span className="font-medium">
              MAC Address:
            </span>
            {' '}
            {onu.macAddress}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>
              Endpoint
            </Label>
            <SearchableSelect
              value={endpointId}
              onValueChange={setEndpointId}
              placeholder="Select Endpoint"
              searchPlaceholder="Search Endpoint..."
              options={
                endpoints.map(
                  endpoint => ({
                    value: endpoint.id,
                    label: endpoint.name,
                    description: endpoint.id,
                  }),
                )
              }
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={authorizeMutation.isPending || !endpointId}
            >
              {authorizeMutation.isPending ? 'Authorizing...' : 'Authorize ONU'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}