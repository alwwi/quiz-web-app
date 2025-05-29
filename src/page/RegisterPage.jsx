import { useState } from "react"
import bcrypt from 'bcryptjs'

const RegisterPage = () => {
  const [form, setForm] = useState({username: '',email: '',password: ''})

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userdata = JSON.parse(localStorage.getItem('userData')) || []
    const isExist = userdata.some(
      (u) => u.email === form.email || u.username === form.username
    )
    if (isExist) {
      alert('User already exists')
      return
    }

    const hashedPassword = bcrypt.hashSync(form.password, 10)
    const userToSave = {
      id: Date.now(),
      ...form,
      password: hashedPassword
    }

    userdata.push(userToSave)
    localStorage.setItem('userData', JSON.stringify(userdata))
    alert('Registration berhasil')
    window.location.href = '/'
  }

  return (
    <div>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='bg-red-100 w-[30%] h-[70%] rounded-2xl'>
          <div>
            <h1 className='text-center text-3xl font-bold mt-10'>Register</h1>
            <form className='flex flex-col items-center mt-10' onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder='Username' onChange={handleChange} value={form.username} className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4'/>
              <input type="email" name="email" placeholder='Email' onChange={handleChange} value={form.email} required className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
              <input type="password" name="password" placeholder='Password' onChange={handleChange} value={form.password} required className='w-[80%] h-[50px] rounded-lg border-2 border-gray-300 mb-5 px-4' />
              <button type="submit" className='w-[80%] h-[50px] bg-blue-500 text-white rounded-lg cursor-pointer'>Register</button>
              <p className='mt-5'>Already have an account? <a href="/" className='text-blue-500'>Login</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
