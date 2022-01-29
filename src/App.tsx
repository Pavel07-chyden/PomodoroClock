import './styles.css';
import React, { useEffect, useRef, useState } from "react";


const App = () => {

    const [breakTime, setBreakTime] = useState<number>(5);
    const [sessionTime, setSessionTime] = useState<number>(25);
    const [timerType, setTimerType] = useState<string>("SESSION");
    const [timeLeft, setTimeLeft] = useState<number>(sessionTime * 60);
    const [pause, setPause] = useState(true);
    const starter = useRef<any>(null);

    // const [time, setTime] = useState<number>(0);
    // const [start, setStart] = useState<boolean>(false);

    // useEffect(()=> {
    //     let interval:any = null; 

    //     if(start){
    //         interval = setInterval(()=>{
    //             setTime(prevTime => prevTime + 10) }, 10)
    //     } else {
    //         clearInterval( interval)
    //     }
    //     return ()=> clearInterval(interval)
    // }, [start])

    const changeTime = () => {
        if (timeLeft > 0) {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }
        if (timeLeft === 0) {
            if (timerType === "SESSION") {
                console.log(timeLeft);
                setTimerType("BREAK");
                setTimeLeft(breakTime * 60);
                buzzer();
            } else {
                setTimeLeft(sessionTime * 60);
                setTimerType("SESSION");
                buzzer();
            }
        }
    };
    useEffect(() => {
        if (!pause) {
            const interval = setInterval(changeTime, 1000)
            return () => clearInterval(interval)
        }
    })
    const onBreakDecreClick = () => {
        if (breakTime > 0) {
            setBreakTime(breakTime - 1);
            if (timerType === "BREAK") {
                setTimeLeft((breakTime - 1) * 60);
            }
        } else {
            return;
        }
    };
    const onBreakIncreClick = () => {
        setBreakTime(breakTime + 1);
        if (timerType === "BREAK") {
            setTimeLeft((breakTime + 1) * 60);
        }
    };
    const onSessDecreClick = () => {
        if (sessionTime > 0) {
            setSessionTime((sessionTime) => sessionTime - 1);
            if (timerType === "SESSION") {
                setTimeLeft((sessionTime - 1) * 60);
            }
        } else {
            return;
        }
    };
    const onSessIncreClick = () => {
        setSessionTime((sessionTime) => sessionTime + 1);
        if (timerType === "SESSION") {
            setTimeLeft((sessionTime + 1) * 60);
        }
    };
    const buzzer = () => {
        const sound: any = document.getElementById("beep");
        sound.play();
    };
    const startTimer = () => {
        console.log(sessionTime, breakTime, timeLeft);
        setPause(false);
    };
    const stopTimer = () => {
        setPause(true);
        clearInterval(starter.current);
    };
    const onResetClick = () => {
        stopTimer();
        setBreakTime(5);
        setSessionTime(25);
        setTimerType("SESSION");
        setTimeLeft(1500);
    };
    const onChangePause = () => {
        if (pause) {
            startTimer();
        } else {
            stopTimer();
        }
    };
    const toMMSS = (timeLeft: number) => {
        var minutes: number | string = Math.floor(timeLeft / 60);
        var seconds: number | string = timeLeft - minutes * 60;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    };
    return (

        <div className="container" id="clock">
            <h1>Pomodoro Clock</h1>
            <div className="time-wrapper">
                <h2>{timerType}</h2>
                <h3>{toMMSS(timeLeft)}</h3>
                <div className="controls-wrapper">
                    <button onClick={onChangePause} id="start-pause">
                        {pause ? " ► " : "  ❚❚  "}</button>
                    <button onClick={onResetClick} id="reset">↻</button>
                </div>
            </div>
            <div className="timeset-wrapper">
                <div className="length">
                    <h2>Break Length</h2>
                    <div className="length-control">
                        <input className='length-button' onClick={onBreakIncreClick} type="button" value="↑" />
                        <h3>{breakTime}</h3>
                        <input className='length-button' onClick={onBreakDecreClick} type="button" value="↓" />
                    </div>
                </div>
                <div className="length">
                    <h2>Session Length</h2>
                    <div className="length-control">
                        <input className='length-button' onClick={onSessIncreClick} type="button" value="↑" />
                        <h3>{sessionTime}</h3>
                        <input className='length-button' onClick={onSessDecreClick} type="button" value="↓" />
                    </div>
                </div>
            </div>

            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    );
};

export default App;
