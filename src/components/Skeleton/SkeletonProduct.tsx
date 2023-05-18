export const SkeletonProduct = () => {
  return (
    <section className="my-1 flex h-full animate-pulse flex-col rounded-sm border border-gray-300 shadow-xl">
      {/* Image */}
      <div className="w-full overflow-hidden bg-transparent p-4">
        <img src="/images/loading-image-product.png" alt="" className="h-40 w-full" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-2">
        <div className="flex flex-col gap-y-1">
          <p className="h-2.5 rounded-sm bg-gray-300 text-sm" />
          <p className="h-2.5 rounded-sm bg-gray-300 text-sm" />
        </div>
        <span className="h-2.5 w-1/3 rounded-sm bg-gray-300 text-sm"></span>
        <div className="flex h-2.5 gap-2">
          <span className="h-full w-1/3 rounded-sm bg-gray-300 text-sm" />
          <span className="h-full w-1/3 rounded-sm bg-gray-300 text-sm" />
        </div>
        <span className="h-2.5 w-1/3 rounded-sm bg-gray-300 text-sm" />
      </div>
    </section>
  )
}
