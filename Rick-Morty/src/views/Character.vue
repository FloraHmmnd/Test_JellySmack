<template>

  <div class="wrapperCharacter">

    <h2 class="titleCharacter">:-) -- Hi human ! -- (-:</h2>

    <div>
      <p class="description">
        My name is <span>{{currentCharacter.name }}</span> and I'm
       <span>{{ currentCharacter.status }}</span
        >.<br />
        I was created the <span>{{ currentCharacter.created }}</span
        >.<br />
        I'm a <span>{{ currentCharacter.gender }} {{ currentCharacter.species }}</span> from
       <span>{{currentCharacter.origin.name}}</span> and you can meet me at 
       <span>{{ currentCharacter.location.name}}</span>.
      </p>

      <router-link :to="'/characters'"><button class="returnList">Go back to my friends</button></router-link>
     <div><img class="imageCharacter" :src="currentCharacter.image" /></div>
      <router-view></router-view>

    </div>

  </div>

</template>

<script setup>

import {useNewStore} from "@/store/newStore.js"
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'


const route = useRoute()
const currentCharacterId = route.params.id
const newStore = useNewStore()
const {currentCharacter} = storeToRefs(newStore)


onBeforeMount(() => {
  newStore.fetchDatas(newStore.url);
  console.log("refetch")
  newStore.setCurrentCharacter(currentCharacterId)
})


</script>

<style>

.titleCharacter {
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
  font-family: 'Russo One';
  cursor: pointer;
}

</style>
