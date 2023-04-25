import React from 'react'

import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.min.css'
import './index.css'

import App from '@/App'
import '@smastrom/react-rating/style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
