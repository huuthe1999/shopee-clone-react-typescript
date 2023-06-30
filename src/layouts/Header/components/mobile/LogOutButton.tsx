import { LogOut } from 'react-feather'

import { Modal } from '@/components'
import { AUTH } from '@/constants'
import { RIGHT_NAV } from '@/data/header'
import { useBoolean, useLogOut } from '@/hooks'

const logOutData = RIGHT_NAV.find((item) => item.text === AUTH.USER_INFO)
export const LogOutButton = () => {
  const { value, setTrue, setValue, setFalse } = useBoolean()
  const logoutMutation = useLogOut()

  const handleSubmit = async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSettled() {
        // Close modal
        setValue(false)
      }
    })
  }

  return (
    <>
      <LogOut className="mx-2 shrink-0 text-primary sm:hidden" onClick={setTrue} />
      {logOutData && (
        <Modal
          setShowModal={setValue}
          confirmText={logOutData.menuItems?.[1].buttonText}
          onSubmit={handleSubmit}
          onCancel={setFalse}
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
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {logOutData.menuItems?.[1].heading}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{logOutData.menuItems?.[1].description}</p>
              </div>
            </div>
          </div>
          {/* End content */}
        </Modal>
      )}
    </>
  )
}
