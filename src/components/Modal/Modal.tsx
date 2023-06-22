import { FloatingOverlay, FloatingPortal } from '@floating-ui/react'
import classNames from 'classnames'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { X } from 'react-feather'

import { Button } from '@/components'

const panelVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.4
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: 'easeIn'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.4,
    transition: {
      duration: 0.1,
      ease: 'easeOut'
    }
  }
}

const backdropVariants: Variants = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    backdropFilter: 'blur(2px)',
    transition: {
      ease: 'circIn',
      duration: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'circOut',
      duration: 0.1
    }
  }
}

interface Props {
  confirmText?: string
  cancelText?: string
  headerText?: React.ReactNode
  setShowModal: (showModal: boolean) => void
  open: boolean
  isHiddenFooter?: boolean
  onSubmit: () => void
  onCancel?: () => void
  isLoading: boolean
  disabledBlur?: boolean
  disabledSubmitButton?: boolean
  children: React.ReactNode
}

function Modal({
  setShowModal,
  confirmText = 'Oke',
  cancelText = 'Cancel',
  headerText,
  disabledBlur = false,
  isHiddenFooter = false,
  open,
  onCancel,
  onSubmit,
  disabledSubmitButton,
  isLoading,
  children
}: Props) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <FloatingPortal id="modal-portal">
          <div
            className="relative z-[9999]"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
            {/* Overlay */}
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={backdropVariants}
              className="fixed inset-0 bg-gray-700 bg-opacity-75">
              <FloatingOverlay
                onClick={() => {
                  if (!disabledBlur) {
                    onCancel?.() ?? setShowModal(false)
                  }
                  // setOpen(false)
                }}
                className="fixed inset-0 z-10"
                lockScroll>
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    variants={panelVariants}
                    className="relative w-full overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:max-w-lg">
                    {/* Close button */}
                    <Button
                      onClick={() => {
                        onCancel?.() ?? setShowModal(false)
                        // setOpen(false)
                      }}
                      className="absolute right-2.5 top-3 z-50 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                      data-modal-hide="popup-modal">
                      <X className="h-5 w-5 fill-current" />
                      <span className="sr-only">Close modal</span>
                    </Button>
                    {/* Start header */}
                    {headerText && (
                      <div className="relative z-40 w-full border-b border-gray-200 bg-gray-50 px-6 py-4 font-medium capitalize sm:text-lg">
                        {headerText}
                      </div>
                    )}
                    {/* End header */}
                    {/* Start children */}
                    <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      {children}
                    </div>
                    {/* End children */}
                    {/* Start Footer */}
                    {!isHiddenFooter && (
                      <div className="z-50 border-t border-gray-200 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <Button
                          type="submit"
                          isLoading={isLoading}
                          disabled={disabledSubmitButton ?? isLoading}
                          onClick={onSubmit}
                          className={classNames(
                            'inline-flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                          )}>
                          {confirmText}
                        </Button>
                        <Button
                          disabled={isLoading}
                          onClick={() => {
                            onCancel?.() ?? setShowModal(false)
                            // setOpen(false)
                          }}
                          className={classNames(
                            'mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                          )}>
                          {cancelText}
                        </Button>
                      </div>
                    )}
                    {/* End Footer */}
                  </motion.div>
                </div>
              </FloatingOverlay>
            </motion.div>
          </div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  )
}

export default Modal
