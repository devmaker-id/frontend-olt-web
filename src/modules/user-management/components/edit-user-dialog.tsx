import {
  useEffect,
  useState,
} from 'react'

import {
  toast,
} from 'sonner'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  useUpdateUser,
} from '../hooks/use-update-user'

import type {
  User,
  UserRole,
} from '../types/user-management.types'

interface Props {
  user: User | null
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void

}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
}: Props) {
  const mutation = useUpdateUser()
  const [
    username,
    setUsername,
  ] = useState('')
  const [
    role,
    setRole,
  ] = useState<UserRole>(
    'TEKNISI',
  )
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telegramId, setTelegramId] = useState('')

  useEffect(() => {
    if (!user) {
      return
    }
    setUsername(user.username)
    setRole(user.role)
    setEmail(user.email)
    setTelepon(user.telepon)
    setAlamat(user.alamat)
    setTelegramId(user.telegramId)

  }, [user])

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (!user) {
      return
    }

    try {

      await mutation.mutateAsync({
          id: user.id,
          data: {
            username,
            role,
            email,
            telepon,
            alamat,
            telegramId,
          },

        })

      toast.success(
        'User updated',
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
        'Failed to update user',
      )

    }

  }

  if (!user) {
    return null
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
            Edit User
          </DialogTitle>

          <DialogDescription>
            Update user information.
          </DialogDescription>

        </DialogHeader>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-4
          "
        >

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Username
            </Label>

            <Input
              value={
                username
              }
              onChange={event =>
                setUsername(
                  event.target.value,
                )
              }
              required
            />

          </div>

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Role
            </Label>

            <Select
              value={role}
              onValueChange={value =>
                setRole(
                  value as UserRole,
                )
              }
            >

              <SelectTrigger className='w-full' >

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem
                  value="OWNER"
                >
                  OWNER
                </SelectItem>

                <SelectItem
                  value="TEKNISI"
                >
                  TEKNISI
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div
          className='space-y-2'
          >
            <Label>E-Mail</Label>
            <Input value={email} onChange={event =>
                setEmail(
                  event.target.value,
                )
              }
            />
          </div>

          <div
          className='space-y-2'
          >
            <Label>Telepon</Label>
            <Input value={telepon} onChange={event =>
                setTelepon(
                  event.target.value,
                )
              }
            />
          </div>

          <div className='space-y-2'>
            <Label>Alamat</Label>
            <Input value={alamat} onChange={event =>
                setAlamat(
                  event.target.value,
                )
              }
            />
          </div>

          <div className='space-y-2'>
            <Label>Telegram ID</Label>
            <Input value={telegramId} onChange={event =>
                setTelegramId(
                  event.target.value,
                )
              }
            />
          </div>

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(
                  false,
                )
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                mutation.isPending
              }
            >
              {
                mutation.isPending
                  ? 'Saving...'
                  : 'Save Changes'
              }
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  )

}