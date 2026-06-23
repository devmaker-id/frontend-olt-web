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
  useUpdateOlt,
} from '../hooks/use-update-olt'

import type {
  Olt,
  UpdateOltRequest,
} from '../types/olt.types'

interface Props {

  olt: Olt | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function EditOltDialog({

  olt,

  open,

  onOpenChange,

}: Props) {

  const updateMutation =
    useUpdateOlt()

  if (!olt) {
    return null
  }

  async function handleSubmit(
    data: UpdateOltRequest,
  ) {

    try {

      await updateMutation
        .mutateAsync({

          id: olt?.id,

          data,

        })

      toast.success(
        'OLT updated',
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
        'Failed to update OLT',
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
            Edit OLT
          </DialogTitle>

          <DialogDescription>
            Update OLT configuration.
          </DialogDescription>

        </DialogHeader>

        <OltForm

          initialValues={
            olt
          }

          onSubmit={
            handleSubmit
          }

          isLoading={
            updateMutation.isPending
          }

          submitLabel="
            Update OLT
          "

        />

      </DialogContent>

    </Dialog>

  )

}