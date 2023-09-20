import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MathJax } from "better-react-mathjax";
import { Navigate } from "react-router-dom";

import { questionStartTimer } from "../redux/actions/userActions";
import PrevNextButton from "../utils/PrevNextButton";
import TestEndButton from "../utils/TestEndButton";
import TimerHandler from "../utils/TimerHandler";



const TestPage = () => {
  const userState = useSelector((state) => state.userReducer);
  const questionsState = useSelector((state) => state.questionsReducer);
  const [question, setQuestion] = useState("");
  const [restructureQuestion, setRestructureQuestion] = useState([]);
  const dispatch = useDispatch();

  console.log(userState.currentIndex)

  useEffect(() => {
    dispatch(questionStartTimer());
    setQuestion(() => {
      let questionString = questionsState[userState.selectedQuestions[userState.currentIndex]]
      if(questionString===undefined)
        return <Navigate to='/test' replace={true} />
      setRestructureQuestion(()=>questionString.split('$'))
      return questionString;
    });
  }, [userState.currentIndex]);

  useEffect(() => {
    console.log("present: ", question);
  }, [question]);



  return (
    <div className=" flex  my-10 justify-center w-screen h-screen  ">
      <div className=" container border h-max  rounded-lg">
      <div className=" h-5/6 overflow-scroll">
        <p className=" font-medium">Question {userState.currentIndex + 1}/{userState.totalQuestions})</p>

        <TimerHandler durationInSecond={ 5*60*userState.totalQuestions}/>
        <br/>
        {
          restructureQuestion.map((data, key)=>{
            if(key%2===0)
            return <span key={key}>{data}</span>
            return <MathJax style={{display:'inline-block'}} key={key}>{`$$${data}$$`}</MathJax>
          })
        }
      </div>
      <div className="relative bottom-0">
        <PrevNextButton  />
      </div>
      </div>
    </div>
  );
};

export default TestPage;
