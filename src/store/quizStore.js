import { create } from "zustand";

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Giraffe", "Whale", "Kangaroo"],
    answer: "Whale",
  },
];

const useQuizStore = create((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  timer: 15,
  isQuizOver: false,
  result: null,

  loadQuestions: () => {
    set({ questions: sampleQuestions });
  },

  selectOption: (questionIndex, selectedOption) => {
    set((state) => {
      const updatedQuestions = [...state.questions];
      updatedQuestions[questionIndex].selectedOption = selectedOption;
      return { questions: updatedQuestions };
    });
  },

  nextQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }));
  },

  previousQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex - 1 }));
  },

  startTimer: () => {
    const timerInterval = setInterval(() => {
      set((state) => ({ timer: state.timer - 1 })); // Decrease the timer
    }, 1000);
    const state = useQuizStore.getState();
    setTimeout(() => {
      clearInterval(timerInterval);
      state.calculateResult();
    }, state.timer * 1000);
  },

  calculateResult: () => {
    set((state) => {
      const answers = state.questions.map((question, index) => ({
        question: question.question,
        selectedOption: question.selectedOption,
        correctAnswer: question.answer,
        isCorrect: question.answer === question.selectedOption,
      }));

      const score = answers.filter((answer) => answer.isCorrect).length;
      const percentage = (score / state.questions.length) * 100;

      const result = {
        score,
        percentage,
        answers,
        totalQuestions: state.questions.length,
      };

      set({ result, isQuizOver: true });

      return result;
    });
  },
}));

export default useQuizStore;
