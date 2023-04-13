import { DropItemMenu } from '@/components/DropdownMenu'

export interface INavItem {
  id: number
  menuItems?: DropItemMenu[]
  className?: string
  to?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  text?: string
  children?: React.ReactNode
  isVisible?: boolean
}
