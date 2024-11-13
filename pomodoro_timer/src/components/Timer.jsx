import React, { useState, useRef, useEffect } from 'react';

function Timer({ CzasPracy, odliczanie }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const intervalRef = useRef(null);

  const alarmSound = useRef(new Audio('../public/alarm.mp3'));

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(intervalRef.current);
      if (isBreakTime) {
        setIsActive(false);
        setIsBreakTime(false);
        alarmSound.current.play();
      } else {
        setTimeLeft(breakTime);
        setIsBreakTime(true);
        setIsActive(true);
        alarmSound.current.play();
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, isBreakTime, breakTime]);

  const startTimer = () => {
    if (!CzasPracy.current || !CzasPracy.current.value) {
      console.log('Zanim zrobisz przerwe wpisz czas pracy');
      return;
    }

    if (!isActive) {
      if (timeLeft === 0) {
        const czas = parseInt(CzasPracy.current.value, 10) * 60;
        setTimeLeft(czas);
        setIsBreakTime(false);
      }
      setIsActive(true);
      if (odliczanie) odliczanie();
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(0);
    setIsBreakTime(false);
    if (CzasPracy.current) CzasPracy.current.value = '';
  };

  const handleBreakTimeChange = (event) => {
    setBreakTime(parseInt(event.target.value, 10) * 60);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <p className="fs-1 fw-bold w-100 text-center mt-5 stoper">
        {isBreakTime ? 'Czas na przerwę!' : 'Czas pracy'}
      </p>
      <p className="fs-1 fw-bold w-100 text-center mt-2">{formatTime()}</p>
      <div className="d-flex w-100 flex-center">
        <input
          type="text"
          className="form-control mt-5 p-2 mx-auto"
          placeholder="Ile chcesz pracować (w minutach)?"
          aria-describedby="basic-addon2"
          ref={CzasPracy}
        />

        <select
          className="form-select mt-5 p-2 mx-auto"
          onChange={handleBreakTimeChange}
          defaultValue="5"
        >
          <option value="5">5 minut przerwy</option>
          <option value="10">10 minut przerwy</option>
          <option value="15">15 minut przerwy</option>
          <option value="30">30 minut przerwy</option>
        </select>

        <button
          type="button"
          className="btn btn-outline-secondary mt-5 p-2 mx-auto"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary mt-5 p-2 mx-auto"
          onClick={stopTimer}
        >
          Stop
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary mt-5 p-2 mx-auto"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default Timer;
