import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { EndpointForm } from "./endpoint-form";
import { useCreateEndpoint } from "../hooks/use-create-endpoint";
import type { CreateEndpointRequest } from "../types/endpoint.types";

interface CreateEndpointDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateEndpointDialog({
    open,
    onOpenChange
}: CreateEndpointDialogProps) {
    const createMutation = useCreateEndpoint()

    async function handleSubmit(
        data: CreateEndpointRequest
    ) {
        try {
            await createMutation.mutateAsync(data)
            toast.success('Endpoint Created')
            onOpenChange(false)
        } catch (error: any) {
            const response = error?.response?.data
            toast.error(response?.errors ?? 'Failed to create endpoint')
        }
    }
    
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    max-w-4xl
                    max-h-[90vh]
                    overflow-y-auto
                "
            >
                <DialogHeader>
                    <DialogTitle>
                        Create Endpoint
                    </DialogTitle>
                    <DialogDescription>
                        Create a new customer endpoint, 
                    </DialogDescription>

                    <EndpointForm
                        isLoading={
                            createMutation.isPending
                        }
                        onSubmit={
                            handleSubmit
                        }
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}