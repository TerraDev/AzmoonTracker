import {useEffect, useRef, useState} from 'react'

export default function Timer(props) {
  const [counter, setCounter] = useState();

  useEffect(() => {
    console.log(props.endTime)
    console.log(props.initTime)
    const endTime = props.endTime;
    const now = new Date()
    let remainingHours = endTime.getHours() - now.getHours()
    let remainingMinutes = endTime.getMinutes() - now.getMinutes()
    let remainingSeconds = endTime.getSeconds() - now.getSeconds()
    if(remainingSeconds<0)
    {
      remainingSeconds+=60;
      remainingMinutes--;
    }
    if(remainingMinutes<0)
    {
      remainingMinutes+=60;
      remainingHours--;
    }
    console.log(now)
    console.log(endTime)
    console.log({ hrs:remainingHours, mins: remainingMinutes, secs: remainingSeconds});
    //convert milliseconds to hours/minutes/secons
    setCounter({ hrs:remainingHours, mins: remainingMinutes, secs: remainingSeconds});
 }, []);

  /*const reset = () => setCounter({hrs:0,mins: 2,secs: 30});*/

  const tick = (hrs1, mins1, secs1) => {
    if ( (hrs1 === 0 && mins1 === 0 && secs1 === 0) || (hrs1 < 0 || mins1 < 0 || secs1 < 0)) 
    {
      window.location.reload()  // -> redirect out
      setCounter({hrs:0,mins: 0,secs: 0});
    }
    else if (mins1 === 0 && secs1 === 0) 
    {
      setCounter({hrs:hrs1-1,mins: 59,secs: 59});
    }
    else if (secs1 === 0) 
    {
      setCounter({hrs: hrs1, mins:mins1 - 1, secs: 59});
    }
    else 
    {
      setCounter({hrs:hrs1, mins:mins1, secs:secs1-1});
    }
  };

  const isMounted = useRef(false)
  // Suggested by Laurent
  useEffect(() => {
    if(isMounted.current)
    { //doesn't run in the beginning
      console.log("Tick");
      setTimeout(() => tick(counter.hrs ,counter.mins,counter.secs ), 1000);
    }
    else
    {
      isMounted.current=true; //runs first time (onmount)
    }
  }, [counter,isMounted]);

  return ( 
  <p className="timer"> Timer: {`${counter?.hrs?.toString().padStart(2, '0')}:${counter?.mins?.toString()
  .padStart(2, '0')}:${counter?.secs?.toString().padStart(2, '0')}`} </p> );
}
