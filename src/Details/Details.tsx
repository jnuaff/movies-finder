import React from "react";
import { useParams } from "react-router-dom";
import { SingleMovie } from "../Home/Home";

export default function Details() {
	const { id } = useParams();
	const [movieDetails, setMovieDetails] = React.useState<SingleMovie | null>(null);

	React.useEffect(() => {
		async function fetchData() {
			const result = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=428e47f069133d75630882889a482070`);
			const data = await result.json();
            if(data){
                setMovieDetails(data);
            }
	
		}
		fetchData();
	}, []);

	if (!id) return <h1>No movie was found</h1>;

	return (
		<div>
			{movieDetails && (
				<div>
					<h1>{movieDetails.title}</h1>
					<p>{movieDetails.overview}</p>
				</div>
			)}
		</div>
	);
}
