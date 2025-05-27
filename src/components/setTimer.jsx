import React, { useEffect, useState } from 'react'

const setTimer = ({ totalTime, timeUp }) => {
    const [timer, setTimer] = useState(totalTime)

    useEffect(() => {
        if (timer <= 0) {
            timeUp();
            return;
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timer, timeUp])

    const formatTime = (seconds) => {
        const hour = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return (
        <div className="border-1 border-black flex gap-1 absolute right-20 top-13 py-2 px-3 text-center">
            {formatTime(timer)}
        </div>
    )
}

export default setTimer
