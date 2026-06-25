import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import type { SyslogEvent } from '../types/syslog-event.types'

interface Props {
  event: SyslogEvent | null
  open: boolean
  onOpenChange: (
    open: boolean
  ) => void
}

export function SyslogEventDetailSheet({
  event,
  open,
  onOpenChange,
}: Props) {
  if (!event) {
    return null
  }

  return (
    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <SheetContent className="
          p-2
          sm:max-w-xl
          overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>
            Syslog Event Detail
          </SheetTitle>

          <SheetDescription>
            Complete syslog information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">
              Event Information
            </h3>

            <div className="space-y-2 text-sm">
              <div>
                <b>Type:</b>{' '}
                {event.type}
              </div>

              <div>
                <b>OLT:</b>{' '}
                {event.oltName}
              </div>

              <div>
                <b>Source IP:</b>{' '}
                {event.sourceIp}
              </div>

              <div>
                <b>Created:</b>{' '}
                {new Date(
                  event.createdAt
                ).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">
              ONU Information
            </h3>

            <div className="space-y-2 text-sm">
              <div>
                <b>Port:</b>{' '}
                {event.portId ?? '-'}
              </div>

              <div>
                <b>ONU ID:</b>{' '}
                {event.onuId ?? '-'}
              </div>

              <div>
                <b>ONU Name:</b>{' '}
                {event.onuName ?? '-'}
              </div>

              <div>
                <b>ONU MAC:</b>{' '}
                {event.onuMac ?? '-'}
              </div>

              <div>
                <b>Serial Number:</b>{' '}
                {event.serialNumber ?? '-'}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">
              Payload
            </h3>

            <Textarea
              readOnly
              value={event.payload}
              className="min-h-32"
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">
              Raw Log
            </h3>

            <Textarea
              readOnly
              value={event.rawLog}
              className="min-h-40"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}