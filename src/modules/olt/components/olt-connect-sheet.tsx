import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Button,
} from '@/components/ui/button'

import {
  Loader2,
} from 'lucide-react'

import {
  useConnectOlt,
} from '../hooks/use-connect-olt'

import type {
  Olt,
} from '../types/olt.types'

interface Props {

  olt: Olt | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function OltConnectSheet({
  olt,
  open,
  onOpenChange,
}: Props) {

  const connectMutation = useConnectOlt()

  async function handleConnect() {
    if (!olt) {
      return
    }
    try {
        await connectMutation.mutateAsync(olt.id)
    } catch (error) {
        console.error("error!!!", error)
    }
  }

  const info = connectMutation.data

  return (

    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <SheetContent
        className="
          sm:max-w-3xl
          h-full
          overflow-y-auto
        "
      >

        <SheetHeader>

          <SheetTitle>
            OLT Connection
          </SheetTitle>

          <SheetDescription>
            Connect and retrieve realtime OLT information.
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            p-2
            mt-6
            space-y-4
          "
        >

          <Button
            onClick={
              handleConnect
            }
            disabled={
              connectMutation.isPending
            }
          >

            {
              connectMutation.isPending
                ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                )
                : 'Connect OLT'
            }

          </Button>

            {
            connectMutation.isError
            ?
            connectMutation.error && (
                 <Card>
                    <CardContent className="py-8 text-center">
                    {
                    (connectMutation.error as any)?.response?.data?.message
                    }
                    </CardContent>
                </Card>
            )
            :
            info && (

              <Card>

                <CardHeader>

                  <CardTitle>
                    Device Information
                  </CardTitle>

                </CardHeader>

                <CardContent
                  className="
                    grid
                    gap-4
                    md:grid-cols-2
                  "
                >

                  <InfoRow
                    label="Name"
                    value={info.name}
                  />

                  <InfoRow
                    label="Model"
                    value={info.model}
                  />

                  <InfoRow
                    label="Hardware"
                    value={info.hardware}
                  />

                  <InfoRow
                    label="Software"
                    value={info.software}
                  />

                  <InfoRow
                    label="Serial Number"
                    value={info.sn}
                  />

                  <InfoRow
                    label="MAC Address"
                    value={info.mac}
                  />

                  <InfoRow
                    label="Location"
                    value={info.location}
                  />

                  <InfoRow
                    label="Description"
                    value={info.description}
                  />

                  <InfoRow
                    label="Revision Date"
                    value={info.revisiondate}
                  />

                  <InfoRow
                    label="Uptime"
                    value={info.uptime}
                  />

                </CardContent>

              </Card>

            )
          }

        </div>

      </SheetContent>

    </Sheet>

  )

}

function InfoRow({
  label,
  value,
}: {
  label: string
  value?: string | null
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
      <p>
        {value || '-'}
      </p>
    </div>
  )
}