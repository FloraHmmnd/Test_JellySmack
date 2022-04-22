<template>
  <div class="characterCardContainer">
    <h1>{{ name }} ({{ status }})</h1>
    <img id="imgChar" :src="imageUrl" />
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  name: ref(""),
  status: ref(""),
  imageUrl: ref(""),
});
</script>

<style scoped>
img {
  width: 60%;
  border-color: rgb(41, 41, 43);
  border-style: solid;
  border-width: 10px;
  border-radius: 50%;
  transition: transform 0.2s;
}

img:hover {
  -ms-transform: scale(1.15);
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
}

h1 {
  transition: transform 0.2s;
  color: rgb(41, 41, 43);
  font-size: 20px;
}

h1:hover {
  -ms-transform: scale(1.15);
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
  text-decoration: underline;
  text-decoration-color: rgb(245, 104, 11);
  color: black;
}
</style>
