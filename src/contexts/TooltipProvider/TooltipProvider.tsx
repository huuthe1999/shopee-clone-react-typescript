import * as React from 'react'

import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface TooltipOptions {
  mainAxis?: number
  initialOpen?: boolean
  placement?: Placement
  open?: boolean
  click?: boolean
  noArrowRef?: boolean
  matchRefWidth?: boolean
  onOpenChange?: (open: boolean) => void
}

export function useTooltip({
  mainAxis,
  initialOpen = false,
  placement = 'top',
  click: controlledClick,
  open: controlledOpen,
  noArrowRef = false,
  matchRefWidth = false,
  onOpenChange: setControlledOpen
}: TooltipOptions = {}) {
  const arrowRef = React.useRef(null)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen

  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(mainAxis ?? 10),
      matchRefWidth &&
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`
            })
          }
        }),
      flip({
        fallbackAxisSideDirection: 'end'
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef
      })
    ]
  })

  const context = data.context

  const hover = useHover(context, {
    enabled: !controlledClick,
    handleClose: safePolygon({
      blockPointerEvents: true
    })
  })

  const focus = useFocus(context, {
    enabled: controlledOpen == null
  })

  const click = useClick(context, {
    enabled: controlledClick
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([hover, click, focus, dismiss, role])

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
      noArrowRef
    }),
    [open, setOpen, interactions, data, noArrowRef]
  )
}

type ContextType = ReturnType<typeof useTooltip> | null

const TooltipContext = React.createContext<ContextType>(null)

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext)

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />')
  }

  return context
}

export function TooltipProvider({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options)
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed'
      })
    )
  }

  return (
    <li
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}>
      {children}
    </li>
  )
})

export const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function TooltipContent({ children, ...props }, propRef) {
    const { arrowRef, noArrowRef, context: floatingContext, ...context } = useTooltipContext()
    const ref = useMergeRefs([context.refs.setFloating, propRef])

    return (
      <FloatingPortal>
        <AnimatePresence initial={false}>
          {context.open && (
            <motion.div
              ref={ref}
              style={{
                backgroundColor: 'inherit',
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
                width: 'max-content',
                visibility: context.x == null ? 'hidden' : 'visible',
                zIndex: 1000
              }}
              initial={{
                opacity: 0,
                scale: 0,
                transformOrigin: context.middlewareData.arrow?.x
                  ? `${context.middlewareData.arrow?.x + 14}px -10px`
                  : '95% top'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transformOrigin: context.middlewareData.arrow?.x
                  ? `${context.middlewareData.arrow?.x + 14}px -10px`
                  : undefined
              }}
              exit={{
                opacity: 0,
                scale: 0,
                transformOrigin: context.middlewareData.arrow?.x
                  ? `${context.middlewareData.arrow?.x + 14}px -10px`
                  : undefined
              }}
              transition={{
                type: 'tween',
                ease: [0.4, 0, 0.6, 1],
                duration: 0.2
              }}
              {...context.getFloatingProps(props)}>
              {children}
              {!noArrowRef && (
                <FloatingArrow
                  ref={arrowRef}
                  context={floatingContext}
                  width={28}
                  height={10}
                  className="fill-white [&>path:last-of-type]:stroke-white"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    )
  }
)
