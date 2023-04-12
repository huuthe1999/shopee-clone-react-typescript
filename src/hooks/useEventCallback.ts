import { useCallback, useRef } from 'react'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useEventCallback<Args extends unknown[], R>(callback: (...args: Args) => R) {
  const callbackRef = useRef<typeof callback>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // update the callbackRef if the callback function changes
  return useCallback((...args: Args) => callbackRef.current(...args), [callbackRef])
}

export default useEventCallback
