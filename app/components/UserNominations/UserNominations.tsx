'use client'
import { useState, useEffect } from 'react';
import type { Category, Nomination, User } from '../../../lib/types';
import Button from '../Button/Button';

type UserNominationsProps = {

    year: number;
    category: Category;
    user: User
    lastUpdate: number;
    setLastUpdate: (newDate: number) => void;
    setCanUserAdd: (canUserAdd: boolean) => void;

};

export default function UserNominations({ year, category, user, lastUpdate, setLastUpdate, setCanUserAdd}: UserNominationsProps) {

    const [userNominations, setuserNominations] = useState<Nomination[]>([]);

    const handleDoubleClick = () => {
    console.log("You double-clicked!");
    };
    const handleDeleteClick = async (index: number) => {

        const nomToDelete = userNominations[index]
        console.log(nomToDelete)

        try {
            // Delete user nomination
            const response = await fetch((`http://127.0.0.1:5000/usernoms/delete/${encodeURIComponent(nomToDelete.user_id)}/${encodeURIComponent(nomToDelete.nomination_id)}`),
                { method: 'DELETE' });


            if (!response.ok) {
                const text = await response.text();
                throw new Error(text);
            }

            setLastUpdate(Date.now());

        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {

        const getUserNominations = async () => {

            if (user.username === '') {

                setuserNominations([])
                setCanUserAdd(true)

            } else {

                const response = await fetch(`http://127.0.0.1:5000/usernoms?username=${encodeURIComponent(user.username.trim())}&year=${year}&category=${encodeURIComponent(category.category_id)}`);
                const userNomsToShow = await response.json();
                setuserNominations(userNomsToShow)
                if (userNomsToShow.length > 4) {
                    setCanUserAdd(false)
                } else {
                    setCanUserAdd(true)
                }
            }
        }

        getUserNominations();

    }, [user, category, year, lastUpdate])

    return (
        <div className="w-[80%]">
            <h2>{`${user.username}'s Nominations: `}</h2>
                    <table className="w-full text-center">
                        <thead className="bg-black text-amber-50 text-shadow-amber-50">
                            <tr>
                                <th>Year</th>
                                <th>Category</th>
                                <th>Film</th>
                                <th>Nominee</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                    {userNominations.length === 0 ? (
                    <></>
            ) : (
                    <tbody className="flex-col space-y-20 py-2">
                        {userNominations.map((nom, index) => (
                            <tr key={nom.nomination_id} className="border border-gray-300 rounded-2xl w-[90%] py-2 border-b hover:bg-amber-200"
                                onDoubleClick={handleDoubleClick}>
                                <td>{nom.year}</td>
                                <td>{nom.category.name}</td>
                                <td>{nom.movie.title}</td>
                                <td>{nom.nominee}</td>
                                <td className="hover:bg-background">
                                    <Button
                                        isSubmit={false} 
                                         classes='ml-6 w-32 rounded-full'
                                         onClick={() => handleDeleteClick(index)}
                                         aria-label="Remove your nomination"
                                         >&times;
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            )}
            </table>
        </div>
    )
}
