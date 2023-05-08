import { LoadingIcon } from '@/components'

import { ButtonProps } from './type'

const Button = ({ className, children, disabled, isLoading, ...rest }: ButtonProps) => {
  const customClassName = disabled ? 'cursor-not-allowed opacity-40 ' + className : className
  return (
    <button className={customClassName} disabled={disabled} {...rest}>
      {isLoading && <LoadingIcon />}
      {children}
    </button>
  )
}

export default Button
