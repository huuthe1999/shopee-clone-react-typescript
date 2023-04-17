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
  text: string
  to?: To
}
