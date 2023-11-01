import React from "react";

import { SingleMovie } from "../Home/Home";

interface FavoritesContext {
    favorites: Array<SingleMovie>;
    addToFavorites: (id: number, title: string, description: string, backdrop_path: string) => void
}

export const FavoritesContext = React.createContext<FavoritesContext | null>(null);

function initialFavorites(): SingleMovie[]{
    const favorites = localStorage.getItem("favorites");
    if(!favorites){
        return [];
    }
    return JSON.parse(favorites);
}

export const FavoritesProvider = ({children}: {children: React.ReactNode}) => {
    const [favorites, setFavorites] = React.useState<SingleMovie[]>(initialFavorites());

    const addToFavorites = (
        id: number,
        title: string,
        description: string,
        backdrop_path: string
      ) => {
        setFavorites((prevMovies: SingleMovie[]) => [
            ...prevMovies,
            { id, title, description, backdrop_path },
          ]);
          localStorage.setItem("movies", JSON.stringify(favorites));
      };


    return <FavoritesContext.Provider value={{ favorites, addToFavorites }}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => {
    const context = React.useContext(FavoritesContext);
    if (context === null) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };