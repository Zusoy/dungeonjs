import React from 'react'
import { store } from 'app/store'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import App from 'App'
import 'style.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)
