import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCatchMutation, useGetPokemonByNameQuery, useUpdatePokemonMutation } from '../services/pokemon'
import { closeModal } from '../services/modal-services/modal'
import CatchModal from './CatchModal'
import { toast } from 'react-toastify';



const Modal = ({pokemon}) => {
  const {data, error, isLoading} = useGetPokemonByNameQuery(pokemon)
  const dispatch = useDispatch()
  const [nickname, setNickname] = useState('')
  const [catchResult, setCatchResult] = useState(null)
  const [isCatch, setIsCatch] = useState(false)
  const [catchPokemon, { isCatchLoading, catchError }] = useCatchMutation()
  const [updatePokemon] = useUpdatePokemonMutation()

  const handleCloseModal = () => {
    dispatch(closeModal())
  } 
  const handleCloseCatchModal = () => {
    setIsCatch(false)
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value)
  }

  const handleUpdateNickname =  () => {
    try {
      updatePokemon({ name: data.name, body: { nickname: nickname } })
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000
        })
        handleCloseCatchModal()
      })
    } catch (error) {
      toast.error('Failed to update nickname:', {
        position: 'top-right',
        autoClose: 3000
      })
    }
  }
  const handleCatchPokemon = () => {
     catchPokemon({name: data.name})
     .then((response) => {
      if(!response.data.success){
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000
        })
        setIsCatch(false)
      } else {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000
        })
        setIsCatch(true)
      }
    })
    .catch((error) => {
      console.error("Failed to catch pokemon", error);
      setCatchResult(false);
      setIsCatch(true)
    })
    }
  if(error || catchError) {
    return <p> Uh ohh.. Something went wrong in the modal component!</p>
  }

  if(isLoading || isCatchLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-45 flex justify-center items-center">
        <div className="bg-white w-72 max-w-sm p-6 rounded-lg shadow-xl">
        <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={handleCloseModal}>Close</button>
        <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center">
        <img className="w-48 mb-3" src={data?.sprites.front_default} alt={data.name}/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 uppercase">{data.name}</h5>
        </div>
        </div>
        <h2 className='text-center my-3'>STATS</h2>
        <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="text-sm text-gray-700 font-semibold">{data.types[0].type.name}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="text-sm text-gray-700 font-semibold">{data.moves[0].move.name}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="text-sm text-gray-700 font-semibold">{data.weight}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="text-sm text-gray-700 font-semibold">{data.height}</p>
        </div>
        </div>
        {isCatch && (
          <CatchModal nickname={nickname} onChange={handleChangeNickname} closeNicknameModal={handleCloseCatchModal} isCatch={isCatch} handleUpdateNickname={handleUpdateNickname}/>
        )
        }
     {!isCatch && (
              <div className="flex flex-row justify-center mt-3">
              <button className="px-4 py-2 bg-yellow-300 text-white font-bold rounded" onClick={handleCatchPokemon}>
                Catch the Pokemon!
              </button>
              </div>
            )}
    </div>
    </div>
  )
}
export default Modal