import React from 'react'

import { Breakpoint } from '@/types'

export function useViewport() {
  const [viewport, setViewport] = React.useState<Breakpoint>('')

  React.useEffect(() => {
    const handler = () => {
      const width = window.innerWidth
      let device: Breakpoint = ''

      if (width < 640) {
        device = 'sm'
      } else if (width >= 640 && width < 768) {
        device = 'md'
      } else if (width >= 768 && width < 1024) {
        device = 'lg'
      } else if (width >= 1024 && width < 1280) {
        device = 'xl'
      } else if (width >= 1280) {
        device = '2xl'
      } else {
        device = '' // Default to the largest breakpoint
      }

      setViewport(device)
    }
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return viewport
}
