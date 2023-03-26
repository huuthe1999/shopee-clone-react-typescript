import './App.css'

import useRouteElements from '@/hooks/useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return <div className="app">{routeElements}</div>
}

export default App
