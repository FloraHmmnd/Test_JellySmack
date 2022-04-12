import { defineStore } from 'pinia'
import axios from 'axios'


export const useNewStore = defineStore({
  id: 'newStore',
  state: () => ({
    infos: [],
    characters: [],
    currentCharacter: {},
    allCharacters: [],
    charDisplayed: []
  }),

  getters: {
    getCharacters(state) {
        return state.characters
    }, 
    getCurrentCharacter() {
        return this.currentCharacter
    },     
    getCharDisplayed() {
        return this.charDisplayed
    }, 
    getCountCharacters(){
        return this.characters.length
    }
  },

  actions: {
    async getDatas () {
        this.characters = []
        async function callUrl (url) {
          await axios.get(url).then(response => {
                this.infos = response.data.info
                this.characters.push(...response.data.results)
                this.allCharacters.push(...response.data.result)
                if (response.data.info.next != null) {
                    return callUrl(response.data.info.next)
                  }                            
          })
        }
        let url = 'https://rickandmortyapi.com/api/character'
        await callUrl(url).then(() => {})
    },
    setCurrentCharacter ( characterId) {
        let characterFound = {}
        this.characters.forEach(character => {
        if (characterId == character.id) {
            characterFound = character
        }
        })
        this.currentCharacter = characterFound
    },
    displayCharacters (params) {
        let charToDisplayed = this.characters.slice(params.first, params.last)
        this.charDisplayed = charToDisplayed
    },
    filteredList  (filters) {
        let filteredList = [];
        filters.forEach(filter => {
          this.allCharacters.forEach(char => {
            if (char.status == filter) {
              filteredList.push(char)
            }
          })
        })
        this.characters = filteredList
    },
    searchList (search) {
        let searchList = [];
        this.characters.forEach(char => {
          if (char.name.toLowerCase().includes(search.toLowerCase())) {
            searchList.push(char);
          }
        })
        this.characters = searchList
    },
    resetCharacters () {
        this.characters = this.allCharacters
    }
  }    
})