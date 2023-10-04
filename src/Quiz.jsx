import { useState } from "react";
import useQuizStore from "./store/quizStore";
import { useEffect } from "react";

function Quiz() {
  const {
    questions,
    currentQuestionIndex,
    timer,
    statusArr,
    clearSelectedOption,
    result,
    isQuizOver,
    selectOption,
    nextQuestion,
    previousQuestion,
  } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    selectOption(currentQuestionIndex, e.target.value);
  };

  const isAnswered = statusArr[currentQuestionIndex];
  const handleClearOption = () => {
    clearSelectedOption(currentQuestionIndex);
  };

  const [options, setOptions] = useState();
  useEffect(() => {
    setOptions(
      currentQuestion &&
        handleShuffle([
          currentQuestion?.answer,
          ...currentQuestion?.options,
        ])
    );
  }, [currentQuestionIndex, currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }
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
          {options?.map((option) => (
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
          {isAnswered && (
            <button
              className="bg-red-500 text-white px-2 py-1 mt-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={handleClearOption}
            >
              Clear Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
