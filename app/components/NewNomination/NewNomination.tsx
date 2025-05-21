'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import MovieSelection from '../MovieSelection/MovieSelection';
import MovieCard from '../MovieCard/MovieCard';
import type { Category, Nomination, Movie, User } from '../../../lib/types';
import Button from '../Button/Button';

type NewNominationsProps = {

    year: number;
    user: User;
    allCategories: Category[];
    setLastUpdate: (newDate: number) => void;
    setIsNewNoms: (isNewNoms: boolean) => void;
    setYear: (year: number) => void;
    setCategory: (category: Category) => void;

};

export default function NewNomination({year, user, allCategories, setLastUpdate, setIsNewNoms, setYear, setCategory }: NewNominationsProps) {

    //const [cast, setCast] = useState<string>('')
    //const [selectedCategory, setSelectedCategory] = useState<Category>({ category_id: 1, name: 'Best Picture', isActing: false, isSong: false })
    const [showMovies, setShowMovies] = useState<boolean>(true)
    const [newNomination, setNewNomination] = useState<Nomination>({
        nomination_id: -1,
        year: year,
        category: { category_id: 1, name: 'Best Picture', isActing: false, isSong: false },
        nominee: '',
        movie: { imdb_id: '', title: '', poster: '', year: -1 },
        user: user.username,
        didWin: false,
        user_id: user.user_id,
        votes: 0
    })

    // Function to run on a change in the form data. 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        // Update state variable. 
        setNewNomination({ ...newNomination, nominee: event.target.value })

    }

    // Function to run on a change in the form data. 
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {

        const categoryID = parseInt(event.target.value)
        const getCategory = allCategories.find(category => category.category_id === categoryID);
        console.log()

        if (getCategory) {
            setNewNomination({...newNomination, category: getCategory, nominee:''}); 
            
        }
  }
     
    // Function to run on a change in the form data. 
    const handleMovieSelection = (movie: Movie) => {

        // Update state variable. 

        setNewNomination({ ...newNomination, movie: movie, year: movie.year })
        setShowMovies(false);

    }

    // Function to run on the submission of the form. 
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        // Prevent rerendering. 
        event.preventDefault();
        
        // Error catching bliock. 
        try {

            console.log(newNomination)
            // Post new bank nom to the DB 
            const response1 = await fetch("http://127.0.0.1:4000/noms/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    year: newNomination.year,
                    category_id: newNomination.category.category_id,
                    nominee: newNomination.nominee,
                    movie: newNomination.movie.imdb_id,
                    email: user.email
                })
            })

            if (!response1.ok) throw new Error('Failed to add new nomination');

            setLastUpdate(Date.now());

        // If an error us caughht, log it. 
        } catch (error) {

            console.log(error);
        }

    }

    return (

        <div className='bg-amber-50 flex flex-col ju    stify-center items-center'>
            <div className='w-[90%] flex-col flex items-center'>
                {showMovies ?
                    <div>
                        <div className='block mb-4 '>
                            <MovieSelection year={year} handleMovieSelection={handleMovieSelection}></MovieSelection>
                        </div>
                    </div>
                    :
                    <form className='flex flex-col items-center bg-amber-50' onSubmit={handleSubmit}>
                        <h2 className=" text-2xl font-bold text-center  ">A new nomination? How exciting!</h2>
                            <div className='flex flex-col justify-center items-center text-white'>
                                <MovieCard key={newNomination.movie.imdb_id} movie={newNomination.movie} handleMovieSelection={handleMovieSelection} classes='pointer-events-none'></MovieCard>
                                <Button isSubmit={false} onClick={() => setShowMovies(true)} classes='block mb-4 text-black mt-2'>Change movie</Button>
                            </div>
                            <div className='flex flex-col items-center'>
                                <label className="border-2 rounded-2xl p-1 border-amber-300 w-30 text-center mb-2"  htmlFor='category'>{newNomination.year}</label>
                                <select className="ml-2 border-2 rounded-2xl p-1 border-amber-300 w-60 text-center" name="category" id="category" required value={newNomination.category.category_id}
                                    onChange={handleCategoryChange}>
                                    {allCategories.map((category) => (
                                        <option key={category.category_id} value={category.category_id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {newNomination.category.isActing ?
                                    <div>
                                        <label className='text-xl mr-5' htmlFor='nominee'>Nominee:</label>
                                        <input className='text-lg border-2 rounded-2xl text-center border-amber-300 w-50 m-2' type='text' name='nominee' placeholder='' onChange={handleChange}></input>
                                    </div>
                                    :
                                    <>
                                    </>
                                }
                            </div>  

                            <Button isSubmit={true} classes='p-2 m-2 font-bold text-xl hover:cursor-pointer hover:bg-amber-500 rounded-full'>Submit nomination</Button>
                    </form>
                }

                <Button onClick= {()=> {setIsNewNoms(false); setYear(newNomination.year); setCategory(newNomination.category);}} classes='p-2 m-2 font-bold text-xl hover:cursor-pointer hover:bg-amber-500 rounded-full'>Back to Main Page</Button>

            </div>

        </div>
    )
}