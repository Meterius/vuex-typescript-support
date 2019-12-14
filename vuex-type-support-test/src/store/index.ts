import Vue from 'vue';
import Vuex from 'vuex';
import {buildStore} from "vuex-typescript-support";
import {alphaStore} from "@/store/alpha/implementation";

Vue.use(Vuex);

export default new Vuex.Store(buildStore(
  alphaStore
));
