import React from 'react'

const RegisterPage = () => {
  return (
    <div>
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='bg-red-100 w-[30%] h-[70%] rounded-2xl'>
            <div>
                <h1 className='text-center text-3xl font-bold mt-10'>Register</h1>
                <form className='flex flex-col items-center mt-10'>
                <input type="text" placeholder='Username' className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
                <input type="email" placeholder='Email' className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
                <input type="password" placeholder='Password' className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
                <button type="submit" className='w-[80%] h-[50px] bg-blue-500 text-white rounded-lg cursor-pointer'>Register</button>
                <p className='mt-5'>Already have an account? <a href="login" className='text-blue-500'>Login</a></p>
                </form>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
