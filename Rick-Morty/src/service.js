import axios from "axios";
import router from "./router";

export const fetchCharacters = async (page = 1, filters) => {
  let url = `${import.meta.env.VITE_API_URL}/character/?page=${page}`;
  if (filters?.status) {
    url += `&status=${filters.status}`;
  }
  if (filters?.name) {
    url += `&name=${filters.name}`;
  }
  const response = await axios.get(url);
  const resultats = {
    characters: response.data.results,
    infos: response.data.info,
    totalPages: response.data.info.pages,
  };
  router.push({
    name: "Home",
    query: { page, status: filters?.status, name: filters?.name },
  });
  return resultats;
};

export const fetchCharacter = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/character/${id}`;
  const response = await axios.get(url);
  const characterSelected = response.data;
  return characterSelected;
};

export default { fetchCharacters, fetchCharacter };
