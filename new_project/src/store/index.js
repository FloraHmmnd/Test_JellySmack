import { createStore } from 'vuex'
import axios from 'axios'
// import createPersistedState from "vuex-persistedstate";



export default createStore({
  // plugins: [createPersistedState()],
  state: {
    infos: [],
    characters: [],
    currentCharacter: {}
  },

  getters: {
    getCharacters(state){
      return state.characters;
    },
    getCurrentCharacter(state) {
      return state.currentCharacter;
    }
      
  },

  actions: {
    getDatas ({ commit, state }) {
      console.log("call api init")
      console.log(state);
      async function callUrl(url) {
            await axios.get(url).then(response => {
              console.log("call api next")

                commit('SET_INFOS', response.data.info)
                commit('SET_CHARACTERS', response.data.results)

                if (response.data.info.next != null) {
                    return callUrl(response.data.info.next);
                }
            })
        }
      let url = 'https://rickandmortyapi.com/api/character';
      callUrl(url);
    },

    setCurrentCharacter ({commit, state}, characterId) {
      let characterFound = {};
      console.log("character id =" + characterId)
      console.log( state)
      state.characters.forEach((character) => {
        if (characterId == character.id) {
          characterFound = character;
        }
      })
      console.log("character found" + characterFound.name)
      commit('SET_CURRENT_CHARACTER', characterFound);

    }
  },

  mutations: {
    SET_INFOS (state, infos) {
      state.infos = infos
    },
    SET_CHARACTERS (state, characters) {
      state.characters.push(...characters);
    },
    SET_CURRENT_CHARACTER (state, character) {
      state.currentCharacter = character;
    },
    
    
  }
});


