<template>
  <div class="home">
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  </div>
  <div class="userPreferences">
  <Filters @filtersStatus="filtersButtonHandler" @searchCharacter="searchBarHandler" @removeFiltersAndSearch="clearButtonHandler"></Filters>
  <Pagination @loadNextPage="goToNextPage" @loadPreviousPage="goToPrevPage" :currentPage="currentPage"></Pagination>
</div>
  <ListOfCharacters></ListOfCharacters>
</template>

<script setup>
import ListOfCharacters from '@/components/ListOfCharacters.vue'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'
import {useNewStore} from "@/store/newStore.js"
import { onBeforeMount, ref } from 'vue';


const newStore = useNewStore()
const currentPage = ref(1)


onBeforeMount(() => {
  newStore.fetchCharacters();
})

const filtersButtonHandler = (event) => {
    newStore.fetchCharacters(event)  
}

const searchBarHandler = (event) => {
      newStore.fetchCharacters(event)  
}

const clearButtonHandler = () => {
  currentPage.value = 1
  newStore.fetchCharacters()
}

const goToNextPage = () => {
  if (newStore.totalPages != currentPage.value){
     currentPage.value += 1
   }
   newStore.fetchCharacters(newStore.infos.next)
}

const goToPrevPage = () => {
  if (newStore.infos.prev != null) {
      currentPage.value -= 1
   }
  newStore.fetchCharacters(newStore.infos.prev)
}

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

