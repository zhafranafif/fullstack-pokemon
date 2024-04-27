import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { myPokemonApi, pokemonApi } from './pokemon'
import { modalSliceReducer } from './modal-services/modal'

const rootReducer = combineReducers({
    modal: modalSliceReducer,
    [pokemonApi.reducerPath] : pokemonApi.reducer,
    [myPokemonApi.reducerPath] : myPokemonApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(pokemonApi.middleware, myPokemonApi.middleware)
})

setupListeners(store.dispatch)
export default store