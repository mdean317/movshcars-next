'use client'
import { useState, useEffect, ChangeEvent} from 'react';
import type { Movie } from '../../../lib/types';
import MovieCard from '../MovieCard/MovieCard';
import { allYears } from '../../../lib/staticData';

type MovieSelectionProps = {

    year: number;
    handleMovieSelection: (movie: Movie) => void;
};

export default function MovieSelection({year, handleMovieSelection} : MovieSelectionProps) {

    const [selectedYear, SetSelectedYear] = useState(year)
    const [moviesInYear, setMoviesInYear] = useState<Movie[]>([]);
    const [moviesToShow, setMoviesToShow] = useState<Movie[]>([]);

    // Function to run on a change in the form data. 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const newQuery = event.target.value;
        const filtered = moviesInYear.filter(movie => movie.title.toLowerCase().startsWith(newQuery.toLowerCase()));
        setMoviesToShow(filtered)
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {

        const addMorePosters = async () => {
            const response = await fetch(`http://18.204.215.244:4000/movies/fill/${selectedYear}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const moviesByYear: Movie[] = await response.json();
                const enrichedMovies: Movie[] = await Promise.all(
                        moviesByYear.map( async (movie) => {

                            const posterRequest = `query {
                                                    title(id: "${movie.imdb_id}") {
                                                    posters {
                                                        url
                                                        }
                                                    }
                                                }`;
                            // Post new bank nom to the DB 
                            const response = await fetch(`http://18.204.215.244:4000/api/${movie.imdb_id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ query: posterRequest }),
                            })
                            await sleep(200);
                          
                        const json = await response.json();
                        movie.poster = json.data?.title?.posters?.[0]?.url || '';
                        return(movie);

                    }))
                    console.log(enrichedMovies)
        }

        const getMoviesByYear = async () => {

            

            try {

                const response = await fetch(`http://18.204.215.244:4000/movies/${selectedYear}`)
                addMorePosters()
                
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                else {

                    const moviesByYear: Movie[] = await response.json();
                    setMoviesInYear(moviesByYear)
                    setMoviesToShow(moviesByYear)

                }

            // If an error us caught, log it. 
            } catch (error) {

                console.log(error);
            }

        }
       
        getMoviesByYear();

    }, [selectedYear])

    return (

    <div >
        <label className= 'text-xl mr-5' htmlFor = 'movie' > Select Movie </label>
        <input className='border border-b-gray-400 rounded-lg px-2 mr-2' type='text' placeholder='Search for a movie' onChange={handleChange}></input>
        <label className="dropdownLabel" htmlFor="year">Filter by year:</label>
                 <select className="dropdown" name="year" id="year" value={selectedYear} onChange={(e) => SetSelectedYear(Number(e.target.value))}>
                    {allYears.map((year) => (
                     <option key={year} value={year}>{year}
                     </option>
                     ))}
                     <option key={0} value={0}> All Years </option>
                </select>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  border-gray-400 border-2 w-[80%] min-h-[500px] ">
            {moviesToShow.map((movie) => (
                <MovieCard key={movie.imdb_id} movie={movie} classes= '' handleMovieSelection={handleMovieSelection}></MovieCard>
            ))}
        </div>
    </div>
    )
}