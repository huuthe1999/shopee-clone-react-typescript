import React from 'react'

const CheckOutAddress = React.lazy(() => import('./components/CheckOutAddress'))

const CheckOut = () => {
  return (
    <div className="mx-auto h-fit max-w-6xl">
      <div className="container flex flex-col gap-y-4">
        <CheckOutAddress />
      </div>
    </div>
  )
}

export default CheckOut
