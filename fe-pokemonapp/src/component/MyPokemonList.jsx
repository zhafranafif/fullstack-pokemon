import React from 'react'
import { useGetAllMyPokemonQuery, useReleasePokemonMutation } from '../services/pokemon'
import { toast } from 'react-toastify'


const MyPokemonList = () => {
    const {data, error, loading} = useGetAllMyPokemonQuery()
    const [releasePokemon] = useReleasePokemonMutation()
    const name = data?.length > 0 ? data[0].name : null;
    const handleReleasePokemon = () => {
      releasePokemon({name: name})
      .then((response) => {
      if(response.data.success){
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000
        })
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 3000
        })
      }
      })
      .catch((error) => {
        console.error("Cant release the pokemon!", error)
      })
    }
    console.log(data)
  return (
    <>
    <h5 className='mt-3 font-bold text-white text-center'>My Pokemon List</h5>
    <div className='mt-5 flex flex-row flex-wrap justify-center items-center gap-x-1.5 gap-y-1.5'>
        {data?.map((pokemon, index) => (
            <div key={index} className='w-40 bg-emerald-500 rounded-lg cursor-pointer'>
            <div className="flex flex-col items-center pb-10">
            <img className="mb-3" src={pokemon.sprites} alt={pokemon.name}/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{pokemon.name}</h5>
            <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="text-sm text-gray-700 font-semibold">{pokemon.weight}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="text-sm text-gray-700 font-semibold">{pokemon.height}</p>
        </div>
        </div>
        </div>
        <div className="flex flex-row justify-center mb-2">
        <button onClick={handleReleasePokemon} className='p-2 bg-red-600 text-white font-bold rounded'>Release Pokemon!</button>
          </div>
        </div>
        ))}
    </div>
    </>
  )
}

export default MyPokemonList