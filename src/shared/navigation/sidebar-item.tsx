import { NavLink, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { cn } from '@/lib/utils'

import type { NavigationNode } from './navigation.types'

interface SidebarItemProps {
  node: NavigationNode
  level?: number
  openMenus: Record<number, string>
  onToggle: (
    level: number,
    label: string | null,
  ) => void
}

function isNodeActive(
  node: NavigationNode,
  pathname: string,
): boolean {
  if (
    node.path &&
    (
      pathname === node.path ||
      pathname.startsWith(`${node.path}/`)
    )
  ) {
    return true
  }

  if (node.children) {
    return node.children.some(child =>
      isNodeActive(child, pathname),
    )
  }

  return false
}

export function SidebarItem({
  node,
  level = 0,
  openMenus,
  onToggle,
}: SidebarItemProps) {

  const location = useLocation()

  const {
    label,
    path,
    icon: Icon,
    end,
    children,
  } = node

  const hasChildren =
    Boolean(children?.length)

  const active =
    isNodeActive(
      node,
      location.pathname,
    )
  const isOpen = openMenus[level] === node.label

  if (hasChildren) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => 
          onToggle(
            level,
            open ? node.label : null
          )
        }
      >
        <CollapsibleTrigger
          className={cn(
            'group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
            active
              ? 'bg-muted font-medium'
              : 'hover:bg-muted/50',
          )}
          style={{
            paddingLeft:
              12 + level * 16,
          }}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon className="h-4 w-4 shrink-0" />
            )}

            <span>{label}</span>
          </div>

          <ChevronRight
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-1">
          {children!.map(child => (
            <SidebarItem
              key={child.label}
              node={child}
              level={level + 1}
              openMenus={openMenus}
              onToggle={onToggle}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <NavLink
      to={path!}
      end={end}
      style={{
        paddingLeft:
          12 + level * 16,
      }}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground font-medium'
            : 'hover:bg-muted/50',
        )
      }
    >
      {Icon && (
        <Icon className="h-4 w-4 shrink-0" />
      )}

      <span>{label}</span>
    </NavLink>
  )
}