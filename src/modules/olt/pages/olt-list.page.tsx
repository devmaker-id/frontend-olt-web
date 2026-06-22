import {
  useMemo,
  useState,
} from 'react'

import { Plus } from 'lucide-react'
import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { PageHeader } from '@/shared/components/page-header'
import { PageContainer } from '@/shared/components/page-container'
import { LoadingState } from '@/shared/components/loading-state'
import { EmptyState } from '@/shared/components/empty-state'
import { ErrorState } from '@/shared/components/error-state'
import { ConfirmDelete } from '@/shared/components/confirm-delete'

import { DataTableToolbar } from '@/shared/components/data-table-toolbar'

import { SearchInput } from '@/shared/components/data-table/search-input'

import { DataTablePagination } from '@/shared/components/data-table/data-table-pagination'

import { useOlts } from '../hooks/use-olts'
import { useDeleteOlt } from '../hooks/use-delete-olt'

import { OltTable } from '../components/olt-table'

import type { Olt } from '../types/olt.types'
import { CreateOltDialog } from '../components/create-olt-dialog'
import { EditOltDialog } from '../components/edit-olt-dialog'
import { OltDetailSheet } from '../components/olt-detail-sheet'
import { OltConnectSheet } from '../components/olt-connect-sheet'
import { toast } from 'sonner'

export function OltListPage() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useOlts()

  const deleteMutation = useDeleteOlt()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const [selectedOlt, setSelectedOlt] = useState<Olt | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [connectOpen, setConnectOpen] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false)

  const filteredOlts = useMemo(() => {

      if (!data) {
        return []
      }

      const keyword =
        search.toLowerCase()

      return data.filter(
        (olt: Olt) =>
          olt.name
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          olt.ipAddress
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          olt.vendor
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          olt.location
            ?.toLowerCase()
            .includes(
              keyword
            )
      )
    }, [data, search])

  const totalPages =
    Math.ceil(
      filteredOlts.length /
        pageSize
    )

  const paginatedOlts =
    filteredOlts.slice(
      (page - 1) * pageSize,
      page * pageSize
    )

  async function handleDelete() {
    if (!selectedOlt) {
      return
    }
    await deleteMutation.mutateAsync(selectedOlt.id)
    toast.success(
      'Olt Deleted, Success'
    )
    setDeleteOpen(false)
    setSelectedOlt(null)
  }

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load OLT list."
      />
    )
  }

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <EmptyState
        title="No OLT Found"
        description="Create your first OLT."
      />
    )
  }

  return (
    <PageContainer>

      <PageHeader
        title="OLT List"
        description="Manage optical line terminals."
      />

      <DataTableToolbar
        search={
          <SearchInput
            value={search}
            placeholder="Search OLT..."
            onChange={
              setSearch
            }
          />
        }
        actions={
          <>
            <Button
              variant="outline"
              onClick={() =>
                refetch()
              }
            >
              <RefreshCw />
              Refresh
            </Button>

            <Button
              onClick={() => setCreateOpen(true)}
            >
              <Plus />
              Create OLT
            </Button>
          </>
        }
      />

      <OltTable
        onConnect={
          (olt) => {
            setSelectedOlt(olt)
          setConnectOpen(true)

          }
        }
        olts={
          paginatedOlts
        }
        onView={
          (olt) => {
            setSelectedOlt(olt)
            setDetailOpen(true)
          }
        }
        onEdit={
          (olt) => {
            setSelectedOlt(olt)
            setEditOpen(true)
          }
        }
        onDelete={
          (olt) => {
            setSelectedOlt(olt)
            setDeleteOpen(true)
          }
        }
      />

      <DataTablePagination
        page={page}
        totalPages={
          totalPages
        }
        onPageChange={
          setPage
        }
      />

      <CreateOltDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
      <EditOltDialog
        olt={selectedOlt}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <OltDetailSheet
        olt={selectedOlt}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={() => {
          setDetailOpen(false)
          setEditOpen(true)
        }}
      />
      <OltConnectSheet
        olt={selectedOlt}
        open={connectOpen}
        onOpenChange={setConnectOpen}
      />
      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete OLT"
        description={`Delete OLT "${selectedOlt?.name}"?`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </PageContainer>
  )
}