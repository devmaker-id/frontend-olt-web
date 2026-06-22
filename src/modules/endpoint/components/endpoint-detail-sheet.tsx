import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import {
  Button,
} from '@/components/ui/button'

import type {
  Endpoint,
} from '../types/endpoint.types'

interface Props {

  endpoint: Endpoint | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

  onEdit: () => void

}

export function EndpointDetailSheet({

  endpoint,

  open,

  onOpenChange,

  onEdit,

}: Props) {

  if (!endpoint) {
    return null
  }

  return (

    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        className="
          p-3
          sm:max-w-lg
          overflow-y-auto
        "
      >

        <SheetHeader>

          <SheetTitle>
            Endpoint Detail
          </SheetTitle>

          <SheetDescription>
            Endpoint information.
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-6
            space-y-4
          "
        >

          <DetailRow
            label="Internet No"
            value={endpoint.internetNo}
          />

          <DetailRow
            label="Name"
            value={endpoint.name}
          />

          <DetailRow
            label="Type"
            value={endpoint.type}
          />

          <DetailRow
            label="Email"
            value={endpoint.email}
          />

          <DetailRow
            label="Telepon"
            value={endpoint.telepon}
          />

          <DetailRow
            label="Address"
            value={endpoint.address}
          />

          <DetailRow
            label="Latitude"
            value={
              endpoint.latitude?.toString()
            }
          />

          <DetailRow
            label="Longitude"
            value={
              endpoint.longitude?.toString()
            }
          />

          <DetailRow
            label="Description"
            value={
              endpoint.description
            }
          />

        </div>

        <div
          className="
            mt-6
            flex
            justify-end
          "
        >

          <Button
            onClick={onEdit}
          >
            Edit Endpoint
          </Button>

        </div>

      </SheetContent>

    </Sheet>

  )

}

function DetailRow({

  label,

  value,

}: {

  label: string

  value?: string | null

}) {

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

      <p
        className="
          font-medium
          break-words
        "
      >
        {value || '-'}
      </p>

    </div>

  )

}