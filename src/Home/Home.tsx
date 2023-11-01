import { Link } from "react-router-dom";
import "./Home.css";
import React from "react";
import { useFavorites } from "../context/FavoritesContext";

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
	return (
		<header className="global-header__header">
			<input
				type="search"
				placeholder="Search a movie"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event?.target.value)}
			/>
		</header>
	);
};

export default function Home() {
	const [movies, setMovies] = React.useState<Movies | null>(null);
	const [query, setQuery] = React.useState<string | null>(null);

	const {addToFavorites, favorites} = useFavorites()

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

	return (
		<>
			<Navbar setQuery={setQuery} />
			<main>
				<header>
					<h1 className="teaser-movies__header visible">Movies</h1>
				</header>
				<section className="teaser-movies">
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
								<span
									className="teaser-movies__button"
									onClick={() => {
										if (favorites.some((favorite) => favorite.id === movie.id)) {
											return; // Do nothing if the movie is already in favorites
										} else {
											addToFavorites(movie.id, movie.title, movie.overview, movie.backdrop_path)
										}
									}}>
									Add to favorites
								</span>
							</div>
						))
					) : (
						<h2>No movies available</h2>
					)}
				</section>
			</main>
		</>
	);
}
