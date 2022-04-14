<template>
    <div class="wrapperPages">
      <button id="goToFirstPage" @click="goToFirstPage">FIRST</button>
      <button id="goToNextPage" @click="goToNextPage">NEXT</button>
      <button id="goToPrevPage" @click="goToPrevPage">PREV</button>
      <button id="goToLastPage" @click="goToLastPage">LAST</button>
    </div>
</template>

<script setup>

import {ref} from 'vue'
import {useNewStore} from "@/store/newStore.js"


const newStore = useNewStore()
const characterPerPages = 20;
const currentPage = ref(0);
const firstPage = 0;
  
const goToNextPage = () => {
  newStore.fetchDatas(newStore.infos.next)
  console.log(newStore.infos.next)
}

const goToPrevPage = () => {
  newStore.fetchDatas(newStore.infos.prev)
}

const goToFirstPage = () => {
  newStore.fetchDatas(newStore.url)
}

const goToLastPage = () => {
  let lastUrl = "https://rickandmortyapi.com/api/character/?page=" + newStore.infos.pages
  newStore.fetchDatas(lastUrl)
}
  
</script>

<style scoped>
button {
  padding: 10px;
  text-align: center;
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  color: aliceblue;
  font-size: 15px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
  font-family: 'Russo One';
  size: 100%;
  cursor: pointer;
}

#goToFirstPage {
  border-top-left-radius: 30px 30px;
  border-bottom-left-radius: 30px 30px;
}

#goToLastPage {
  border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px;
}
</style>