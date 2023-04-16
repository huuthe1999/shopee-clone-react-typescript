import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

import { queryClientConfig } from '@/config/query'
import { ModalProvider, RouterElementProvider } from '@/contexts'

function App() {
  const queryClient = new QueryClient(queryClientConfig)
  return (
    <div className="h-screen">
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RouterElementProvider />
        </ModalProvider>
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
