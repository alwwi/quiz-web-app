import Next from '../components/nextBtn.jsx'
import Finish from '../components/finishBtn.jsx'
import Timer from '../components/setTimer.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QuestionPage = () => {
    const [question, setQuestion] = useState([])
    const [clickQuestion, setClickQuestion] = useState(0)
    const [selectAnswer, setSelectedAnswer] = useState({})
    const [loading, setLoading] = useState(true)
    const [isTimeUp, setIsTimeUp] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const cached = localStorage.getItem('quizData')
                if (cached) {
                    console.log("Data diambil dari localStorage")
                    const parsedData = JSON.parse(cached)
                    setQuestion(parsedData.question)
                    setClickQuestion(parsedData.clickQuestion || 0)
                    setSelectedAnswer(parsedData.selectAnswer || {})
                    setLoading(false)
                    return
                }

                const response = await fetch("https://opentdb.com/api.php?amount=20&category=22&difficulty=easy&type=multiple")
                if (!response.ok) throw new Error('Gagal mengambil soal');
                const data = await response.json()
                const formated = data.results.map(q => {
                    const answers = [...q.incorrect_answers]
                    const randomAnswer = Math.floor(Math.random() * 4)
                    answers.splice(randomAnswer, 0, q.correct_answer)
                    return {
                        question: q.question,
                        answers: answers,
                        correct_answer: q.correct_answer
                    }
                })
                setQuestion(formated)
                setLoading(false)
            } catch (error) {
                console.error(error.message)
                alert("Gagal memuat soal")
            }
        }
        fetchQuestions()

        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Login terlebih dahulu!');
            navigate('/');
            return
        }
    }, [navigate])

    const handleAnswer = (answer) => {
        setSelectedAnswer(prev => {
            const updatedAnswers = { ...prev, [clickQuestion]: answer }

            localStorage.setItem('quizData', JSON.stringify({
                question,
                clickQuestion,
                selectAnswer: updatedAnswers
            }))
            return updatedAnswers
        })
    }

    const handleNext = () => {
        if (clickQuestion + 1 < question.length) {
            setClickQuestion(clickQuestion + 1)

            localStorage.setItem('quizData', JSON.stringify({
                question,
                clickQuestion: clickQuestion + 1
            }))
        }
    }

    const handleFinish = () => {
        const completedAnswers = { ...selectAnswer }
        question.forEach((_, idx) => {
            if (completedAnswers[idx] === undefined) {
                completedAnswers[idx] = ""
            }
        })

        localStorage.setItem('quizData', JSON.stringify({
            question,
            clickQuestion,
            selectAnswer
        }))
        navigate('/score')
    }

    const totalTime = question.length * 45
    const isLastQuestion = clickQuestion === question.length - 1
    const handleTimeUp = () => {
        if (!isTimeUp) {
            setIsTimeUp(true)
            alert("Waktu habis! Silakan klik 'Selesai' untuk melihat hasil.")
            document.querySelectorAll('button').forEach(button => {
                if (!button.classList.contains('finish-btn')) {
                    button.disabled = true
                }
            })
        }
    }

    const answeredQuestion = (idx) => {
        const btnSelext = idx === clickQuestion
        const isAnswered = selectAnswer[idx] !== undefined
        if(btnSelext) {
            return 'bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer text-white shadow-lg transform scale-110'
        }
        if (isAnswered) {
            return 'bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 text-white'
        }
        return 'border-gray-400 hover:border-blue-600 hover:shadow-lg hover:bg-blue-100 cursor-pointer'
    }

    if (loading) return <div className='text-center mt-20'>Loading...</div>

    const questionShowing = question[clickQuestion]

    return (
        <div className="w-full h-screen flex bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            <aside className="w-[28%] h-full bg-white shadow-2xl rounded-r-3xl pt-16 px-8 overflow-y-auto">
                <div className="flex justify-between mb-8 text-lg font-bold text-gray-800 tracking-wide">
                    <span>Soal :</span>
                    <span>{clickQuestion + 1}/{question.length}</span>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {question.map((_, idx) => (
                        <button
                            key={idx}
                            className=
                            {`p-3 rounded-xl border-2 transition-all duration-300 shadow-md
                                ${answeredQuestion(idx)} cursor-pointer
                            `}
                            onClick={() => {
                                setClickQuestion(idx);
                                localStorage.setItem(
                                    'quizData',
                                    JSON.stringify({ question, clickQuestion: idx })
                                );
                            }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </aside>
            <main className="flex-1 pt-24 px-16 overflow-auto">
                <h2
                    className="text-3xl font-extrabold mb-10 text-gray-900 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: questionShowing.question }}
                ></h2>
                <div className="flex flex-col gap-6">
                    {questionShowing.answers.map((ans, idx) => {
                        const isSelected = selectAnswer[clickQuestion] === ans;
                        return (
                            <button
                                key={idx}
                                className=
                                {`w-[85%] max-w-3xl px-8 py-5 rounded-2xl flex gap-5 text-left font-semibold text-lg transition
                                    ${isSelected
                                    ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white shadow-lg transform scale-[1.03]'
                                    : 'bg-white border-2 border-gray-300 hover:border-blue-500 hover:shadow-md hover:bg-pink-50 cursor-pointer'}
                                `}
                                onClick={() => handleAnswer(ans)}
                                dangerouslySetInnerHTML={{
                                    __html: `<span class="text-xl font-bold">${String.fromCharCode(65 + idx)}.</span> <span class="flex-1">${ans}</span>`,
                                }}
                            />
                        );
                    })}
                </div>
                <div className="mt-16 flex justify-end fixed bottom-10 right-10 gap-5">
                    {isLastQuestion || isTimeUp ? (
                        <Finish onClick={handleFinish} />
                    ) : (
                        <Next onClick={handleNext} />
                    )}
                </div>
            </main>
            <Timer totalTime={totalTime} timeUp={handleTimeUp} />
        </div>
    );
}

export default QuestionPage
