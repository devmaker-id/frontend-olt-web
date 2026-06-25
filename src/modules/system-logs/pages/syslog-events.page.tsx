import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/shared/components/page-container'
import { PageHeader } from '@/shared/components/page-header'
import { LoadingState } from '@/shared/components/loading-state'
import { EmptyState } from '@/shared/components/empty-state'
import { ErrorState } from '@/shared/components/error-state'
import { DataTableToolbar } from '@/shared/components/data-table-toolbar'
import { ConfirmDelete } from '@/shared/components/confirm-delete'
import { useSyslogEvents } from '../hooks/use-syslog-events'
import { useDeleteSyslogEvent } from '../hooks/use-delete-syslog-event'
import type {
  SyslogEvent,
} from '../types/syslog-event.types'
import { SyslogEventTable } from '../components/syslog-event-table'
import { SyslogEventSearch } from '../components/syslog-event-search'
import { SyslogEventFilter } from '../components/syslog-event-filter'
import { SyslogEventDetailSheet } from '../components/syslog-event-detail-sheet'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function SyslogEventsPage() {

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSyslogEvents()

  const deleteMutation =
    useDeleteSyslogEvent()

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState<SyslogEvent | null>(
    null,
  )

  const [
    detailOpen,
    setDetailOpen,
  ] = useState(false)

  const [
    deleteEvent,
    setDeleteEvent,
  ] = useState<SyslogEvent | null>(
    null,
  )

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false)

  const [
    search,
    setSearch,
  ] = useState('')

  const [
    filter,
    setFilter,
  ] = useState('all')

  const [
    page,
    setPage,
  ] = useState(1)

  const [
    selectedIds,
    setSelectedIds,
  ] = useState<string[]>([])
  const [
    bulkDeleteOpen,
    setBulkDeleteOpen,
  ] = useState(false)

  const pageSize = 10

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error) {
    return (
      <ErrorState
        message='Failed load syslog events'
      />
    )
  }

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <EmptyState
        title='No Syslog Event'
        description='Syslog event will appear here.'
      />
    )
  }

  const filteredEvents = data.filter(
      (event: SyslogEvent) => {
        const keyword = search.toLowerCase()
        const matchesSearch =

          event.onuName
            ?.toLowerCase()
            .includes(
              keyword,
            ) ||

          event.onuMac
            ?.toLowerCase()
            .includes(
              keyword,
            ) ||

          event.onuId
            ?.toLowerCase()
            .includes(
              keyword,
            ) ||

          event.oltName
            ?.toLowerCase()
            .includes(
              keyword,
            ) ||

          event.sourceIp
            ?.toLowerCase()
            .includes(
              keyword,
            )

        const matchesFilter =
          filter === 'all'
            ? true
            : event.type ===
              filter

        return (
          matchesSearch &&
          matchesFilter
        )

      },
    )

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredEvents.length /
        pageSize,
      ),
    )

  const paginatedEvents =
    filteredEvents.slice(
      (page - 1) *
      pageSize,
      page * pageSize,
    )

  return (
    <PageContainer>

      <PageHeader
        title='Syslog Events'
        description='Monitor ONU and OLT syslog activity.'
      />

      <DataTableToolbar
        search={
          <SyslogEventSearch
            value={search}
            onChange={(
              value,
            ) => {

              setSearch(
                value,
              )

              setPage(1)

            }}
          />
        }
        actions={
          <>
            <SyslogEventFilter
              value={filter}
              onChange={(value) => {
                setFilter(value)
                setPage(1)
              }}
            />

            <Button
              variant='outline'
              disabled={isFetching}
              onClick={() => {
                refetch()
              }}
            >
              <RefreshCw
                size={13}
                className={isFetching ? 'animate-spin' : ''}
              />
              Refresh
            </Button>

            {
                selectedIds.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Action</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                                onClick={() =>
                                    setBulkDeleteOpen(true)
                                }
                            >
                                Delete selected (
                                    {selectedIds.length}
                                )
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => 
                                    setSelectedIds([])
                                }
                            >
                                Clear Selection
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
          </>
        }
      />

      <SyslogEventTable
        events={
          paginatedEvents
        }
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onDetail={(event) => {
          setSelectedEvent(event)
          setDetailOpen(true)
        }}
        onDelete={(event) => {
          setDeleteEvent(event)
          setDeleteOpen(true)
        }}
      />

      <div
        className="
          flex
          justify-end
          gap-2
        "
      >

        <Button
          variant='outline'
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1,
            )
          }
        >
          Previous
        </Button>

        <span>
          Page {page} of{' '}
          {totalPages}
        </span>

        <Button
          variant='outline'
          disabled={
            page ===
            totalPages
          }
          onClick={() =>
            setPage(
              page + 1,
            )
          }
        >
          Next
        </Button>

      </div>

      <SyslogEventDetailSheet
        event={
          selectedEvent
        }
        open={
          detailOpen
        }
        onOpenChange={
          setDetailOpen
        }
      />

      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        title='Delete Syslog Event'
        description='This action cannot be undone.'
        onConfirm={() => {

          if (
            !deleteEvent
          ) {
            return
          }

          deleteMutation.mutate(
            deleteEvent.id,
            {
              onSuccess:
                () => {

                  setDeleteOpen(
                    false,
                  )

                },
            },
          )

        }}
      />

      <ConfirmDelete
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete Selected Syslog Events"
        description={`Delete ${selectedIds.length} selected events?`}
        onConfirm={async () => {

            await Promise.all(
            selectedIds.map(id =>
                deleteMutation.mutateAsync(
                id,
                ),
            ),
            )

            setSelectedIds([])

            setBulkDeleteOpen(
            false,
            )

        }}
        />

    </PageContainer>
  )
}