import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
    reducerPath: 'pokemonAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/'}),
    endpoints: (builder) => ({
        getAllPokemon: builder.query({
            query: () => 'pokemon/?limit=20&offset=20'
        }),
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`
        })
    })
})

export const { useGetAllPokemonQuery, useGetPokemonByNameQuery } = pokemonApi
