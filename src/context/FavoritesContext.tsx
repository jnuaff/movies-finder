import React from "react";
import { SingleMovie } from "../components/Home/Home";

export interface FavoritesContext {
	favoriteMovies: SingleMovie[];
	addToFavorites: (id: number, title: string, description: string, backdrop_path: string, ) => void;
	removeFromFavorites: (id: number) => void;
}

export const FavoritesContext = React.createContext<FavoritesContext | null>(null);

function initialFavorites(): SingleMovie[] {
	const localStorageMovies = localStorage.getItem("favorites");
	if (!localStorageMovies) {
		return [];
	}
	return JSON.parse(localStorageMovies);
}

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
	const [favoriteMovies, setFavoriteMovies] = React.useState<SingleMovie[]>(initialFavorites());

	const addToFavorites = (id: number, title: string,description: string, backdrop_path: string, ) => {
		setFavoriteMovies((prevMovies: SingleMovie[]) => [...prevMovies, { id, title, description, backdrop_path }]);
		localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
	};

	const removeFromFavorites = (id: number) => {
		setFavoriteMovies(favoriteMovies.filter((a) => a.id !== id));
	};

	return <FavoritesContext.Provider value={{ favoriteMovies, addToFavorites, removeFromFavorites }}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
	const context = React.useContext(FavoritesContext);
	if (context === null) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};
