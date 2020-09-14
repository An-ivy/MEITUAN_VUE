import Vue from 'vue'
import Vuex from 'vuex'
import product from './product'
import ball from './ball'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    ball
  }
})