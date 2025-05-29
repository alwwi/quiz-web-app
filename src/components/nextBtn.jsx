import React from 'react'

const nextBtn = ({onClick}) => {
    return (
        <div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded font-normal text-lg hover:bg-blue-600 cursor-pointer" onClick={onClick}>
                Selanjutnya
            </button>
        </div>
    )
}

export default nextBtn
