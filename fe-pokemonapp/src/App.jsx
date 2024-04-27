import Header from "./component/Header"
import MyPokemonList from "./component/MyPokemonList";
import PokemonList from "./component/PokemonList"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="bg-indigo-950 min-h-screen w-full">
    <Header/>
    <Routes>
      <Route path="/" element={<PokemonList/>}/>
      <Route path="/my-pokemon" element={<MyPokemonList/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
