interface Props {}

const Skeleton = (props: Props) => {
  return (
    <div className="border border-gray-300 shadow rounded-md p-4 max-w-xs w-full mx-auto">
      <div className="animate-pulse flex flex-col justify-center items-center gap-y-4">
        <div className="rounded-full bg-slate-400 h-11 w-11 mt-4">
          <span className="overflow-hidden rounded-2xl pt-0 bg-slate-400" />
        </div>

        <div className="overflow-hidden mb-2 h-4 w-full">
          <div className="bg-slate-400 rounded" />
          <p className="line-clamp-2 text-center text-xs bg-slate-400 h-4" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
