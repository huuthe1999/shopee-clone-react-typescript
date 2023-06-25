import React from 'react'

interface Props {
  children?: React.ReactNode
}

const LayoutForm = ({ children }: Props) => {
  return (
    <section className="h-full bg-red-50">
      <div className="mx-auto max-w-6xl bg-advertising-panel bg-cover bg-center bg-no-repeat p-4 max-sm:bg-none md:p-8">
        <div className="grid h-full grid-cols-12 place-items-center">
          <div className="col-start-8 col-end-13 w-full max-sm:col-span-full">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default LayoutForm
