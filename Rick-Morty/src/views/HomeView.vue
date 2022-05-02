<template>
  <div class="home">
    <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  </div>
  <div class="mainContainer">
    <div class="userPreferences">
      <FiltersComponent
        @searchCharacter="search"
        @removeFiltersAndSearch="search(null)"
      ></FiltersComponent>
      <PaginationComponent
        :current-page="currentPage"
        @loadNextPage="goToNextPage"
        @loadPreviousPage="goToPrevPage"
      ></PaginationComponent>
    </div>
    <NotFound v-if="!store.isResponse"></NotFound>
    <ListOfCharacters v-else></ListOfCharacters>
  </div>
</template>

<script setup>
import ListOfCharacters from "@/components/ListOfCharacters.vue";
import FiltersComponent from "@/components/FiltersComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import NotFound from "@/components/NotFound.vue";
import { onBeforeMount, ref } from "vue";
import useStore from "@/store/store";
import {useRoute} from 'vue-router';

const store = useStore();
const currentPage = ref(1);
const filters = ref({});

const route = useRoute()

onBeforeMount(() => {
Object.keys(route.query).forEach(routeKey => {
  filters.value[routeKey] = route.query[routeKey];
});
 store.fetchCharacters(filters.value, currentPage.value);
});

const search = (payload) => {
  currentPage.value = 1;
  filters.value = payload;
  store.fetchCharacters(filters.value);
};

const goToNextPage = () => {
  if (store.totalPages !== currentPage.value) {
    currentPage.value += 1;
  }
  store.fetchCharacters(filters.value, currentPage.value);
};

const goToPrevPage = () => {
  if (store.infos.prev !== null) {
    currentPage.value -= 1;
  }
  store.fetchCharacters(filters.value, currentPage.value);
};
</script>

<style scoped>
.mainContainer {
  margin-right: 5%;
  margin-left: 5%;
}
.mainTitle {
  word-wrap: break-word;
  margin-top: 5%;
  width: 100%;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10%;
  height: 30%;
  width: 100%;
}

@media screen and (max-width: 955px) {
  .userPreferences {
    flex-direction: column;
  }
}
</style>
