<template>
<div id="userPreferences">
  <Filters></Filters>
  <Pagination></Pagination>
</div>
  
  <div class="wrapperCharacters">
    <div v-for="character in getCharDisplayed" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'character', params: { id: character.id } }"
          ><h4>{{ character.name }} ({{ character.status }})</h4>
          <img id="imgChar" :src="character.image"/>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import Filters from './Filters.vue'
import Pagination from './Pagination.vue'

  export default {
    name: "listOfCharacters",
    
    created() {
        this.$store.dispatch("getDatas").then(() => {
            const parameters = { first: 0, last: this.charPerPage };
            this.$store.dispatch("displayCharacters", parameters);
        });
    },
    
    computed: {
        ...mapGetters([
            "characters",
            "getCharDisplayed",
            "getCountCharacters"
        ])
    },
    components: { Filters, Pagination }
}
</script>


<style scoped>

#userPreferences {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
  height: 20px;
}

form > label {
  font-size: 20px;
}

form > input {
  cursor: pointer;
}

button {
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
  font-family: 'Russo One';
  size: 100%;
  cursor: pointer;
}


.wrapperCharacters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 3%;
  margin-right: 3%;
  grid-row-gap: 10px;
}



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

h4 {
  transition: transform 0.2s;
  color: rgb(41, 41, 43);
  font-size: 20px;
}

h4:hover {
  -ms-transform: scale(1.15);
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
  text-decoration: underline;
  text-decoration-color: rgb(245, 104, 11);
  color: black;
}

</style>
