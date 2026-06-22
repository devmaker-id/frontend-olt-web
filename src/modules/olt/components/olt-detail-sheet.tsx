import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

import {
  OltInfoCard,
} from './olt-info-card'

import type {
  Olt,
} from '../types/olt.types'

interface Props {

  olt: Olt | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

  onEdit: () => void

}

export function OltDetailSheet({

  olt,

  open,

  onOpenChange,

  onEdit,

}: Props) {

  if (!olt) {
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
          sm:max-w-3xl
          h-full
          overflow-y-auto
        "
      >

        <SheetHeader>

          <SheetTitle>
            OLT Detail
          </SheetTitle>

          <SheetDescription>
            OLT information and configuration.
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-6
            space-y-4
          "
        >

          <OltInfoCard
            olt={olt}
          />

        </div>

      </SheetContent>

    </Sheet>

  )

}