/*
firebase documentation: https://firebase.google.com/docs/firestore/query-data/get-data
    used to see how to get documents from firestore


Chat GPT prompt: how to get documents from firestore
    used to get more information on how to get doucments from firestore
    
mozilla docs: how to filter an element from an array
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../_utils/firebase';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const user = auth.currentUser;

    
    async function getAllUsers() {
        const querySnap = await getDocs(collection(db, 'users'));
        const allUsers = querySnap.docs.map(doc => doc.data())
        setUsers(allUsers)
        console.log(allUsers)
    }
    
    
    
    useEffect(() => {
        if(user) {
            getAllUsers()
        }
    }, [])
    


    if(!user) {
        return <>Not logged in Please try logging in</>
    }
    return (
        <div className='py-4 container bg-[#171c21] text-secondary'>
            <h1 className='font-medium text-3xl'>All your movie folks are here!!</h1>
            <p>Don't miss a chance to make them you friend</p>

            <div className='flex flex-col gap-4 mt-2'>

                {users.filter(u => u.uid !== user.uid).map(user => {
                    return <div className='bg-[#353535] p-3 rounded-sm max-w-sm'>
                        {user.displayName || user.email}
                    </div>
                })}
            </div>
        </div>
    )
}

export default UsersPage