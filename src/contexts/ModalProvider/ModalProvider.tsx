import React, { useCallback, useMemo, useState } from 'react'

import useBoolean from '@/hooks/useBoolean'

export function useModal(initial: boolean) {
  const [heading, setHeading] = useState<string>() // Tiêu đề modal
  const [description, setDescription] = useState<string>() // Mô tả
  const [buttonText, setButtonText] = useState<string>()
  const [eventType, setEventType] = useState<string>()

  const handleSetHeading = useCallback((value?: string) => value && setHeading(value), [])
  const handleSetDescription = useCallback((value?: string) => value && setDescription(value), [])
  const handleSetButtonText = useCallback((value?: string) => value && setButtonText(value), [])
  const handleSetEventType = useCallback((value?: string) => value && setEventType(value), [])
  const handleResetModal = useCallback(() => {
    setHeading(undefined)
    setDescription(undefined)
    setButtonText(undefined)
    setEventType(undefined)
  }, [])

  const context = useBoolean(initial)

  return useMemo(
    () => ({
      ...context,
      heading,
      description,
      buttonText,
      eventType,
      handleSetHeading,
      handleSetDescription,
      handleSetButtonText,
      handleSetEventType,
      handleResetModal
    }),
    [
      heading,
      buttonText,
      context,
      description,
      eventType,
      handleSetHeading,
      handleSetDescription,
      handleSetButtonText,
      handleSetEventType,
      handleResetModal
    ]
  )
}

type ContextType = ReturnType<typeof useModal>

const ModalContext = React.createContext<ContextType>(null!)

export const useModalContext = () => {
  const context = React.useContext(ModalContext)

  return context
}

interface ModalProviderProps {
  initialState?: boolean
  children: React.ReactNode
}

export const ModalProvider = ({ initialState = false, children }: ModalProviderProps) => {
  const Modal = useModal(initialState)

  return <ModalContext.Provider value={Modal}>{children}</ModalContext.Provider>
}
