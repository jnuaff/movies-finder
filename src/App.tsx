import React from 'react';
import './App.css'

interface Movies{
  results: Array<{
    id: number;
    title: string;
    image: string;
    background_path: string;
    overview: string;
  }>
}

export type SingleMovie = {
  id: number;
  title: string;
  image: string;
  description: string;
}

function App() {
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

  return (
    <> 
     <div>
      {movies && movies.results && movies.results.length > 0 ? (
        movies.results.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={movie.image} alt={movie.title} />
            <p>{movie.overview}</p>
          </div>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
    </>
  )
}

export default App
