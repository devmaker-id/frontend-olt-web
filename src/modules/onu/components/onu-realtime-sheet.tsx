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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoadingState } from '@/shared/components/loading-state'
import { useRealtimeOnu } from '../hooks/use-realtime-onu'
import type { Onu } from '../types/onu.types'

interface Props {
  onu: Onu | null
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function OnuRealtimeSheet({
  onu,
  open,
  onOpenChange,
}: Props) {
  const {
    data,
    isLoading,
  } = useRealtimeOnu(
    onu?.oltId,
    onu?.portId ?? '',
    onu?.onuId,
  )

  return (
    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <SheetContent className="
          p-2
          sm:max-w-3xl
          overflow-y-auto
        "
      >
        <SheetHeader>
          <SheetTitle>
            ONU Realtime
          </SheetTitle>
          <SheetDescription>
            realtime information
          </SheetDescription>
        </SheetHeader>
        {isLoading && (
          <LoadingState />
        )}
        {!isLoading && data && (
          <div
            className="
              mt-6
              space-y-6
            "
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  ONU Information
                </CardTitle>
                <CardDescription>
                    Onu realtime info
                </CardDescription>
              </CardHeader>
              <CardContent
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >
                <Info
                  label="ONU ID"
                  value={
                    data.onu.onu_id
                  }
                />
                <Info
                  label="ONU Name"
                  value={
                    data.onu.onu_name
                  }
                />
                <Info
                  label="MAC Address"
                  value={
                    data.onu.onu_mac
                  }
                />
                <Info
                  label="Model"
                  value={
                    data.onu.model_string
                  }
                />
                <Info
                  label="Firmware"
                  value={
                    data.onu.firmware_version
                  }
                />
                <Info
                  label="ONU Type"
                  value={
                    data.onu.onu_type
                  }
                />
                <Info
                  label="Connection"
                  value={
                    data.onu.connectionState
                  }
                />
                <Info
                  label="Online Time"
                  value={
                    data.onu.online_time
                  }
                />
                <Info
                  label="First Uptime"
                  value={
                    data.onu.first_uptime
                  }
                />
                <Info
                  label="Last Uptime"
                  value={
                    data.onu.last_uptime
                  }
                />
                <Info
                  label="Last Offline"
                  value={
                    data.onu.last_offtime
                  }
                />
                <Info
                  label="Offline Count"
                  value={
                    data.onu.offline_event_count
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Optical Information
                </CardTitle>
                <CardDescription>
                    optic realtime info
                </CardDescription>
              </CardHeader>
              <CardContent
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >
                <Info
                  label="Status"
                  value={
                    data.optical.status
                  }
                />
                <Info
                  label="Temperature"
                  value={
                    data.optical.temperature
                  }
                />
                <Info
                  label="Voltage"
                  value={
                    data.optical.voltage
                  }
                />
                <Info
                  label="TX Bias"
                  value={
                    data.optical.txbias
                  }
                />
                <Info
                  label="TX Power"
                  value={
                    data.optical.txpower
                  }
                />
                <Info
                  label="RX Power"
                  value={
                    data.optical.rxpower
                  }
                />
              </CardContent>
            </Card>
          </div>
        )}
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