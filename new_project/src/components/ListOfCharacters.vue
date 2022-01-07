<template>
  <h1 class="mainTitle">RICK AND MORTY X JELLYSMACK</h1>
  <div class="searchWrapper">
    <form>
      <input type="text" v-model="search" placeholder="Search Rick..." />
      <button id="search"  @click="searchCharacters">&#128270;GO</button>
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
      <input
        type="checkbox"
        id="dead"
        onclick=""
        name="dead"
        value="dead"
      />
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
    total page = {{ getTotalPages }}
    last char = {{getLastChar}}
    first char = {{getFirstChar}}
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
import { mapGetters } from 'vuex'

export default {
  name: 'listOfCharacters',
  //props: ['firstChar', 'lastChar'],

  data () {
    return {
      // listOfCharacters: [],
      //currentPage: 0,
      //charPerPage: 20,
      //firstChar: 0,
      //search: "",
    }
  },

  methods: {
    goToFirstPage () {
      this.currentPage = 0
      this.firstChar = 0
      this.charDisplayed(this.firstChar, this.lastChar)
    },
    goToNextPage () {
      this.currentPage += 1
      this.firstchar += 20
      this.charDisplayed(this.firstChar, this.lastChar)
    },
    goToPrevPage () {
      this.currentPage -= 1
      this.firstChar -= 20
      this.charDisplayed(this.firstChar, this.lastChar)
    },
    goToLastPage () {
      this.currentPage = this.totalPages;
      this.firstChar = this.characters.length - 20;
      let restChar = this.characters.length - this.firstChar;
      this.charDisplayed(this.firstChar, restChar);
    },

    filteredList () {

      let filteredList = []

      if (document.getElementById('alive').checked) {
        this.characters.forEach(char => {
          if (char.status == 'Alive') {
            filteredList.push(char);
          }
        })
      } else if (document.getElementById('dead').checked) {
        this.characters.forEach(char => {
          if (char.status == 'Dead') {
            filteredList.push(char);
          }
        })
      } else if (document.getElementById('unknown').checked) {
        this.characters.forEach(char => {
          if (char.status == 'Unknown') {
            filteredList.push(char);
          }
        })
      } else if (
        document.getElementById('alive').checked == false &&
        document.getElementById('dead').checked == false &&
        document.getElementById('unknown').checked == false
      ) {
        filteredList == this.characters;
      }

      return filteredList
    },

    searchCharacters(){
      let searchList=[];
      this.filteredList.forEach(char => {
        if (char.name.toLowerCase().includes(this.search.toLowerCase())){
          searchList.push(char)
        }    
      });
      return searchList;
    }

  },

  computed: {

    
      ...mapGetters(['characters', 'getTotalPages', 'getLastChar', 'getFirstChar'])

      
    }
  ,

  mounted () {
    this.$store.dispatch('getDatas')
  },

  
  
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
