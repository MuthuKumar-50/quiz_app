import React from "react";

function EndScreen({ maxPossiblePoints, points, highScore, dispatch }) {
  const percent = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore">(HighScore : {highScore} points)</p>

      <buttton
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </buttton>
    </>
  );
}

export default EndScreen;
