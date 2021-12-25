// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// State is injected automatically by useReducer.
// New state is explicitly passed as an argument to setCount.
// Usually, newState would be action that mutates state on a switch expression
// Here we are just returning the action as the new state
const countReducer = (_state, newState) => newState

function Counter({initialCount = 0, step = 1}) {
  // 🐨 replace React.useState with React.useReducer.
  // setCount is the name we are giving to our dispatch method
  const [count, setCount] = React.useReducer(countReducer, initialCount)

  // 💰 you can write the countReducer function so you don't have to make any changes to the next two lines of code!
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  const increment = () => setCount(count + step)

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
