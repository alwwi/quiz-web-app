import Next from '../components/nextBtn.jsx'
import Finish from '../components/finishBtn.jsx'

const QuestionPage = () => {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[30%] h-screen flex pt-16 bg-gray-300">
                <div className="flex-col w-full px-5">
                    <div className="flex justify-between mb-5">
                        <p>Soal :</p>
                        <p>1/20</p>
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                        <div className="p-[6px] rounded-md border-2 border-gray-500 text-center cursor-pointer hover:bg-gray-400">
                            <p>1</p>
                        </div>
                        <div className="p-[6px] rounded-md border-2 border-blue-500 bg-blue-500 text-white text-center">
                            <p>2</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-screen flex justify-center pt-20">
                <div className="w-[80%]">
                    <h2 className="text-xl font-semibold mb-6 break-words">
                        Apa ibu kota Indonesia?
                    </h2>
                    <div className="flex flex-col">
                        <button className="w-[80%] px-4 py-2 text-left hover:bg-gray-100 cursor-pointer break-words flex gap-2">
                            <span>A.</span> <span className="w-full">Jakarta</span>
                        </button>
                        <button className="w-[80%] px-4 py-2 text-left hover:bg-gray-100 cursor-pointer break-words flex gap-2">
                            <span>B.</span> <span className="w-full">Surabaya</span>
                        </button>
                        <button className="w-[80%] px-4 py-2 text-left hover:bg-gray-100 cursor-pointer break-words flex gap-2">
                            <span>C.</span> <span className="w-full">Yogyakarta</span>
                        </button>
                        <button className="w-[80%] px-4 py-2 text-left hover:bg-gray-100 cursor-pointer break-words flex gap-2">
                            <span>D.</span> <span className="w-full">Riau</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-1 border-black flex gap-1 absolute right-20 top-13 py-2 px-3 text-center">
                <span>00</span>
                <span>:</span>
                <span>00</span>
                <span>:</span>
                <span>00</span>
            </div>
            <div className="absolute bottom-90 right-40">
                <Finish />
            </div>
        </div>
    )
}

export default QuestionPage
