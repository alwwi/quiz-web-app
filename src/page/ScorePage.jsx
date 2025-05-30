import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ScorePage = () => {
    const quizData = JSON.parse(localStorage.getItem('quizData'))
    const navigate = useNavigate();
    


    useEffect(() => {
        if (!quizData) {
            alert('Tidak ada data kuis ditemukan. Silakan mulai kuis terlebih dahulu.');
            navigate('/start');
            return;
        }

        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Login terlebih dahulu!');
            navigate('/');
            return
        }
    }, [quizData, navigate]);

    if (!quizData) return null;
    const questionCount = quizData.question.length
    const selectedAnswer = quizData.selectAnswer || {}
    const correctAnswers = quizData.question.filter((q, idx) => selectedAnswer[idx] === q.correct_answer).length
    const wrongAnswers = questionCount - correctAnswers
    const score = 100 /questionCount
    const finalScore = score * correctAnswers


    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-300 via-blue-400 to-blue-500 p-6">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 drop-shadow-md">
          Selamat, Anda telah menyelesaikan kuis!
        </h1>

        <div className=" text-blue-500 rounded-xl shadow-lg w-40 p-2 mb-8 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">
            <div className='bg-white py-6 flex flex-col items-center'>

          <p className="text-lg">Skor Anda</p>
          <p className="text-5xl mt-1 font-bold">{finalScore}</p>
        </div>
            </div>

        <div className="w-full grid grid-cols-2 gap-6 text-gray-700 font-semibold mb-12">
          <div className="bg-purple-100 rounded-xl py-4 shadow-md">
            <p>Total Soal</p>
            <p className="text-2xl mt-2">{questionCount}</p>
          </div>
          <div className="bg-pink-100 rounded-xl py-4 shadow-md">
            <p>Jawaban Benar</p>
            <p className="text-2xl mt-2">{correctAnswers}</p>
          </div>
          <div className="bg-red-100 rounded-xl py-4 shadow-md col-span-2">
            <p>Jawaban Salah</p>
            <p className="text-2xl mt-2">{wrongAnswers}</p>
          </div>
        </div>

        <button
          className="px-10 py-3 bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
          onClick={() => {
            localStorage.removeItem('quizData')
            navigate('/start')
          }}
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}

export default ScorePage
