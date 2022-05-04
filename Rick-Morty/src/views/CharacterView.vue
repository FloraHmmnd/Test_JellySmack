<template>
  <SpinnerLoader v-if="isLoading"></SpinnerLoader>
  <div class="wrapperCharacter">
    <h2 class="titleCharacter">:-) -- Hi human ! -- (-:</h2>
    <div v-if="isLoading">It's loading</div>
    <div v-if="isError">ERROR</div>
    <div v-if="data">
      <p class="description">
        My name is <span>{{ data?.name }}</span> and I'm
        <span>{{ data?.status }}</span
        >.<br />
        I was created the <span>{{ data?.created }}</span
        >.<br />
        I'm a
        <span>{{ data?.gender }} {{ data?.species }}</span>
        from <span>{{ data?.origin?.name }}</span> and you can meet me at
        <span>{{ data?.location?.name }}</span
        >.
      </p>

      <router-link :to="'/characters'"
        ><button class="returnList">Go back to my friends</button></router-link
      >
      <div><img class="imageCharacter" :src="data?.image" /></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { fetchCharacter } from "@/service";
import { useQuery } from "vue-query";

const route = useRoute();

const currentCharacterId = ref(route.params.id);

const { isLoading, data, isSuccess, isError } = useQuery(
  ["character", currentCharacterId],
  () => fetchCharacter(currentCharacterId.value)
);
</script>

<style>
.titleCharacter {
  word-wrap: break-word;
  font-size: 5em;
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 2em;
}

span {
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.imageCharacter {
  width: 45%;
  margin-top: 5%;
  border-width: 20px;
  border-color: rgb(41, 41, 43);
  border-style: solid;
  border-radius: 50%;
  transition: transform 0.2s;
}

.imageCharacter:hover {
  -ms-transform: scale(1.15);
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
}

.returnList {
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
  border-radius: 30px;
  font-family: "Russo One";
  cursor: pointer;
}
</style>
