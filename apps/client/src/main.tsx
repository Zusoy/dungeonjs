import React from 'react'
import { Toaster } from 'sonner'
import { store } from 'app/store'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import App from 'base/App'
import 'style.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Toaster position='top-left' />
      <App />
    </StoreProvider>
  </React.StrictMode>,
)
