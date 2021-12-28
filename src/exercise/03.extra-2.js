// useContext: Caching response data in context
// 💯 caching in a context provider (exercise)
// http://localhost:3000/isolated/exercise/03.extra-2.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import {useAsync} from '../utils'
import {CacheProvider, useCache} from '../hooks/useCache'

function PokemonInfo({pokemonName}) {
  // 🐨 get the cache and dispatch from useContext with PokemonCacheContext
  const [cache, dispatch] = useCache()
  const {data: pokemon, status, error, run, setData} = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'SET_KEY', key: pokemonName, value: pokemonData})
          return pokemonData
        }),
      )
    }
  }, [cache, dispatch, pokemonName, run, setData])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function PreviousPokemon({onSelect}) {
  // 🐨 get the cache from useContext with PokemonCacheContext
  const [cache] = useCache()
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{margin: '4px auto'}}>
            <button
              style={{width: '100%'}}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PokemonSection({onSelect, pokemonName}) {
  // 🐨 wrap this in the PokemonCacheProvider so the PreviousPokemon
  // and PokemonInfo components have access to that context.
  return (
    <CacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{marginLeft: 10}}>
          <PokemonErrorBoundary onReset={() => onSelect('')} resetKeys={[pokemonName]}>
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </CacheProvider>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
