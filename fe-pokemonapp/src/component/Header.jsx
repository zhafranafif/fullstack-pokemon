import pokemonLogo from "../assets/pokemon-logo.png";

const Header = () => {
  return (
    <> 
    <div className="text-white font-pokemon-sans">
        <img src={pokemonLogo} alt="Logo" />
    <h1 className="text-2xl font-bold text-center">Hello, Tailwind CSS!</h1>
    <p className="text-center mt-4">This is a Vite project with React.js and Tailwind CSS.</p>
    </div>
  </>
  )
}

export default Header