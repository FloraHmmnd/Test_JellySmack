<template>
  <div class="wrapperCharacters">
    <div v-for="character in characters" :key="character.id">
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
import CharacterCard from "./CharacterCard.vue";

defineProps({
  characters: {
    required: true,
    type: Object,
  },
});
</script>

<style scoped>
.wrapperCharacters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  row-gap: 7%;
  column-gap: 7%;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
