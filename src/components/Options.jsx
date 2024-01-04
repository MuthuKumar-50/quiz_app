import React from "react";

function Options({ question, answer, dispatch }) {
  const hansAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`
              btn btn-option
              ${index === answer ? "answer" : ""} 
              ${
                hansAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }
            `}
          key={option}
          disabled={hansAnswered}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
