import * as React from 'react'

// 🐨 Create a PokemonCacheContext
const CacheContext = React.createContext()

// 🐨 create a PokemonCacheProvider function
function CacheProvider(props) {
  // 🐨 useReducer with pokemonCacheReducer in your PokemonCacheProvider
  const [cache, setCache] = React.useState({})

  const cacheGet = (k) => cache[k]
  const cacheSet = (k, v) => setCache({...cache, [k]: v})

  const value = [cache, cacheGet, cacheSet]

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