import React from 'react'
import { useGetPokemonByNameQuery } from '../services/pokemon'


const Card = ({pokemon}) => {
  const {data, error, isLoading} = useGetPokemonByNameQuery(pokemon)

  if(error) {
    return <p> Uh ohh.. Something went wrong!</p>
  }

  if(isLoading) {
    return <p>Loading...</p>
  }

  console.log(data)

  return (
    <div className='w-full max-w-sm bg-emerald-500 border rounded-lg'>
        <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={data?.sprites.front_default} alt={data.name}/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
        <div class="flex mt-4 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Add friend</a>
            <a href="#" class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</a>
        </div>
    </div>
    </div>
  )
}

export default Card