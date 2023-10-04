import React, { useState } from "react";
import useQuizStore from "./store/quizStore";

function StartExam() {
  const [categoryId, setCategoryId] = useState("");
  const [set, setSet] = useState("");

  const startExamination = useQuizStore((state) => state.startExamination);

  const handleStartExam = () => {
    startExamination(categoryId, set);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Start Examination</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Category ID
          </label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Enter Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Set</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Enter Set"
            value={set}
            onChange={(e) => setSet(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleStartExam}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default StartExam;
