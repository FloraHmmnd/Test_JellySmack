<template>
  <div class="searchContainer">
    <div class="searchWrapper">
      <input
        v-model="searchedCharacter"
        class="searchInput"
        type="text"
        placeholder="Search Rick..."
        @keyup.enter="applySearchAndFilters"
      />
      <button class="search" @click="applySearchAndFilters">GO</button>
    </div>

    <div class="filterWrapper">
      <form v-for="categorie in categories" :key="categorie.id">
        <input :id="categorie.id" v-model="status" type="radio" :name="categorie.value" :value="categorie.value" @change="applySearchAndFilters"/>
        <label :for="categorie.id">{{ categorie.name }}</label>
      </form>
    </div>

    <div>
      <button class="clear" @click="removeAllFilters">CLEAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const categories = [
  {id : 0, name: "Alive", value: "alive"},
  {id : 1, name: "Unknown", value: "unknown"},
  {id : 2, name: "Dead", value: "dead"}
]
const status = ref();
const searchedCharacter = ref();

  

const emits = defineEmits(["searchCharacter", "removeFiltersAndSearch"]);

const applySearchAndFilters = () => {
  const filters = { name: searchedCharacter.value, status: status.value };
  emits("searchCharacter", filters);
};

const removeAllFilters = () => {
  emits("removeFiltersAndSearch");
  status.value = null;
  searchedCharacter.value = null;
};
</script>

<style scoped>
.searchContainer {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 955px) {
  .searchContainer {
    flex-direction: column;
    margin-bottom: 5%;
  }
}
.clear {
  border-radius: 30px;
  margin-left: 10px;
}
@media screen and (max-width: 955px) {
  .searchWrapper {
    margin-bottom: 10%;
  }
}

.searchInput {
  font-family: "Russo One";
  padding: 10px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
  font-size: 15px;
  size: 100%;
  border-radius: 30px 30px 30px 30px;
}

.search {
  border-radius: 30px 30px 30px 30px;
  margin-left: 10px;
  margin-right: 10px;
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
  font-family: "Russo One";
  size: 100%;
  cursor: pointer;
}
form > label {
  font-size: 20px;
}

form > input {
  cursor: pointer;
}

form {
  display: flex;
  align-items: center;
}

.filterWrapper {
  display: flex;
}

@media screen and (max-width: 955px) {
  .filterWrapper {
    margin-bottom: 5%;
  }
}
</style>
