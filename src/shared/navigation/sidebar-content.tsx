import { Navigate } from 'react-router-dom'
import { getUser } from '../utils/auth'
import { sidebarConfig } from './sidebar-config'
import { SidebarItem } from './sidebar-item'
import type { NavigationNode } from './navigation.types'
import { useState } from 'react'

function filterNavigation(
  nodes: NavigationNode[],
  role: string,
): NavigationNode[] {
  return nodes.reduce<NavigationNode[]>((result, node) => {

    if (
      node.roles &&
      !node.roles.includes(role)
    ) {
      return result
    }

    const children = node.children
      ? filterNavigation(
          node.children,
          role,
        )
      : undefined

    if (
      !node.path &&
      (!children || children.length === 0)
    ) {
      return result
    }

    result.push({
      ...node,
      children,
    })

    return result

  }, [])

}

export function SidebarContent() {
  const user = getUser()
  const [openMenus, setOpenMenus] = useState<Record<number, string>>({})

  const handleToggle = (
    level: number,
    label: string | null,
  ) => {
    setOpenMenus(prev => {
      const next = { ...prev }

      if (label) {
        next[level] = label
      } else {
        delete next[level]
      }

      // tutup semua submenu di bawah level ini
      Object.keys(next).forEach(key => {
        if (Number(key) > level) {
          delete next[Number(key)]
        }
      })

      return next
    })
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  const navigation = filterNavigation(
    sidebarConfig,
    user.role,
  )

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        p-2
      "
    >
      <nav className="space-y-1">
        {navigation.map(node => (
          <SidebarItem
            key={node.label}
            node={node}
            level={0}
            openMenus={openMenus}
            onToggle={handleToggle}
          />
        ))}
      </nav>
    </div>
  )

}