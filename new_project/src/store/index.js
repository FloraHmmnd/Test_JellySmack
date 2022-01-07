import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

  state: {
    infos: [],
    characters: [],
    currentCharacter: {},
    totalPages: 0,
    currentPages: 1,
    charPerPage: 20,
    firstChar: 0,
    lastChar: 0,
    charDisplayed: []
  },

  getters: {
    characters : state =>{
      return state.characters
    },
    getCurrentCharacter(state) {
      return state.currentCharacter;
    },
    getTotalPages : state =>{
      let totalPages = 0
      if (state.characters.lenght % state.charPerPage == 0) {
        totalPages = state.characters.length / state.charPerPage
      } else {
        totalPages = Math.ceil(state.characters.length / state.charPerPage)
      }
      return state.totalPages = totalPages

    },

    getLastChar : state=>{ 
      let lastChar = state.firstChar + state.charPerPage - 1;
      return state.lastChar = lastChar

    },

    getFirstChar : state =>{
      return state.firstChar
    },

    getCharDisplayed : state =>{
      return state.charDisplayed
    }

    
      
  },

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

    },

    charDisplayed ({commit, state}, first, last) {
      first = 0
      last = 19
      let charDisplayed = state.characters.slice(first, last);
      console.log(charDisplayed)
      commit ('SET_CHAR_DISPLAYED', charDisplayed ) 
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
    SET_CHAR_DISPLAYED (state, charDisplayed) {
      state.charDisplayed = charDisplayed
    }

  }
})
