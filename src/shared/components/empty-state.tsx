import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title = 'No data found',
  description = 'There is nothing to display.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {
        icon ?? (
          <Inbox className="text-muted-foreground mb-4 h-12 w-12" />
        )
      }

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-muted-foreground mt-2 text-sm">
        {description}
      </p>
      {
        action && (
          <div className='mt-6'>
            {action}
          </div>
        )
      }
    </div>
  )
}