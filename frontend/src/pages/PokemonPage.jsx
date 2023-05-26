import PokemonList from "../components/PokemonList";
import styles from "./PokemonPage.module.css";
import PokemonDetail from "../components/PokemonDetail";
import { useState } from "react";
import { useAuth } from "../components/Auth";
import useGet from "../hooks/useGet";
import { POKEMON_URL } from "../api/urls";

/**
 * The main app homepage. Displays all of the authenticated user's pokemon, and allows the
 * user to favourite and un-favourite 'mons. Also displays a larger view with more details
 * of the currently selected mon.
 */
export default function PokemonPage() {
  const { token } = useAuth();
  const { data: pokemon, refresh } = useGet(POKEMON_URL, [], true);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const selectedPokemon = pokemon.find((p) => p._id == selectedPokemonId);

  // Changes which pokemon is displayed in the detail view, when one is clicked
  // in the list.
  function handleClick(e, pokemon) {
    setSelectedPokemonId(pokemon._id);
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>My Pokemon</h2>
        <PokemonList pokemon={pokemon} onClick={handleClick} />
      </div>

      <div>
        <h2>Details</h2>
        <PokemonDetail pokemon={selectedPokemon} />
      </div>
    </div>
  );
}
