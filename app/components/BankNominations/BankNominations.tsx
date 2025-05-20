'use client'
import { useState, useEffect } from 'react';
import type { Category, Nomination, User} from '../../../lib/types';
import Button from '../Button/Button';

type BankNominationsProps = {

    year: number;
    category: Category;
    user: User
    lastUpdate: number;
    canUserAdd: boolean;
    setLastUpdate: (newDate: number) => void;

};

export default function BankNominations({ year, category, user, lastUpdate, canUserAdd, setLastUpdate }: BankNominationsProps) {

    // Set the bank nominations to show as state variable. 
    const [bankNominations, setBankNominations] = useState<Nomination[]>([]);
    

    // To run when user adds a bank nom to their selections. 
    const handleClickAdd = async (index: number) => {

        // Create error catching block
        try {

            const nomToAdd = bankNominations[index]
            // Send create new review req to db, and catpure response. 
            const response = await fetch("http://127.0.0.1:5000/usernoms/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    nomination_id: nomToAdd.nomination_id,
                    didWin: nomToAdd.didWin,
                    
                })
            })

            if (!response.ok) {

                console.log(response)
                throw new Error('Failed to add nomination');

            } 

            setLastUpdate(Date.now());

            // If there's an error, log it
        } catch (error) {

            console.log(error);

        }

        // Update last update state variable with current timestamp. 
        setLastUpdate(Date.now());


    }

    // Rendering function
    useEffect(() => {

        // Async function to get bank nominations by year and category.
        const getBankNominations = async () => {

            // Get nominations in the selected year and category.
            const response = await fetch(`http://127.0.0.1:5000/noms?year=${year}&category=${encodeURIComponent(category.category_id)}`);

            // Parse Jason data into array of noms. 
            const nomsToShow = await response.json();

            console.log(nomsToShow);
            // Update state variables
            setBankNominations(nomsToShow)

        }

        // Run async function
        getBankNominations();

        // Re-render on recieving new year, category or last update paramters. 
    }, [year, category, lastUpdate])

    return (
        <div className="w-[80%]">
            <h2>Nomination Bank: </h2>
                    <table className="w-full text-center">
                        <thead className="bg-black text-amber-50 text-shadow-amber-50">
                            <tr>
                                <th>Year</th>
                                <th>Category</th>
                                <th>Film</th>
                                <th>Nominee</th>
                                <th>Votes</th>
                                <th></th>
                            </tr>
                        </thead>
                    {bankNominations?.length === 0 ? (
                    <></>
                    ) : (
                    <tbody className="flex-col space-y-20 py-2">
                        {bankNominations?.map((nom, index) => (
                            <tr key={nom.nomination_id} className="border border-gray-300 rounded-2xl w-[90%] py-2 border-b hover:bg-amber-200">
                                <td>{nom.year}</td>
                                <td>{nom.category.name}</td>
                                <td>{nom.movie.title}</td>
                                <td>{nom.nominee}</td>
                                <td>{nom.votes}</td>
                                <td className="hover:bg-background">
                                    {canUserAdd ?
                                        <Button
                                            isSubmit={false} 
                                            classes='ml-6 w-32 rounded-full'
                                            onClick={() => handleClickAdd(index)}
                                            aria-label="Add nomination"
                                        >Add    

                                        </Button>
                                    
                                        : <></>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            )}
            </table>
        </div>
    )
}
