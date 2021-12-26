import * as React from 'react'

export function useSafeDispatch(unsafeDispatch) {
  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    mountedRef.current = true

    return () => (mountedRef.current = false)
  }, [])

  return React.useCallback(
    (...args) => {
      if (mountedRef.current) {
        unsafeDispatch(...args)
      }
    },
    // eslint does not know unsafeDispatch never changes, so we can not use [], but we do.
    [unsafeDispatch],
  )
}