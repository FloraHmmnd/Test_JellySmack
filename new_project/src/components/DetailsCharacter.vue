<template>
  <div class="wrapper">
      <h2>My Name is : {{characters.id}} </h2>
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

</style>
