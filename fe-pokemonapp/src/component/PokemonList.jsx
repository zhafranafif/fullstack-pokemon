import { useEffect } from 'react';
import  { useGetAllPokemonQuery } from '../services/pokemon';
import { useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../services/modal-services/modal';
import Modal from './Modal';

const PokemonList = () => { 
  const {data: pokemonData, error, isLoading} = useGetAllPokemonQuery()
  const [pokemonName, setPokemonName] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const dispatch = useDispatch()
  const open = useSelector((state) => state.modal.isOpen)

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
  
  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon)
    dispatch(openModal())
  }
  
  return (
    <div className='mt-5 flex flex-row flex-wrap justify-center gap-x-1.5 gap-y-1.5'>
      {pokemonName.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} handleOpenModal={() => handleOpenModal(pokemon)}/>
      ))}
      {open && <Modal pokemon={selectedPokemon}/>}
    </div>
  )
}

export default PokemonList