import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

import {
  LoadingState,
} from '@/shared/components/loading-state'

import {
  ErrorState,
} from '@/shared/components/error-state'

import {
  EmptyState,
} from '@/shared/components/empty-state'

import {
  OpticalPortTable,
} from './optical-port-table'

import {
  useOltOptical,
} from '../hooks/use-olt-optical'

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

export function OltOpticalSheet({
  olt,
  open,
  onOpenChange,
}: Props) {
  const {
    data = [],
    isLoading,
    error,
  } = useOltOptical(
    olt?.id ?? '',
  )

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
            Optical Information
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
          "
        >
          {isLoading && (
            <LoadingState />
          )}
          {error && (
            <ErrorState
              message="
                Failed to load optical information.
              "
            />
          )}
          {
            !isLoading &&
            !error &&
            data.length === 0 && (
              <EmptyState
                title="
                  No Optical Information
                "
                description="
                  No optical ports available.
                "
              />
            )
          }
          {
            !isLoading &&
            !error &&
            data.length > 0 && (

              <OpticalPortTable
                ports={data}
              />
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}