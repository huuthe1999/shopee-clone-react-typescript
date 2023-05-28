import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Modal } from '@/components'
import { AUTH, EVENT_MODALS, QUERY_KEYS } from '@/constants'
import { useAuthContext } from '@/contexts'
import useBoolean from '@/hooks/useBoolean'
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
      await logoutMutation.mutateAsync(undefined, {
        onSuccess({ data }) {
          if (data.isSuccess) {
            //Reset auth
            authUtils.removeItem(AUTH.IS_LOGGING)
            authUtils.removeItem(AUTH.USER_INFO)
            handleResetAuth()

            queryClient.removeQueries({ queryKey: [QUERY_KEYS.order] })
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

  const modalProps = { heading, description, eventModal, buttonText }

  return (
    <>
      <MenuItem {...props} onClick={setTrue} />
      <Modal
        setShowModal={setValue}
        {...modalProps}
        onSubmit={handleSubmit}
        isLoading={logoutMutation.isLoading}
        value={value}
      />
    </>
  )
}

export default MenuItemWithModal
