import React, { useEffect } from "react";
import useQuizStore from "./store/quizStore";

function Quiz() {
  const {
    questions,
    currentQuestionIndex,
    timer,
    loadQuestions,
    startTimer,
    result,
    isQuizOver,
    selectOption,
    nextQuestion,
    previousQuestion,
  } = useQuizStore();

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions();
      startTimer();
    }
  }, [loadQuestions, startTimer, questions]);

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    selectOption(currentQuestionIndex, e.target.value);
  };
  return (
    <div>
      {isQuizOver ? (
        result && (
          <div>
            <h2>Quiz Result</h2>
            <p>Score: {result.score}</p>
            <p>Percentage: {result.percentage}%</p>
          </div>
        )
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          {currentQuestion.options.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={currentQuestion.selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            </div>
          ))}

          <p>Timer: {timer} seconds</p>
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
