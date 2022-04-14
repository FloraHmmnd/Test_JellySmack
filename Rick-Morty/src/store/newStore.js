import { defineStore } from 'pinia'
import axios from 'axios'


export const useNewStore = defineStore({
  id: 'newStore',
  state: () => ({
    url: 'https://rickandmortyapi.com/api/character',
    infos: [],
    characters: [],
    currentCharacter: {},
    allCharacters: [],
    charactersDisplayed: []
  }),

  getters: {
    getCountCharacters(state){
        return state.characters.length
    }
  },

  actions: {
    async fetchDatas (url) {
        try {
          const response = await axios.get(url)
          this.infos = response.data.info
          this.characters = response.data.results
        }
        catch {
          console.error("fetch error")
        }           
    },
    setCurrentCharacter (characterId) {
        let characterFound = {}
        this.characters.forEach(character => {
        if (characterId == character.id) {
            characterFound = character
        }
        })
        console.log("characterFound :" + characterFound)
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