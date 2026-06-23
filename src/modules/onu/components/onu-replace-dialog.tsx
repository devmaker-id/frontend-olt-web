import {
  useEffect,
  useState,
} from 'react'
import { useReplaceOnu } from '../hooks/use-replace-onu'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useUnauthorizedOnus } from '../hooks/use-unauthorized-onus'
import type { Onu } from '../types/onu.types'

interface Props {
  onu: Onu | null
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function OnuReplaceDialog({
  onu,
  open,
  onOpenChange,
}: Props) {
  const { data: unauthorizedOnus = [] } = useUnauthorizedOnus()
  const [unauthorizedOnuId, setUnauthorizedOnuId] = useState('')
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!open) {
      setUnauthorizedOnuId('')
      setReason('')
    }

  }, [open])

  const replaceMutation = useReplaceOnu()
  const handleSubmit = async () => {
    if(!onu) {
        return
    }
    await replaceMutation.mutateAsync({
        endpointId: onu.endpointId,
        unauthorizedOnuId,
        reason
    })
    onOpenChange(false)
  }

  return (

    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent
        className="
          sm:max-w-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >

        <DialogHeader>

          <DialogTitle>
            Replace ONU
          </DialogTitle>

        </DialogHeader>

        {onu && (

          <div
            className="
              space-y-6
            "
          >

            <Card>

              <CardHeader>

                <CardTitle>
                  Current ONU
                </CardTitle>

              </CardHeader>

              <CardContent
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                <Info
                  label="ONU Name"
                  value={
                    onu.onuName
                  }
                />

                <Info
                  label="ONU ID"
                  value={
                    onu.onuId
                  }
                />

                <Info
                  label="ONU MAC"
                  value={
                    onu.onuMac
                  }
                />

                <Info
                  label="Endpoint ID"
                  value={
                    onu.endpointId
                  }
                />

              </CardContent>

            </Card>

            <div
              className="
                space-y-2
              "
            >

              <Label>
                Unauthorized ONU
              </Label>

              <Select
                value={
                  unauthorizedOnuId
                }
                onValueChange={
                  setUnauthorizedOnuId
                }
              >

                <SelectTrigger
                  className="
                    w-full
                  "
                >

                  <SelectValue
                    placeholder="
                      Select Unauthorized ONU
                    "
                  />

                </SelectTrigger>

                <SelectContent>

                  {
                    unauthorizedOnus.map(
                      onu => (

                        <SelectItem
                          key={onu.id}
                          value={onu.id}
                        >

                          {
                            onu.onuName
                          }

                          {' - '}

                          {
                            onu.macAddress
                          }

                        </SelectItem>

                      ),
                    )
                  }

                </SelectContent>

              </Select>

            </div>

            <div
              className="
                space-y-2
              "
            >

              <Label>
                Reason
              </Label>

              <Textarea
                value={reason}
                onChange={event =>
                  setReason(
                    event.target.value,
                  )
                }
                placeholder="
                  ONU damaged, customer replacement, etc...
                "
              />

            </div>

            <div
              className="
                flex
                justify-end
                gap-2
              "
            >

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
                onClick={
                  handleSubmit
                }
                disabled={
                  !unauthorizedOnuId || replaceMutation.isPending
                }
              >
                {
                    replaceMutation.isPending ? 'Replacing...' : 'Replace ONU'
                }
              </Button>

            </div>

          </div>

        )}

      </DialogContent>

    </Dialog>

  )

}

interface InfoProps {

  label: string

  value?: string | null

}

function Info({

  label,

  value,

}: InfoProps) {

  return (

    <div>

      <p
        className="
          text-sm
          text-muted-foreground
        "
      >

        {label}

      </p>

      <p>

        {value || '-'}

      </p>

    </div>

  )

}