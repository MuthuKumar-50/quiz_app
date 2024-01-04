import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  status: "loading", // loading, error | ready, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }

    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }

    case "start": {
      return {
        ...state,
        status: "active",
      };
    }

    case "newAnswer": {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }

    default: {
      throw new Error("Unhandled Action Type");
    }
  }
}

function App() {
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length || 0;
  const maxPoints = questions.reduce((prev, curr) => {
    // console.log(curr);
    // console.log(`Prev = ${prev}`);
    // console.log(`Current Value  = ${curr.points}`);
    // console.log(`${prev} + ${curr.points}  === ${prev + curr.points}`);

    return prev + curr.points;
  }, 0);

  console.log(questions);
  console.log("Max Points :", maxPoints);

  useEffect(() => {
    fetch("http://localhost:5050/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err) => {
        dispatch({
          type: "dataFailed",
        });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" ? <Loader /> : null}
        {status === "error" ? <Error /> : null}
        {status === "ready" ? (
          <StartScreen numOfQuestions={numQuestions} dispatch={dispatch} />
        ) : null}
        {status === "active" ? (
          <>
            <Progress
              index={index}
              numQuestion={numQuestions}
              points={points}
              maxPossiblePoints={maxPoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        ) : null}
      </Main>
    </div>
  );
}

export default App;
