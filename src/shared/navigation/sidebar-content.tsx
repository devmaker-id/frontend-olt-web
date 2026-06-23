import { Navigate } from 'react-router-dom'
import { getUser } from '../utils/auth'
import {
  sidebarConfig
} from './sidebar-config'

import {
  SidebarSection
} from './sidebar-section'

export function SidebarContent() {
  const user = getUser()
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }
  const filteredSections = sidebarConfig.filter(
    section => {
      if (!section.roles) {
        return true
      }
      return section.roles.includes(
        user.role,
      )
    }
  )

  return (

    <div
      className="
        flex-1
        space-y-6
        overflow-y-auto
        p-4
      "
    >

      {
        filteredSections.map(
          (section, index) => (
            <SidebarSection
              key={`${section.title}-${index}`}
              title={section.title}
              items={section.items}
            />
          )
        )
      }

    </div>
  )
}