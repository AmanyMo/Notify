import Vuex from "vuex";
import Vue from "vue";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "user-info",
  storage: window.localStorage,
});
Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    user: null,
    newEmail: null,
    chosenwebsite: null,
    ProductsTracked: new Array(),
    Notifications: new Array(),
    metalpic: null,
    socketID: null,
    metalname: null,
  },
  mutations: {
    assignmetalname(state, name) {
      state.metalname = name;
    },
    assignmetalpic(state, pic) {
      state.metalpic = pic;
    },
    setEmail(state, email) {
      state.newEmail = email;
    },
    assignUser(state, user) {
      state.user = user;
    },
    assignpicture(state, picture) {
      state.user.picture = picture;
    },
    assignwebsite(state, website) {
      state.chosenwebsite = website;
    },
  },
  getters: {
    userImage: (state) => {
      return state.user.picture;
    },
    userEmail: (state) => {
      return state.user.email;
    },
    userRole: (state) => {
      return state.user.role;
    },
    userName: (state) => {
      if (state.user.lastname) {
        return `${state.user.firstname} ${state.user.lastname}`;
      } else {
        return `${state.user.firstname}`;
      }
    },
    website: (state) => {
      return state.chosenwebsite;
    },
  },
});
export default store;
