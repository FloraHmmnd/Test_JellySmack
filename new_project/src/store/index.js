import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

  state: {
    infos: [],
    characters: [],
    currentCharacter: {},
    // currentPage: 1,
    // charPerPage: 20,
    firstChar: 0,
    lastChar: 0,
    charDisplayed: [],
    search: '',
    ready: false,
    filteredList : [],
  },

  getters: {
    characters : state => {
      return state.characters
    },
    getCurrentCharacter(state) {
      return state.currentCharacter;
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
    },


    getCountCharacters : state =>{
      return state.characters.length
    }
    
      
  },

  actions: {
    async getDatas ({ commit }) {
        commit('RESET')

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
        await callUrl(url).then(() => {
          commit('SET_READY')
        })
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

    displayCharacters ({commit, state}, params) {
      
      let charDisplayed = state.characters.slice(params.first, params.last);
      console.log( charDisplayed)
      console.log( 'first' + params.first)
      console.log( 'last ' + params.last)
      console.log('display characters')
      commit ('SET_CHAR_DISPLAYED', charDisplayed ) 
    }
  },
  

  mutations: {
    RESET (state){
     state.characters = []
    },

    SET_INFOS (state, infos) {
      state.infos = infos
    },
    SET_READY (state) {
      console.log('DATE RECEIVED')
      state.ready = true
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
