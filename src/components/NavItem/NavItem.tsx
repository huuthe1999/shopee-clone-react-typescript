import { Link } from 'react-router-dom'

interface Props {
  className?: string
  to?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  text?: string
  children?: React.ReactNode
}

const NavItem = ({ to, leftIcon, rightIcon, text, className, children }: Props) => {
  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  )

  return (
    <li className={`px-2 ${className ?? ''}`}>
      {to ? (
        <Link className="flex gap-1 hover:text-neutral-200" to={to}>
          {content}
        </Link>
      ) : children ? (
        <>{children}</>
      ) : (
        <span className="flex gap-1 hover:text-neutral-200 items-center">{content}</span>
      )}
    </li>
  )
}

export default NavItem
