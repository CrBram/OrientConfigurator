import { create } from "zustand";

type SelectedComponents = {
  face: string;
  strap: string;
  knob: string;
  indicators: string;
  dialCase: string;
};

const defaultComponents: SelectedComponents = {
  face: "blue-quartz",
  strap: "stainless-steel",
  knob: "single-crown",
  indicators: "roman-indicators",
  dialCase: "thin-case",
};

type ComponentStore = {
  selectedComponents: SelectedComponents;
  setComponent: (category: keyof SelectedComponents, optionId: string) => void;
  setDialCase: (dialCaseId: string) => void;
  resetComponents: () => void;
};

export const useComponentStore = create<ComponentStore>((set) => ({
  selectedComponents: defaultComponents,
  setComponent: (category, optionId) =>
    set((state) => ({
      selectedComponents: { ...state.selectedComponents, [category]: optionId },
    })),
  setDialCase: (dialCaseId) =>
    set((state) => ({
      selectedComponents: { ...state.selectedComponents, dialCase: dialCaseId },
    })),
  resetComponents: () =>
    set({
      selectedComponents: defaultComponents,
    }),
}));
