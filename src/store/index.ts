import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IStoreType } from "./type";

export default createStore<IRootState>({
  state: {
    isMenuFold: false
  },
  mutations: {
    changeIsMenuFold(state) {
      state.isMenuFold = !state.isMenuFold;
    }
  },
  actions: {},
  modules: {}
});

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
