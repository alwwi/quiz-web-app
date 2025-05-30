import { useState } from "react"
import bcrypt from 'bcryptjs'

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
        <h1 className="text-center text-4xl font-extrabold text-blue-700 mb-12">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="mb-6 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="mb-6 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
