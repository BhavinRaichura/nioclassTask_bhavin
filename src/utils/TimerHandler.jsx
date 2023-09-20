import React, { useState, useRef, useEffect } from 'react'
import testEndHandler from './TestEndHandler';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const getTimeRemaining = (prevTime) => {
	const newDate = new Date()
	const total =  Date.parse(prevTime)-Date.parse(newDate);
	return {
			total, newDate
	};
	
}

const getHMS = (total) => {
	const second = Math.floor((total/1000)%60);
	const minute = Math.floor(((total/1000)/60)%60);
	const hour = Math.floor((((total/1000)/60)/60)%24);
	return {second, minute, hour }
}

export const convertTimeFormate = (total) =>{
	const {hour, minute,second} =  getHMS(total)
	return `${hour <= 9 ? "0"+hour :hour }:${minute <= 9 ? "0"+minute :minute }:${second<=9 ?"0"+second : second }`
}
  


const TimerHandler = ({handler = () =>{}, durationInSecond}) => {

	const Ref = useRef(null);
	
	const userState = useSelector(state => state.userReducer)

	const [timer, setTimer] = useState('00:00');
	

	function startTimer(duration) {
		let timer = duration, minutes, seconds;
		Ref.current = setInterval(function () {
			minutes = parseInt(timer / 60, 10)
			seconds = parseInt(timer % 60, 10);
	
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
	
			setTimer(minutes + ":" + seconds);
			console.log(" call ")
	
			if (--timer < 0) {
				clearInterval(Ref.current)
				return handler()
			}
		}, 1000);
		
	}
    
    useEffect(() => {
		startTimer(durationInSecond -1)
		return ()=>{ 
			return clearInterval(Ref.current)
		}
    }, []);


	return (
			<span>{timer}</span>
	)

	

}



export default testEndHandler(TimerHandler)





