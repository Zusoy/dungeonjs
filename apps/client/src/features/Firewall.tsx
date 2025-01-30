import React from 'react'
import Login from 'features/Authentication'
import { useSelector } from 'react-redux'
import { selectIsConnected } from 'features/Authentication/slice'

const Firewall: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isConnected = useSelector(selectIsConnected)

  if (!isConnected) {
    return (
      <Login />
    )
  }

  return (
    <main>
      {children}
    </main>
  )
}

export default Firewall
