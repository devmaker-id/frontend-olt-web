import {
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  Plus,
  UserSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { LoadingState } from '@/shared/components/loading-state'
import { ErrorState } from '@/shared/components/error-state'
import { EmptyState } from '@/shared/components/empty-state'
import { PageContainer } from '@/shared/components/page-container'
import { PageHeader } from '@/shared/components/page-header'
import { DataTableToolbar } from '@/shared/components/data-table-toolbar'
import { SearchInput } from '@/shared/components/data-table/search-input'
import { DataTablePagination } from '@/shared/components/data-table/data-table-pagination'
import { EndpointTable } from '../components/endpoint-table'
import { useEndpoints } from '../hooks/use-endpoints'
import type { Endpoint } from '../types/endpoint.types'
import { CreateEndpointDialog } from '../components/create-endpoint-dialog'
import { useDeleteEndpoint } from '../hooks/use-delete-endpoint'
import { toast } from 'sonner'
import { EditEndpointDialog } from '../components/edit-endpoint-dialog'
import { EndpointDetailSheet } from '../components/endpoint-detail-sheet'
import { ConfirmDelete } from '@/shared/components/confirm-delete'
import { EndpointOnuSheet } from '../components/endpoint-onu-sheet'

export function EndpointListPage() {

  const {
    data = [],
    isLoading,
    error
  } = useEndpoints()

  const [onuOpen, setOnuOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null,
  )
  const [editOpen, setEditOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const deleteMutation = useDeleteEndpoint()
  async function handleDelete() {
    if(!selectedEndpoint) {
      return
    }
    try {
      await deleteMutation.mutateAsync(
        selectedEndpoint.id
      )
      toast.success(
        'Endpoint deleted'
      )
      setDeleteOpen(false)
      setSelectedEndpoint(null)
    } catch {
      return
    }
  }

  useEffect(() => {
    setPage(1)
  }, [search])
  const filteredData = useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase()
      if (!keyword) {
        return data
      }
      return data.filter(
        (
          endpoint: Endpoint
        ) =>
          endpoint.internetNo
            ?.toLowerCase()
            .includes(keyword)
          ||
          endpoint.name
            ?.toLowerCase()
            .includes(keyword)
          ||
          endpoint.address
            ?.toLowerCase()
            .includes(keyword)
      )
    }, [
      data,
      search
    ])
  const totalPages = Math.max(
      1,
      Math.ceil(
        filteredData.length /
        perPage
      )
    )

  const paginatedData = useMemo(() => {
      const start =
        (page - 1) *
        perPage
      const end =
        start +
        perPage
      return filteredData.slice(
        start,
        end
      )
    }, [
      filteredData,
      page,
      perPage
    ])

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load endpoint list."
      />
    )
  }

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <PageContainer>
        <EmptyState
          icon={
            <UserSquare className="text-muted-foreground mb-4 h-12 w-12" />
          }
          title="No Endpoint Found"
          description="Customer endpoint management"
          action={
            <Button
              onClick={() =>
                setCreateOpen(
                  true,
                )
              }
            >
              Create Endpoint
            </Button>
          }
        />
        <CreateEndpointDialog
          open={createOpen}
          onOpenChange={
            setCreateOpen
          }
        />
      </PageContainer>
    )
  }

  return (

    <PageContainer>

      <PageHeader
        title="Endpoint List"
        description={
          `${filteredData.length} endpoint(s)`
        }
      />

      <DataTableToolbar
        search={
          <SearchInput
            value={search}
            placeholder="Search internet no, name or address..."
            onChange={
              setSearch
            }
          />
        }
        actions={

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Button
              onClick={() =>
                setCreateOpen(true)
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Endpoint
            </Button>

            <Select
              value={String(perPage)}
              onValueChange={(
                value
              ) => {
                setPerPage(
                  Number(value)
                )
                setPage(1)
              }}
            >

              <SelectTrigger
                className="
                  w-32
                "
              >

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem
                  value="10"
                >
                  10 Rows
                </SelectItem>

                <SelectItem
                  value="25"
                >
                  25 Rows
                </SelectItem>

                <SelectItem
                  value="50"
                >
                  50 Rows
                </SelectItem>

                <SelectItem
                  value="100"
                >
                  100 Rows
                </SelectItem>

              </SelectContent>

            </Select>

          </div>
        }
      />

      <EndpointTable
        data={paginatedData}
        onView={endpoint => {
          setSelectedEndpoint(
            endpoint
          )
          setDetailOpen(true)
        }}
        onOnu={endpoint => {
          setSelectedEndpoint(
            endpoint
          )
          setOnuOpen(true)
        }}
        onEdit={endpoint => {
          setSelectedEndpoint(
            endpoint
          )
          setEditOpen(true)
        }}
        onDelete={endpoint => {
          setSelectedEndpoint(
            endpoint
          )
          setDeleteOpen(true)
        }}
      />

      <DataTablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <CreateEndpointDialog
        open={createOpen}
        onOpenChange={
          setCreateOpen
        }
      />
      <EditEndpointDialog
        endpoint={
          selectedEndpoint
        }
        open={editOpen}
        onOpenChange={
          setEditOpen
        }
      />
      <EndpointDetailSheet
        endpoint={
          selectedEndpoint
        }
        open={detailOpen}
        onOpenChange={
          setDetailOpen
        }
        onEdit={() => {
          setDetailOpen(
            false,
          )
          setEditOpen(
            true,
          )
        }}
      />
      <EndpointOnuSheet
        endpoint={
          selectedEndpoint
        }
        open={
          onuOpen
        }
        onOpenChange={
          setOnuOpen
        }
      />
      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        title="Delete Endpoint"
        description={
          `Delete endpoint "${selectedEndpoint?.name}"?`
        }
        onConfirm={
          handleDelete
        }
        isLoading={
          deleteMutation.isPending
        }
      />

    </PageContainer>
  )
}