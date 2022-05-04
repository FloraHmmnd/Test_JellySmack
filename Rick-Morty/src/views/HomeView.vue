<template>
  <div class="home">
    <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  </div>
  <div class="userPreferences">
    <FiltersComponent
      @searchCharacter="search"
      @removeFiltersAndSearch="search"
    ></FiltersComponent>
    <PaginationComponent
      :current-page="currentPage"
      :total-pages="data?.totalPages"
      @loadNextPage="changePage(1)"
      @loadPreviousPage="changePage(-1)"
    ></PaginationComponent>
  </div>
  <SpinnerLoader v-if="isLoading"></SpinnerLoader>
  <NotFound v-if="isError"></NotFound>
  <ListOfCharacters :characters="data?.characters"></ListOfCharacters>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchCharacters } from "@/service";
import { useQuery } from "vue-query";
import ListOfCharacters from "@/components/ListOfCharacters.vue";
import FiltersComponent from "@/components/FiltersComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import NotFound from "@/components/NotFound.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";

const currentPage = ref(1);
const filters = ref({});

const route = useRoute();

onBeforeMount(() => {
  Object.keys(route.query).forEach((routeKey) => {
    filters.value[routeKey] = route.query[routeKey];
  });
});

const { isLoading, data, isError } = useQuery(
  ["fetchCharacters", currentPage, filters],
  () => fetchCharacters(currentPage.value, filters.value)
);

const search = (payload) => {
  currentPage.value = 1;
  filters.value = payload;
};

const changePage = (page) => {
  if (page === 1 && data.value.totalPages !== currentPage.value) {
    currentPage.value += page;
  }
  if (page === -1 && data.value.infos.prev !== null) {
    currentPage.value += page;
  }
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
