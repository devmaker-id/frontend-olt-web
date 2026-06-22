import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Button,
} from '@/components/ui/button'

import {
  Input,
} from '@/components/ui/input'

import {
  Label,
} from '@/components/ui/label'

import {
  useCreateTelegramBot,
} from '../hooks/use-create-telegram-bot'
import { toast } from 'sonner'

interface Props {
  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function CreateTelegramBotDialog({
  open,
  onOpenChange,
}: Props) {

  const createMutation =
    useCreateTelegramBot()

  const [
    name,
    setName,
  ] = useState('')

  const [
    token,
    setToken,
  ] = useState('')

  const [
    defaultChatId,
    setDefaultChatId,
  ] = useState('')

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault()

    try {
      await createMutation.mutateAsync({
        name,
        token,
        defaultChatId,
      })
      toast.success(
        'Created Bot Telegram'
      )

      setName('')
      setToken('')
      setDefaultChatId('')

      onOpenChange(false)
    } catch (error: any) {
      const response = error?.response?.data
      toast.error(
        response.message ?? 'Failed Create Bot Telegram'
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

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Add Telegram Bot
          </DialogTitle>

          <DialogDescription>
            Register telegram bot.
          </DialogDescription>

        </DialogHeader>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <div className="space-y-2">

            <Label>
              Bot Name
            </Label>

            <Input
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Bot Token
            </Label>

            <Input
              value={token}
              onChange={(event) =>
                setToken(
                  event.target.value,
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Default Chat ID
            </Label>

            <Input
              value={defaultChatId}
              onChange={(event) =>
                setDefaultChatId(
                  event.target.value,
                )
              }
            />

          </div>

          <DialogFooter>

            <Button
              type="submit"
              disabled={
                createMutation.isPending
              }
            >
              {
                createMutation.isPending
                  ? 'Saving...'
                  : 'Create Bot'
              }
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  )
}