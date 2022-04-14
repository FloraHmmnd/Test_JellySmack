<template>
  
  <div class="wrapperCharacters">
    <div v-for="character in newStore.characters" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'character', params: { id: character.id } }">
            <CharacterCard :name="character.name" :status="character.status" :imageUrl="character.image"></CharacterCard>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script setup>

import {useNewStore} from "@/store/newStore.js"
import { onBeforeMount } from 'vue';
import CharacterCard from './CharacterCard.vue';



const newStore = useNewStore()
onBeforeMount(() => {
  newStore.fetchDatas(newStore.url);
})



</script>


<style scoped>

.wrapperCharacters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 3%;
  margin-right: 3%;
  grid-row-gap: 10px;
}









</style>
