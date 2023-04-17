import { ButtonHTMLAttributes } from 'react'

import { LoadingIcon } from '@/components/Icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
const Button = ({ className, children, disabled, isLoading, ...rest }: ButtonProps) => {
  const customClassName = disabled ? className + ' cursor-not-allowed' : className
  return (
    <button className={customClassName} disabled={disabled} {...rest}>
      {isLoading && <LoadingIcon />}
      {children}
    </button>
  )
}

export default Button
