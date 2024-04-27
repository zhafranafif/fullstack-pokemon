import React from 'react'

const CatchModal = ({nickname, onChange, closeNicknameModal, isCatch, handleUpdateNickname}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-45 flex justify-center items-center">
    <div className="bg-white w-72 max-w-sm p-6 rounded-lg shadow-xl">
    <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={closeNicknameModal}>Close</button>
        {isCatch ? (
                
                <div className='flex flex-col gap-2'>
                    <h2 className="text-center my-3">Nickname</h2>
                    <input
                      type="text"
                      placeholder="Enter nickname"
                      value={nickname}
                      onChange={onChange}
                      className='outline-1'
                    />
                    <button className='bg-yellow-300 text-white font-bold rounded p-2' onClick={handleUpdateNickname}>Set Your Pokemon Nickname!</button>
                </div>
                
        ) : null}
    </div>
    </div> 
  )
}

export default CatchModal