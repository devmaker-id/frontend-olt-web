import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface Props {
  value: string
  onChange: (
    value: string
  ) => void
}

export function SyslogEventSearch({
  value,
  onChange,
}: Props) {

  return (

    <div className="relative">

      <Search className="
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        placeholder="Search ONU, MAC, OLT, IP..."
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value,
          )
        }
        className="pl-10"
      />

    </div>

  )

}