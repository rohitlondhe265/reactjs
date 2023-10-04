import React from "react";
import Quiz from "./Quiz";
import StartExam from "./StartExam";
import { useStore } from "./store/store";

function App() {
  const fishes = useStore((state) => state.fishes);
  const addAFish = useStore((state) => state.addAFish);
  const eatAFish = useStore((state) => state.eatAFish);
  const clearStore = useStore((state) => state.clearStore);
  return (
    <div>
      <div>
        <h1>FISH Store No: {fishes}</h1>
        <button onClick={addAFish}>Add</button>
        <button onClick={eatAFish}>Eat</button>
        <button onClick={clearStore}>Clear</button>
      </div>
      <h1>MCQ Quiz App</h1>
      <StartExam />
      <Quiz />
    </div>
  );
}

export default App;
