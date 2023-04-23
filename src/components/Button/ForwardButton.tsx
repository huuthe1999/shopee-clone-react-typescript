import { forwardRef } from 'react'

import { LoadingIcon } from '@/components/Icon'

import { ButtonProps } from './type'

const ForwardButton = forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement> & ButtonProps
>(({ className, children, disabled, isLoading, ...rest }, ref) => {
  const customClassName = disabled ? className + ' cursor-not-allowed' : className
  return (
    <button ref={ref} className={customClassName} disabled={disabled} {...rest}>
      {isLoading && <LoadingIcon />}
      {children}
    </button>
  )
})

export default ForwardButton
