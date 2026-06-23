import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  EndpointForm,
} from './endpoint-form'

import {
  useUpdateEndpoint,
} from '../hooks/use-update-endpoint'

import type {
  Endpoint,
  UpdateEndpointRequest,
} from '../types/endpoint.types'

interface Props {
  endpoint: Endpoint | null
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function EditEndpointDialog({
    endpoint,
    open,
    onOpenChange,
}: Props) {
    const updateMutation = useUpdateEndpoint()
    if(!endpoint){
        return null
    }
    async function handleSubmit(
        data: UpdateEndpointRequest
    ) {
        try {
            if(!endpoint) return null
            await updateMutation.mutateAsync({
                id: endpoint.id,
                data
            })
            toast.success(
                'Endpoint Updated'
            )
            onOpenChange(false)
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                'Failed update endpoint'
            )
        }
    }
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Edit Endpoint
                    </DialogTitle>
                    <DialogDescription>
                        Update endpoint information
                    </DialogDescription>
                </DialogHeader>

                <EndpointForm
                    defaultValues={{
                        internetNo: endpoint.internetNo,
                        type: endpoint.type,
                        name: endpoint.name,
                        email: endpoint.email,
                        telepon: endpoint.telepon ?? '',
                        address: endpoint.address ?? '',
                        latitude: endpoint.latitude ?? undefined,
                        longitude: endpoint.longitude ?? undefined,
                        description: endpoint.description ?? '',
                    }}
                    isLoading={
                        updateMutation.isPending
                    }
                    onSubmit={
                        handleSubmit
                    }
                />
            </DialogContent>
        </Dialog>
    )
}