import React, { useState } from 'react'
import Link from 'next/link'
import { useUserAuth } from '../../context/UserAuthContext'
import {useRouter} from 'next/router'

function index() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {signUp} = useUserAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try{
      await signUp(email, password)
      router.push("/")
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>Welcome to the "Shop"</h1>
      <div className='max-w-[700px] mx-auto my-16 p-4'>
        <div>
          <h2 className='text-2xl font-bold py-2'>Sign up for free here</h2>
          <p className="py-2 no-underline">Already have an account? <Link href="/"><a className='underline decoration-sky-500'>Sign In</a></Link></p>
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
          <button className='border border-blue-500 bg-blue-500 hover:bg-blue-400 w-full p-4 my-2 text-white'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default index