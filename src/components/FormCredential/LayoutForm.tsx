import React from 'react'

interface Props {
  children?: React.ReactNode
}

const LayoutForm = ({ children }: Props) => {
  return (
    <section className="bg-red-50 h-full">
      <div className="max-w-6xl p-8 mx-auto bg-advertising-panel bg-cover bg-center bg-no-repeat max-sm:bg-none">
        <div className="grid grid-cols-12 h-full place-items-center">
          <div className="col-start-8 col-end-13 max-sm:col-span-full w-full">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default LayoutForm
