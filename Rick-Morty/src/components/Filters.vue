<template>
  <div class="mainContainer">
    <div class="searchWrapper">
      <input type="text" id="searchInput" v-model="searchedCharacter" placeholder="Search Rick..." />
      <button id="search" @click="applySearchedCharacter">GO</button>
    </div>

    <div class="filterWrapper">
      <form>
        <input
          type="radio"
          id="alive"
          v-model="status"
          @change="applyFiltersStatus"
          name="alive"
          value="alive"/>
        <label for="alive">Alive</label>

        <input
          type="radio"
          id="dead"
          v-model="status"
          @change="applyFiltersStatus"
          name="dead"
          value="dead"/>
        <label for="dead">Dead</label>

        <input
          type="radio"
          id="unknown"
          v-model="status"
          @change="applyFiltersStatus"
          name="unknown"
          value="unknown"/>
        <label for="unknown">Unknown</label>
      </form>
           

    </div>
    <div>
 <button class="clear" @click="removeAllFilters">CLEAR</button>
      </div>
  </div>

</template>

<script setup>

import {ref} from 'vue'
import {useNewStore} from "@/store/newStore.js"

const newStore = useNewStore() 
const status = ref("")
const searchedCharacter = ref("")

const applyFiltersStatus = () => {
  let url = `https://rickandmortyapi.com/api/character/?status=${status.value}`
    if (searchedCharacter != null) {
      url += `&name=${searchedCharacter.value}`
      console.log(url)
  }
    newStore.fetchDatas(url)  
}

const applySearchedCharacter = () => {
  let url = `https://rickandmortyapi.com/api/character/?name=${searchedCharacter.value}`
  if (status.value != null) {
    url += `&status=${status.value}`
  }
  newStore.fetchDatas(url)
}

const removeAllFilters = () => {
  newStore.fetchDatas(newStore.url)
  alive.checked = false
  dead.checked  = false
  unknown.checked = false
  searchInput.value = null
}

 
</script>

<style scoped>

.mainContainer {
  display: flex;
  align-items: center;
}
.clear{
  border-radius: 30px;
}
#searchWrapper {
  display: flex;
  align-items: center;
  height: 20px;
  size: 100%;
}

#searchInput {
  font-family: 'Russo One';
  padding: 10px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
  font-size: 15px;
  size: 100%;
  border-top-left-radius: 30px 30px;
  border-bottom-left-radius: 30px 30px;
}

#search {
  border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px;
}

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
form > label {
  font-size: 20px;
}

form > input {
  cursor: pointer;
}
</style>