import { FloatingOverlay } from '@floating-ui/react'

const Spinner = () => {
  return (
    <FloatingOverlay lockScroll className="fixed inset-0 z-10">
      <div className="flex h-full min-h-[600px] items-center justify-center bg-neutral-100 bg-opacity-80">
        <div className="dots animate-[dots_1s_linear_infinite]" />
      </div>
    </FloatingOverlay>
  )
}

export default Spinner
