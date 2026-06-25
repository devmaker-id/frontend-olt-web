import * as React from 'react'

import {
  Check,
  ChevronsUpDown,
} from 'lucide-react'

import {
  Button,
} from '@/components/ui/button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  cn,
} from '@/lib/utils'

interface SearchableSelectOption {

  value: string

  label: string

  description?: string

}

interface Props {

  value?: string

  placeholder?: string

  searchPlaceholder?: string

  options: SearchableSelectOption[]

  onValueChange: (
    value: string,
  ) => void

}

export function SearchableSelect({
  value,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  options,
  onValueChange,
}: Props) {

  const [
    open,
    setOpen,
  ] = React.useState(
    false,
  )

  const selected =
    options.find(
      option =>
        option.value === value,
    )

  return (

    <Popover
      open={open}
      onOpenChange={
        setOpen
      }
    >

      <PopoverTrigger
        asChild
      >

        <Button
          variant="outline"
          role="combobox"
          className="
            w-full
            justify-between
          "
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown
            className="
              ml-2
              h-4
              w-4
              shrink-0
              opacity-50
            "
          />

        </Button>

      </PopoverTrigger>

      <PopoverContent
        className="w-[360px] p-0"
        onWheel={(e) => {e.stopPropagation()}}
        style={{
          touchAction: "pan-y"
        }}
      >

        <Command>

          <CommandInput
            placeholder={
              searchPlaceholder
            }
          />

          <CommandList
            style={{
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch"
            }}
          >

            <CommandEmpty>

              No data found

            </CommandEmpty>

            <CommandGroup>

              {options.map(
                option => (

                  <CommandItem

                    key={
                      option.value
                    }

                    value={`
                      ${option.label}
                      ${option.description ?? ''}
                    `}

                    onSelect={() => {

                      onValueChange(
                        option.value,
                      )

                      setOpen(
                        false,
                      )

                    }}

                  >

                    <Check
                      className={cn(

                        'mr-2 h-4 w-4',

                        value === option.value
                          ? 'opacity-100'
                          : 'opacity-0',

                      )}
                    />

                    <div>

                      <div>

                        {
                          option.label
                        }

                      </div>

                      {option.description && (

                        <div
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >

                          {
                            option.description
                          }

                        </div>

                      )}

                    </div>

                  </CommandItem>

                ),
              )}

            </CommandGroup>

          </CommandList>

        </Command>

      </PopoverContent>

    </Popover>

  )

}