/*
firebase documentation: https://firebase.google.com/docs/firestore/query-data/get-data
    used to see how to get documents from firestore


Chat GPT prompt: how to get documents from firestore
    used to get more information on how to get doucments from firestore
    
mozilla docs: how to filter an element from an array
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import {Button} from '../components/ui/button'
import { auth, db } from '../_utils/firebase';
import { useUserAuth } from '../_utils/auth-context';
import { IoCheckmarkCircle } from "react-icons/io5";

import { useToast } from '../components/ui/use-toast';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const {toast} = useToast();
    const [friends, setFriends] = useState([]);
   const {user} = useUserAuth();


    async function getAndSetFriends() {
        const docSnap = await getDoc(doc(db, 'users', user.uid))
        const data = docSnap.data();
        setFriends(data.friends);
    }
    
    async function getAllUsers() {
        const querySnap = await getDocs(collection(db, 'users'));
        const allUsers = querySnap.docs.map(doc => doc.data())
        setUsers(allUsers)
    }
    
    
    
    useEffect(() => {
        if(user) {
            getAllUsers()
            getAndSetFriends();
        }
    }, [user])
    


    if(!user) {
        return <>Not logged in Please try logging in</>
    }


    async function addFriend(id) {
        if(friends.includes(id)) {
            return;
            console.log('user is already a friend')
        }
        await updateDoc(doc(db, 'users', user.uid), {
            friends: arrayUnion(id)
        })
        await updateDoc(doc(db, 'users', id), {
            friends: arrayUnion(user.uid)
        })
        toast({description: 'User added successfully'})
        getAndSetFriends();
    }

    return (
        <div className='py-4 container '>
            <h1 className='font-medium text-3xl'>All your movie folks are here!!</h1>
            <p>Don't miss a chance to make them you friend</p>

            <div className='flex flex-col gap-4 mt-5'>

                {users.filter(u => u.uid !== user.uid).map(user => {
                    return <div className='bg-secondary p-3 rounded-sm max-w-sm flex items-center  justify-between ' key={user.uid}>
                        {user.displayName || user.email}
                        {friends.find(friendId => friendId === user.uid) ? 
                          <IoCheckmarkCircle  className='size-7 text-green-500'/>                          : 
                        <button className='p-2 rounded-sm bg-neutral-200' onClick={() => addFriend(user.uid)} disabled={friends.find(friendId => friendId === user.uid)}>
                         <IoMdAdd />
                        </button>
                        }
                    </div>
                })}
            </div>
        </div>
    )
}

export default UsersPage