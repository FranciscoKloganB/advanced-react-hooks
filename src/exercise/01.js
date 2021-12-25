// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js
// 1. 💯 accept the step as the action
import * as React from 'react'

const countReducer = (state, action) => {
  if (typeof action === 'function') {
    return { ...state, ...action()}
  }
  
  return {...state, ...action}
}

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  const increment = () => setState({count: count + step})
  const incrementWithFunction = () => setState(() => ({count: count + step}))
  return (
    <div>
      <p>Increment with object:</p>
      <button onClick={increment}>{count}</button>
      <p>Increment with function:</p>
      <button onClick={incrementWithFunction}>{count}</button>
    </div>
  )
}

function App() {
  return <Counter />
}

export default App
