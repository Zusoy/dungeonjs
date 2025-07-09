import React from 'react'
import { useSelector } from 'react-redux'
import { LoginForm } from 'features/Authentication/presentation/LoginForm'
import { selectIsConnected } from 'features/Authentication/application/slice'

export const Firewall: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isConnected = useSelector(selectIsConnected)

  if (!isConnected) {
    return (
      <LoginForm />
    )
  }

  return (
    <main>
      {children}
    </main>
  )
}
