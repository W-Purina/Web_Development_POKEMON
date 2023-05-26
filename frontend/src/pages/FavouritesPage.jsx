import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from "../components/Auth";
import PokemonList from "../components/PokemonList";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";



export default function FavouritesPage() {
    const { username, _id} = useUser();
    const { token } = useAuth();
    const [favourites, setFavourites] = useState([]);
    const [userFavourites, setUserFavourites] = useState([]);
    const [showFavourites, setShowFavourites] = useState(false);


    useEffect(() => {
        const fetchFavourites = async () => {
            const response = await fetch(`http://localhost:3000/api/users/${_id}/pokemon?favouritesOnly=true`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setFavourites(data);
        };

        fetchFavourites();
    }, [_id, token]);

    useEffect(() => {
        const fetchFavouritesForUser = async user => {
       
            const response = await fetch(`http://localhost:3000/api/users/${user._id}/pokemon?favouritesOnly=true`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            return { ...user, favourites: data };

        };

        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3000/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const users = await response.json();
            const otherUsers = users.filter(user => user._id !== _id);
            const usersWithFavourites = await Promise.all(otherUsers.map(fetchFavouritesForUser));
            setUserFavourites(usersWithFavourites);
        };

        fetchUsers();
    }, [_id, token]);

    return (
        <div>
            <h1>Pokemon Trader App</h1>
            <h2>
                Hi {username}! View your <Link to="/" className={styles.Link}>Pokemon</Link>, or check out everyone's  <Link to="/favourites" className={styles.Link} onClick={() => setShowFavourites(true)}>favourites</Link>!
            </h2>

            <h1>My Favourites</h1>
            <PokemonList pokemon={favourites} />

            {showFavourites && userFavourites.map(user => (
                <div key={user._id}>
                    <h2>{user.username}'s Favourites</h2>
                    <PokemonList pokemon={user.favourites} />
                </div>
            ))}
        </div>
    );
}
