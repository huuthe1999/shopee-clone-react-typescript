import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
  onClose: () => void
  open: boolean
}

export const OverLaySearch = ({ children, open, onClose }: Props) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        onClose()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [onClose])

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute -left-[5px] right-0 top-0 hidden h-screen bg-black/40 max-sm:block">
          {children}
        </div>
      )}
    </>
  )
}
