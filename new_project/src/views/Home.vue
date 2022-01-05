<template>
  <div class="home">
    <ListOfCharacters/>
  </div> 
</template>

<script>
// @ is an alias to /src
import ListOfCharacters from '@/components/ListOfCharacters.vue'

export default {
  name: 'Home',
  components: {
    ListOfCharacters
    
  }
}
</script> 

<style>



</style>

