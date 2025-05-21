'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

type Movie = {
            year: string;
            title: string;
}

export default function AddMovie() {

    const [newMovie, setNewMovie] = useState<Movie>({ 
        year: '',
        title: ''
    })

    // Function to run on a change in the form data. 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 

        const {name, value } = event.target;

        // Update state variable. 
        setNewMovie({ ...newMovie, [name]: value})
    }

    // Function to run on the submission of the form. 
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        // Prevent rerendering. 
        event.preventDefault(); 

        // Error catching bliock. 
        try {

            // Post new bank nom to the DB 
            const response = await fetch("http://18.204.215.244:4000/movies/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    year: newMovie.year,
                    title: newMovie.title
                })
            })

            if (!response.ok) throw new Error('Failed to add movie');
            // If an error us caughht, log it. 
            } catch (error) {

                console.log(error);
            }
    }
    
    return (

        <div>
            <h4>Your favorite not showing? Add it! </h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" onChange={handleChange}/>
                <label htmlFor="year">Year:</label>
                <input type="text" name="year" id="year" onChange={handleChange}/>
                {/*<label htmlFor="IMDBLink">IMDB Link:</label>*/}
                {/*<input type="text" name="IMDBLink" id="IMDBLink" onChange={handleChange}/>*/}
                <button className='bg-gray-400 rounded-lg' type='submit'>Add Movie</button>
            </form>
        </div>
    )
}