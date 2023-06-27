import React from 'react'

import { FloatingOverlay, FloatingPortal } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter } from 'react-feather'

import { Button, PingIcon } from '@/components'
import { useBoolean } from '@/hooks'

interface Props {
  hasFilter: boolean
  headerText: string
  children: React.ReactNode
  onChangeParam: () => void
}

const CategoryFilterMobile = ({ hasFilter, headerText, children, onChangeParam }: Props) => {
  const { value: open, setTrue, setFalse } = useBoolean()

  return (
    <>
      <Button
        className="fixed right-2 top-3 z-[100] flex shrink-0 flex-nowrap items-end p-1 text-primary sm:hidden"
        onClick={setTrue}>
        <span className="relative">
          {hasFilter && <PingIcon className="right-0.5" />}
          <Filter className="h-6 w-6" />
        </span>
        <span className="text-xxs">Lọc</span>
      </Button>
      <AnimatePresence initial={false}>
        {open && (
          <FloatingPortal>
            <FloatingOverlay
              className="relative z-[9999] bg-black/40"
              onClick={setFalse}
              lockScroll>
              <motion.div
                initial={{
                  right: '-100%'
                }}
                animate={{
                  right: 0
                }}
                exit={{
                  right: '-100%'
                }}
                transition={{
                  type: 'tween',
                  ease: [0.4, 0, 0.6, 1],
                  duration: 0.5
                }}
                className="absolute h-full w-[85%] overflow-hidden bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                }}>
                <div className="relative flex h-full flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto bg-white">
                    {/* Header */}
                    <header className="bg-neutral-100 p-3">{headerText}</header>
                    <div className="flex h-[150vh] flex-col divide-y divide-gray-200">
                      {children}
                    </div>
                  </div>
                  <footer className="fixed bottom-0 z-50 w-[85%] border-t border-gray-200 bg-neutral-100 p-3 text-center">
                    <Button
                      className="w-fit rounded-sm bg-primary px-4 py-2 text-sm text-white"
                      disabled={!hasFilter}
                      onClick={() => onChangeParam()}>
                      Xoá tất cả
                    </Button>
                  </footer>
                </div>
              </motion.div>
            </FloatingOverlay>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  )
}

export default CategoryFilterMobile
