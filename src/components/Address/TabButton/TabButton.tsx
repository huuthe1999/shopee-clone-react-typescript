import { startTransition } from 'react'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components'

interface Props {
  isActive: boolean
  disabled?: boolean
  onClick: () => void
  label: string
}

export function TabButton({ disabled, isActive, label, onClick }: Props) {
  return (
    <>
      <li
        className={classNames('relative flex-grow', {
          'text-primary': isActive
        })}>
        <Button
          disabled={disabled}
          className={classNames('w-full px-4 py-2')}
          onClick={() => {
            startTransition(() => {
              onClick()
            })
          }}>
          {label}
        </Button>
        <AnimatePresence>
          {isActive && (
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
              layoutId="tab-underline"
              transition={{
                type: 'tween',
                duration: 0.2
              }}
            />
          )}
        </AnimatePresence>
      </li>
    </>
  )
}
