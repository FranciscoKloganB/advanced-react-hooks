import * as React from 'react'

function cacheReducer(state, action) {
  switch (action.type) {
    case 'SET_KEY': {
      return {...state, [action.key]: action.value}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}. Possible actions: SET_KEY.`)
    }
  }
}

// 🐨 Create a PokemonCacheContext
const CacheContext = React.createContext()

// 🐨 create a PokemonCacheProvider function
function CacheProvider(props) {
  // 🐨 useReducer with pokemonCacheReducer in your PokemonCacheProvider
  const [cache, dispatch] = React.useReducer(cacheReducer, {})

  const value = [cache, dispatch]

  // 🐨 return your context provider with the value assigned to what you get back from useReducer
  return <CacheContext.Provider value={value} {...props} />
}

function useCache() {
  const ctx = React.useContext(CacheContext)

  if (!ctx) {
    throw new Error('useCache must be used within a CacheProvider')
  }

  return ctx
}

export {CacheProvider, useCache}