import React from 'react'
import Hub from 'base/Hub'
import { Firewall } from 'features/Firewall'

const App: React.FC = () => {
  return (
    <Firewall>
      <Hub />
    </Firewall>
  )
}

export default App
