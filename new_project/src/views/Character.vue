<template>
  <div class="wrapperCharacter">
    <h2>Hi human !</h2>
    <div>
      <p>
        My name is : <span>{{ character.name }}</span> and I'm
        {{ character.status }}.<br />
        I was created on <span>{{ character.created }}.</span><br />
        I'm a <span>{{ character.gender }} {{ character.species }}</span> from
        <span>{{ character.origin.name }}.</span> and you can meet me at
        {{ character.location.name }}.
      </p>
      <div><img class="imageCharacter" :src="character.image" /></div>
    </div>

    <!-- <DetailsCharacter/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import DetailsCharacter from '@/components/DetailsCharacter.vue'

export default {
  name: 'Character',
  props: ['id'],
  // components: {
  //   DetailsCharacter
  // },
  created () {
    this.$store.dispatch('setCurrentCharacter', this.id);
  },
  computed: {
    character: function () {
      console.log(this.$store.getters.getCurrentCharacter)
      return this.$store.getters.getCurrentCharacter
    }
  }
  // mounted () {
  //   this.$store.dispatch('getDatas')
  // }
}
</script>

<style></style>
