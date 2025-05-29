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
        window.location.href = '/score'
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

    if (loading) return <div className='text-center mt-20'>Loading...</div>

    const questionShowing = question[clickQuestion]

    return (
        <div className="w-full h-screen flex">
            <div className="w-[30%] h-screen flex pt-16 bg-gray-300">
                <div className="flex-col w-full px-5">
                    <div className="flex justify-between mb-5">
                        <p>Soal :</p>
                        <p>{clickQuestion + 1}/{question.length}</p>
                    </div>
                    <div className="grid grid-cols-5 gap-3 px-5">
                        {question.map((_, idx) => (
                            <div
                                key={idx}
                                className={`p-[6px] rounded-md border-2 border-gray-500 text-center cursor-pointer hover:bg-gray-400
                                ${idx === clickQuestion ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-500 hover:bg-gray-400'}`}
                                onClick={() => {
                                    setClickQuestion(idx)
                                    localStorage.setItem('quizData', JSON.stringify({
                                        question,
                                        clickQuestion: idx
                                    }))
                                }}>
                                <p>{idx + 1}</p></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-screen flex justify-center pt-20">
                <div className="w-[80%]">
                    <h2 className="text-xl font-semibold mb-6 break-words pr-20"
                        dangerouslySetInnerHTML={{ __html: questionShowing.question }}>
                    </h2>
                    <div className="flex flex-col">
                        {questionShowing.answers.map((ans, idx) => {
                            const isSelected = selectAnswer[clickQuestion] === ans
                            return (
                                <button
                                    key={idx}
                                    className={`w-[80%] px-4 py-2 text-left break-words flex gap-2
                                        ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100 cursor-pointer'}`}
                                    onClick={() => handleAnswer(ans)}
                                    dangerouslySetInnerHTML={{ __html: `<span>${String.fromCharCode(65 + idx)}.</span> <span className="w-full">${ans}</span>` }}>

                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
                <Timer totalTime={totalTime} timeUp={handleTimeUp} />
            </div>
            <div className="absolute bottom-90 right-40">
                {isLastQuestion || isTimeUp ? (
                    <Finish onClick={handleFinish} />
                ) : (
                    <Next onClick={handleNext} />
                )}
            </div>
        </div >
    )
}

export default QuestionPage
