import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

import { queryClientConfig } from '@/config/query'
import { RouterElementProvider } from '@/contexts'

function App() {
  const queryClient = new QueryClient(queryClientConfig)
  return (
    <div className="h-screen" style={{ height: '-webkit-fill-available' }}>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <RouterElementProvider />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
      <ToastContainer
        className="z-[99999]"
        limit={3}
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
