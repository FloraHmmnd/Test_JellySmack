<template>
  <div class="home">
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
    <ListOfCharacters/>
  </div> 
</template>

<script>
import ListOfCharacters from '@/components/ListOfCharacters.vue'

export default {
  name: 'Home',
  components: {
    ListOfCharacters
    
  }
}
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

</style>

