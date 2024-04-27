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

export const myPokemonApi = createApi({
    reducerPath: 'myPokemonAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://silver-winner-jwwg7jgg44x35jg9-3001.app.github.dev/'}),
    endpoints: (builder) => ({
        getAllMyPokemon: builder.query({
            query: () => '/my-pokemon'
        }),
        releasePokemon: builder.mutation({
            query: ({name}) => ({
                url:`/release-pokemon/${name}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["myPokemon"],
        }),
        catch: builder.mutation({
            query: ({name}) => ({
                url:`/catch-pokemon/${name}`,
                method:'POST',
            }),
            invalidatesTags: ["myPokemon"],
        }),
        updatePokemon: builder.mutation({
            query: ({name}) => ({
                url:`/my-pokemon/${name}/nickname`,
                method: 'PUT'
            }),
            invalidatesTags: ["myPokemon"],
        })
    })
})

export const  { useGetAllMyPokemonQuery, useCatchMutation, useReleasePokemonMutation, useUpdatePokemonMutation } = myPokemonApi
export const { useGetAllPokemonQuery, useGetPokemonByNameQuery } = pokemonApi

