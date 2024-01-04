import React from "react";

function NextButton({ dispatch, answer }) {
  if (answer === null) {
    return null;
  }
  return (
    <buttton
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </buttton>
  );
}

export default NextButton;
