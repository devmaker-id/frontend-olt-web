import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { Check } from 'lucide-react'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<
  typeof CheckboxPrimitive.Root
>) {
  return (
    <CheckboxPrimitive.Root
      className={`
        h-4
        w-4
        shrink-0
        rounded-sm
        border
        border-primary
        data-[state=checked]:bg-primary
        data-[state=checked]:text-primary-foreground
        ${className ?? ''}
      `}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="
          flex
          items-center
          justify-center
        "
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export {
  Checkbox,
}