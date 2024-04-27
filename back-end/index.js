import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express()
const port = 3001

const corsOption = {
    origin: 'https://silver-winner-jwwg7jgg44x35jg9-5173.app.github.dev',   
}

app.use(cors(corsOption))
app.use(bodyParser.json())


let myPokemonList = []

const isPrimeNumber = (number) => {
    if(number < 2){
        return false
    }
    for(let i = 2; i < Math.sqrt(number); i++){
        if(number % i === 0){
            return false
        }
        return true
    }
}


app.post('/catch-pokemon/:name',  async (req, res) => {
    const name = req.params.name
    const success = Math.random() < 0.5
    
    try{
        if(success){
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const pokemon = response.data

            const caughtPokemon = {
                name: pokemon.name,
                nickname: req.body.nickname = '',
                weight: pokemon.weight,
                height: pokemon.height,
                sprites: pokemon.sprites
            }
            myPokemonList.push(caughtPokemon)
            res.status(200).json({success: true, message: "Pokemon caught successfully!", data: caughtPokemon})
        } else {
            res.status(200).json({success: false, message: "Failed to catch a pokemon!"})
        }
    } catch(error) {
        console.error("Failed to catch a Pokémon:", error);
        res.status(500).json({ success: false, message: "Failed to catch a Pokémon!" });
    }
})

app.delete('/release-pokemon/:name', (req, res) => {
    const name = req.params.name
    const randomNumber = Math.floor(Math.random() * 100) + 1
    const success = isPrimeNumber(randomNumber)

    const selectedPokemon = myPokemonList.findIndex((pokemon) => pokemon.name === name)

    if(selectedPokemon !== -1){
        myPokemonList.splice(selectedPokemon, 1)
    }

    if(success){    
        res.status(200).json({success: true, message: `Pokemon ${name} has been released successfully!`, data: randomNumber})
    } else {
        res.status(200).json({success: false, message: `Failed to released Pokemon ${name}`})
    }
})

app.get('/my-pokemon', (req, res) => {
    const data = myPokemonList.map((pokemon) => {
        return {
            name: pokemon.name,
            nickname: pokemon.nickname,
            weight: pokemon.weight,
            height: pokemon.height,
            sprites: pokemon.sprites.front_default
        }
    })
    try{
        console.log(res.status(200).json(data))
    } catch(error){
        console.error("Error fetching my Pokemon:", error);
        res.status(500).json({ message: "Failed to fetch my Pokemon", error });
    }
})

app.put('/my-pokemon/:name/nickname', async (req, res) => {
    const name = req.params.name;
    const newNickname = req.body.nickname;
  
    try {
      const pokemonIndex = myPokemonList.findIndex(pokemon => pokemon.name === name);
      if (pokemonIndex === -1) {
        return res.status(404).json({ message: `Pokemon with name ${name} not found!` });
      }
      myPokemonList[pokemonIndex].nickname = newNickname;
      res.status(200).json({ message: `Nickname for ${name} updated successfully!` });
    } catch (error) {
      console.error(`Error updating nickname for ${name}:`, error);
      res.status(500).json({ message: 'Failed to update nickname' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})