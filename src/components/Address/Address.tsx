import React from 'react'

const AddressItem = React.lazy(() => import('./AddressItem'))

interface Props {}

const Address = (props: Props) => {
  return (
    <div className="container mx-auto flex flex-col divide-y-2">
      <AddressItem />
      <AddressItem />
      <AddressItem />
    </div>
  )
}

export default Address
