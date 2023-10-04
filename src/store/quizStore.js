import { create } from "zustand";

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mercury"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Giraffe", "Kangaroo"],
    answer: "Whale",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mercury"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Giraffe", "Kangaroo"],
    answer: "Whale",
  },
];

const useQuizStore = create((set) => ({
  categoryId: "",
  set: "",
  questions: [],
  statusArr: [],
  currentQuestionIndex: 0,
  timer: 0,
  isQuizOver: false,
  result: null,

  startExamination: (categoryId, selectedSet) => {
    try {
      // const response = await axios.get(`/api/questions?categoryId=${categoryId}&set=${set}`);
      // const fetchedQuestions = response.data;
      // const statusArr = new Array(fetchedQuestions.length).fill(false);
      const statusArr = new Array(sampleQuestions.length).fill(false);

      set({
        categoryId,
        set: selectedSet,
        questions: sampleQuestions,
        statusArr,
        currentQuestionIndex: 0,
        timer: 30,
        isQuizOver: false,
        result: null,
      });
      const state = useQuizStore.getState();
      state.startTimer();
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },

  startTimer: () => {
    const state = useQuizStore.getState();
    let timer = state.timer;
    const timerInterval = setInterval(() => {
      timer -= 1;
      set({ timer });
    }, 1000);

    // Calculate the quiz result when the timer expires
    setTimeout(() => {
      clearInterval(timerInterval);
      state.calculateResult();
    }, state.timer * 1000);
  },

  selectOption: (questionIndex, selectedOption) => {
    set((state) => {
      const updatedQuestions = [...state.questions];
      updatedQuestions[questionIndex].selectedOption = selectedOption;
      const updatedStatusArr = [...state.statusArr];
      updatedStatusArr[questionIndex] = true;
      return { questions: updatedQuestions, statusArr: updatedStatusArr };
    });
  },

  clearSelectedOption: (questionIndex) => {
    set((state) => {
      const updatedStatusArr = [...state.statusArr];
      updatedStatusArr[questionIndex] = false;

      const updatedQuestions = [...state.questions];
      updatedQuestions[questionIndex].selectedOption = null;

      return {
        questions: updatedQuestions,
        statusArr: updatedStatusArr,
      };
    });
  },

  nextQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }));
  },

  previousQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex - 1 }));
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
