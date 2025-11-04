import { create } from "zustand";
import componentOptionsData from "../data/componentOptions.json";
import { useComponentStore } from "./componentStore";

type CartStore = {
	basePrice: number;
	additionalPrice: number;
	totalPrice: number;
	setBasePrice: (price: number) => void;
	calculateAdditionalPrice: () => number;
	recalculatePrices: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
	basePrice: 499.99,
	additionalPrice: 0,
	totalPrice: 499.99,

	setBasePrice: (price: number) => {
		set({ basePrice: price });
		get().recalculatePrices();
	},

	calculateAdditionalPrice: (): number => {
		const selectedComponents = useComponentStore.getState().selectedComponents;
		let additionalPrice = 0;

		Object.entries(selectedComponents).forEach(([category, optionId]) => {
			const categoryData =
				componentOptionsData[category as keyof typeof componentOptionsData];
			if (categoryData) {
				const option = categoryData.options.find((opt) => opt.id === optionId);
				if (option) {
					additionalPrice += option.price;
				}
			}
		});

		return additionalPrice;
	},

	recalculatePrices: () => {
		const additionalPrice = get().calculateAdditionalPrice();
		const totalPrice = get().basePrice + additionalPrice;
		set({
			additionalPrice,
			totalPrice,
		});
	},
}));

useComponentStore.subscribe((_state) => {
	useCartStore.getState().recalculatePrices();
});

useCartStore.getState().recalculatePrices();

