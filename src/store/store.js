import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
      eatAFish: () => set({ fishes: get().fishes - 1 }),
      clearStore: () => set({ fishes: 0 }),
    }),
    {
      name: "foodStorage", // name of item in storage (must be unique)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// export const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
// }));

// import { useStore } from "./store/quizStore";
