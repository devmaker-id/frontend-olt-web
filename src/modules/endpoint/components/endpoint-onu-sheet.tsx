import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { LoadingState } from '@/shared/components/loading-state'
import { useRealtimeEndpoint } from '../hooks/use-endpoint-realtime'
import type { Endpoint } from '../types/endpoint.types'
import { EndpointOnuCard } from './endpoint-onu-card'
import { PageContainer } from '@/shared/components/page-container'

interface Props {
  endpoint: Endpoint | null
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function EndpointOnuSheet({
  endpoint,
  open,
  onOpenChange,
}: Props) {

  const {
    data,
    isLoading,
  } = useRealtimeEndpoint(
    endpoint?.internetNo,
  )

  return (

    <PageContainer>
        <Sheet
        open={open}
        onOpenChange={onOpenChange}
        >

        <SheetContent
            className="
            sm:max-w-2xl
            "
        >

            <SheetHeader>

            <SheetTitle>
                ONU Information
            </SheetTitle>

            </SheetHeader>

            {isLoading && (
            <LoadingState />
            )}

            {!isLoading && (

            <div
                className="
                p-2
                mt-6
                space-y-4
                "
            >

                <div>

                <p
                    className="
                    text-sm
                    text-muted-foreground
                    "
                >
                    Internet No
                </p>

                <p>
                    {endpoint?.internetNo} - {endpoint?.name}
                </p>

                </div>

                <div>

                    <p className="
                        text-sm
                        text-muted-foreground
                        "
                    >
                        ONU Count ({data?.onuCount ?? 0})
                    </p>

                    </div>

                    <div className="p-2 space-y-4">

                        {data?.onus?.map(
                            onu => (
                                <EndpointOnuCard
                                    key={onu.id}
                                    onu={onu}
                                />
                            )
                        )}

                    </div>

            </div>

            )}

        </SheetContent>
        </Sheet>
    </PageContainer>

  )

}