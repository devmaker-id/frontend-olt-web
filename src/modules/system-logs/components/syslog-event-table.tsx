import {
  Eye,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type {
  SyslogEvent,
} from '../types/syslog-event.types'

import {
  SyslogEventTypeBadge,
} from './syslog-event-type-badge'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  events: SyslogEvent[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onDetail: (event: SyslogEvent) => void
  onDelete: (event: SyslogEvent) => void
}

export function SyslogEventTable({
  events,
  selectedIds,
  onSelectionChange,
  onDetail,
  onDelete,
}: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
                checked={
                    events.length > 0 && events.every(
                        event => selectedIds.includes(event.id)
                    )
                }
                onCheckedChange={(checked) => {
                    if(checked) {
                        onSelectionChange(
                            events.map(
                                event => event.id
                            )
                        )
                    } else {
                        onSelectionChange([])
                    }
                }}
            />
          </TableHead>
          <TableHead>
            Time
          </TableHead>
          <TableHead>
            Type
          </TableHead>
          <TableHead>
            OLT
          </TableHead>
          <TableHead>
            ONU
          </TableHead>
          <TableHead>
            Source IP
          </TableHead>
          <TableHead>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>

        {events.map(
          event => (

            <TableRow
              key={event.id}
            >
              <TableCell>

            <Checkbox
                checked={selectedIds.includes(
                event.id,
                )}
                onCheckedChange={(
                checked,
                ) => {

                if (checked) {

                    onSelectionChange([
                    ...selectedIds,
                    event.id,
                    ])

                } else {

                    onSelectionChange(
                    selectedIds.filter(
                        id =>
                        id !==
                        event.id,
                    ),
                    )

                }

                }}
            />

            </TableCell>

              <TableCell>
                {
                  new Date(
                    event.createdAt,
                  ).toLocaleString()
                }
              </TableCell>

              <TableCell>
                <SyslogEventTypeBadge
                  type={event.type}
                />
              </TableCell>

              <TableCell>
                {event.oltName}
              </TableCell>

              <TableCell>
                {
                  event.onuName ??
                  event.onuId ??
                  '-'
                }
              </TableCell>

              <TableCell>
                {event.sourceIp}
              </TableCell>

              <TableCell>

                <div className="flex gap-2">

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onDetail(
                        event,
                      )
                    }
                  >
                    <Eye />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      onDelete(
                        event,
                      )
                    }
                  >
                    <Trash2 />
                  </Button>

                </div>

              </TableCell>

            </TableRow>

          ),
        )}

      </TableBody>

    </Table>

  )

}