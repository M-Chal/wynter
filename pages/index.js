import Link from 'next/link'
import { useState } from 'react';
import GoogleButton from "react-google-button";
import { useUserAuth } from '../context/UserAuthContext';
import {useRouter} from 'next/router'

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {logIn, googleSignIn} = useUserAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try{
      await logIn(email, password)
      router.push("/Dashboard")
    }catch(err){
      setError(err.message)
    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try{
      await googleSignIn();
      router.push("/Dashboard")
    } catch(err){
      setError(err)
    }
  }

  return (
    <div>
      {/* I wouldn't normally style components like this but I decided to try out Tailwind */}
      {/* I would normally create a js file in this folder that uses create stylesheet hook and import  */}
      {/* Into the file and do className={styles.class} */}
      <h1 className='text-center text-3xl font-bold'>Welcome to the &#34;Shop&#34;</h1>
      <div className='max-w-[700px] mx-auto my-16 p-4'>
        <div>
          <h2 className='text-2xl font-bold py-2'>Sign In to your account</h2>
          <p className="py-2 no-underline">Don&apos;t have an account yet? <Link href="/SignUp"><a className='underline decoration-sky-500'>Sign Up</a></Link></p>
        </div>
        {error && <div className='w-full border-2 border-red-500 bg-red-200 p-4'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address</label>
            <input className='border p-3' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password</label>
            <input className='border p-3' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className='border border-blue-500 bg-blue-500 hover:bg-blue-400 w-full p-4 my-2 text-white'>Sign In</button>
        </form>
        <hr />
        <div className='flex flex-col py-2 w-full'>
          <GoogleButton
            className="!w-full"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
    </div>
  )
}
