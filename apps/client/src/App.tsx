import React from 'react'
import Hub from 'Hub'
import SocketFirewall from 'features/Firewall'

const App: React.FC = () => {
  return (
    <SocketFirewall>
      <Hub />
    </SocketFirewall>
  )
}

export default App
