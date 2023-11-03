import "./Favorites.css";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Favorites() {
	const { favoriteMovies, removeFromFavorites } = useFavorites();
	console.log(favoriteMovies[0]);

	React.useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
	}, [favoriteMovies]);

	return (
		<>
			<header className="favorites__header">
				<nav className="favorites__nav">
					<Link to="/">
						<span>
							<FontAwesomeIcon className="favorites__nav-icon" icon={faChevronLeft} />
						</span>
					</Link>
				</nav>
			</header>
			<main>
				<section>
					<header>
						<h1 className="hidden">Favorites</h1>
					</header>
					{favoriteMovies && favoriteMovies.length > 0 ? (
						favoriteMovies.map((favorite) => (
							<div key={favorite.id} className="teaser-movies__movie">
								<Link to={`/`} className="teaser-movies__link">
									<h2 className="teaser-movies__title">{favorite.title}</h2>
								</Link>
								<figure className="teaser-movies__figure">
									<picture className="teaser-movies__picture picture">
										<source type="image/webp" srcSet={`https://image.tmdb.org/t/p/w1280${favorite.backdrop_path}`} />
										<img
											className="teaser-grid__image"
											src={`https://image.tmdb.org/t/p/w780${favorite.backdrop_path}`}
											alt={favorite.title}
										/>
									</picture>
								</figure>
								<div className="favorites__options">
									<span className="" onClick={() => removeFromFavorites(favorite.id)}>
										Delete
									</span>
								</div>
							</div>
						))
					) : (
						<h2>No favorites yet</h2>
					)}
				</section>
			</main>
		</>
	);
}
