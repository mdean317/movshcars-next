import type { User } from '../../../lib/types';
import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import Button from '../../components/Button/Button';

type AuthProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: (movie: boolean) => void;
    user: User;
    setUser: (user: User) => void;
};

export default function Auth({ isLoggedIn, setIsLoggedIn, user, setUser }: AuthProps) {

    //const [alreadyHasAccount, setAlreadyHasAccount] = useState(true)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [newUser, setNewUser] = useState<User>(user)


    // Function to run on a change in the form data. 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        setNewUser(prev => ({ ...prev, [name]: value }));

    }

    // Function to run on a change in the form data. 
    const logOut = async (event: MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        // Error catching bliock. 
        try {

            // Post new bank nom to the DB 
            const response = await fetch("http://127.0.0.1:4000/auth/logout")

            if (!response.ok) {
                console.log(response.statusText)
                throw new Error("logOut failed");
            }

            setIsLoggedIn(false)
            setIsLoggingIn(false)
            setUser({ username: '', email: '@gmail.com', password: "", user_id: -1 })


            // If an error us caughht, log it. 
        } catch (error) {

            console.log(error);
        }

    }

    // Function to run on a change in the form data. 
    const logIn = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        console.log(event)

        // Error catching bliock. 
        try {
            // Post new bank nom to the DB 
            const response = await fetch(`http://127.0.0.1:4000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: newUser.password,
                    email: newUser.email,
                    username: newUser.username
                })
            })

            console.log(response.ok)
            if (!response.ok) {
                console.log('error?')
                console.log(response.statusText)
                throw new Error("logIn failed");
            }

            const loggedInUser: User = await response.json();
            setUser(loggedInUser)
            setIsLoggedIn(true)

            // If an error us caughht, log it. 
        } catch (error) {

            console.log(error);
        }
    }

    // Function to run on a change in the form data. 
    const SignUp = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        console.log('SignUp')
        console.log(event)

        // Error catching bliock. 
        try {
            // Post new bank nom to the DB 
            const response = await fetch(`http://127.0.0.1:4000/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: newUser.password,
                    email: newUser.email,
                    remember: true,
                    username: newUser.username,
                })
            })

            if (!response.ok) {
                console.log(response.statusText)
                throw new Error("Signup failed");
            }

            setUser(newUser)
            setIsLoggedIn(true)


            // If an error us caughht, log it. 
        } catch (error) {

            console.log(error);
        }

    }

    return (
        <div className='mx-4' >
            {isLoggedIn ?
                <div>
                    <h4 className='text-center'>{`Hi, ${user.username}`}</h4>
                    <Button onClick={logOut}> Log Out </Button>
                </div>
                :
                !isLoggingIn ?
                     <div className='flex flex-row gap-x-4'>
                        <Button onClick={() => {
                            setIsLoggingIn(true)
                        }}>Sign In</Button>
                        <Button onClick={() => {
                            setIsLoggingIn(true)
                        }}>Sign Up</Button> 
                    </div>
                    :
                    <div className='flex gap-x-12'>
                        <form onSubmit={logIn} className='flex flex-col'>
                            <h3 className='font-bold'>Sign In </h3>
                            <div className='flex flex-col justify-evenly h-full '>
                                <input className='border-gray-400 border-2 rounded-sm' type='text' name="email" placeholder='email' onChange={handleChange}></input>
                                <input className='border-gray-400 border-2 rounded-sm' type='password' name="password" placeholder='password' onChange={handleChange}></input>
                            </div>
                            <Button isSubmit={true}>Sign In</Button>
                        </form>
                        <form onSubmit={SignUp} className='flex flex-col gap-y-2'>
                            <h3 className='font-bold'>Sign Up </h3>
                            <input className='border-gray-400 border-2 rounded-sm' type='text' name="username"  placeholder='username' onChange={handleChange}></input>
                            <input className='border-gray-400 border-2 rounded-sm' type='text' name="email" placeholder='email' onChange={handleChange}></input>
                            <input className='border-gray-400 border-2 rounded-sm' type='password' name="password" placeholder='create password' onChange={handleChange}></input>
                            <Button isSubmit={true}>Sign Up</Button>
                        </form>
                    </div>
            }
        </div>
    )
}