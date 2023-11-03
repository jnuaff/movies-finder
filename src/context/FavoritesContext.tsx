import React from "react";
import { SingleMovie } from "../components/Home/Home";

export interface FavoritesContext  {
    favoriteMovies: SingleMovie[],
    addToFavorites: (id: number, title: string, backdrop_path: string, description: string) => void
    removeFromFavorites: (id: number) => void
  }  
  
export const FavoritesContext = React.createContext<FavoritesContext | null>(null);

function initialFavorites(): SingleMovie[] {
    const localStorageMovies = localStorage.getItem("favorites");
    if(!localStorageMovies){
        return []  
    }
    return JSON.parse(localStorageMovies);
}

export const FavoritesProvider = ({children}: {children: React.ReactNode}) => {
    const [favoriteMovies, setFavoriteMovies] = React.useState<SingleMovie[]>(initialFavorites());

    const addToFavorites = (
        id: number,
        title: string,
        backdrop_path: string,
        description: string
      ) => {
          setFavoriteMovies((prevMovies: SingleMovie[]) => [
            ...prevMovies,
            { id, title, backdrop_path, description },
          ]);
          localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
          console.log(favoriteMovies)
      };

      const removeFromFavorites = (id: number) => {
        setFavoriteMovies(
            favoriteMovies.filter((a) => a.id !== id));
      }
      
    return <FavoritesContext.Provider value={{ favoriteMovies, addToFavorites, removeFromFavorites }}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => {
    const context = React.useContext(FavoritesContext);
    if (context === null) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };