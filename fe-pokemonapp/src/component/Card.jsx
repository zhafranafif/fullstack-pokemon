import React from 'react'
import { useGetPokemonByNameQuery } from '../services/pokemon'


const Card = ({pokemon, handleOpenModal}) => {
  const {data, error, isLoading} = useGetPokemonByNameQuery(pokemon)

  if(error) {
    return <p> Uh ohh.. Something went wrong in card component!</p>
  }

  if(isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='w-40 bg-emerald-500 rounded-lg cursor-pointer' onClick={handleOpenModal}>
        <div className="flex flex-col items-center pb-10">
        <img className="mb-3" src={data?.sprites.front_default} alt={data.name}/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
    </div>
    </div>
  )
}

export default Card