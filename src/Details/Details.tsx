import React from "react";
import { useParams } from "react-router-dom";
import { SingleMovie } from "../Home/Home";
import "./Details.css";

export default function Details() {
	const { id } = useParams();
	const [movieDetails, setMovieDetails] = React.useState<SingleMovie | null>(null);

	React.useEffect(() => {
		async function fetchData() {
			const result = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=428e47f069133d75630882889a482070`);
			const data = await result.json();
			if (data) {
				setMovieDetails(data);
			}
		}
		fetchData();
	}, [id]);

	if (!id) return <h1>No movie was found</h1>;
	console.log(movieDetails);

	return (
		<>
			{movieDetails && (
				<section className="movie-details">
					{/* Image */}

					<picture>
					<source media="(min-width: 1200px)" type="image/jpg" srcSet={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`} />
					<source media="(min-width: 1200px)" type="image/jpg" srcSet={`https://image.tmdb.org/t/p/w1780${movieDetails.backdrop_path}`} />
					<source media="(min-width: 780px)" type="image/jpg" srcSet={`https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`} />
						<img
							className="movie-details__image"
							src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
							alt={movieDetails.title}
						/>
					</picture>

					<div className="movie-details__bottom">
						{/* Movie Details */}
						<h1>{movieDetails.title}</h1>
						<div className="movie-details__details">
							<div>
								<h2>Overview</h2>
								<p>{movieDetails.overview}</p>
							</div>
							<div>
								<h2>Production {movieDetails.production_companies && movieDetails.production_companies?.length > 0 ? "Companies" : "Companie"}</h2>
								{movieDetails.production_companies && movieDetails.production_companies.length ? (
									movieDetails.production_companies.map((company) => (
										<ul className="movie-details__details-list">
											<li>
												<span key={company.id}>{company.name}</span>
											</li>
										</ul>
									))
								) : (
									<span>info not available</span>
								)}
							</div>
							<div>
								<h2>Date of release</h2>
								<span>{movieDetails.release_date}</span>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}
