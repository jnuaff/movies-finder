import { Link } from "react-router-dom";
import "./Home.css";
import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { faBars, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Movies {
	results: Array<{
		id: number;
		title: string;
		backdrop_path: string;
		overview: string;
	}>;
}

export type ProductionCompany = {
	id: number;
	name: string;
	origin_country: string;
	logo_path: string;
};

export type SingleMovie = {
	id: number;
	title: string;
	overview?: string;
	backdrop_path: string;
	release_date?: string;
	production_companies?: Array<ProductionCompany>;
};

const Navbar = ({ setQuery }: { setQuery: (query: string) => void }) => {
	const [openSearch, setOpenSearch] = React.useState<boolean>(false);

	return (
		<header className="global-header__header">
			<nav className="global-header__nav">
				<FontAwesomeIcon className="global-header__burger" icon={faBars} />
				<div className="global-header__item global-header__item--link">
					<Link to="/favorites" className="global-header__link">
						Favorites
					</Link>
					<FontAwesomeIcon className="global-header__icon" icon={faStar} />
				</div>
				<div className="global-header__item">
					<input
						className={`global-header__input ${!openSearch ? "hidden" : ""}`}
						type="search"
						placeholder="Search a movie"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event?.target.value)}
					/>
					<FontAwesomeIcon className="global-header__icon" icon={faSearch} onClick={() => setOpenSearch(!openSearch)} />
				</div>
			</nav>
		</header>
	);
};

export default function Home() {
	const [movies, setMovies] = React.useState<Movies | null>(null);
	const [query, setQuery] = React.useState<string | null>(null);

	const { addToFavorites, removeFromFavorites, favoriteMovies } = useFavorites();

	React.useEffect(() => {
		async function fetchData() {
			const result = await fetch(
				query
					? `https://api.themoviedb.org/3/search/movie?api_key=428e47f069133d75630882889a482070&language=en-US&query=${query}&page=1`
					: "https://api.themoviedb.org/3/discover/movie?api_key=428e47f069133d75630882889a482070&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
			);
			const data = await result.json();
			if (data && data.results) {
				setMovies({ results: data.results });
			} else {
				console.log("error while fetching data");
			}
		}
		fetchData();
	}, [query]);

	React.useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
	}, [favoriteMovies]);

	return (
		<>
			<Navbar setQuery={setQuery} />
			<main>
				<section className="teaser-movies">
					<header>
						<h1 className="teaser-movies__header hidden">Movies</h1>
					</header>
					<div className="teaser-movies__wrapper">
						{movies && movies.results && movies.results.length > 0 ? (
							movies.results.map((movie) => (
								<div key={movie.id} className="teaser-movies__movie">
									<Link to={`/details/${movie.id}`} className="teaser-movies__link">
										<h2 className="teaser-movies__title">{movie.title}</h2>
									</Link>
									<figure className="teaser-movies__figure">
										<picture className="teaser-movies__picture picture">
											<source type="image/webp" srcSet={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
											<img
												className="teaser-grid__image"
												src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
												alt={movie.title}
											/>
										</picture>
									</figure>
									<div className="teaser-movies__options">
										{!favoriteMovies.some((favorite) => favorite.id === movie.id) ? (
											<span
												onClick={() => addToFavorites(movie.id, movie.title, movie.overview, movie.backdrop_path)}>
												Add to favorites
											</span>
										) : (
											<FontAwesomeIcon icon={faStar} onClick={() => removeFromFavorites(movie.id)} />
										)}
									</div>
								</div>
							))
						) : (
							<h2>No movies available</h2>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
