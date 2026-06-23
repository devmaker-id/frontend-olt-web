import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { PageContainer } from '@/shared/components/page-container'
import { PageHeader } from '@/shared/components/page-header'
import { LoadingState } from '@/shared/components/loading-state'
import { EmptyState } from '@/shared/components/empty-state'
import { ErrorState } from '@/shared/components/error-state'
import { DataTableToolbar } from '@/shared/components/data-table-toolbar'
import { SearchInput } from '@/shared/components/data-table/search-input'
import { DataTablePagination } from '@/shared/components/data-table/data-table-pagination'
import { useOnus } from '../hooks/use-onus'
import { OnuTable } from '../components/onu-table'
import type { Onu } from '../types/onu.types'
import { OnuDetailSheet } from '../components/onu-detail-sheet'
import { OnuRealtimeSheet } from '../components/onu-realtime-sheet'
import { OnuReplaceDialog } from '../components/onu-replace-dialog'

export function OnuListPage() {

  const {
    data = [],
    isLoading,
    error,
  } = useOnus()

  const [selectedOnu, setSelectedOnu] = useState<Onu | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [realtimeOpen, setRealtimeOpen] = useState(false)
  const [replaceOpen, setReplaceOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  useEffect(() => { setPage(1) }, [search])

  const filteredData =
    useMemo(() => {
      const keyword = search.trim().toLowerCase()
      if (!keyword) {
        return data
      }
      return data.filter(
        (onu: Onu) =>

          onu.onuName
            ?.toLowerCase()
            .includes(keyword)

          ||

          onu.onuMac
            ?.toLowerCase()
            .includes(keyword)

          ||

          onu.onuId
            ?.toLowerCase()
            .includes(keyword)

      )

    }, [
      data,
      search,
    ])

  const totalPages =
    Math.max(

      1,

      Math.ceil(
        filteredData.length /
        perPage,
      ),

    )

  const paginatedData =
    useMemo(() => {

      const start =
        (page - 1) *
        perPage

      const end =
        start +
        perPage

      return filteredData.slice(
        start,
        end,
      )

    }, [
      filteredData,
      page,
      perPage,
    ])

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error) {
    return (
      <ErrorState
        message="
          Failed to load ONU list.
        "
      />
    )
  }

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <EmptyState
        title="No ONU Found"
        description="
          No registered ONU available.
        "
      />
    )
  }

  return (

    <PageContainer>

      <PageHeader
        title="ONU List"
        description={
          `${filteredData.length} ONU(s)`
        }
      />

      <DataTableToolbar
        search={
          <SearchInput
            value={search}
            placeholder="Search ONU..."
            onChange={
              setSearch
            }
          />
        }
      />

      <OnuTable
        data={paginatedData}
        onView={
          onu => {
              setSelectedOnu(onu)
              setDetailOpen(true)
          }
        }
        onRealtime={
          onu => {
            setSelectedOnu(onu)
            setRealtimeOpen(true)
          }
        }
        onReplace={
          onu => {
            setSelectedOnu(onu)
            setReplaceOpen(true)
          }
        }
        onDelete={
          onu => {
              console.log(
                  'delete',
                  onu
              )
          }
        }
      />

      <DataTablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <OnuDetailSheet
        onu={selectedOnu}
        open={detailOpen}
        onOpenChange={open => {
          setDetailOpen(open)
          if(!open){
            setSelectedOnu(null)
          }
        }}
      />
      <OnuRealtimeSheet
        onu={selectedOnu}
        open={realtimeOpen}
        onOpenChange={open => {
          setRealtimeOpen(open)
          if(!open){
            setSelectedOnu(null)
          }
        }}
      />
      <OnuReplaceDialog
        onu={selectedOnu}
        open={replaceOpen}
        onOpenChange={open => {
          setReplaceOpen(open)
          if (!open) {
            setSelectedOnu(null)
          }
        }}
      />

    </PageContainer>

  )

}