import { defineStore } from 'pinia'
import axios from 'axios'


export const useNewStore = defineStore({
  id: 'newStore',
  state: () => ({
    infos: [],
    characters: [],
    currentCharacter: {},
    totalPages: 0
  }),

  actions: {
    async fetchCharacters (filters) {
      let response;
        try {
          if(filters === undefined){
            response = await axios.get(`${import.meta.env.VITE_API_URL}/character`)                
          }else {
            response = await axios.get(`${import.meta.env.VITE_API_URL}/character/${filters}`)                
          }        
          this.infos = response.data.info
          this.totalPages = response.data.info.pages
          this.characters = response.data.results
        }
        catch (error ) {
          console.error("fetch error")
          console.log(error);

        }           
    },
    
    async fetchCurrentCharacter (id){
      try {
        console.log("fetch character")
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/character/${id}`)
        this.currentCharacter = response.data
      }
      catch {
        console.error("fetch error")
      }           
  },
    
  }    
})