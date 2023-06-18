import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Modal } from '@/components'
import { EVENT_MODALS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useBoolean } from '@/hooks'
import { authServices } from '@/services'
import { authUtils } from '@/utils'

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
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authServices.logoutUser
  })
  const { handleResetAuth } = useAuthContext()

  const handleSubmit = async () => {
    if (eventModal === EVENT_MODALS.LOGOUT_EVENT) {
      logoutMutation.mutate(undefined, {
        onSuccess({ data }) {
          if (data.isSuccess) {
            //Reset auth
            authUtils.clearAll()
            handleResetAuth()

            queryClient.clear()
            // navigate(PATHS.LOGIN_PATH, { replace: true })
            // Close modal
            setValue(false)
            // Toast message
            toast.success(data.message)
          }
        }
      })
    }
  }

  return (
    <>
      <MenuItem {...props} onClick={setTrue} />
      <Modal
        setShowModal={setValue}
        confirmText={buttonText}
        onSubmit={handleSubmit}
        isLoading={logoutMutation.isLoading}
        open={value}>
        {/* Start content */}
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
        {/* End content */}
      </Modal>
    </>
  )
}

export default MenuItemWithModal
