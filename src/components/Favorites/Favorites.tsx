import "./Favorites.css";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

export default function Favorites() {
	const { favoriteMovies, removeFromFavorites } = useFavorites();
    console.log(favoriteMovies)
	return (
		<main>
			<section>
				<header>
					<h1>Favorites</h1>
				</header>
				{favoriteMovies && favoriteMovies.length > 0 ? (
					favoriteMovies.map((favorite) => (
                        <div key={favorite.id} className="teaser-movies__movie">
                        <Link to={`/`} className="teaser-movies__link">
                            <h2 className="teaser-movies__title">{favorite.title}</h2>
                        </Link>
                        <figure className="teaser-movies__figure">
                            <picture className="teaser-movies__picture picture">
                                <source type="image/webp" srcSet={`https://image.tmdb.org/t/p/w500${favorite.backdrop_path}`} />
                                <img
                                    className="teaser-grid__image"
                                    src={`https://image.tmdb.org/t/p/w500${favorite.backdrop_path}`}
                                    alt={favorite.title}
                                />
                            </picture>
                        </figure>
                        <span onClick={() => removeFromFavorites(favorite.id)}>
            
                            Add to favorites
                        </span>
                    </div>
					))
				) : (
					<h2>No favorites yet</h2>
				)}
			</section>
		</main>
	);
}