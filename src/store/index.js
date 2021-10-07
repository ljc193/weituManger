import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/users"
import navigation from "./modules/navigation"
import project from "./modules/project"
import home from "./modules/home"
import news from "./modules/news"
import team from "./modules/team"

Vue.use(Vuex);
let modules = {
    users,
    navigation,
    project,
    home,
    team,
};
const store = new Vuex.Store({
    modules,
});
export default store;