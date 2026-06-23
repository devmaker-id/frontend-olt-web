import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type {
  Onu,
} from '../types/onu.types'

interface Props {

  onu: Onu | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function OnuDetailSheet({

  onu,

  open,

  onOpenChange,

}: Props) {

  if (!onu) {
    return null
  }

  return (

    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <SheetContent
        className="
          p-2
          sm:max-w-2xl
          overflow-y-auto
        "
      >

        <SheetHeader>

          <SheetTitle>

            ONU Detail

          </SheetTitle>
          <SheetDescription>
            Detail ONU {onu.onuName}
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-6
            space-y-6
          "
        >

          {/* ONU */}
          <Card>
            <CardHeader>
              <CardTitle>
                ONU Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Info
                label="ONU ID"
                value={onu.onuId}
              />

              <Info
                label="ONU Name"
                value={onu.onuName}
              />

              <Info
                label="ONU MAC"
                value={onu.onuMac}
              />

              <Info
                label="ONU Type"
                value={onu.onuType}
              />

              <Info
                label="Model"
                value={onu.model}
              />

              <Info
                label="Firmware"
                value={onu.firmware}
              />
            </CardContent>
          </Card>

          {/* CONNECTION */}

          <Card>
            <CardHeader>
              <CardTitle>
                Connection Information
              </CardTitle>
            </CardHeader>
            <CardContent className=" grid gap-4 md:grid-cols-2">
              <Info
                label="Status"
                value={onu.status}
              />

              <Info
                label="Connection"
                value={
                  onu.connectionState
                }
              />

              <Info
                label="RX Power"
                value={onu.rxPower}
              />

              <Info
                label="TX Power"
                value={onu.txPower}
              />

              <Info
                label="Temperature"
                value={
                  onu.temperature
                }
              />

              <Info
                label="Voltage"
                value={
                  onu.voltage
                }
              />
            </CardContent>
          </Card>

          {/* RELATION */}

          <Card>
            <CardHeader>
              <CardTitle>
                Created Info
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Info
                label="Created"
                value={
                  onu.createdAt
                }
              />
              <Info
                label="Updated"
                value={
                  onu.updatedAt
                }
              />
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
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