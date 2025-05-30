import React from 'react'

const finishBtn = ({onClick}) => {
    return (
        <div>
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-3xl hover:bg-blue-700 transition duration-300 cursor-pointer" onClick={onClick}>
                Selesai
            </button>
        </div>
    )
}

export default finishBtn
