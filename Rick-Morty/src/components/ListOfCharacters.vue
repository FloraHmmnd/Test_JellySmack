<template>
    <div class="wrapperCharacters">
      <div v-for="character in characters" :key="character.id">
      <div class="links">
        <router-link style="text-decoration: none; color: inherit" :to="{ name: 'character', params: { id: character.id } }">
          <CharacterCard
            :name="character.name"
            :status="character.status"
            :image-url="character.image"
          ></CharacterCard>
        </router-link>
      </div>
    </div>
    </div>  
</template>

<script setup>
import useNewStore from "@/store/newStore";
import CharacterCard from "./CharacterCard.vue";
import { ref } from "vue";


defineProps({
  characters : {
    required : true,
    type : Object
  }
  
})
const newStore = useNewStore();
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
