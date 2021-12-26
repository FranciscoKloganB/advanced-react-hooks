import * as React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]

  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  const ctx = React.useContext(CountContext)

  if (!ctx) {
    throw new Error('useCount must be used within a CountProvider')
  }

  return ctx
}

export { CountProvider, useCount }