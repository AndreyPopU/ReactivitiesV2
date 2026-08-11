import { createContext } from "react";
import CounterStore from "./CounterStore";
import { UiStore } from "./UiStore.ts";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore,
}

export const StoreContext = createContext(store);