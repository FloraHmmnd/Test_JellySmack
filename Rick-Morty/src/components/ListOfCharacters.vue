<template>
  <div class="wrapperCharacters">
    <div v-for="character in newStore.characters" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: 'character', params: { id: character.id } }"
        >
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

const newStore = useNewStore();
</script>

<style scoped>
.wrapperCharacters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 5%;
  margin-bottom: 20px;
}
</style>
