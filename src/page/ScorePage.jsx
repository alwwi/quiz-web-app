import React from 'react'

const ScorePage = () => {
    return (
        <div>
            <div className="w-full h-screen flex justify-center items-center bg-gray-100">
                <div className="w-[30%] h-[70%] bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
                    <p className="text-xl mb-6">Selamat anda telah menyelesaikan kuis!</p>
                    <div className='flex flex-col items-center mb-4 text-2xl font-semibold'>
                        <h2>Skor Anda</h2>
                        <h2>100</h2>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span>Total Soal:</span>
                        <span>20</span>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span>Jawaban Benar:</span>
                        <span>15</span>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span>Jawaban Salah:</span>
                        <span>5</span>
                    </div>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ScorePage
