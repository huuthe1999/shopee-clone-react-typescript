import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp } from 'react-feather'

import { ForwardButton } from '@/components'

const ButtonMotion = motion(ForwardButton)
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  const handleScroll = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <ButtonMotion
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.2 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', bounce: 0.5, stiffness: 200, damping: 17 }}
          className="fixed bottom-4 right-5 z-50 rounded-full bg-primary p-2 text-white ring-1 ring-primary"
          onClick={() => {
            handleScroll()
          }}>
          <ChevronUp />
        </ButtonMotion>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
