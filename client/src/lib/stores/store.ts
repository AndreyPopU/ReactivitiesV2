import { createContext } from "react";
import CounterStore from "./CounterStore";
import { UiStore } from "./UiStore.ts";
import { ActivityStore } from "./ActivityStore.ts";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    activityStore: ActivityStore;
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    activityStore: new ActivityStore(),
}

export const StoreContext = createContext(store);