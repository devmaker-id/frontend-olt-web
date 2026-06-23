import {
  Navigate,
} from 'react-router-dom'
import { getUser } from '../utils/auth'
interface Props {

  children: React.ReactNode

}

export function OwnerRoute({
  children,
}: Props) {

  const user = getUser()

  if (
    user.role !==
    'OWNER'
  ) {

    return (

      <Navigate
        to="/dashboard"
        replace
      />

    )

  }

  return children

}