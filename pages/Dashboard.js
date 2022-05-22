import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase/firebase';
import {ref, get} from 'firebase/database';
import Table from '../components/Table'

export const getStaticProps = async () => {
  //I considered putting this as an api route to utilise a fetch as requested in the spec
  //But since it's using hooks to firebase it would just add extra inefficiencies
  //If I was fetching the data from a file it would make sense to use a fetch here
  try{
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef)

    return{
      props: {products: snapshot.val()}
    }
  } catch(err){
    console.error(err)
  }
}

function Dashboard({products}) {
  const router = useRouter()
  let {user, logOut} = useUserAuth()
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if(user){
      setUserName(user.email.split("@")[0])
      setLoading(false)
    }
  },[user])
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  },[])

  const handleLogOut = async () => {
    try{
      await logOut()
      setLoading(true)
      router.push("/")
    } catch(err){
      console.log(err)
    }
  }

  const handleSignIn = () => {
    router.push("/")
  }

  if(!user && !loading){
    return(
      <div className='w-full place-items-center'>
        <img src="https://newfastuff.com/wp-content/uploads/2019/04/1buOWcY.png" alt="" className='w-full'/>
        <button className='border border-blue-500 bg-blue-500 hover:bg-blue-400 w-full p-4 my-2 text-white' onClick={handleSignIn}>Sign In Here</button>
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-row w-full items-center justify-end'>
        {user && <p className='mr-8'>Hello {userName}</p>}
        <button className='border border-blue-500 bg-blue-500 hover:bg-blue-400 p-4 my-2 mr-8 text-white' onClick={handleLogOut}>Logout</button>
      </div>
      <Table products={products}/>
    </div>
  )
}

export default Dashboard