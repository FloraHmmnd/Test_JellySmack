<template>
  <div class="mainContainer">
    <div class="searchWrapper">
      <input
        id="searchInput"
        v-model="searchedCharacter"
        type="text"
        placeholder="Search Rick..."
        @keyup.enter="applySearchAndFilters"
      />
      <button id="search" @click="applySearchAndFilters">GO</button>
    </div>

    <div class="filterWrapper">
      <form>
        <input
          id="alive"
          v-model="status"
          type="radio"
          name="alive"
          value="alive"
          @change="applySearchAndFilters"
        />
        <label for="alive">Alive</label>

        <input
          id="dead"
          v-model="status"
          type="radio"
          name="dead"
          value="dead"
          @change="applySearchAndFilters"
        />
        <label for="dead">Dead</label>

        <input
          id="unknown"
          v-model="status"
          type="radio"
          name="unknown"
          value="unknown"
          @change="applySearchAndFilters"
        />
        <label for="unknown">Unknown</label>
      </form>
    </div>
    <div>
      <button class="clear" @click="removeAllFilters">CLEAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
};
</script>

<style scoped>
.mainContainer {
  display: flex;
  align-items: center;
  margin-left: 60px;
}
.clear {
  border-radius: 30px;
  margin-left: 10px
}
#searchWrapper {
  display: flex;
  align-items: center;
  height: 20px;
  size: 100%;
  margin-right: 10px
}

#searchInput {
  font-family: "Russo One";
  padding: 10px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
  font-size: 15px;
  size: 100%;
  /* border-top-left-radius: 30px 30px;
  border-bottom-left-radius: 30px 30px; */
  border-radius: 30px 30px 30px 30px;
}

#search {
    border-radius: 30px 30px 30px 30px;
    margin-left: 10px;
    margin-right: 10px;

  /* border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px; */
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
      /* margin-left: 10px;
            margin-right: 10px; */


}

form > input {
  cursor: pointer;
    /* margin-right: 5px;
          margin-left: 10px; */


}

.filterWrapper{
  display: flex;

}
</style>
