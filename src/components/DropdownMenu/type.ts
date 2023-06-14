import { To } from 'react-router-dom'

export interface DropItemMenu {
  eventModal?: string
  heading?: string
  description?: string
  buttonText?: string
  hasPopup?: boolean
  className?: string
  image?: string
  price?: number
  text: React.ReactNode
  to?: To
}

export type MenuItemProps = Omit<DropItemMenu, 'hasPopup'> & {
  onClick?: () => void
  leftButtonIcon?: React.ReactNode
  rightButtonIcon?: React.ReactNode
  buttonClassName?: string
}
