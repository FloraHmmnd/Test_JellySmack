<template>
  <div class="home">
    <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  </div>
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
    <button @click="increment">+</button>
    <p>{{currentPageQuery}}</p>
  </div>
  <ListOfCharacters></ListOfCharacters>
</template>

<script setup>
import ListOfCharacters from "@/components/ListOfCharacters.vue";
import Filters from "@/components/Filters.vue";
import Pagination from "@/components/Pagination.vue";
import useNewStore from "@/store/newStore";
import { onBeforeMount, ref, reactive, computed } from "vue";
import { fetchCharactersArray } from "@/service";
import { useQuery } from "vue-query";

const newStore = useNewStore();
const currentPage = ref(1);

const currentPageQuery = ref(5)
 
const increment = () => {
  console.log('increment')
  currentPageQuery.value += 1
}

const infos = {
  filters: ref(),
};

  const queryKey = reactive(['charactersArray', currentPageQuery.value ]);

  const {isLoading, data} = useQuery(queryKey, async () => fetchCharactersArray(currentPageQuery.value));

// query function

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
