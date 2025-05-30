import { useState } from "react"
import bcrypt from 'bcryptjs'

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 via-red-300 to-red-400">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
        <h1 className="text-center text-4xl font-extrabold text-red-700 mb-12">Register</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
            className="mb-6 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            className="mb-6 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            className="mb-6 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{' '}
          <a href="/" className="text-red-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
