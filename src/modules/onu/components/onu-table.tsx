import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OnuActions } from './onu-actions'
import type { Onu } from '../types/onu.types'
import { OnuStatusBadge } from './onu-status-badge'

interface Props {
  data: Onu[]
  onView?: (onu: Onu) => void
  onRealtime?: (onu: Onu) => void
  onReplace?: (onu: Onu) => void
  onDelete?: (onu: Onu) => void
}

export function OnuTable({
  data,
  onView,
  onRealtime,
  onReplace,
  onDelete,
}: Props) {

  return (

    <div
      className="
        rounded-md
        border
      "
    >

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              ONU ID
            </TableHead>

            <TableHead>
              Name
            </TableHead>

            <TableHead>
              MAC Address
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Connection
            </TableHead>

            <TableHead>
              RX Power
            </TableHead>

            <TableHead>
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {
            data.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={7}
                  className="
                    text-center
                  "
                >

                  No ONU found

                </TableCell>

              </TableRow>

            )
          }

          {
            data.map(
              onu => (

                <TableRow
                  key={onu.id}
                >

                  <TableCell>

                    {
                      onu.onuId
                    }

                  </TableCell>

                  <TableCell>

                    {
                      onu.onuName
                    }

                  </TableCell>

                  <TableCell>

                    {
                      onu.onuMac
                    }

                  </TableCell>

                  <TableCell>

                    {
                      onu.status
                    }

                  </TableCell>

                  <TableCell>

                    <OnuStatusBadge
                      status={
                        onu.connectionState
                      }
                    />

                  </TableCell>

                  <TableCell>

                    {
                      onu.rxPower
                    }

                  </TableCell>

                  <TableCell>

                    <OnuActions
                      onView={() => onView?.(onu) }
                      onRealtime={() => onRealtime?.(onu) }
                      onReplace={() => onReplace?.(onu) }
                      onDelete={() => onDelete?.(onu) }
                    />

                  </TableCell>

                </TableRow>

              ),
            )
          }

        </TableBody>

      </Table>

    </div>

  )

}