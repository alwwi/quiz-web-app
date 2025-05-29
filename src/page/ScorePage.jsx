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
        <div>
            <div className="w-full h-screen flex justify-center items-center bg-gray-100">
                <div className="w-[30%] h-[70%] bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
                    <p className="text-xl mb-6">Selamat anda telah menyelesaikan kuis!</p>
                    <div className='flex flex-col items-center mb-4 text-2xl font-semibold'>
                        <h2>Skor Anda</h2>
                        <h2>{finalScore}</h2>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span>Total Soal:</span>
                        <span>{questionCount}</span>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span>Jawaban Benar:</span>
                        <span>{correctAnswers}</span>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span>Jawaban Salah:</span>
                        <span>{wrongAnswers}</span>
                    </div>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" onClick={() => {localStorage.removeItem('quizData'); window.location.href = '/start'}}>
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ScorePage
