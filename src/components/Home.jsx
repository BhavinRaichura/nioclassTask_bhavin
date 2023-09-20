import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";

import {
  setUserName,
  setSelectedQuestionList,
  reset,
} from "../redux/actions/userActions";
import questionList from "../questionsList";

const Home = () => {
  const userState = useSelector((state) => state.userReducer);
  const [user, setUser] = useState("");
  const [questionsOption, setQuestionsOption] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setQuestionsOption(() =>
      questionList.map((id, key) => {
        return { id, checked: false };
      })
    );
    setUser(() => userState.user);
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    const selectedQuestion = [];

    questionsOption.forEach((obj) => {
      if (obj.checked === true) selectedQuestion.push(obj.id);
    });

    dispatch(setSelectedQuestionList(selectedQuestion));
    dispatch(setUserName(user));

    return navigate("/process");
  };

  const checkBoxHandler = (index) => {
    setQuestionsOption((questions) => {
      const ques = [...questions];
      ques[index] = { ...ques[index], checked: !ques[index].checked };
      console.log(ques[index]);
      return ques;
    });
  };

  return (
    <div className=" text-base font-normal flex justify-center my-10 h-screen">
      <div className="container  h-max " >
      <form className="my-2 p-2" onSubmit={formHandler}>
        <div className="m-5">
          <input
            className=" text-lg px-2  border-b max-w-5/6 min-w-40 w-5/6"
            type="text"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            name="user"
            id="user"
            value={user}
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <p className="mx-5 text-lg text-gray-400">Select Questions</p>
          <div className="m-5">
            {questionsOption.map((question, index) => {
              return (
                <div key={index}  className=" m-2">
                  <input
                    type="checkbox"
                    className=" accent-blue-600 mx-2"
                    id={question.id}
                    name={question.id}
                    value={question.id}
                    onChange={() => {
                      checkBoxHandler(index);
                    }}
                  />
                  <label htmlFor={question.id}> {question.id}</label>
                </div>
              );
            })}
        <div className="my-5">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md" type="submit" value="submit" >Start</button>
        </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Home;
