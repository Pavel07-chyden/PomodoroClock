import { useEffect, useState } from "react"


const AppSecf = () => {

    const [timeInSec, setTimeInSec] = useState<number>(0)
    const [start, setStart] = useState<boolean>(false)
    // 5 оператор остатка делится время на 60 для секунд, 60 для минут и 100 для милисикунд
    //  примерЖ 1 мин 20 сек = 80000 милисек  (80000 / 1000) % 60 = 20 сек
    // безоператора остатка (80000/1000) = 80 cек 
    useEffect(() => {
        let interval: any = null

        if (start) {
            interval = setInterval(() => {
                setTimeInSec(timePrev => timePrev + 10)
            }, 10)
        } else if (!start) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [start])
    return (
        <div>
            <span>{('0' + Math.floor(timeInSec / 60000) % 60).slice(-2)}:</span>
            <span>{('0' + Math.floor(timeInSec / 1000) % 60).slice(-2)}:</span>
            <span>{('0' + (timeInSec / 10) % 1000).slice(-2)}</span>
            <button onClick={() => setStart(true)}>Start</button>
            <button onClick={() => { setTimeInSec(600); setStart(false) }}>Restart</button>

        </div>
    )

}
export default AppSecf













































// const AppSecNod =()=>{
//     const[timeInSec, setTimeInSec] = useState<number>(0)
//     const[start, setStart] = useState<boolean>(false)

//     useEffect(()=>{
//         let interval:any = null
//         if(start){
//             setInterval(()=>{
//                 setTimeInSec(timePrev=>timePrev+1)}, 10)
//         }else{
//             clearInterval(interval)
//         }
//         return ()=>clearInterval(interval)
//     })

//     return (
//         <div>
//             <h1>
//             <span>{( '0' + Math.floor(timeInSec/ 3600)).slice(-2)}:</span>
//             <span>{( '0' + Math.floor(timeInSec/ 60)).slice(-2)}:</span>
//             <span>{( '0' + (timeInSec % 60)).slice(-2)}</span>
//             </h1>
//             <div>
// <button onClick={()=>setStart(true)}>Start</button>
// <button onClick={()=>{setStart(false); setTimeInSec(0)}}>Start</button>

// <button>Reset</button>
//             </div>
//         </div>
//     )

// }