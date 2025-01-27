'use client'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import LogoSquare from '@/components/logo-square';
import Copyright from '@/components/layout/copyright';

type SearchParams = Promise<{ [key: string]: string | undefined }>

export default function LoginPage({searchParams} : {searchParams?: SearchParams }) {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
 
    const response = await fetch(`/api/auth/login?username=${username}&password=${password}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
 
    if (response.ok) {
      const { backTo } = await searchParams as { [key: string]: string | undefined};
      if(backTo)
      {
        router.push(backTo); 
        return;
      }
      const historyState = window.history.state;
      
      // If history state is empty or no previous entry, redirect to home
      if (!historyState || !historyState.idx || historyState.idx <= 0) {
        router.push('/'); 
        return;
      }

      const previousUrl = document.referrer;
      // Check if the previous URL is from your domain
      const isExternal = !previousUrl.includes(window.location.hostname);

      if (isExternal) {
        router.push('/'); 
      } else {
        router.back(); 
      }
    } else {
      // Handle errors
    }
  }
 
  return (
    <>
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-3">
          <LogoSquare />
          <label className="block text-red-700 text-xl font-bold pr-2 mt-2">انار چین</label>
        </div>
        <form className="bg-white dark:bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            نام کاربری 
            </label>
            <input id="username" name="username" type="text" placeholder="نام کاربری" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              کلمه عبور
            </label>
            <input id="password" name="password" type="password" placeholder="کلمه عبور" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
            <p className="text-red-500 text-xs italic"></p>
          </div>
          <div className="flex items-center justify-between">
            <button type='submit' className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              ورود
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-800" href="#">
              رمز عبور را فراموش کردم
            </a>
          </div>
        </form>
        <Copyright />
      </div>
    </div>
    </>
  )
}