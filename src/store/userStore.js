import { create } from "zustand";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      // Action to set the user data
      setUser: (newUser) => {
        set({ user: newUser });
      },

      // Action to clear the user data
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: "user-storage", // Storage name (required)
      getStorage: () => localStorage, // Storage method (localStorage, sessionStorage, etc.)
    }
  )
);

export default useUserStore;
