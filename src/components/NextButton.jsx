import React from "react";

function NextButton({ dispatch, answer, numOfQuestions, index }) {
  if (answer === null) {
    return null;
  }

  if (index < numOfQuestions - 1) {
    return (
      <buttton
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </buttton>
    );
  }

  if (index === numOfQuestions - 1) {
    return (
      <buttton
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Next
      </buttton>
    );
  }
}

export default NextButton;
