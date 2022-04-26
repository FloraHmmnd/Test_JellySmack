import { defineStore } from "pinia";
import axios from "axios";



export default defineStore({
  id: "newStore",
  state: () => ({
    infos: [],
    characters: [],
    currentCharacter: {},
    totalPages: 0,
    noResults: false
  }),

  actions: {
    async fetchCharacters(filters, page = 1) {
      let response;
      let url = `${import.meta.env.VITE_API_URL}/character/?page=${page}`;
      if (filters?.status) {
        url += `&status=${filters.status}`;
      }
      if (filters?.name) {
        url += `&name=${filters.name}`;
      }
      try {
        response = await axios.get(url);
        this.infos = response.data.info;
        this.totalPages = response.data.info.pages;
        this.characters = response.data.results;
      } catch (error) {
        console.error("fetch characters error", error);
      } finally {
        this.noResults = true

      }
    },

    async fetchCurrentCharacter(id) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/character/${id}`
        );
        this.currentCharacter = response.data;
      } catch {
        console.error("fetch characters error", error);
      }
    },
  },
});
