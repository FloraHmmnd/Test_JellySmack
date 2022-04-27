<template>
  <div class="characterCardContainer">
    <img class="imgCharacter" :src="imageUrl" />
    <h1 class="characterInfos">{{ name }} ({{ status }})</h1>
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
.characterCardContainer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.imgCharacter {
  display: block;
  width: 100%;
  border-color: rgb(41, 41, 43);
  border-style: solid;
  border-width: 10px;
  border-radius: 50%;
}

.characterInfos {
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  position: absolute;
  inset: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.characterCardContainer:hover > .characterInfos {
  opacity: 1;
  transition: 200ms ease-in-out;
}

.characterCardContainer:hover > .imgCharacter {
  filter: grayscale(90%);
}
</style>
