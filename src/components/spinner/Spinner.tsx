import loadingGif from '@/assets/images/loading.gif'
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[600px]">
      <img className="h-16 w-16" src={loadingGif} alt="loading" />
    </div>
  )
}

export default Spinner
