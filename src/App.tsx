import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

import { RouterElementProvider } from '@/contexts'

import './App.css'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  return (
    <div className="h-screen">
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <RouterElementProvider />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        pauseOnHover
        pauseOnFocusLoss={false}
        hideProgressBar
        newestOnTop
        closeOnClick
      />
    </div>
  )
}

export default App
