import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

  state: {
    infos: [],
    characters: [],
    currentCharacter: {},
    allCharacters: [],
    charDisplayed: []
  },

  getters: {
    characters: state => {
      return state.characters
    },

    getCurrentCharacter (state) {
      return state.currentCharacter
    },
   
    getCharDisplayed: state => {
      return state.charDisplayed
    },

    getCountCharacters: state => {
      return state.characters.length
    }
  },

  actions: {
    
    async getDatas ({ commit }) {
      commit('RESET')
      async function callUrl (url) {
        await axios.get(url).then(response => {
          commit('SET_INFOS', response.data.info)
          commit('SET_CHARACTERS', response.data.results)
          commit('SAVE_ALL_CHARACTERS', response.data.results)
          if (response.data.info.next != null) {
            return callUrl(response.data.info.next)
          }
        })
      }
      let url = 'https://rickandmortyapi.com/api/character'
      await callUrl(url).then(() => {})
    },

    setCurrentCharacter ({ commit, state }, characterId) {
      let characterFound = {}
      state.characters.forEach(character => {
                if (characterId == character.id) {
          characterFound = character
        }
      })
      commit('SET_CURRENT_CHARACTER', characterFound)
    },

    displayCharacters ({ commit, state }, params) {
      let charDisplayed = state.characters.slice(params.first, params.last)
      commit('SET_CHAR_DISPLAYED', charDisplayed)
    },

    filteredList ({ commit, state }, filters) {
      let filteredList = [];
      filters.forEach(filter => {
        state.allCharacters.forEach(char => {
          if (char.status == filter) {
            filteredList.push(char)
          }
        })
      })
      commit('SET_FILTERED_LIST', filteredList)
    },

    searchList ({ commit, state }, search) {
      let searchList = [];
      state.characters.forEach(char => {
        if (char.name.toLowerCase().includes(search.toLowerCase())) {
          searchList.push(char);
        }
      })
      commit('SET_FILTERED_LIST', searchList)
    },
    resetCharacters ({ commit }) {
      commit('RESET_CHARACTERS')
    }
  },

  mutations: {

    RESET (state) {
      state.characters = []
    },

    RESET_CHARACTERS (state) {
      state.characters = state.allCharacters
    },

    SAVE_ALL_CHARACTERS (state, characters) {
      state.allCharacters.push(...characters)
    },

    SET_INFOS (state, infos) {
      state.infos = infos
    },

    SET_CHARACTERS (state, characters) {
      state.characters.push(...characters)
    },

    SET_CURRENT_CHARACTER (state, character) {
      state.currentCharacter = character
    },

    SET_CHAR_DISPLAYED (state, charDisplayed) {
      state.charDisplayed = charDisplayed
    },

    SET_FILTERED_LIST (state, filter) {
      state.characters = filter
    }
  }
})
