import {
  useState,
} from 'react'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  LoadingState,
} from '@/shared/components/loading-state'

import {
  EmptyState,
} from '@/shared/components/empty-state'

import {
  useDiscoverOnu,
} from '../hooks/use-discover-onu'

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

export function OltDiscoverOnuSheet({
  olt,
  open,
  onOpenChange,
}: Props) {

  const mutation = useDiscoverOnu()
  const [portId, setPortId] = useState('0/1')

  const ports = [
    '0/1',
    '0/2',
    '0/3',
    '0/4',
    '0/5',
    '0/6',
    '0/7',
    '0/8',
  ]

  async function handleDiscover() {
    if (!olt) {
      return
    }
    try {
      await mutation.mutateAsync({
        oltId: olt.id,
        portId,
      })
    }
    catch {
      //
    }
  }

  const result = mutation.data
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
          w-full
          sm:max-w-6xl
          overflow-y-auto
        "
      >
        <SheetHeader>
          <SheetTitle>
            Discover ONU
          </SheetTitle>
          <SheetDescription>
            {
              olt?.name
            }
          </SheetDescription>
        </SheetHeader>
        <div
          className="
            mt-6
            space-y-6
          "
        >
          <Card>
            <CardHeader>
              <CardTitle>
                Discovery Settings
              </CardTitle>
            </CardHeader>
            <CardContent
              className="
                space-y-4
              "
            >
              <div>
                <p
                  className="
                    mb-2
                    text-sm
                    text-muted-foreground
                  "
                >
                  EPON Port
                </p>
                <Select
                  value={portId}
                  onValueChange={
                    setPortId
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      ports.map(
                        port => (
                          <SelectItem
                            key={port}
                            value={port}
                          >
                            {port}
                          </SelectItem>
                        ),
                      )
                    }
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={
                  handleDiscover
                }
                disabled={
                  mutation.isPending
                }
              >
                {
                  mutation.isPending
                    ? 'Discovering...'
                    : 'Discover ONU'
                }
              </Button>
            </CardContent>
          </Card>
          {
            mutation.isPending && (
              <LoadingState />
            )
          }
          {
            mutation.isError && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Discovery Failed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="
                      text-sm
                      text-destructive
                    "
                  >
                    {
                      (mutation.error as any)?.response
                        ?.data
                        ?.message
                      ??
                      'Unknown Error'
                    }
                  </p>
                </CardContent>
              </Card>
            )
          }
          {
            result && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Discovery Summary
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className="
                    grid
                    gap-4
                    md:grid-cols-3
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Total ONU
                    </p>
                    <p
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {
                        result.summary.total
                      }
                    </p>
                  </div>
                  <div>
                    <p
                      className="
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Registered
                    </p>
                    <p
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {
                        result.summary.registered
                      }
                    </p>
                  </div>
                  <div>
                    <p
                      className="
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Unauthorized
                    </p>
                    <p
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {
                        result.summary
                          .unauthorized
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          }
          {
            result &&
            result.unauthorize
              .length === 0 && (
              <EmptyState
                title="
                  No Unauthorized ONU
                "
                description="
                  No ONU discovered on this port.
                "
              />
            )
          }
          {
            result &&
            result.unauthorize
              .length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Unauthorized ONU
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="
                      overflow-x-auto
                    "
                  >
                    <table
                      className="
                        w-full
                        text-sm
                      "
                    >
                      <thead>
                        <tr>
                          <th>
                            ONU ID
                          </th>
                          <th>
                            MAC Address
                          </th>
                          <th>
                            Status
                          </th>
                          <th>
                            Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          result.unauthorize.map(
                            onu => (
                              <tr
                                key={onu.id}
                              >
                                <td>
                                  {
                                    onu.onuId
                                  }
                                </td>
                                <td>
                                  {
                                    onu.macAddress
                                  }
                                </td>
                                <td>
                                  {
                                    onu.status
                                  }
                                </td>
                                <td>
                                  {
                                    onu.name
                                  }
                                </td>
                              </tr>
                            ),
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}