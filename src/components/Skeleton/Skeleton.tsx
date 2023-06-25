export const Skeleton = () => {
  return (
    <div className="mx-auto w-full max-w-xs rounded-md border border-gray-300 p-2 shadow">
      <div className="flex animate-pulse flex-col items-center justify-center gap-y-2">
        <div className="h-11 w-11 rounded-full bg-slate-400 md:mt-4">
          <span className="overflow-hidden rounded-2xl bg-slate-400 pt-0" />
        </div>

        <div className="h-4 w-full overflow-hidden">
          <div className="rounded bg-slate-400" />
          <p className="line-clamp-2 h-4 bg-slate-400 text-center text-xs" />
        </div>
      </div>
    </div>
  )
}
