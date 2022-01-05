<template>
  <h1>RICK AND MORTY X JELLYSMACK</h1>
  <div class="wrapper">
    <div v-for="character in characters" :key="character.id">
      <h4>{{ character.name }} ({{ character.status }})</h4>
      <h5></h5>
      <router-link :to="{name: 'character', params: {id: character.id}}"><img :src="character.image" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myStore',
  
  computed: {
    characters () {
      return this.$store.getters.getCharacters;
    }
  },
  mounted () {
    this.$store.dispatch('getDatas')
  }
}
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
}

img{
  width: 60%;
  border-color:black;
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

</style>
