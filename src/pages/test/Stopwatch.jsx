import React, { useState, useEffect } from 'react';
import '../test/Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((time / 60000) % 60);
    const getMinutes = `0${minutes}`.slice(-2);
    const hours = Math.floor(time / 3600000);
    const getHours = `0${hours}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartStop} className="start">{isActive ? 'Stop' : 'Start'}</button>
        <button onClick={handleLap} className="lap" disabled={!isActive}>Lap</button>
        <button onClick={handleReset} className="reset" disabled={time === 0 && laps.length === 0}>Reset</button>
      </div>
      <div className="laps">
        {laps.map((lap, index) => (
          <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
