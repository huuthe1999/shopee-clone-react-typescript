import { FloatingPortal } from '@floating-ui/react'
import { AnimatePresence } from 'framer-motion'

import { Modal } from '@/components'
import useBoolean from '@/hooks/useBoolean'

import MenuItem from './MenuItem'
import { MenuItemProps } from './type'

const MenuItemWithModal = ({
  heading,
  description,
  eventModal,
  buttonText,
  ...props
}: Omit<MenuItemProps, 'onClick'>) => {
  const { value, setTrue, setValue } = useBoolean()

  const modalProps = { heading, description, eventModal, buttonText }
  return (
    <>
      <MenuItem {...props} onClick={setTrue} />
      <AnimatePresence initial={false}>
        <FloatingPortal>
          {value && <Modal setShowModal={setValue} {...modalProps} />}
        </FloatingPortal>
      </AnimatePresence>
    </>
  )
}

export default MenuItemWithModal
