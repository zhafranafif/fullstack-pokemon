import { useEffect } from 'react';
import  { useGetAllPokemonQuery } from '../services/pokemon';
import { useState } from 'react';
import Card from './Card';

const PokemonList = () => { 
  const {data: pokemonData, error, isLoading} = useGetAllPokemonQuery()
  const [pokemonName, setPokemonName] = useState([])

  useEffect(() => {
    if(!isLoading) {
      const names = pokemonData?.results.map((pokemon) => {
        return pokemon.name
      })
      setPokemonName(names)
    }
  }, [isLoading])
  
  if(error) {
    return <p> Uh ohh.. Something went wrong!</p>
  }

  if(isLoading) {
    return <p>Loading...</p>
  }
  console.log(pokemonName)
  return (
    <div className='mt-5'>
      {pokemonName.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon}/>
      ))}
    </div>
  )
}

export default PokemonList