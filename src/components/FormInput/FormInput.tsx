import { InputHTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  invalid: boolean
  isDirty: boolean
  label?: string
  isShowError?: boolean
  showLabel?: boolean
  errorMessage?: string
  rightIcon?: React.ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    { invalid, label, isShowError = true, showLabel = false, errorMessage, rightIcon, ...props },
    ref
  ) => {
    return (
      <div className="flex w-full flex-col">
        <div
          className={classNames('relative z-0 w-full', {
            'flex items-center gap-x-4': showLabel
          })}>
          {showLabel && (
            <label
              htmlFor={props.name}
              className="shrink-0 basis-1/5 text-right text-sm text-neutral-600 md:basis-1/4">
              {label}
            </label>
          )}
          <input
            {...props}
            ref={ref}
            id={props.name}
            className={classNames(
              'peer/label block w-full appearance-none rounded-sm border p-2 text-sm text-gray-900 focus:border-black/[0.54] focus:bg-transparent focus:outline-none focus:ring-0',
              {
                'border-red-600 bg-red-50': invalid,
                'border-gray-300 bg-transparent': !invalid && !props.disabled,
                'pointer-events-none cursor-not-allowed select-none bg-slate-200': props.disabled,
                'basis-auto': showLabel
              }
            )}
            placeholder=" "
            autoComplete="off"
          />
          {rightIcon}
          {!showLabel && label && (
            <label
              htmlFor={props.name}
              className={classNames(
                'absolute left-3 top-1/2 z-10 origin-[0] -translate-y-[1.8rem] scale-75 transform bg-white px-1 text-sm duration-100 peer-placeholder-shown/label:-translate-y-1/2 peer-placeholder-shown/label:scale-100 peer-placeholder-shown/label:bg-transparent peer-focus/label:-translate-y-[1.8rem] peer-focus/label:scale-75 peer-focus/label:bg-white peer-focus/label:text-inherit',
                {
                  'bg-white text-red-500': invalid,
                  'text-inherit': !invalid
                }
              )}>
              {label}
            </label>
          )}
        </div>
        <AnimatePresence>
          {isShowError && errorMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '1.25rem' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'tween', duration: 0.1 }}
              className={classNames('mt-1 text-xs text-red-500', {
                'ml-auto w-4/5 pl-4 md:w-3/4': showLabel
              })}>
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
