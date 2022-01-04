import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    infos: [],
    characters: []
  },

  getters: {},

  actions: {
    getDatas ({ commit }) {
        
        async function callUrl(url) {
        
            await axios.get(url).then(response => {

                commit('SET_INFOS', response.data.info)
                commit('SET_CHARACTERS', response.data.results)

                if (response.data.info.next != null) {
                    return callUrl(response.data.info.next);
                }
            })
        }
        
        
        let url = 'https://rickandmortyapi.com/api/character';
        callUrl(url);
    }
  },

  mutations: {
    SET_INFOS (state, infos) {
      state.infos = infos
    },
    SET_CHARACTERS (state, characters) {
      state.characters.push(...characters);
    }
  }
})
