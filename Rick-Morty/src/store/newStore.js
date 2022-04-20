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
    async fetchCharacters (infos) {
      let response;
        try {
          if(infos.filters.value === undefined && infos.page.value === undefined){
            response = await axios.get(`${import.meta.env.VITE_API_URL}/character`)                
          }else if (infos.page.value === undefined) {
            response = await axios.get(`${import.meta.env.VITE_API_URL}/character/?${infos.filters.value}`)
          }else if (infos.filters === undefined){
            response = `${import.meta.env.VITE_API_URL}/character/${infos.page.value}`
          }
          else {
            response = await axios.get(`${import.meta.env.VITE_API_URL}/character/?${infos.page.value}&${infos.filters.value}`)
          }        
          this.infos = response.data.info
          this.totalPages = response.data.info.pages
          this.characters = response.data.results
        }
        catch (error ) {
          console.error("fetch characters error")
          console.log(error);

        }           
    },
    
    async fetchCurrentCharacter (id){
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/character/${id}`)
        this.currentCharacter = response.data
      }
      catch {
        console.error("fetch current character error")
        console.log(error);
      }           
  },
    
  }    
})