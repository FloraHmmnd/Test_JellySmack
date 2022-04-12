<template>
<div id="userPreferences">
  <Filters></Filters>
  <Pagination></Pagination>
</div>
  
  <div class="wrapperCharacters">
    <div v-for="character in newStore.characters" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'character', params: { id: character.id } }"
          >
          
            <CharacterCard :name="character.name" :status="character.status" :imageUrl="character.image"></CharacterCard>

          
        </router-link>
      </div>
    </div>
  </div>

</template>

<script setup>

import Filters from './Filters.vue'
import Pagination from './Pagination.vue'
import {useNewStore} from "@/store/newStore.js"
import { onMounted } from 'vue';
import CharacterCard from './CharacterCard.vue';


const newStore = useNewStore()
onMounted(() => {
  newStore.getDatas(newStore.url);
})
const test = "test"

</script>


<style scoped>

#userPreferences {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
  height: 20px;
}

form > label {
  font-size: 20px;
}

form > input {
  cursor: pointer;
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


.wrapperCharacters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 3%;
  margin-right: 3%;
  grid-row-gap: 10px;
}









</style>
