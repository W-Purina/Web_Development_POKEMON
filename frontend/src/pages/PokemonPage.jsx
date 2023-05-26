import PokemonList from "../components/PokemonList";
import styles from "./PokemonPage.module.css";
import PokemonDetail from "../components/PokemonDetail";
import { useState } from "react";
import { useAuth } from "../components/Auth";
import useGet from "../hooks/useGet";
import { POKEMON_URL } from "../api/urls";
import { useLocalStorage } from '../hooks/useLocalStorage';
/**
 * The main app homepage. Displays all of the authenticated user's pokemon, and allows the
 * user to favourite and un-favourite 'mons. Also displays a larger view with more details
 * of the currently selected mon.
 */
export default function PokemonPage() {
  const { token } = useAuth();
  const { data: pokemon, refresh } = useGet(POKEMON_URL, [], true);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [refreshToggle, setRefreshToggle] = useLocalStorage('refreshToggle', false);
  const selectedPokemon = pokemon.find((p) => p._id == selectedPokemonId);
  // 在你的状态变量中加入一个新的状态变量用于存储错误消息和加载状态
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Changes which pokemon is displayed in the detail view, when one is clicked
  // in the list.
  function handleClick(e, pokemon) {
    setSelectedPokemonId(pokemon._id);
  }

  // 更新 Pokemon 数据
  const updatePokemon = async (pokemon) => {
    const response = await fetch(`${POKEMON_URL}/${pokemon._id}/setFavourite`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ isFavourite: !pokemon.isFavourite })
    });


    if (response.ok) {
      // 如果 API 调用成功，刷新数据
      refresh();
    } else {
      // 如果 API 调用失败，显示错误消息
      alert('Failed to update pokemon');
    }
  };

  // 当 PokemonIcon 被双击时，更新它的“收藏”状态
  const handleDoubleClick = (e, pokemon) => {
    updatePokemon(pokemon);
    setRefreshToggle(!refreshToggle);
  };



  return (
    <div className={styles.container}>
      <div>
        <h2>My Pokemon</h2>
        <PokemonList pokemon={pokemon} onClick={handleClick} onDoubleClick={handleDoubleClick} />
      </div>
      <div>
        <h2>Details</h2>
        <PokemonDetail pokemon={selectedPokemon} />
      </div>
    </div>
  );
}
