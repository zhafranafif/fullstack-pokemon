import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './pokemon'

export const store = configureStore({
    reducer: {
        [pokemonApi.reducerPath] : pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(pokemonApi.middleware)
    }
})

setupListeners(store.dispatch)
