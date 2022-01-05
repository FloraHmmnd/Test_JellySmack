<template>
  <div class="wrapperCharacter">
    <h2 class="titleCharacter">:-) -- Hi human ! -- (-:</h2>
    <div>
      <p class="description">
        My name is : <span>{{ character.name }}</span> and I'm
        <span>{{ character.status }}</span>.<br />
        I was created on <span>{{ character.created }}</span>.<br />
        I'm a <span>{{ character.gender }} {{ character.species }}</span> from
        <span>{{ character.origin.name }}</span> and you can meet me at
        <span>{{ character.location.name }}</span>.
      </p>
      <router-link to="/character"><p>Return to see my friends</p></router-link>
      <div><img class="imageCharacter" :src="character.image" /></div>
      <router-view></router-view>
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
  created() {
    this.$store.dispatch('setCurrentCharacter', this.id);
  },
  computed: {
    character: function () {
      return this.$store.getters.getCurrentCharacter
    }
  },
  mounted () {
    this.$store.dispatch('getDatas')
  }
}
</script>

<style>


.titleCharacter{
font-size: 5em;
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
background-clip: border-box;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}

.description{
  font-size: 2em;
}

span{
  background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
background-clip: border-box;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}

.imageCharacter{
  width: 45%;
  margin-top: 5%;
    border-width: 20px;

}
</style>
