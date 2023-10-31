import { Link } from "react-router-dom";
import "./Home.css";
import React from 'react';

interface Movies {
  results: Array<{
    id: number;
    title: string;
    image: string;
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
  image: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  production_companies: Array<ProductionCompany>;
};


export default function Home(){
  const [movies, setMovies] = React.useState<Movies | null>(null);
  React.useEffect(() => {
    async function fetchData (){
      const result = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=428e47f069133d75630882889a482070&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
      const data = await result.json();
      if(data && data.results){
        setMovies({ results: data.results });
      } else {
        console.log("error while fetching data");
      }
      
      
    }
    fetchData();
  }, []);

  console.log(movies)

  return (
    <div>
    <h1>Search your movies</h1>
    <div className='teaser-movies'>
      {movies && movies.results && movies.results.length > 0 ? (
        movies.results.map((movie) => (
          <div key={movie.id} className='teaser-movies__movie'>
            <Link to={`/details/${movie.id}`} className='teaser-movies__link'>
                <h2 className='teaser-movies__title'>{movie.title}</h2>
            </Link>
            <figure className="teaser-movies__figure">
              <picture className="teaser-movies__picture picture">
                <source type="image/webp" srcSet={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
                <img className="teaser-grid__image" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
              </picture>
            </figure>
          </div>
        ))
      ) : (
        <h2>No movies available</h2>
      )}
    </div>
  </div>
  )
}
