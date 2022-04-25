<template>
  <div class="home">
    <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  </div>
<div class="mainContainer">
  <div class="userPreferences">
    <Filters
      @searchCharacter="searchBarHandler"
      @removeFiltersAndSearch="clearButtonHandler"
    ></Filters>
    <Pagination
      :current-page="currentPage"
      @loadNextPage="goToNextPage"
      @loadPreviousPage="goToPrevPage"
    ></Pagination>
  </div>
  <div class="characters">
      <ListOfCharacters></ListOfCharacters>

  </div>
</div>
  
</template>

<script setup>
import ListOfCharacters from "@/components/ListOfCharacters.vue";
import Filters from "@/components/Filters.vue";
import Pagination from "@/components/Pagination.vue";
import useNewStore from "@/store/newStore";
import { onBeforeMount, ref } from "vue";

const newStore = useNewStore();
const currentPage = ref(1);

const infos = {
  filters: ref(),
};

onBeforeMount(() => {
  newStore.fetchCharacters(infos);
});

const searchBarHandler = (event) => {
  currentPage.value = 1;
  infos.filters.value = event;
  newStore.fetchCharacters(event, currentPage.value);
};

const clearButtonHandler = () => {
  currentPage.value = 1;
  infos.filters.value = undefined;
  newStore.fetchCharacters(infos.filters.value);
};

const goToNextPage = () => {
  if (newStore.totalPages !== currentPage.value) {
    currentPage.value += 1;
  }
  newStore.fetchCharacters(infos.filters.value, currentPage.value);
};

const goToPrevPage = () => {
  if (newStore.infos.prev !== null) {
    currentPage.value -= 1;
  }
  newStore.fetchCharacters(infos.filters.value, currentPage.value);
};
</script>

<style scoped>
.mainContainer{
    margin-right: 5%;
    margin-left: 5%;  
    margin-bottom: 5%;



}
.mainTitle {
  margin-top: 5%;
  width: 100%;
  margin-bottom: 10%;
  font-size: 6em;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10%;
  height: 30%;
  width: 100%;
  

}
</style>
