import { useState } from "react"
import bcrypt from 'bcryptjs'

const LoginPage = () => {
  const [form, setForm] = useState({username: '', password: ''})

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userdata = JSON.parse(localStorage.getItem('userData')) || []
    const user = userdata.find(
      (u) => u.username === form.username || u.email === form.username
    )
    
    if (!user) {
      alert('Username tidak ditemukan')
      return
    }

    const isPasswordValid = bcrypt.compareSync(form.password, user.password)
    if (!isPasswordValid) {
      alert('Password salah')
      return
    }

    localStorage.setItem('currentUser', user.id)
    alert('Login berhasil')
    window.location.href = '/start'
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-red-100 w-[30%] h-[70%] rounded-2xl'>
        <div>
            <h1 className='text-center text-3xl font-bold mt-10'>Login</h1>
            <form className='flex flex-col items-center mt-10' onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange} required placeholder='Username' className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
                <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder='Password' className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
                <button type="submit" className='w-[80%] h-[50px] bg-blue-500 text-white rounded-lg cursor-pointer'>Login</button>
                <p className='mt-5'>Don't have an account? <a href="register" className='text-blue-500'>Sign Up</a></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
