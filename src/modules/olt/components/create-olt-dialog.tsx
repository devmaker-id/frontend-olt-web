import {
  toast,
} from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  OltForm,
} from './olt-form'

import {
  useCreateOlt,
} from '../hooks/use-create-olt'

import type {
  CreateOltRequest,
} from '../types/olt.types'

interface Props {

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function CreateOltDialog({

  open,

  onOpenChange,

}: Props) {

  const createMutation =
    useCreateOlt()

  async function handleSubmit(
    data: CreateOltRequest,
  ) {

    try {

      await createMutation
        .mutateAsync(
          data,
        )

      toast.success(
        'OLT created',
      )

      onOpenChange(
        false,
      )

    }

    catch (
      error: any
    ) {

      toast.error(
        error?.response?.data?.message ??
        'Failed to create OLT',
      )

    }

  }

  return (

    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
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
            Create OLT
          </DialogTitle>

          <DialogDescription>
            Register a new OLT.
          </DialogDescription>

        </DialogHeader>

        <OltForm

          onSubmit={
            handleSubmit
          }

          isLoading={
            createMutation.isPending
          }

          submitLabel="
            Create OLT
          "

        />

      </DialogContent>

    </Dialog>

  )

}