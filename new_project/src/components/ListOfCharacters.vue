<template>
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  <div class="searchWrapper">
    <form>
    <input type="text" placeholder="Search Rick..." />
    <button id="search" onclick= "search()">&#128270;GO</button>
    </form>
    

  </div>
  <div class="filterWrapper">
    <form>
      <input type="checkbox" id="alive" onclick="filteredList()" name="alive" value="alive" />
      <label for="alive">Alive</label>
      <input type="checkbox" id="dead" onclick="filteredList()" name="dead" value="dead" />
      <label for="dead">Dead</label>
      <input type="checkbox" id="unknown" onclick="filteredList()" name="unknown" value="unknown" />
      <label for="unknown">Unknown</label>
    </form>
  </div>
  <div class="wrapperPages">
    <button id="goToFirstPage" onclick="">FIRST</button
    ><button id="goToNextPage" onclick="">NEXT</button
    ><button id="goToPrevPage" onclick="">PREV</button
    ><button id="goToLastPage" onclick="">LAST</button>
        {{totalPages}}
  </div>
  <div class="wrapperCharacters">
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
  name: 'listOfCharacters',
  props: [],

  data () {
    return {
      listOfCharacters: [],
      currentPage: 0,
      charPerPage: 20,
      firstChar: 0,

    }
  },
  methods: {
    goToFirstPage(){
      this.currentPage = 0;
      this.firstChar = 0;
      this.charDisplayed(this.firstChar, this.lastChar);

        },
    goToNextPage(){
      this.currentPage += 1;
      this.firstchar += 20;
      this.charDisplayed(this.firstChar, this.lastChar)
    },
    goToPrevPage(){
      this.currentPage -= 1;
      this.firstChar -=20;
      this.charDisplayed(this.firstChar, this.lastChar)
    },
    goToLastPage(){
      this.currentPage = this.totalPages;
      this.firstChar = this.listOfCharacters.length - 20;
      let restChar = this.listOfCharacters.length - this.firstChar;
      this.charDisplayed(this.firstChar, restChar)
    },

    filteredList(){

    },

    search(){
      
    }


  },

  computed: {
    characters () {
            return this.$store.getters.getCharacters
    },
    totalPages(){
      let totalPages = 0;
      if (this.listOfCharacters.lenght%this.charPerPage == 0){
        totalPages = this.listOfCharacters.length/this.charPerPage;
      }
      else {
        totalPages = Math.ceil(this.listOfCharacters.length/this.charPerPage)
      }
      return totalPages
    },
    lastChar(){
      let lastChar = this.firstChar + (this.charPerPage);
    
      return lastChar
    },
    charDisplayed(first, last){
      let charDisplayed = this.listOfCharacters.slice(first, last+1)
      return charDisplayed
    }
  },

  mounted () {
    this.$store.dispatch('getDatas')
  }
}
</script>

<style>
.wrapperCharacters {
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
  border-color: rgb(61, 61, 61);
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
