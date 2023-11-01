import './Favorites.css'
import {  useFavorites } from '../context/FavoritesContext';

export default function Favorites(){

    const {favorites} = useFavorites();
    console.log(favorites);
    return(
        <div>Favorites!!</div>
    )
}