import React from "react";
import { Link, useParams } from "react-router-dom";
import { SingleMovie } from "../Home/Home";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
			<header className="details__header">
					<Link to="/" className="details__icon">
						<span>
							<FontAwesomeIcon className="details__nav-icon" icon={faChevronLeft} />
						</span>
					</Link>
			</header>

			<main>
				{movieDetails && (
					<section className="movie-details">
						<header>
							<h1 className="hidden">Details</h1>
						</header>
						{/* Image */}

						<picture className="movie-details__picture">
							<source
								media="(min-width: 1200px)"
								type="image/jpg"
								srcSet={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
							/>
							<source
								media="(min-width: 1200px)"
								type="image/jpg"
								srcSet={`https://image.tmdb.org/t/p/w1780${movieDetails.backdrop_path}`}
							/>
							<source
								media="(min-width: 780px)"
								type="image/jpg"
								srcSet={`https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`}
							/>
							<img
								className="movie-details__image"
								src={`https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`}
								alt={movieDetails.title}
							/>
						</picture>

						<div className="movie-details__bottom">
							{/* Movie Details */}
							<h2>{movieDetails.title}</h2>
							<div className="movie-details__details">
								<div>
									<h3>Overview</h3>
									<p>{movieDetails.overview}</p>
								</div>
								<div>
									<h3>
										Production{" "}
										{movieDetails.production_companies && movieDetails.production_companies?.length > 0
											? "Companies"
											: "Companie"}
									</h3>
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
									<h3>Date of release</h3>
									<span>{movieDetails.release_date}</span>
								</div>
							</div>
						</div>
					</section>
				)}
			</main>
		</>
	);
}
