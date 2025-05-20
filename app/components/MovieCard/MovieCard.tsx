import Image from 'next/image';
import type { Movie } from '../../../lib/types';
import clsx from 'clsx';

type MovieCardProps = {
    movie: Movie;
    classes: string;
    handleMovieSelection: (movie: Movie) => void;
};

export default function MovieCard({movie, classes, handleMovieSelection }: MovieCardProps) {

    return (

        <div id={movie.imdb_id} onClick={() => handleMovieSelection(movie)} 
                className={clsx('hover:scale-110', `h-90 flex flex-col ${classes}`)}>
            <Image className='h-[100%] object-cover self-center mt-4' src={movie.poster} alt={movie.title} width={200} height={300}/>
            <h3 className='font-bold text-center mt-2 text-black'>{movie.title}</h3>
        </div>
    )
}