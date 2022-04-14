import { defineStore } from 'pinia'
import axios from 'axios'


export const useNewStore = defineStore({
  id: 'newStore',
  state: () => ({
    url: 'https://rickandmortyapi.com/api/character',
    infos: [],
    characters: [],
    currentCharacter: {},
  }),

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
        this.characters.forEach(character => {
          if (characterId == character.id) {
            this.currentCharacter = character
          } 
        })
    },
  }    
})