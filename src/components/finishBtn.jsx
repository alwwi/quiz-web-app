import React from 'react'

const finishBtn = ({onClick}) => {
    return (
        <div>
            <button className="finish-btn px-6 py-2 bg-blue-500 text-white rounded font-normal text-lg hover:bg-blue-600 cursor-pointer" onClick={onClick}>
                Selesai
            </button>
        </div>
    )
}

export default finishBtn
