'use client'
import { useState } from 'react';
import YearAndCatDropboxes from './components/YearAndCatDropboxes/YearAndCatDropboxes'; 
import UserNominations from './components/UserNominations/UserNominations';
import NewNomination from './components/NewNomination/NewNomination';
import BankNominations from './components/BankNominations/BankNominations';
import Auth from './components/Auth/Auth';
import Button from './components/Button/Button';
import { allCategories } from '../lib/staticData';
import { User, Category} from '../lib/types';

export default function Home() {

  // Set state variables
  const [year, setYear] = useState(2025)
  const [category, setCategory] = useState<Category>(allCategories[0])
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewNoms, setIsNewNoms] = useState(false);

  const [user, setUser] = useState<User>({username:'', email:"", password: "", user_id: -1})
  const [canUserAdd, setCanUserAdd] = useState(true)

  

  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 sm:p-12 font-[family-name:var(--font-geist-sans)] w-full">
        <div className='flex flex-row items-center justify-center'>
            <></>
            <h1 className=" text-5xl font-bold text-center  "> Welcome to the Movshcars! </h1>
            <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}></Auth>
        </div>
        {isLoggedIn ?
         isNewNoms ? 
          //User is logged in, and chose add new nomination view. 
          <main className=" flex flex-col gap-[32px] row-start-2 sm:items-start md:items-center ">
            <NewNomination year={year} user={user} allCategories={allCategories} setLastUpdate={setLastUpdate} setIsNewNoms={setIsNewNoms} setYear={setYear} setCategory={setCategory} ></NewNomination>
          </main>
        :
          //User is logged in, and chose bank/user nominations view. 
          <main className=" flex flex-col gap-[32px] row-start-2 items-center sm:items-startmd:items-center w-full">
          <YearAndCatDropboxes year={year} category={category} setYear={setYear} setCategory={setCategory}></YearAndCatDropboxes>
          <UserNominations year={year} category={category} user={user} lastUpdate={lastUpdate} setLastUpdate={setLastUpdate} setCanUserAdd={setCanUserAdd}></UserNominations>
          <BankNominations year={year} category={category} user={user} lastUpdate={lastUpdate} canUserAdd={canUserAdd} setLastUpdate={setLastUpdate}></BankNominations>
          <Button isSubmit={false} classes='rounded-3xl' onClick = {()=> setIsNewNoms(true)}> Not seeing your fave? Add to the nomination bank!</Button>
          </main>
        :
          //User isn't logged in.
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <YearAndCatDropboxes year={year} category={category} setYear={setYear} setCategory={setCategory}></YearAndCatDropboxes>
          <BankNominations year={year} category={category} user={user} lastUpdate={lastUpdate} canUserAdd={canUserAdd} setLastUpdate={setLastUpdate}></BankNominations>
          <Button isSubmit={false} classes='bg-gray-400' disabled={true}>Not seeing your fave? Sign in to add to the nomination bank!</Button>
          </main>
        }  
    </div>
    </>
  )
}
