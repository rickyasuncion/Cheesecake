
import React, { useEffect } from 'react'
import { deleteUserList, removeUserListItem, updateUserListItem, updateUserLists } from '../_utils/firestore'
import { auth } from '../_utils/firebase'

const Test = () => {
  
  const btnHandler = () => {
    // updateUserLists(auth.currentUser.uid, "fav")
    // deleteUserList(auth.currentUser.uid, "fav");
    // updateUserListItem(auth.currentUser.uid, "fav", {type: "movie", id: 12345})
    // removeUserListItem(auth.currentUser.uid, "fav", {type: "movie", id: 12345})
  }

  return (
    <button onClick={btnHandler}>Click Here</button>
  )
}

export default Test