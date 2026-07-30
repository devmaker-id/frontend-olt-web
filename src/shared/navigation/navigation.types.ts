import type { LucideIcon } from 'lucide-react'

export interface NavigationNode {
  label: string
  icon?: LucideIcon
  path?: string
  end?: boolean
  roles?: string[]
  children?: NavigationNode[]
  badge?: string | number
  disabled?: boolean
}