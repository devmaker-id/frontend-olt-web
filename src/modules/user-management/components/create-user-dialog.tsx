import {
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
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  useCreateUser,
} from '../hooks/use-create-user'

import type { UserRole } from '../types/user-management.types'

interface Props {

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function CreateUserDialog({
  open,
  onOpenChange,
}: Props) {

  const mutation = useCreateUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('TEKNISI')
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telegramId, setTelegramId] = useState('')

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    try {
      await mutation.mutateAsync({
          username,
          password,
          role,
          email,
          telepon,
          alamat,
          telegramId
        })

      toast.success('User created')

      onOpenChange(false)

      setUsername('')
      setPassword('')
      setRole('TEKNISI')
      setEmail('')
      setTelepon('')
      setAlamat('')
      setTelegramId('')
    }

    catch (error: any) {

      const response =
        error?.response?.data

      if (
        response?.message ===
        'VALIDATION_ERROR'
      ) {

        const firstError =
          Object.values(
            response.errors ?? {}
          )[0]

        toast.error(
          Array.isArray(firstError)
            ? firstError[0]
            : 'Validation error'
        )

        return
      }

      toast.error(
        response?.message ??
        'Failed to create user'
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
            Create User
          </DialogTitle>

          <DialogDescription>
            Create a new user account.
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
              placeholder='username yang unik'
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
              Password
            </Label>

            <Input
              placeholder='minimal 6 digit angka huruf simbol'
              type="password"
              value={
                password
              }
              onChange={event =>
                setPassword(
                  event.target.value,
                )
              }
              required
            />

          </div>

          <div className='space-y-2'>
            <Label>Telegram ID</Label>
            <Input placeholder='telegram id yang falid' value={telegramId} onChange={event =>
                setTelegramId(
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
                    value as UserRole
                )
              }
            >

              <SelectTrigger className='w-full'>

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

          <div className='space-y-2'>
            <Label>E-Mail</Label>
            <Input placeholder='mukhtar@bibit.net' value={email} onChange={event =>
                setEmail(
                  event.target.value,
                )
              }
              required
            />
          </div>
          
          <div className='space-y-2'>
            <Label>Telepon</Label>
            <Input placeholder='62871234567890' value={telepon} onChange={event =>
                setTelepon(
                  event.target.value,
                )
              }
              required
            />
          </div>
          
          <div className='space-y-2'>
            <Label>Alamat</Label>
            <Textarea placeholder='masukan alamat lengkap' value={alamat} onChange={event =>
                setAlamat(
                  event.target.value,
                )
              }
              rows={3}
              required
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
            >
              Create User
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  )

}