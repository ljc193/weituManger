import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/users"
import navigation from "./modules/navigation"

Vue.use(Vuex);
let modules = {
    users,
    navigation
};
const store = new Vuex.Store({
    modules,
});
export default store;