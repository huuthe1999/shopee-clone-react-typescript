import loadingGif from '@/assets/images/loading.gif'

const Spinner = () => {
  return (
    <div className="flex h-full min-h-[600px] items-center justify-center bg-transparent">
      <img className="h-16 w-16" src={loadingGif} alt="loading" />
    </div>
  )
}

export default Spinner
