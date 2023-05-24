import { FloatingOverlay } from '@floating-ui/react'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { Variants, motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { Button, DropItemMenu } from '@/components'
import { AUTH, EVENT_MODALS } from '@/constants'
import { useAuthContext, useTooltipContext } from '@/contexts'
import { authServices } from '@/services'
import { authUtils } from '@/utils'

const panelVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.6
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: 'circIn'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    transition: {
      duration: 0.1,
      ease: 'circOut'
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
      ease: 'easeOut',
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.2
    }
  }
}

interface Props
  extends Pick<DropItemMenu, 'heading' | 'description' | 'buttonText' | 'eventModal'> {
  setShowModal: (showModal: boolean) => void
}

function Modal({ eventModal, setShowModal, heading, description, buttonText }: Props) {
  const { setOpen } = useTooltipContext()
  const { handleResetAuth } = useAuthContext()

  const logoutMutation = useMutation({
    mutationFn: authServices.logoutUser
  })

  const handleSubmit = async () => {
    if (eventModal === EVENT_MODALS.LOGOUT_EVENT) {
      await logoutMutation.mutateAsync(undefined, {
        onSuccess({ data }) {
          if (data.isSuccess) {
            //Reset auth
            authUtils.removeItem(AUTH.IS_LOGGING)
            authUtils.removeItem(AUTH.USER_INFO)
            handleResetAuth()

            // navigate(PATHS.LOGIN_PATH, { replace: true })
            // Close modal
            setShowModal(false)
            // Toast message
            toast.success(data.message)
          }
        }
      })
    }
  }

  return (
    <div
      className="relative z-[99999]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      {/* Overlay */}
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={backdropVariants}
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity">
        <FloatingOverlay
          onClick={() => {
            setShowModal(false)
            setOpen(false)
          }}
          className="fixed inset-0 z-10 overflow-y-auto"
          lockScroll>
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={panelVariants}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {/* Start content */}
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Start Icon */}
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  {/* End Icon */}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">{heading}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End content */}
              {/* Start Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                  isLoading={logoutMutation.isLoading}
                  disabled={logoutMutation.isLoading}
                  onClick={handleSubmit}
                  className={classNames(
                    'inline-flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                  )}>
                  {buttonText}
                </Button>

                <Button
                  isLoading={logoutMutation.isLoading}
                  disabled={logoutMutation.isLoading}
                  onClick={() => {
                    setShowModal(false)
                    setOpen(false)
                  }}
                  className={classNames(
                    'mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  )}>
                  Cancel
                </Button>
              </div>
              {/* End Footer */}
            </motion.div>
          </div>
        </FloatingOverlay>
      </motion.div>
    </div>
  )
}

export default Modal