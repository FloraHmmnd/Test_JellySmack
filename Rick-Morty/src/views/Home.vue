<template>
  <div class="home">
    <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  </div>
  <div class="userPreferences">
    <Filters
      @searchCharacter="searchBarHandler"
      @removeFiltersAndSearch="clearButtonHandler"
    ></Filters>
    <Pagination
      :current-page="currentPage"
      @loadNextPage="goToNextPage"
      @loadPreviousPage="goToPrevPage"
      :total-pages="data?.totalPages"
    ></Pagination>
  </div>
  
  <ListOfCharacters :characters="data?.characters"></ListOfCharacters>
  
</template>

<script setup>
import ListOfCharacters from "@/components/ListOfCharacters.vue";
import Filters from "@/components/Filters.vue";
import Pagination from "@/components/Pagination.vue";
import useNewStore from "@/store/newStore";
import { onBeforeMount, ref } from "vue";
import { fetchCharactersArray } from "@/service";
import { useQuery } from "vue-query";


const newStore = useNewStore();
const currentPage = ref(1);


const infos = {
  filters: ref(),
};

const {isLoading,data,isSuccess,isError,} = useQuery(["fetchCharactersArray", currentPage, infos], () => fetchCharactersArray(currentPage.value, infos.filters.value));


const searchBarHandler = (event) => {
  currentPage.value = 1;
  infos.filters.value = event;
};

const clearButtonHandler = () => {
  currentPage.value = 1;
  infos.filters.value = undefined;
};

const goToNextPage = () => {
  if(data.value.totalPages !== currentPage.value) {
    currentPage.value += 1;
  }
};

const goToPrevPage = () => {
  console.log("info:"+ data.value.infos.prev)
  if (data.value.infos.prev !== null) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
.mainTitle {
  margin-top: 5%;
  margin-bottom: 10%;
  font-size: 5em;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.userPreferences {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
  height: 20px;
}
</style>
