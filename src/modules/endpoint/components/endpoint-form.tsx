import { useState } from 'react'

import {
  Button
} from '@/components/ui/button'

import {
  Input
} from '@/components/ui/input'

import {
  Label
} from '@/components/ui/label'

import {
  Textarea
} from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { ENDPOINT_TYPES } from '../types/endpoint.types'
import type {
  CreateEndpointRequest,
  EndpointType
} from '../types/endpoint.types'

interface EndpointFormProps {
  defaultValues?: Partial<CreateEndpointRequest>
  isLoading?: boolean
  onSubmit: (
    data: CreateEndpointRequest
  ) => void
}

export function EndpointForm({
  defaultValues,
  isLoading,
  onSubmit
}: EndpointFormProps) {

  const [form, setForm] =
    useState<CreateEndpointRequest>({
      internetNo:defaultValues?.internetNo || '',
      type: defaultValues?.type || 'CUSTOMER',
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      telepon: defaultValues?.telepon || '',
      address: defaultValues?.address || '',
      latitude: defaultValues?.latitude,
      longitude:  defaultValues?.longitude,
      description: defaultValues?.description || ''
    })

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">

        <div className="space-y-2">
          <Label>
            Internet No
          </Label>
          <Input
            required
            placeholder='19982206260001'
            value={form.internetNo}
            onChange={(event) =>
              setForm({
                ...form,
                internetNo: event.target.value
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>
            Name
          </Label>
          <Input
            required
            placeholder='nama pelanggan'
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Type
        </Label>
        <Select
          value={form.type}
          onValueChange={(
            value
          ) =>
            setForm({
              ...form,
              type: value as EndpointType
            })
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ENDPOINT_TYPES.map(
              type => (
                <SelectItem
                  key={type}
                  value={type}
                >
                  {type}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>
              Email
            </Label>
            <Input
              type="email"
              required
              placeholder="customer@bibit.net"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Telepon
            </Label>
            <Input
              placeholder="08123456789"
              value={form.telepon || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  telepon: event.target.value,
                })
              }
            />
          </div>
        </div>

      <div className="space-y-2">
        <Label>
          Address
        </Label>
        <Textarea
          rows={3}
          placeholder='alamat lengkap pelanggan'
          value={
            form.address || ''
          }
          onChange={(event) =>
            setForm({
              ...form,
              address: event.target.value
            })
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>
            Latitude
          </Label>
          <Input
            type="number"
            placeholder='123.123'
            value={
              form.latitude ?? ''
            }
            onChange={(event) =>
              setForm({
                ...form,
                latitude: event.target.value
                    ? Number(
                        event.target.value
                      )
                    : undefined
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>
            Longitude
          </Label>
          <Input
            type="number"
            placeholder='-123.123'
            value={
              form.longitude ?? ''
            }
            onChange={(event) =>
              setForm({
                ...form,
                longitude: event.target.value
                    ? Number(
                        event.target.value
                      )
                    : undefined
              })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>
          Description
        </Label>
        <Textarea
          rows={4}
          placeholder='keterangan tambahan'
          value={
            form.description || ''
          }
          onChange={(event) =>
            setForm({
              ...form,

              description: event.target.value
            })
          }
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {
            isLoading
              ? 'Saving...'
              : 'Save Endpoint'
          }
        </Button>
      </div>
    </form>
  )
}