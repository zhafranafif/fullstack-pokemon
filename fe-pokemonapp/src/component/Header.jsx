import pokemonLogo from "../assets/pokemon-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <> 
    <div className="text-white font-pokemon-sans">
      <div className="flex justify-center items-center">
        <Link to={"/"}>
        <img src={pokemonLogo} alt="Logo"/>
        </Link>
      </div>
      <div className="text-center hover:underline">
        <Link to={"/my-pokemon"}>My Pokemon</Link>
      </div>
    </div>
  </>
  )
}

export default Header