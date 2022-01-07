<template>
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  <div id="userPreferences">
    <div id="searchWrapper">
      <form>
        <input
          id="searchBar"
          type="text"
          v-model="search"
          placeholder="Search Rick..."
        />
        <button id="search" @click="searchCharacters">&#128270;GO</button>
      </form>
    </div>
    <div class="filterWrapper">
      <form>
        <input
          type="checkbox"
          id="alive"
          onclick=""
          name="alive"
          value="alive"
        />
        <label for="alive">Alive</label>
        <input type="checkbox" id="dead" onclick="" name="dead" value="dead" />
        <label for="dead">Dead</label>
        <input
          type="checkbox"
          id="unknown"
          onclick=""
          name="unknown"
          value="unknown"
        />
        <label for="unknown">Unknown</label>
      </form>
    </div>
    <div class="wrapperPages">
      <button id="goToFirstPage" @click="goToFirstPage">FIRST</button
      ><button id="goToNextPage" @click="goToNextPage">NEXT</button
      ><button id="goToPrevPage" @click="goToPrevPage">PREV</button
      ><button id="goToLastPage" @click="goToLastPage">LAST</button>
    </div>
  </div>

  <div class="wrapper">
    <div v-for="character in characters" :key="character.id">
      <div class="links">
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'character', params: { id: character.id } }"
          ><h4>{{ character.name }} ({{ character.status }})</h4>
          <img :src="character.image"
        /></router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myStore',

  computed: {
    characters () {
      return this.$store.getters.getCharacters
    }
  },
  mounted () {
    this.$store.dispatch('getDatas')
  }
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

#searchWrapper {
  display: flex;
  align-items: center;
  height: 20px;
  size: 100%;
}

#searchBar {
  font-family: 'Russo One';
  padding: 10px;
  border-width: 5px;
  border-color: rgb(61, 61, 61);
    font-size: 15px;
    size: 100%;

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
}

#goToFirstPage {
  border-top-left-radius: 30px 30px;
  border-bottom-left-radius: 30px 30px;
}

#goToLastPage {
  border-top-right-radius: 30px 30px;
  border-bottom-right-radius: 30px 30px;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 3%;
  margin-right: 3%;
  grid-row-gap: 10px;
}

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
