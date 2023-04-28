import classNames from 'classnames'
import { Variants, motion } from 'framer-motion'

import { ButtonProps, ForwardButton } from '@/components'

const MotionControl = motion(ForwardButton)

const variants: Variants = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

interface Props extends Omit<ButtonProps, 'isLoading'> {
  onControl?: () => void
  previousSlide?: () => void
  nextSlide?: () => void
  previousDisabled?: boolean
  nextDisabled?: boolean
  children?: React.ReactNode
}
const ButtonControl = ({
  onControl,
  previousSlide,
  nextSlide,
  nextDisabled,
  previousDisabled,
  children,
  className
}: Props) => {
  return (
    <MotionControl
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        ease: 'linear',
        duration: 0.2
      }}
      className={classNames([className])}
      onClick={onControl || nextSlide || previousSlide}
      disabled={nextDisabled || previousDisabled}>
      {children}
    </MotionControl>
  )
}

export default ButtonControl
