import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({

 state : {
  infos: [],
  characters: [],
},

 getters : {},

 actions : {
  getDatas({ commit }) {
      axios.get('https://rickandmortyapi.com/api/character')
          .then(response => {
              commit('SET_INFOS', response.data)
              commit('SET_CHARACTERS', response.data.results)
      })
  }
},

 mutations : {
  SET_INFOS(state, infos) {
      state.infos = infos
  },
  SET_CHARACTERS(state, characters) {
    state.characters = characters
}
},

})